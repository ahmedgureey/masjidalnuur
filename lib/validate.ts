export const MAX_NAME_LENGTH = 60;
export const MAX_AMOUNT = 1_000_000;

export type ValidationResult =
  | { ok: true; name: string; amount: number }
  | { ok: false; field: "name" | "amount" | "body"; error: string };

export function validateDonation(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, field: "body", error: "Invalid request body." };
  }
  const { name, amount } = input as { name?: unknown; amount?: unknown };

  if (typeof name !== "string" || name.trim().length === 0) {
    return { ok: false, field: "name", error: "Name is required." };
  }
  const cleanName = name.trim();
  if (cleanName.length > MAX_NAME_LENGTH) {
    return {
      ok: false,
      field: "name",
      error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.`,
    };
  }

  const num =
    typeof amount === "number"
      ? amount
      : typeof amount === "string" && amount.trim() !== ""
        ? Number(amount)
        : NaN;
  if (!Number.isFinite(num)) {
    return { ok: false, field: "amount", error: "Amount must be a number." };
  }
  if (num <= 0) {
    return { ok: false, field: "amount", error: "Amount must be greater than 0." };
  }
  if (num > MAX_AMOUNT) {
    return {
      ok: false,
      field: "amount",
      error: "Amount cannot exceed $1,000,000.",
    };
  }
  if (Math.abs(Math.round(num * 100) - num * 100) > 1e-6) {
    return {
      ok: false,
      field: "amount",
      error: "Amount can have at most 2 decimal places.",
    };
  }

  return { ok: true, name: cleanName, amount: Math.round(num * 100) / 100 };
}
