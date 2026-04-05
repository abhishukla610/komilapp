import { NextResponse } from "next/server";
import { fetchAllBulletins } from "@/lib/bulletin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const items = await fetchAllBulletins();
    return NextResponse.json(
      { items, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { items: [], updatedAt: new Date().toISOString(), error: "Failed to fetch bulletins" },
      { status: 500 }
    );
  }
}
