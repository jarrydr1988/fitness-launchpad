
-- macro_calculator_leads
ALTER TABLE public.macro_calculator_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit their macro results"
ON public.macro_calculator_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view macro results"
ON public.macro_calculator_leads
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- start_your_journey_leads
ALTER TABLE public.start_your_journey_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit their email"
ON public.start_your_journey_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view leads"
ON public.start_your_journey_leads
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- join_the_community_leads
ALTER TABLE public.join_the_community_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the community"
ON public.join_the_community_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view community leads"
ON public.join_the_community_leads
FOR SELECT
USING (auth.uid() IS NOT NULL);
