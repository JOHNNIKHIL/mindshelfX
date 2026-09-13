import "./globals.css";
import "./visual-polish.css";
import "./reading-features.css";
import ThemeInitializer from "@/components/ui/ThemeInitializer";

export const metadata = {
  title: "MindShelf",
  description: "Your personal digital library.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
