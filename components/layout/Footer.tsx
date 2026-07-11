"use client"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">

                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} JobTracker.
                    All rights reserved.
                </p>

                <div className="flex gap-6 text-sm">
                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/privacy">
                        Privacy
                    </Link>

                    <Link href="/terms">
                        Terms
                    </Link>

                    <Link href="/contact">
                        Contact
                    </Link>
                </div>

            </div>
        </footer>
    );
}