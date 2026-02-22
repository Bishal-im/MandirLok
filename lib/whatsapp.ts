import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

/**
 * Send a WhatsApp message using Twilio.
 * @param to - The recipient's phone number (with country code, e.g., "91XXXXXXXXXX")
 * @param message - The text content of the message
 */
export async function sendWhatsApp(to: string, message: string) {
  // Ensure 'to' starts with whatsapp: prefix if not already present
  const formattedTo = to.startsWith("whatsapp:") ? to : `whatsapp:+${to.replace(/^\+/, '')}`;

  if (!accountSid || !authToken) {
    console.warn("[WhatsApp] Twilio credentials missing. Logging message below:");
    console.log(`To: ${formattedTo}\nMessage: ${message}`);
    return { success: true, mocked: true };
  }

  try {
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      from: fromPhoneNumber,
      to: formattedTo,
      body: message,
    });
    console.log(`[WhatsApp] Message sent: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("[WhatsApp] Failed to send message:", error);
    throw error;
  }
}
