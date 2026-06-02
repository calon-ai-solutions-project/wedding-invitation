import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const wishSchema = z.object({
  guest_name: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(500),
});

export const submitWish = createServerFn({ method: "POST" })
  .inputValidator((input) => wishSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("wishes").insert({
      guest_name: data.guest_name,
      message: data.message,
    });
    if (error) {
      console.error("Wish insert failed:", error);
      throw new Error("Could not post your wish. Please try again.");
    }
    return { ok: true as const };
  });

export const listWishes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("wishes")
    .select("id, guest_name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return { wishes: data ?? [] };
});
