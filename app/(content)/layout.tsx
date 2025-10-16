import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";

export default function ContentLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      {modal}
      <Footer />
    </>
  );
}
