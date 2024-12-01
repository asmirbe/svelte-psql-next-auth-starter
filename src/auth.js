import { SvelteKitAuth } from "@auth/sveltekit"
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import Email from "@auth/core/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "$lib/db.server";
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET, EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	adapter: PrismaAdapter(db),
	providers: [
		Google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
		}),
		Email({
			server: {
				host: EMAIL_SERVER_HOST,
				port: EMAIL_SERVER_PORT,
				auth: {
					user: EMAIL_SERVER_USER,
					pass: EMAIL_SERVER_PASSWORD,
				},
			},
			from: EMAIL_FROM,
			maxAge: 24 * 60 * 60,
		}),
	],
	secret: AUTH_SECRET,
	trustHost: true,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session({ session, user, token }) {
			if (session?.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/logout",
		error: "/error",
		verifyRequest: "/login", // Redirect verify-request back to login
	},
});