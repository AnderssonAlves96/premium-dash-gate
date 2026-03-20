
-- Add position column for ordering
ALTER TABLE public.dashboards ADD COLUMN position integer NOT NULL DEFAULT 0;

-- Set initial positions based on created_at
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as rn
  FROM public.dashboards
)
UPDATE public.dashboards SET position = ranked.rn FROM ranked WHERE dashboards.id = ranked.id;
