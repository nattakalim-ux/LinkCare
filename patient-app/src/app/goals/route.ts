import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(request: Request) {
  const patientId = new URL(request.url).searchParams.get("patientId") ?? "";
  return NextResponse.json(db.getGoals(patientId));
}
