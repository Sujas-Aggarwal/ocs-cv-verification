"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Verification = {
  id: number;
  requestedTo: string;
  status: string;
  request: string;
};
function Home() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const response = await fetch("/api/verifications");
        const data = await response.json();
        if (response.ok) {
          setVerifications(data);
        } else {
          setError(data.message || "Failed to fetch verifications");
        }
      } catch (err) {
        setError("An error occurred while fetching verifications");
      } finally {
        setLoading(false);
      }
    };

    fetchVerifications();
  }, []);

  return (
    <div className="min-h-screen   flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold ">Your Verifications</h1>
      <Link href="/verify">
        <button className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Request New Verification
        </button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : verifications.length === 0 ? (
        <p>No verifications found</p>
      ) : (
        <ul className="w-full max-w-2xl bg-transparent  p-4 rounded-lg shadow-md gap-2 flex flex-col">
          {verifications.map((verification) => (
            <li
              key={verification.id}
              className=" border-b  py-2 flex flex-col gap-2"
            >
              <p>
                <strong>Requested To:</strong> {verification.requestedTo}
              </p>
              <p>
                <strong>Status:</strong> {verification.status}
              </p>
              <p>
                <strong>Request:</strong> {verification.request}
              </p>
            </li>
          ))}
        </ul>
      )}
      <span
        className="text-blue-500 cursor-pointer py-4"
        onClick={async () => {
          await fetch("/api/auth/logout");
          router.refresh();
        }}
      >
        Logout
      </span>
    </div>
  );
}

export default Home;
