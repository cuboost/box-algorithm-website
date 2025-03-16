import "./globals.css";

export const metadata = {
  title: "Algorithme - MATh.en.JEANS",
  description: "The creation of the world...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` h-screen w-full`}>
        <main className="h-full w-full overflow-y-scroll p-10">{children}</main>
      </body>
    </html>
  );
}
