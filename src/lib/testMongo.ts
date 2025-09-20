import connectMongo from "./mongodb";

async function test() {
  try {
    await connectMongo();
    console.log("MongoDB connected successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
}

test();
