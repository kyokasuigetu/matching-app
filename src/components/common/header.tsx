'use client';

import Link from "next/link";
import { LayoutList, MessageSquare, UserSearch, User } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function Header() {
  const { isVisible } = useScrollDirection();

  return (
    <header
      className={`sticky top-0 bg-white border-b border-gray-200 transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <h1 className="text-3xl font-bold text-gray-900">LOGO</h1>

        {/* アイコン付きのメニュー */}
        <nav className="flex items-center space-x-6">
          <NavItem href="/timeline" label="タイムライン">
            <LayoutList className="h-6 w-6 text-gray-600 group-hover:text-primary" />
          </NavItem>
          <NavItem href="/matching" label="さがす">
            <UserSearch className="h-6 w-6 text-gray-600 group-hover:text-primary" />
          </NavItem>
          <NavItem href="/chat" label="メッセージ">
            <MessageSquare className="h-6 w-6 text-gray-600 group-hover:text-primary" />
          </NavItem>
          <NavItem href="/profile" label="マイページ">
            <User className="h-6 w-6 text-gray-600 group-hover:text-primary" />
          </NavItem>
        </nav>
      </div>
    </header>
  );
}

function NavItem ({ children, href, label }: {
  children: React.ReactNode;
  href:  string;
  label: string;
}) {
  return (
    <Link href={href} className="flex flex-col items-center group">
      <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
        {children}
      </div>
      <span className="text-xs text-gray-500 group-hover:text-primary hidden sm:block">
        {label}
      </span>
    </Link>
  );
}