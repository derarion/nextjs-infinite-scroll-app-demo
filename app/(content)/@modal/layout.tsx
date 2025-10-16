import { ModalOverlay } from "./_components/modal-overlay";

export default function ModalLayout({ children }: { children: React.ReactNode }) {
  return <ModalOverlay>{children}</ModalOverlay>;
}
