
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS_HEADERS,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle browser CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // Allow only the chatbot API route
    if (url.pathname !== "/api/chat") {
      return jsonResponse(
        { error: "Route not found." },
        404
      );
    }

    // The chatbot requires POST requests
    if (request.method !== "POST") {
      return jsonResponse(
        { error: "Method not allowed. Use POST." },
        405
      );
    }

    // Check server-side API key
    if (!env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing.");

      return jsonResponse(
        { error: "AI service is not configured." },
        500
      );
    }

    try {
      // Read and validate the request body
      const body = await request.json();
      const message = body?.message;

      if (typeof message !== "string" || !message.trim()) {
        return jsonResponse(
          { error: "Please enter a message." },
          400
        );
      }

      if (message.length > 2000) {
        return jsonResponse(
          { error: "Message is too long. Maximum 2000 characters." },
          400
        );
      }

      // Abort the upstream request if it takes too long
      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 25000);

      let geminiResponse;

      try {
        geminiResponse = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": env.GEMINI_API_KEY,
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [
                  {
                    text:
                      "You are Nashik Darshan AI, a friendly tourism guide for Nashik, Maharashtra, India. " +
                      "Answer questions about Nashik tourism, temples, forts, history, culture, travel routes, " +
                      "and local attractions. Reply in the same language as the user. " +
                      "Keep answers concise, useful, and easy to understand. " +
                      "Use numbered lists when helpful. Never invent facts; clearly mention uncertainty.",
                  },
                ],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: message.trim() }],
                },
              ],
              generationConfig: {
                maxOutputTokens: 512,
                temperature: 0.5,
              },
            }),
            signal: controller.signal,
          }
        );
      } finally {
        clearTimeout(timeoutId);
      }

      const result = await geminiResponse.json();

      if (!geminiResponse.ok) {
        console.error(
          "Gemini API error:",
          geminiResponse.status,
          JSON.stringify(result)
        );

        return jsonResponse(
          {
            error:
              geminiResponse.status === 429
                ? "AI service is busy or the API quota has been reached. Please try again shortly."
                : "AI service request failed. Please try again later.",
          },
          502
        );
      }

      const reply = (
        result.candidates?.[0]?.content?.parts || []
      )
        .map((part) => part.text || "")
        .join("")
        .trim();

      if (!reply) {
        console.error(
          "Gemini returned no text:",
          JSON.stringify(result)
        );

        return jsonResponse(
          { error: "AI could not generate a response. Please try again." },
          502
        );
      }

      return jsonResponse({ reply });
    } catch (error) {
      if (error?.name === "AbortError") {
        console.error("Gemini request timed out.");

        return jsonResponse(
          {
            error:
              "AI response took too long. Please try again.",
          },
          504
        );
      }

      console.error("Chat API error:", error);

      return jsonResponse(
        {
          error:
            "Unable to process your message. Please try again.",
        },
        500
      );
    }
  },
};
