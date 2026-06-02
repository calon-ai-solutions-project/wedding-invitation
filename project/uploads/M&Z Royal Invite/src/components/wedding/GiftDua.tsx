import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import { Divider } from "./Ornament";

type Side = "bride" | null;

const ACCOUNTS = {
  bride: {
    name: "Bride's Family",
    bank: "TBD - Bank Name",
    accountName: "TBD - Account Holder",
    accountNumber: "TBD - Account Number",
  },
};

export function GiftDua() {
  const [side, setSide] = useState<Side>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const account = side ? ACCOUNTS[side] : null;

  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-xl text-center"
      >
        <Divider />
        <div className="flex justify-center mb-4">
          <Gift className="h-8 w-8 text-bronze" strokeWidth={1.2} />
        </div>
        <h2 className="font-serif text-3xl text-foreground mb-4">Gift List</h2>
        <p className="font-display text-sm uppercase tracking-[0.25em] text-gold-dark font-bold">
          No Boxed Gifts, Please
        </p>
        <p className="mt-4 font-serif text-base italic leading-relaxed text-foreground/85">
          Your presence and duas mean the most to us. If you would like to bless
          the bride, you can send your contribution directly using the bank
          details below, or you are welcome to bring an envelope on the day.
        </p>

        <div className="mt-8">
          <button
            onClick={() => setSide(side === "bride" ? null : "bride")}
            className={`w-full rounded-2xl border px-4 py-4 font-display text-[11px] uppercase tracking-[0.25em] transition-all duration-300 transform-gpu hover:-translate-y-1 active:translate-y-0 ${
              side === "bride"
                ? "border-bronze bg-gradient-gold text-white shadow-gold [transform:rotateX(-4deg)_translateY(-2px)]"
                : "border-bronze/40 text-bronze bg-card/40 hover:bg-bronze/10 shadow-emboss"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            Show Bride's Bank Details
          </button>
        </div>

        <AnimatePresence mode="wait">
          {account && (
            <motion.div
              key={side}
              initial={{ opacity: 0, rotateX: -25, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 25, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-2xl border border-bronze/40 bg-gradient-to-br from-card to-background p-6 text-left shadow-3d"
              style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
            >
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-bronze">
                {account.name}
              </p>
              <div className="mt-4 space-y-3 font-serif text-sm">
                <div>
                  <p className="text-foreground/60 text-xs">Bank</p>
                  <p className="text-foreground">{account.bank}</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-xs">Account Name</p>
                  <p className="text-foreground">{account.accountName}</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-xs">Account Number</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-foreground">{account.accountNumber}</p>
                    <button
                      onClick={() => handleCopy(account.accountNumber)}
                      className="rounded-full border border-bronze/40 p-2 text-bronze hover:bg-bronze/10 transition"
                      aria-label="Copy account number"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 font-display text-[11px] uppercase tracking-[0.3em] text-bronze">
          Send us your duas
        </p>
        <Divider />
      </motion.div>
    </section>
  );
}
