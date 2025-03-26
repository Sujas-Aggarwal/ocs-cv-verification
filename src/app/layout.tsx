import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>{children}
        <div className=" w-full h-[40px] bg-white text-center md:text-sm text-xs flex justify-center items-center">
          Designed and Developed by&nbsp; <a className="text-blue-800 font-bold" href="https://www.github.com/Sujas-Aggarwal">@Sujas-Aggarwal</a>
        </div>
      </body>
    </html>
  );
}
