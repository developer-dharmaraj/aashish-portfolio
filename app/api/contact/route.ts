import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend Instance Initialize karein
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, service, budget, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are strictly required.' },
        { status: 400 }
      );
    }
    const cleanCompany = company?.trim() || 'Not Specified';
    const cleanService = service?.trim() || 'Not Specified';
    const cleanBudget = budget?.trim() || 'Not Specified';
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_RECEIVER_EMAIL as string],
      subject: `New Lead: ${name} (${cleanService})`,
      replyTo: email,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #333; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #111827; border-bottom: 2px solid #83e4aa; padding-bottom: 12px; margin-top: 0; font-size: 20px; font-weight: 700;">
            New Project Inquiry
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563; width: 140px;">Client Name:</td>
              <td style="padding: 6px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Email Address:</td>
              <td style="padding: 6px 0; color: #111827;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Company/Brand:</td>
              <td style="padding: 6px 0; color: #111827;">${cleanCompany}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Service Needed:</td>
              <td style="padding: 6px 0; color: #111827;"><span style="background-color: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${cleanService}</span></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Budget Range:</td>
              <td style="padding: 6px 0; color: #111827; font-weight: 600; color: #065f46;">${cleanBudget}</td>
            </tr>
          </table>

          <p style="margin-top: 24px; margin-bottom: 8px; font-weight: 600; color: #4b5563;">Project Brief & Goals:</p>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #83e4aa; color: #1f2937; line-height: 1.6; font-size: 14px; white-space: pre-line;">
            ${message.replace(/\n/g, '<br/>')}
          </div>

          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-top: 32px; margin-bottom: 16px;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
            Sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (err) {
    console.error('Internal Server Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}