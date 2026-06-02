ALTER TABLE public.rsvps
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS food_allergies text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS other_allergies text,
  ADD COLUMN IF NOT EXISTS main_dish text,
  ADD COLUMN IF NOT EXISTS song_request text;