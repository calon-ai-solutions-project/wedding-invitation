
CREATE TABLE public.wishes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wishes"
  ON public.wishes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can post a wish"
  ON public.wishes FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(guest_name)) BETWEEN 1 AND 80
    AND length(trim(message)) BETWEEN 1 AND 500
  );

CREATE INDEX idx_wishes_created_at ON public.wishes (created_at DESC);
