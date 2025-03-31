"use client";

import { Button } from "@/components/ui/button";

export function LineAuthButton() {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B74E] text-white border-[#06C755]"
    >
      <LineIcon className="h-5 w-5" />
      <span>LINEでログイン</span>
    </Button>
  );
}

function LineIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M19.365 9.89c.50 0 .91.41.91.91s-.41.91-.91.91H17.39v1.7h1.98c.5 0 .91.41.91.91s-.41.91-.91.91h-2.89c-.5 0-.91-.41-.91-.91V9.89c0-.5.41-.91.91-.91h2.89zm-5.73 0c.5 0 .91.41.91.91v3.64c0 .5-.41.91-.91.91s-.91-.41-.91-.91V10.8c0-.5.41-.91.91-.91zm-2.45 5.73h2.88c.5 0 .91.41.91.91s-.41.91-.91.91H9.27c-.5 0-.91-.41-.91-.91V9.89c0-.5.41-.91.91-.91s.91.41.91.91v4.82zm-5.72-4.82c.5 0 .91.41.91.91v3.64c0 .5-.41.91-.91.91s-.91-.41-.91-.91V10.8c0-.5.41-.91.91-.91zM24 10.8c0-5.66-5.79-10.27-12.89-10.27S-1.77 5.14-1.77 10.8c0 5.08 4.5 9.33 10.59 10.13.41.09.97.28 1.11.64.13.33.08.84.04 1.17 0 0-.15 1.13-.18 1.38-.06.36-.28 1.45 1.25.79 1.53-.66 8.24-4.85 11.25-8.3 2.08-2.28 3.71-4.61 3.71-7.61z" />
    </svg>
  );
}
