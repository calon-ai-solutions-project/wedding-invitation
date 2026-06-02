import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { Ornament } from "./Ornament";
import { submitRsvp } from "@/lib/rsvp.functions";
import { WEDDING } from "@/lib/wedding";

const ALLERGIES = [
  "Gluten-free / Celiac",
  "Lactose-free",
  "Vegetarian",
  "Vegan",
  "Nut allergy",
  "Seafood allergy",
];

const MAINS = ["Chicken", "Lamb", "Fish", "Vegetarian"];

export function RsvpForm() {
  const submit = useServerFn(submitRsvp);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          full_name: String(f.get("full_name") ?? ""),
          phone: String(f.get("phone") ?? ""),
          email: (String(f.get("email") ?? "").trim() || null) as string | null,
          attending: String(f.get("attending") ?? "yes") === "yes",
          guest_count: guests,
          food_allergies: f.getAll("food_allergies").map((v) => String(v)),
          other_allergies: (String(f.get("other_allergies") ?? "").trim() || null) as string | null,
          main_dish: (String(f.get("main_dish") ?? "").trim() || null) as string | null,
          song_request: (String(f.get("song_request") ?? "").trim() || null) as string | null,
          message: (String(f.get("message") ?? "").trim() || null) as string | null,
        },
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          Kindly respond
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">RSVP</h2>
        <p className="mt-2 font-serif italic text-sm text-muted-foreground">
          We hope to count on you
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Please reply by {WEDDING.rsvpBy}
        </p>
        <Ornament className="mt-4" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="embossed-card mt-10 rounded-xl p-8"
            >
              <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-gold" fill="currentColor" aria-hidden>
                <path d="M12 2 L14 9 L22 12 L14 15 L12 22 L10 15 L2 12 L10 9 Z" />
              </svg>
              <p className="mt-4 font-serif text-xl text-foreground">
                Thank you, your RSVP has been received.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We look forward to celebrating with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="embossed-card mt-10 space-y-5 rounded-xl p-6 text-left"
            >
              <Field label="Full Name *" name="full_name" placeholder="Your name" required maxLength={120} />
              <Field label="Phone Number *" name="phone" type="tel" placeholder="+44 470 123 456" required maxLength={40} />
              <Field label="Email" name="email" type="email" placeholder="your@email.com" maxLength={160} />

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Will you attend? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Radio name="attending" value="yes" label="Yes, I will attend" defaultChecked />
                  <Radio name="attending" value="no" label="No, I can't attend" />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Number of guests (including yourself)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="h-10 w-10 rounded-full border border-gold/50 bg-background text-lg text-gold-dark hover:bg-gradient-gold hover:text-white"
                    aria-label="Decrease"
                  >−</button>
                  <span className="min-w-[2ch] text-center font-serif text-xl text-foreground">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(15, g + 1))}
                    className="h-10 w-10 rounded-full border border-gold/50 bg-background text-lg text-gold-dark hover:bg-gradient-gold hover:text-white"
                    aria-label="Increase"
                  >+</button>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Food allergies and intolerances
                </label>
                <p className="mb-2 text-xs text-muted-foreground">
                  It is important for us to know any dietary restrictions. Select all that apply:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {ALLERGIES.map((a) => (
                    <Check key={a} name="food_allergies" value={a} label={a} />
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Other allergies or restrictions
                </label>
                <input
                  name="other_allergies"
                  maxLength={400}
                  placeholder="E.g. egg allergy, fructose intolerance…"
                  className="w-full rounded-md border border-gold/40 bg-background px-3 py-2 font-serif text-base text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Main dish preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MAINS.map((m) => (
                    <Radio key={m} name="main_dish" value={m} label={m} />
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  🎵 Song request for the party
                </label>
                <input
                  name="song_request"
                  maxLength={160}
                  placeholder='E.g. "Dancing Queen" by ABBA'
                  className="w-full rounded-md border border-gold/40 bg-background px-3 py-2 font-serif text-base text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
                  Message for the couple (optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  maxLength={800}
                  placeholder="Write us a few words…"
                  className="w-full rounded-md border border-gold/40 bg-background px-3 py-2 font-serif text-base text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-gold px-6 py-3 font-display text-xs uppercase tracking-[0.3em] text-white shadow-gold transition hover:scale-[1.01] disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send RSVP"}
              </button>

              <div className="pt-3 text-center text-xs text-muted-foreground">
                Or contact us directly:
                <div className="mt-1 space-x-2 font-serif text-sm text-foreground">
                  {WEDDING.contacts.map((c) => (
                    <a key={c} href={`tel:${c.replace(/\s+/g, "")}`} className="hover:text-gold-dark">
                      {c}
                    </a>
                  ))}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-display text-[11px] uppercase tracking-[0.25em] text-gold-dark">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-md border border-gold/40 bg-background px-3 py-2 font-serif text-base text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
    </div>
  );
}

function Radio({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-center rounded-md border border-gold/40 bg-background px-3 py-3 text-center font-serif text-sm text-foreground transition has-[:checked]:bg-gradient-gold has-[:checked]:text-white has-[:checked]:shadow-gold">
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} className="sr-only" />
      {label}
    </label>
  );
}

function Check({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md border border-gold/40 bg-background px-3 py-2 font-serif text-sm text-foreground transition has-[:checked]:bg-gradient-gold has-[:checked]:text-white has-[:checked]:shadow-gold">
      <input type="checkbox" name={name} value={value} className="h-4 w-4 accent-gold" />
      <span>{label}</span>
    </label>
  );
}
