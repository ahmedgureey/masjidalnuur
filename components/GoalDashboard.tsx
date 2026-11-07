import Link from "next/link";
import { formatUSD } from "@/lib/format";

type Props = {
  name: string;
  goal: number;
  raised: number;
  percent: number;
  donors: number;
};

export default function GoalDashboard({ name, goal, raised, percent, donors }: Props) {
  const remaining = Math.max(0, goal - raised);
  const reached = raised >= goal;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-light via-navy to-[#071427] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-8">
      <div aria-hidden className="star-pattern pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-accent/25 blur-3xl"
      />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-accent opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-accent" />
          </span>
          Live campaign
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{name}</h1>

        <p className="mt-6 text-5xl font-extrabold tabular-nums tracking-tight text-white sm:text-6xl">
          {formatUSD(raised)}
        </p>
        <p className="mt-1 text-sm text-white/70">
          raised of <span className="font-semibold text-white">{formatUSD(goal)}</span> goal
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-amber-accent">{percent}% funded</span>
            <span className="text-white/70">
              {reached ? "Goal reached, alhamdulillah" : `${formatUSD(remaining)} to go`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={`${name} fundraising progress`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative h-4 w-full rounded-full bg-white/10 ring-1 ring-inset ring-white/20"
          >
            <div
              className="progress-fill relative h-full overflow-hidden rounded-full bg-gradient-to-r from-amber-300 to-amber-accent shadow-[0_0_22px_rgba(255,191,36,0.6)]"
              style={{
                ["--w" as string]: `${Math.min(100, percent)}%`,
                minWidth: percent > 0 ? 14 : 0,
              }}
            >
              <span
                aria-hidden
                className="progress-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <Stat label="Goal" value={formatUSD(goal)} />
          <Stat label="Remaining" value={formatUSD(remaining)} />
          <Stat label="Donors" value={String(donors)} />
        </dl>

        <Link
          href="/donate"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-accent px-5 py-4 text-base font-bold text-navy shadow-[0_14px_34px_-12px_rgba(255,191,36,0.8)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2 0 3.3 1 4.2 2.3h3.6C14.7 6 16 5 18 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z" />
          </svg>
          Donate Now
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
      <dt className="text-[11px] font-medium uppercase tracking-wider text-white/65">{label}</dt>
      <dd className="mt-1 text-[15px] font-bold tabular-nums text-white sm:text-lg">{value}</dd>
    </div>
  );
}
