import { NextResponse } from "next/server";
import { addDonation, listDonations } from "@/lib/db";
import { validateDonation } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ donations: listDonations() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateDonation(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
  }

  const donation = addDonation(result.name, result.amount);
  return NextResponse.json(donation, { status: 201 });
}
