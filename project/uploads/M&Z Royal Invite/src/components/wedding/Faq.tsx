import { Ornament } from "./Ornament";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Can I bring my children?",
    a: "Yes, children are welcome. Please include them in your RSVP guest number so we can plan properly.",
  },
  {
    q: "What is the full venue address?",
    a: "Faringdon Grove, 1 Faringdon Ave, Romford RM3 8TD.",
  },
  {
    q: "What time should I arrive?",
    a: "Guest arrival starts from 5:30 PM. Please try to arrive on time so you do not miss the main moments.",
  },
  {
    q: "What time will the groom arrive?",
    a: "The groom arrival is planned for 6:30 PM.",
  },
  {
    q: "What time will the bride arrive?",
    a: "The bride arrival is planned for 7:00 PM.",
  },
  {
    q: "What time is the Nikah?",
    a: "The Nikah ceremony will take place on the stage at 7:30 PM.",
  },
  {
    q: "When will food be served?",
    a: "Food will be served at 8:30 PM.",
  },
  {
    q: "Can I bring a plus one?",
    a: "Please only bring guests included in your RSVP, so we can manage seating and food numbers correctly.",
  },
  {
    q: "Is there a gift registry?",
    a: "There is no gift registry. No boxed gifts, please. Your duas and presence mean the most to us.",
  },
];

export function Faq() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">Good to Know</p>
        <h2 className="mt-2 font-serif text-4xl italic text-gold-dark">FAQ</h2>
        <Ornament className="mt-5" />

        <Accordion type="single" collapsible className="mt-8 text-left">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="my-3 overflow-hidden rounded-xl border border-gold/30 bg-card/60 px-4"
            >
              <AccordionTrigger className="font-serif text-base text-gold-dark hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="font-serif text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
