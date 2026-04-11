import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// CORS headers - allow all origins for this public form
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

// HTML escape function to prevent XSS
const escapeHtml = (text: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
};

// Input validation
const validateContactRequest = (data: unknown): { valid: true; data: ContactRequest } | { valid: false; error: string } => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, inquiryType, message } = data as Record<string, unknown>;

  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: 'Name must be between 1 and 100 characters' };
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    return { valid: false, error: 'Invalid email address' };
  }

  const validInquiryTypes = ['1on1', '2on1', 'online', 'general'];
  if (typeof inquiryType !== 'string' || !validInquiryTypes.includes(inquiryType)) {
    return { valid: false, error: 'Invalid inquiry type' };
  }

  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
    return { valid: false, error: 'Message must be between 1 and 2000 characters' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      inquiryType,
      message: message.trim(),
    },
  };
};

const getInquiryLabel = (type: string): string => {
  const labels: Record<string, string> = {
    "1on1": "1-on-1 Personal Training",
    "2on1": "2-on-1 Personal Training",
    "online": "Online Personal Training",
    "general": "General Inquiry",
  };
  return labels[type] || type;
};

const sendEmail = async (to: string[], from: string, subject: string, html: string) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    const validation = validateContactRequest(rawData);

    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, inquiryType, message } = validation.data;

    // Escape HTML in user inputs to prevent XSS in emails
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);
    const safeInquiryLabel = escapeHtml(getInquiryLabel(inquiryType));

    console.log("Processing contact form submission for inquiry type:", inquiryType);

    // Send confirmation email to the user
    const userEmailResponse = await sendEmail(
      [email],
      "Atlas Performance <onboarding@resend.dev>",
      "We've Received Your Message - Atlas Performance",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">Thank You, ${safeName}!</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            We've received your inquiry about <strong>${safeInquiryLabel}</strong> and will get back to you within 24 hours.
          </p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin: 0;"><strong>Your message:</strong></p>
            <p style="color: #555; font-size: 14px; margin-top: 10px;">${safeMessage}</p>
          </div>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            In the meantime, feel free to explore our website for more information about our training services.
          </p>
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            <strong>The Atlas Performance Team</strong>
          </p>
        </div>
      `
    );

    console.log("User confirmation email sent successfully");

    // Send notification email to the business
    const notificationEmailResponse = await sendEmail(
      ["jarryd@atlasstrengthandperformance.com"],
      "Atlas Performance <jarryd@atlasstrengthandperformance.com>",
      `New Contact Form Submission: ${safeInquiryLabel}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">New Contact Form Submission</h1>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Inquiry Type:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${safeInquiryLabel}</td>
            </tr>
          </table>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin: 0;"><strong>Message:</strong></p>
            <p style="color: #555; font-size: 14px; margin-top: 10px; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `
    );

    console.log("Notification email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Return detailed error message to client for debugging
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
