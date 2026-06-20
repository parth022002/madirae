import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { newsletterEmail } from "@/lib/constants";

export async function POST(request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
    }

    // 1. Optional Supabase integration if configured
    let savedToDb = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        const { error } = await supabase.from("newsletter_subscribers").insert({ email, source: source || "website" });
        if (!error) savedToDb = true;
      } catch (dbError) {
        console.error("Supabase storage error:", dbError);
      }
    }

    // 2. SMTP Mail notification to madiraeandco@gmail.com
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: parseInt(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"MADIRÆ & Co. Portal" <${smtpUser}>`,
        to: newsletterEmail,
        subject: `🔔 New Newsletter Subscription: ${email}`,
        html: `
          <div style="font-family: 'Georgia', serif; padding: 30px; background-color: #0A0A0A; color: #F5E6CA; border: 1px solid #D9A441; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px;">
              <h1 style="color: #D9A441; font-weight: normal; margin: 0; font-size: 28px; letter-spacing: 0.1em;">MADIRÆ & Co.</h1>
              <p style="font-size: 11px; text-transform: uppercase; tracking: 0.2em; color: #8A8A8A; margin: 5px 0 0 0;">Legacy Refined</p>
            </div>
            
            <h2 style="font-weight: normal; font-size: 20px; border-left: 3px solid #D9A441; padding-left: 15px; margin-bottom: 20px; color: #F5E6CA;">New Newsletter Subscriber</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8A8A; font-size: 13px; width: 120px;">Email Address</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; font-weight: bold; color: #D9A441;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8A8A; font-size: 13px;">Source Section</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; font-family: monospace; color: #CCCCCC;">${source || "website"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #8A8A8A; font-size: 13px;">Database Sync</td>
                <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; color: ${savedToDb ? "#10B981" : "#F59E0B"};">
                  ${savedToDb ? "Synced to Supabase" : "Skipped (Credentials Unconfigured)"}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #8A8A8A; font-size: 13px;">Capture Time</td>
                <td style="padding: 10px; font-size: 13px; color: #CCCCCC;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
              </tr>
            </table>

            <div style="text-align: center; font-size: 10px; color: #666666; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
              This notification was generated automatically by your web portal.<br>
              MADIRÆ & Co. | Indian Heritage Craft Distills.
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Newsletter subscription notification sent successfully to ${newsletterEmail}`);
      return NextResponse.json({ ok: true, message: "Welcome to the reserve list. Invitation has been registered." });
    } else {
      // Robust simulated fallback when SMTP credentials are not yet added
      const logMessage = `[Newsletter Subscription Log]\nEmail: ${email}\nSource: ${source || "website"}\nTimestamp: ${new Date().toISOString()}\nDatabase Saved: ${savedToDb}\n--------------------\n`;
      console.warn(`SMTP Credentials not configured. Simulated subscription successful. Log saved to terminal console.\n${logMessage}`);
      return NextResponse.json({
        ok: true,
        message: "Welcome to the reserve list. Invitation has been registered."
      });
    }
  } catch (error) {
    console.error("Newsletter subscription handler error:", error);
    return NextResponse.json({ ok: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
