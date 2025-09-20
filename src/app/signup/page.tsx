"use client";


import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <p className="text-gray-600 mb-8">
        Are you signing up as a User or a Photographer?
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push("/signup/user")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          I’m a User
        </button>

        <button
          onClick={() => router.push("/signup/photographer")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          I’m a Photographer
        </button>
      </div>
    </div>
  );
}
