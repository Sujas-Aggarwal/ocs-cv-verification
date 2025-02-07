"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = (await res.json()) ?? {
      message: "Some Internal Error occured",
    };
    console.log(data);
    if (res.ok) {
      router.push("/home");
    } else {
      setError(data.message || "SignUp failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">SignUp</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          {error && (
            <p className="text-red-500 text-sm text-center my-2 ">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            SignUp
          </button>
        </form>
        <p className="mt-4 text-center">
          Already Have an Account?{" "}
          <Link href={"/auth/login"} className="text-blue-500 cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
