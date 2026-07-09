import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const patient = db.getPatient(id);
  if (!patient) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(patient);
}
