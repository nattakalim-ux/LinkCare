import { NextResponse } from "next/server";
import { db } from "@/server/db";
import type { Session } from "@/lib/types";

export async function GET(request: Request) {
  const patientId = new URL(request.url).searchParams.get("patientId") ?? "";
  return NextResponse.json(db.getSessions(patientId));
}

export async function POST(request: Request) {
  const body = (await request.json()) as Session;
  const created = db.addSession(body);
  return NextResponse.json(created, { status: 201 });
}
