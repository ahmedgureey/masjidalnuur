import type { Metadata } from "next";
import Link from "next/link";
import DonationForm from "@/components/DonationForm";
import { getSummary } from "@/lib/db";
import { formatUSD } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate | Masjid Sadaqa",
};

export default function DonatePage() {
  const { name, goal, raised, percent } = getSummary();

  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-col gap-6 px-4 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-lg text-sm font-medium text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
      >
        <span aria-hidden>←</span> Back to dashboard
      </Link>

      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-accent">{name}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Make a donation
        </h1>
        <p className="mt-2 text-white/75">
          {formatUSD(raised)} raised of {formatUSD(goal)} · {percent}% funded. Every contribution
          brings us closer.
        </p>
      </header>

      <DonationForm />
    </main>
  );
}
