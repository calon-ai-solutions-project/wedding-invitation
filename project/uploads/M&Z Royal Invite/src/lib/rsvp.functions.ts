import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const rsvpSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(160).optional().nullable(),
  attending: z.boolean(),
  guest_count: z.number().int().min(1).max(15),
  food_allergies: z.array(z.string().min(1).max(60)).max(20).optional().nullable(),
  other_allergies: z.string().trim().max(400).optional().nullable(),
  main_dish: z.string().trim().max(60).optional().nullable(),
  song_request: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().max(800).optional().nullable(),
});

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((input) => rsvpSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("rsvps").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email ?? null,
      attending: data.attending,
      guest_count: data.guest_count,
      food_allergies: data.food_allergies ?? [],
      other_allergies: data.other_allergies ?? null,
      main_dish: data.main_dish ?? null,
      song_request: data.song_request ?? null,
      message: data.message ?? null,
    });
    if (error) {
      console.error("RSVP insert failed:", error);
      throw new Error("Could not save RSVP. Please try again.");
    }
    return { ok: true as const };
  });

export const listRsvps = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { rsvps: data ?? [] };
  });
