-- Block UPDATE and DELETE operations on leads table
-- These policies explicitly deny these operations since public.leads should be append-only

CREATE POLICY "No one can update leads"
ON public.leads
FOR UPDATE
USING (false);

CREATE POLICY "No one can delete leads"
ON public.leads
FOR DELETE
USING (false);