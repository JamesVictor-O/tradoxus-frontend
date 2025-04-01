"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`${
        pathname.startsWith("/admin/") || pathname === "/admin" ? "hidden" : ""
      } py-8 border-t border-gray-800`}
    >
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© 2025 Tradoxus. All rights reserved.</p>
      </div>
    </footer>
  );
}
