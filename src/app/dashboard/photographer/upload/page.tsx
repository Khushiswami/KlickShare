"use client";

import { useEffect, useState } from "react";

interface Group {
  _id: string;
  name: string;
}

interface Photo {
  _id: string;
  imageUrl: string;
  title?: string;
  groupId: string;
}

export default function UploadPhotosPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all groups
  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch("/api/groups");
      const data = await res.json();
      setGroups(data);
    }
    fetchGroups();
  }, []);

  // Fetch photos when group changes
  useEffect(() => {
    if (!selectedGroup) return;
    async function fetchPhotos() {
      const res = await fetch(`/api/groups/${selectedGroup}`);
      const group = await res.json();
      setPhotos(group.photos || []);
    }
    fetchPhotos();
  }, [selectedGroup]);

  // Upload handler
  const handleUpload = async () => {
    if (!selectedGroup || !selectedFiles) {
      alert("Please select a group and files!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(`/api/groups/${selectedGroup}/photos`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      alert("✅ Photos uploaded successfully!");
      setSelectedFiles(null);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-black">Upload Photos to Group</h1>

      <div className="mb-4">
        <label className="block mb-2 text-black font-medium">Select Group:</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">-- Select a group --</option>
          {groups.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black font-medium">Choose Photos:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Photos"}
      </button>

      {photos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-black mb-4">Uploaded Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo._id} className="border rounded-lg overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title || "Photo"}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
