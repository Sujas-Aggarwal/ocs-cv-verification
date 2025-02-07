"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Verify() {
  const [email, setEmail] = useState("");
  const [requestText, setRequestText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestedTo: email, request: requestText }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Verification request sent successfully!");
    } else {
      setError(data.message || "Failed to send verification request");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Request Verification</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <textarea
            name="request"
            placeholder="Enter your request"
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Request Verification
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link href={"/home"} className="text-blue-500 cursor-pointer" 
        //   onClick={async () => {
        //     await fetch("/api/auth/logout")
        //     router.refresh();
        //   }}
          >
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Verify;
