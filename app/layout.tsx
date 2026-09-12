import "./globals.css";

export const metadata = {
  title: "MindShelf",
  description: "Your personal reading space.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
