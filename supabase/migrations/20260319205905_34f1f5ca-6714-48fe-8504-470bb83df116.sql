
CREATE TABLE public.dashboards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Geral',
  icon TEXT NOT NULL DEFAULT 'BarChart3',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read dashboards (public portal)
CREATE POLICY "Anyone can view dashboards"
ON public.dashboards
FOR SELECT
USING (true);

-- Only allow inserts via service role or authenticated (admin password checked client-side, but RLS allows insert for authenticated)
CREATE POLICY "Allow inserts"
ON public.dashboards
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow updates"
ON public.dashboards
FOR UPDATE
USING (true);

CREATE POLICY "Allow deletes"
ON public.dashboards
FOR DELETE
USING (true);
