"use client";
import Link from "next/link";
import { useState } from "react";

function Verify() {
  const [email, setEmail] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("gmail.com");
  const [customSuffix, setCustomSuffix] = useState("");
  const domains = [
    "harvard.edu",
    "mit.edu",
    "iitd.ac.in",
    "Other",
  ];
  const [requestText, setRequestText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const VERIFICATION_EMAIL = "sujaskhadria@gmail.com";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("Sending Verification....");
    const res = await fetch("/api/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestedTo:
          emailSuffix != "Other"
            ? email + "@" + emailSuffix
            : VERIFICATION_EMAIL,
        request:
          emailSuffix == "Other"
            ? "VERIFY! \nThis is requested to an other mail which is not yet verified - " +
              customSuffix +
              "\n" +
              requestText
            : requestText,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Verification request sent successfully!");
    } else {
      setError(data.message || "Failed to send verification request");
      setSuccess("");
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
          <div className="flex items-center mb-4 gap-2">
            <input
              type="text"
              name="text"
              placeholder="sujas"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border mb-4"
              required
            />
            {emailSuffix === "Other" ? (
              <input
                type="text"
                placeholder="Enter custom domain"
                value={customSuffix}
                onChange={(e) => setCustomSuffix(e.target.value)}
                className="p-2 border outline-none"
              />
            ) : (
              <select
                value={emailSuffix}
                onChange={(e) => setEmailSuffix(e.target.value)}
                className="p-2 bg-white outline-none"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>{`${d}`}</option>
                ))}
              </select>
            )}
          </div>

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
          <Link
            href={"/home"}
            className="text-blue-500 cursor-pointer"
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
