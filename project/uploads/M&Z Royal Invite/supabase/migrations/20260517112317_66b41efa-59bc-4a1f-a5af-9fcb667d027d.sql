
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guest_count INT NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous guests) can submit an RSVP
CREATE POLICY "Anyone can insert rsvps"
  ON public.rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can view RSVPs
CREATE POLICY "Authenticated users can view rsvps"
  ON public.rsvps FOR SELECT
  TO authenticated
  USING (true);
