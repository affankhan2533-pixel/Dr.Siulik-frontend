export const CLINIC_WHATSAPP_NUMBER = "919938674499";
export const CLINIC_DISPLAY_PHONE = "+91 99386 74499";

/**
 * Builds direct WhatsApp URL with pre-filled patient appointment details.
 */
export function createAppointmentWhatsAppUrl(data) {
  const {
    patientName,
    patientPhone,
    treatment,
    preferredDate,
    preferredTime,
    notes,
  } = data;

  const lines = [
    "🦷 *APPOINTMENT PREFERENCE — DR. SIULIK'S DENTAL CARE*",
    "",
    `👤 *Patient Name:* ${patientName?.trim() || "Not specified"}`,
    `📞 *Phone Number:* ${patientPhone?.trim() || "Not specified"}`,
    `🩺 *Specialty / Treatment:* ${treatment || "General Consultation"}`,
    `📅 *Preferred Date:* ${preferredDate || "Earliest Available"}`,
    `⏰ *Preferred Slot:* ${preferredTime || "Standard Consultation"}`,
  ];

  if (notes && notes.trim()) {
    lines.push(`📝 *Patient Notes / Concerns:* ${notes.trim()}`);
  }

  lines.push("");
  lines.push("Please confirm my consultation booking slot. Thank you!");

  const message = lines.join("\n");
  return `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct inquiry link
 */
export function createGeneralInquiryWhatsAppUrl(customText) {
  const text = customText || "Hello Dr. Siulik's Dental Care, I would like to inquire about dental consultation and appointments.";
  return `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
