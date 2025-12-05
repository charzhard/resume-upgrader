import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { listUserResumes } from "@/lib/supabaseClient";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">You must be logged in.</h2>
        <Link href="/sign-in" className="text-blue-500 underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const resumes = await listUserResumes(userId);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <UserButton />
      </div>

      <div className="mt-6">
        <Link
          href="/resume/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Upload / Generate New Resume
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {resumes.length === 0 && (
          <p>No resumes stored yet. Create your first one!</p>
        )}

        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{resume.filename}</p>
              <p className="text-sm text-gray-600">
                Updated: {new Date(resume.updated_at).toLocaleString()}
              </p>
            </div>
            <a
              href={resume.file_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
