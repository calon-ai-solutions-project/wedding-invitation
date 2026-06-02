// Central place for all the wedding details so they're easy to update.
export const WEDDING = {
  // Bride version — bride listed first
  bride: {
    name: "Zarin Rahman",
    parents: "Daughter of MD Hafizur Rahman & Tania Rahman",
  },
  groom: {
    name: "Mahbubul Alom",
    parents: "Son of MD Abdur Rahman & Ruhela Akther",
  },
  // 16 July 2026, 5:30 PM London time → 16:30 UTC (BST = UTC+1)
  dateISO: "2026-07-16T16:30:00Z",
  dateDisplay: "Thursday, 16 July 2026",
  timeDisplay: "5:30 PM",
  rsvpBy: "1st July 2026",
  venue: {
    name: "Faringdon Grove",
    address: "1 Faringdon Ave, Romford RM3 8TD",
    mapsQuery: "Faringdon Grove, 1 Faringdon Ave, Romford RM3 8TD",
  },
  contacts: ["+44 7404 458109", "+44 7359 430528"],
  dressCode: "Formal / Modest Attire",
} as const;

export const TIMELINE = [
  { time: "5:30 PM", label: "Guest Arrival" },
  { time: "6:30 PM", label: "Groom Arrival" },
  { time: "7:00 PM", label: "Bride Arrival" },
  { time: "7:30 PM", label: "Nikah Ceremony on the Stage" },
  { time: "8:30 PM", label: "Food Served" },
  { time: "10:00 PM", label: "Cake and Celebration" },
  { time: "10:30 PM", label: "The End" },
];

export const EVENTS = [
  {
    title: "Nikah Ceremony",
    date: WEDDING.dateDisplay,
    time: "7:30 PM",
    venue: WEDDING.venue.name,
    address: WEDDING.venue.address,
    dressCode: WEDDING.dressCode,
  },
  {
    title: "Wedding Reception",
    date: WEDDING.dateDisplay,
    time: "5:30 PM onwards",
    venue: WEDDING.venue.name,
    address: WEDDING.venue.address,
    dressCode: WEDDING.dressCode,
  },
];

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  WEDDING.venue.mapsQuery,
)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  WEDDING.venue.mapsQuery,
)}&output=embed`;
