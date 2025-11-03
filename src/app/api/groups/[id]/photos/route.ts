import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import connectMongo from "@/lib/mongodb";
import Group from "@/models/Group";
import Photo from "@/models/Photo";

export const config = {
  api: { bodyParser: false },
};

// Convert Next.js Request into Node.js readable stream for formidable
function toNodeRequest(req: NextRequest): any {
  const body = req.body;
  const readable = Readable.fromWeb(body as any);
  (readable as any).headers = Object.fromEntries(req.headers);
  (readable as any).method = req.method;
  return readable;
}

// We need Readable from node:stream
import { Readable } from "node:stream";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id: groupId } = params;
  await connectMongo();

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

    const nodeReq = toNodeRequest(req); // ✅ convert web req to node req

    const data: any = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const uploadedFiles = Array.isArray(data.files.files)
      ? data.files.files
      : [data.files.files];

    const photoDocs = await Promise.all(
      uploadedFiles.map(async (file: any) => {
        if (!file || !file.filepath) return null;

        const filePath = `/uploads/${path.basename(file.filepath)}`;
        const photo = await Photo.create({
          groupId,
          imageUrl: filePath,
        });

        await Group.findByIdAndUpdate(groupId, { $push: { photos: photo._id } });
        return photo;
      })
    );

    return NextResponse.json(
      { message: "Photos uploaded successfully", photos: photoDocs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
