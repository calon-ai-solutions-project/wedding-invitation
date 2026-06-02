import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { Ornament } from "./Ornament";
import { submitWish, listWishes } from "@/lib/wishes.functions";

type Wish = {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
};

export function Wishes() {
  const submit = useServerFn(submitWish);
  const list = useServerFn(listWishes);

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await list();
      setWishes(res.wishes as Wish[]);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) {
      setError("Please add your name and a short message.");
      return;
    }
    setSending(true);
    try {
      await submit({ data: { guest_name: n, message: m } });
      setDone(true);
      setName("");
      setMessage("");
      await refresh();
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="wishes" className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-xl text-center"
      >
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          Guestbook
        </p>
        <h2 className="mt-2 font-serif text-3xl italic text-gold-dark">
          Wishes &amp; Duas
        </h2>
        <Ornament className="mt-4" />
        <p className="mt-4 font-serif text-sm text-muted-foreground">
          Leave a blessing for Zarin and Mahbub — it will appear on this page for everyone to see.
        </p>
      </motion.div>

      <form
        onSubmit={onSubmit}
        className="embossed-card mx-auto mt-8 max-w-xl space-y-3 rounded-2xl p-5"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={80}
          className="w-full rounded-lg border border-gold/30 bg-background/60 px-4 py-2 font-serif text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your wish or dua for Zarin & Mahbubul…"
          rows={3}
          maxLength={500}
          className="w-full resize-none rounded-lg border border-gold/30 bg-background/60 px-4 py-2 font-serif text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
        />
        {error && (
          <p className="text-center font-serif text-xs text-destructive">{error}</p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full border border-gold/60 bg-gradient-gold px-6 py-3 font-display text-xs uppercase tracking-[0.3em] text-white shadow-emboss transition disabled:opacity-60"
        >
          {sending ? "Sending…" : done ? "Thank you ✨" : "Send Your Wish"}
        </button>
      </form>

      <div className="mx-auto mt-8 max-w-xl space-y-3">
        <AnimatePresence initial={false}>
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="embossed-card rounded-xl p-4"
            >
              <p className="font-serif text-sm italic text-foreground/90">
                “{w.message}”
              </p>
              <p className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-bronze">
                — {w.guest_name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        {wishes.length === 0 && (
          <p className="text-center font-serif text-xs italic text-muted-foreground">
            Be the first to share a wish.
          </p>
        )}
      </div>
    </section>
  );
}
