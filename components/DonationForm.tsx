"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Errors = { name?: string; amount?: string; form?: string };

export default function DonationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data.error ?? "Something went wrong.";
        if (data.field === "name") setErrors({ name: message });
        else if (data.field === "amount") setErrors({ amount: message });
        else setErrors({ form: message });
        return;
      }
      setName("");
      setAmount("");
      setSuccess(true);
      router.refresh();
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-navy placeholder:text-navy-light/60 focus:outline-none focus:ring-2 focus:ring-amber-accent ${
      hasError ? "border-[#DC2626]" : "border-navy-light/30"
    }`;

  return (
    <section className="rounded-3xl border border-white/10 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-8">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            autoComplete="off"
            placeholder="e.g. Ahmed"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm font-medium text-[#DC2626]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-navy">
            Amount (USD)
          </label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 mt-[3px] -translate-y-1/2 font-semibold text-navy-light"
            >
              $
            </span>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? "amount-error" : undefined}
              className={`${inputClass(!!errors.amount)} pl-8 font-mono text-lg`}
            />
          </div>
          {errors.amount && (
            <p id="amount-error" className="mt-1.5 text-sm font-medium text-[#DC2626]">
              {errors.amount}
            </p>
          )}
        </div>

        {errors.form && <p className="text-sm font-medium text-[#DC2626]">{errors.form}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-amber-accent px-5 py-4 text-base font-bold text-navy shadow-[0_14px_34px_-14px_rgba(255,191,36,0.9)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-navy/40 disabled:translate-y-0 disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Donate Now"}
        </button>

        <div role="status" aria-live="polite">
          {success && (
            <p className="rounded-xl border border-amber-accent/60 bg-amber-accent/20 px-4 py-3 text-sm font-medium text-navy">
              JazakAllahu khayran! Your donation was recorded.{" "}
              <Link href="/" className="font-bold underline underline-offset-2">
                View dashboard
              </Link>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
