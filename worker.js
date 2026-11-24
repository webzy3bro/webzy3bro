import { onRequest as handleContact } from "./functions/api/contact.js";

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact({ request, env, ctx: context });
    }

    return env.ASSETS.fetch(request);
  },
};
