"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

import {
  BriefcaseBusiness,
  LogOut,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <MobileSidebar />

          <Link
            href="/dashboard"
            className="flex items-center gap-2"
          >
            <BriefcaseBusiness className="h-7 w-7 text-blue-600" />

            <span className="text-xl font-bold">
              JobTracker
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/applications">Applications</Link>
          <Link href="/dashboard/applications/new">New Applications</Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full p-0"
            >
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48"
          >
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}