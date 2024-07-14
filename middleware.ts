import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        const session = await getSession();

        if (session) return NextResponse.redirect(new URL("/home", request.url));
    }
}
