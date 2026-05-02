import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { ScrollToTop } from "./ScrollToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="engineering-surface flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
