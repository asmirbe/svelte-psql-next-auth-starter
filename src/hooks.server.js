import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '$lib/db.server';
import { env } from '$env/dynamic/private';
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private";

// Define handle as a Handle type
export const { handle } = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [
		Google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
		}),
	],
	secret: AUTH_SECRET, // Make sure this is set in your .env
	trustHost: true,
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
});