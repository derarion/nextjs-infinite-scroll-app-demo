"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/app/_components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function ModalOverlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 z-[60] rounded-full text-white hover:bg-white/10"
        onClick={handleClose}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <DialogContent
        className="max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Product Details</DialogTitle>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
