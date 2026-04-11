import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SITE_URL = Deno.env.get("SITE_URL") || 'http://localhost:5173'; // Fallback for local dev

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MacroRequest {
  email: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  goal: string;
}

// Helper to escape HTML
const escapeHtml = (text: string): string => {
  return text.replace(/[&<>"'']/g, (char) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]!;
  });
};

// Main request handler
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, name, calories, protein, carbs, fats, goal }: MacroRequest = await req.json();

    // Simple validation
    if (!email || !name || !calories || !protein || !carbs || !fats || !goal) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const safeName = escapeHtml(name);
    const goalLabel = {
      'fat-loss': "Fat Loss",
      'muscle-gain': "Muscle Gain",
      'maintain': "Maintenance",
    }[goal] || "Maintenance";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0d0d0d; font-family: 'Inter', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d0d0d; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #141414; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid #333;">
                    <h1 style="margin: 0; font-family: 'Oswald', Arial, sans-serif; font-size: 28px; color: #8B9A5B; letter-spacing: 2px;">ATLAS</h1>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #f5f5eb; letter-spacing: 3px;">STRENGTH & PERFORMANCE</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; font-family: 'Oswald', Arial, sans-serif; font-size: 24px; color: #f5f5eb;">
                      Hey ${safeName}! 👋
                    </h2>
                    <p style="margin: 0 0 30px; font-size: 16px; color: #8b8b80; line-height: 1.6;">
                      Here are your personalized macro targets for your <strong style="color: #8B9A5B;">${goalLabel}</strong> goal:
                    </p>
                    
                    <!-- Macro Results -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #8B9A5B; text-align: center;">
                          <p style="margin: 0 0 5px; font-size: 36px; font-weight: bold; color: #8B9A5B;">${calories}</p>
                          <p style="margin: 0; font-size: 12px; color: #8b8b80; letter-spacing: 1px; text-transform: uppercase;">Daily Calories</p>
                        </td>
                      </tr>
                    </table>
                    
                    <table width="100%" cellpadding="0" cellspacing="10">
                      <tr>
                        <td width="33%" style="padding: 15px; background-color: #1a1a1a; border-radius: 8px; text-align: center;">
                          <p style="margin: 0 0 5px; font-size: 24px; font-weight: bold; color: #f5f5eb;">${protein}g</p>
                          <p style="margin: 0; font-size: 11px; color: #8b8b80; letter-spacing: 1px; text-transform: uppercase;">Protein</p>
                        </td>
                        <td width="33%" style="padding: 15px; background-color: #1a1a1a; border-radius: 8px; text-align: center;">
                          <p style="margin: 0 0 5px; font-size: 24px; font-weight: bold; color: #f5f5eb;">${carbs}g</p>
                          <p style="margin: 0; font-size: 11px; color: #8b8b80; letter-spacing: 1px; text-transform: uppercase;">Carbs</p>
                        </td>
                        <td width="33%" style="padding: 15px; background-color: #1a1a1a; border-radius: 8px; text-align: center;">
                          <p style="margin: 0 0 5px; font-size: 24px; font-weight: bold; color: #f5f5eb;">${fats}g</p>
                          <p style="margin: 0; font-size: 11px; color: #8b8b80; letter-spacing: 1px; text-transform: uppercase;">Fats</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- CTA -->
                    <div style="margin-top: 30px; text-align: center;">
                      <p style="margin: 0 0 15px; font-size: 14px; color: #8b8b80;">
                        Want personalized coaching to achieve your goals faster?
                      </p>
                      <a href="${SITE_URL}/#contact" style="display: inline-block; padding: 14px 28px; background-color: #8B9A5B; color: #0d0d0d; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
                        Get Started Today
                      </a>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #0d0d0d; text-align: center; border-top: 1px solid #333;">
                    <p style="margin: 0; font-size: 12px; color: #666;">
                      © Atlas Strength & Performance
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Atlas Performance <onboarding@resend.dev>",
        to: [email],
        subject: "Your Personalized Macro Targets - Atlas Strength & Performance",
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error:", await res.text());
      throw new Error("Email service error");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
