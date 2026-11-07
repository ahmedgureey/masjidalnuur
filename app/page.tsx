import GoalDashboard from "@/components/GoalDashboard";
import DonationList from "@/components/DonationList";
import { getSummary, listDonations } from "@/lib/db";
import { timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function Home() {
  const summary = getSummary();
  const all = listDonations();
  const now = Date.now();
  const items = all.map((d) => ({
    id: d.id,
    name: d.name,
    amount: d.amount,
    when: timeAgo(d.createdAt, now),
  }));

  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-col gap-5 px-4 py-6 sm:py-10">
      <GoalDashboard {...summary} donors={all.length} />
      <DonationList donations={items} />
    </main>
  );
}
