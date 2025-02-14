import type { Metadata } from "next";
import { ReactNode } from "react";
import "./../globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "Todo app",
    description: "Todo app built with Next.js",
}

const Layout = async ({ children }: { children: ReactNode }) => {    
    return (
        <html>
            <body className="bg-amber-100 p-5">
                <SessionProvider>
                    { children }
                </SessionProvider>
            </body>
        </html>
    );
}

export default Layout;