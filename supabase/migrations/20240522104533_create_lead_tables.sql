
CREATE TABLE macro_calculator_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    calories NUMERIC,
    protein NUMERIC,
    carbs NUMERIC,
    fats NUMERIC,
    goal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE start_your_journey_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE join_the_community_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
