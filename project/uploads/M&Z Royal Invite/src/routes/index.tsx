import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { IntroLoader } from "@/components/wedding/IntroLoader";
import { Hero } from "@/components/wedding/Hero";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { EventCards } from "@/components/wedding/EventCards";
import { VenueMap } from "@/components/wedding/VenueMap";
import { Timeline } from "@/components/wedding/Timeline";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { Gallery } from "@/components/wedding/Gallery";
import { GiftDua } from "@/components/wedding/GiftDua";
import { Closing } from "@/components/wedding/Closing";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { Wishes } from "@/components/wedding/Wishes";
import { Schedule } from "@/components/wedding/Schedule";
import { DressCode } from "@/components/wedding/DressCode";
import { Accommodation } from "@/components/wedding/Accommodation";
import { Faq } from "@/components/wedding/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zarin & Mahbub · Wedding Invitation · 16 July 2026" },
      {
        name: "description",
        content:
          "With joy and gratitude, the family of the bride invites you to celebrate the wedding of Zarin Rahman & Mahbubul Alom on 16 July 2026 at Faringdon Grove, Romford.",
      },
      { property: "og:title", content: "Zarin & Mahbub · Wedding Invitation" },
      {
        property: "og:description",
        content: "Join us as Zarin and Mahbub begin their new journey together — 16 July 2026.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap",
      },
    ],
  }),
  component: InvitePage,
});

function InvitePage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-2xl overflow-x-hidden">
      {!opened && <IntroLoader onOpen={() => setOpened(true)} />}
      {opened && <MusicToggle />}

      <Hero />
      <Couple />
      <Countdown />
      <EventCards />
      <VenueMap />
      <Schedule />
      <Timeline />
      <DressCode />
      <Accommodation />
      <RsvpForm />
      <Gallery />
      <GiftDua />
      <Faq />
      <Wishes />
      <Closing />
    </main>
  );
}
