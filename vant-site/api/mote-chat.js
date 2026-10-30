export const config = { maxDuration: 60 };

const VANT_AI_CHAT_URL = process.env.VANT_AI_CHAT_URL || "https://vant-ai.vercel.app/api/chat";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 12000;

function reply(res, status, body) {
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { error: "method_not_allowed" });
  }

  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) {
    return reply(res, 401, { error: "authentication_required", message: "A guest session is required." });
  }

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return reply(res, 400, { error: "invalid_messages", message: "Please send a shorter conversation." });
  }

  const valid = messages.every((message) =>
    message &&
    ["user", "assistant"].includes(message.role) &&
    typeof message.content === "string" &&
    message.content.length <= MAX_MESSAGE_CHARS
  );
  if (!valid) {
    return reply(res, 400, { error: "invalid_message_format", message: "Only text messages are supported in MOTE guest chat." });
  }

  const latestUser = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUser || !latestUser.content.trim() || latestUser.content.length > 4000) {
    return reply(res, 400, { error: "invalid_guest_message", message: "Guest messages must contain text and stay within 4,000 characters." });
  }

  const system = [
    "You are VANT GPT, the intelligence behind MOTE.EXE, VANT Technologies' digital guardian.",
    "You are speaking to a visitor using MOTE's public, guest-only chat. Be helpful, clear, welcoming, and concise.",
    "Explain VANT and MOTE accurately. Do not claim access to private VANT accounts, user data, integrations, or task execution.",
    "You cannot execute workflows or access connected services from this public MOTE channel. You can explain concepts, answer questions, brainstorm, and help visitors understand VANT.",
    "Never ask visitors to share passwords, API keys, payment details, or sensitive personal information.",
    "If asked about capabilities that may not be live, distinguish current functionality from planned or conceptual features."
  ].join("\n");

  try {
    const upstream = await fetch(VANT_AI_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        system,
        messages,
        stream: false,
        max_tokens: 1800,
        agent_temperature: 0.6,
      }),
      signal: AbortSignal.timeout(57000),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return reply(res, upstream.status, {
        error: data?.error || "vant_gpt_unavailable",
        message: data?.message || data?.detail || "VANT GPT is temporarily unavailable. Please try again.",
        remaining: data?.remaining,
        reset_at: data?.reset_at,
      });
    }

    return reply(res, 200, data);
  } catch (error) {
    console.error("MOTE guest chat proxy failed:", error);
    return reply(res, 502, { error: "vant_gpt_unavailable", message: "MOTE couldn't reach VANT GPT. Please try again shortly." });
  }
}
