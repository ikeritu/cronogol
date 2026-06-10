/**
 * CronoGol v1.11.0 — Cloudflare Worker example for feedback proxy
 *
 * Purpose:
 * - Keep the real Formspree endpoint outside the public frontend.
 * - Add a simple origin check and rate-limit hook.
 *
 * Usage:
 * 1. Create a Cloudflare Worker.
 * 2. Add secret: FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
 * 3. Deploy worker under /api/feedback.
 * 4. Change feedback.html to fetch("/api/feedback") instead of Formspree directly.
 */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const origin = request.headers.get("Origin") || "";
    const allowed = ["https://cronogol.es", "https://www.cronogol.es"];
    if (origin && !allowed.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    if (!env.FORMSPREE_ENDPOINT) {
      return new Response("Missing FORMSPREE_ENDPOINT", { status: 500 });
    }

    const formData = await request.formData();

    // Honeypot: bots often fill hidden fields.
    if (formData.get("website_check")) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const upstream = await fetch(env.FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" }
    });
  }
};
