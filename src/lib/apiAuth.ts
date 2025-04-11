import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function apiAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  return session;
}
