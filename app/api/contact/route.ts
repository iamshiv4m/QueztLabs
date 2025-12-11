import { NextResponse } from "next/server";

/**
 * Contact Form API Route
 *
 * This is a stub endpoint for the contact form.
 * In production, integrate with:
 * - Email service (SendGrid, Resend, etc.)
 * - CRM (HubSpot, Salesforce, etc.)
 * - Slack notifications
 * - Database for lead tracking
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@queztlabs.dev',
    //   to: 'hello@queztlabs.dev',
    //   subject: `New inquiry from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Message: ${message}</p>`,
    // })

    console.log("Contact form submission:", { name, email, company, message });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will be in touch soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
