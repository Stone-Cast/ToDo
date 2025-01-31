import type { Metadata } from "next";
import { ReactNode } from "react";
import "./../globals.css";

export const metadata: Metadata = {
    title: "Todo app",
    description: "Todo app built with Next.js",
}

const Layout = ({ children }: { children: ReactNode }) => {
    
    return (
        <html>
            <body className="bg-amber-100 p-5">
                    { children }
            </body>
        </html>
    );
}

export default Layout;