"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/app/_components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function ModalOverlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position when pathname changes (different product)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [pathname]);

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
        ref={contentRef}
        className="h-[85vh] !top-auto !bottom-0 !translate-y-0 rounded-t-xl rounded-b-none sm:h-auto sm:!top-[50%] sm:!bottom-auto sm:!translate-y-[-50%] sm:rounded-lg max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>View product information and details</DialogDescription>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
