import Link from "next/link";

export default function App() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298] overflow-hidden">
      {/* Background SVG Wave */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="url(#grad1)"
          fillOpacity="1"
          d="M0,192L60,192C120,192,240,192,360,165.3C480,139,600,85,720,74.7C840,64,960,96,1080,138.7C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
        <defs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#FF3CAC", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#784BA0", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2B86C5", stopOpacity: 1 }}
            />
          </radialGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="text-center text-white z-10 px-4 md:px-10">
        <h1 className="text-3xl md:text-7xl font-bold">
          Get Your Work Verified
        </h1>
        <p className="mt-4 text-sm md:text-xl opacity-80">
          Gain the acknowledgement you deserve and stand out from the rest.
        </p>
        <Link
          href={"/home"}
          className="mt-6 inline-block px-3 md:px-6 py-2 md:py-3 bg-white text-[#1e3c72] font-semibold text-lg rounded-full shadow-lg hover:scale-105 transition transform duration-300"
        >
          Get Verified
        </Link>
      </div>
    </div>
  );
}
