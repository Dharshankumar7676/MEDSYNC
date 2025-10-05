"use client";

import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ThemeProvider } from "./theme-provider";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function SiteHeader() {
  return (
    <header className="header shadow-neon flex items-center justify-between px-8 py-4 sticky top-0 z-50">
      <div className="header-logo neon-underline font-heading text-2xl font-bold tracking-wide">
        <Link href="/">
          <span>MedSync</span>
        </Link>
      </div>
      <div className="header-search flex-1 mx-8">
        <Input placeholder="Search..." className="rounded-xl" />
      </div>
      <div className="header-theme-toggle mr-6">
        <ThemeProvider attribute="class">
          {/* Theme toggle button can be added here */}
        </ThemeProvider>
      </div>
      <div className="header-avatar">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
