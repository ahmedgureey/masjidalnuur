export type Donation = {
  id: string;
  name: string;
  amount: number; // USD
  createdAt: string; // ISO date
};

export type Campaign = {
  name: string;
  goal: number;
};

const now = Date.now();
const seedData: Donation[] = [
  { id: crypto.randomUUID(), name: "Ahmed", amount: 500, createdAt: new Date(now - 3 * 3600_000).toISOString() },
  { id: crypto.randomUUID(), name: "Fatima", amount: 200, createdAt: new Date(now - 2 * 3600_000).toISOString() },
  { id: crypto.randomUUID(), name: "Yusuf", amount: 1000, createdAt: new Date(now - 1 * 3600_000).toISOString() },
];

// Stored on globalThis so dev hot reload doesn't reset the data.
const globalForDb = globalThis as unknown as { donations?: Donation[] };
export const donations = (globalForDb.donations ??= seedData);

export const campaign: Campaign = { name: "Masjid Sadaqa", goal: 50000 };

export function addDonation(name: string, amount: number): Donation {
  const donation: Donation = {
    id: crypto.randomUUID(),
    name,
    amount,
    createdAt: new Date().toISOString(),
  };
  donations.push(donation);
  return donation;
}

/** Newest first (donations are appended in chronological order). */
export function listDonations(): Donation[] {
  return [...donations].reverse();
}

export function getSummary() {
  const cents = donations.reduce((sum, d) => sum + Math.round(d.amount * 100), 0);
  const raised = cents / 100;
  const percent = Math.min(100, Math.round((raised / campaign.goal) * 100));
  return { name: campaign.name, goal: campaign.goal, raised, percent };
}
