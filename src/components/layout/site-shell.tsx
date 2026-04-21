import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="engineering-surface flex-1">{children}</main>
      <Footer />
    </>
  );
}
