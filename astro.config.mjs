// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://creativeelicowie.com",
	integrations: [mdx(), sitemap()],
	// /blog/* is served from the homepage; redirect the index to /
	// so there's no stub route and the sitemap stays clean.
	redirects: {
		"/blog": "/",
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
