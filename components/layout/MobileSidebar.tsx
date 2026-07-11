"use client";

import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Menu,
    LayoutDashboard,
    Briefcase,
    BarChart3,
    Settings,
} from "lucide-react";

const links = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Applications",
        href: "/dashboard/applications",
        icon: Briefcase,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
            </SheetTrigger>

            <SheetContent side="left">
                <div className="mt-8 flex flex-col gap-6">
                    {links.map((link) => {
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 text-lg"
                            >
                                <Icon className="h-5 w-5" />

                                {link.title}
                            </Link>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
}