"use client";

import { useState, type FormEvent } from "react";
import { needOptions } from "@/data/process";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<Status>("idle");
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const dark = variant === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formId) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass = dark
    ? "v2-input"
    : "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-aqua";
  const labelClass = dark
    ? "mb-2 block text-sm font-medium text-white/70"
    : "mb-2 block text-sm font-medium";

  if (status === "success") {
    return (
      <div
        className={
          dark
            ? "rounded-2xl border border-aqua/40 bg-[#141414] p-8 md:p-10"
            : "rounded-2xl border border-aqua/40 bg-surface p-8 md:p-10"
        }
      >
        <h3
          className={`font-display text-2xl font-semibold tracking-tight ${
            dark ? "text-[#f2f0eb]" : ""
          }`}
        >
          Got it — thank you.
        </h3>
        <p className={`mt-3 ${dark ? "text-white/60" : "text-ink-soft"}`}>
          I’ll take a look and get back to you soon. In the meantime, you can
          always reach me at{" "}
          <a href="mailto:nancy@buselworks.com" className="text-aqua underline underline-offset-3">
            nancy@buselworks.com
          </a>
          .
        </p>
        <button
          type="button"
          className={dark ? "v2-btn-ghost mt-6" : "btn-secondary mt-6"}
          onClick={() => setStatus("idle")}
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required fieldClass={fieldClass} labelClass={labelClass} />
        <Field label="Email" name="email" type="email" required fieldClass={fieldClass} labelClass={labelClass} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company / Organization" name="company" fieldClass={fieldClass} labelClass={labelClass} />
        <Field label="Current Website" name="website" fieldClass={fieldClass} labelClass={labelClass} />
      </div>
      <div>
        <label className={labelClass} htmlFor="need">
          I need
        </label>
        <select
          id="need"
          name="need"
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select one…
          </option>
          {needOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="message">
          What are you thinking about building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {!formId && (
        <p
          className={
            dark
              ? "rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
              : "rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          }
        >
          Formspree isn’t configured yet. Add{" "}
          <code className="font-mono-label">NEXT_PUBLIC_FORMSPREE_ID</code> to
          your environment, or email{" "}
          <a href="mailto:nancy@buselworks.com" className="underline">
            nancy@buselworks.com
          </a>{" "}
          directly.
        </p>
      )}

      {status === "error" && (
        <p className={`text-sm ${dark ? "text-red-300" : "text-red-700"}`}>
          Something went wrong. Please try again or email{" "}
          <a href="mailto:nancy@buselworks.com" className="underline">
            nancy@buselworks.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        className={`${dark ? "v2-btn" : "btn-primary"} disabled:opacity-60`}
        disabled={status === "submitting" || !formId}
      >
        {status === "submitting" ? "Sending…" : "Send It →"}
      </button>

      <p className={`text-xs ${dark ? "text-white/35" : "text-muted"}`}>
        Your message is sent securely via Formspree and delivered to us. We only
        use it to respond to your inquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  fieldClass,
  labelClass,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  fieldClass: string;
  labelClass: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={fieldClass}
      />
    </div>
  );
}
