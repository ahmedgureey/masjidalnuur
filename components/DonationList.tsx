"use client";

import { useState } from "react";
import { formatUSD, initial } from "@/lib/format";

export type DonationItem = {
  id: string;
  name: string;
  amount: number;
  when: string;
};

const DEFAULT_LIMIT = 10;

export default function DonationList({ donations }: { donations: DonationItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? donations : donations.slice(0, DEFAULT_LIMIT);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-white">Recent donations</h2>
        {donations.length > 0 && (
          <span className="text-sm text-white/65">{donations.length} total</span>
        )}
      </div>

      {donations.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-white/20 px-4 py-8 text-center text-white/75">
          No donations yet. Be the first.
        </p>
      ) : (
        <>
          <ul className="mt-2 divide-y divide-white/10">
            {visible.map((d, i) => (
              <li key={d.id} className="flex items-center gap-3 py-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-accent text-base font-extrabold text-navy"
                >
                  {initial(d.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2">
                    <span className="truncate font-semibold text-white">{d.name}</span>
                    {i === 0 && (
                      <span className="shrink-0 rounded-full bg-amber-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-accent">
                        Latest
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-white/65">{d.when}</p>
                </div>
                <span className="shrink-0 text-base font-bold tabular-nums text-amber-accent">
                  {formatUSD(d.amount)}
                </span>
              </li>
            ))}
          </ul>
          {donations.length > DEFAULT_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-amber-accent transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent"
            >
              {showAll ? "Show less" : `Show all (${donations.length})`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
