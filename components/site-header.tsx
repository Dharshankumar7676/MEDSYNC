"use client";

import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ThemeProvider } from "./theme-provider";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-divider)] bg-[var(--color-surface)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-screen-xl flex items-center h-16 px-4">
        <Link href="/" className="neon-underline font-heading text-xl font-semibold tracking-wide text-white">
          MedSync
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block w-56">
            <Input placeholder="Search..." className="rounded-xl bg-[#0F0F0F]" />
          </div>
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="/register">Get Started</Link>
          </Button>
          <Avatar className="size-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
