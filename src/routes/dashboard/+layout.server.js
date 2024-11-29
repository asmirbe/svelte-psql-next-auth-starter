import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
	const session = await event.locals.getSession();
	const fromUrl = event.url.pathname + event.url.search;
	if (!session?.user) {
		throw redirect(303, `/welcome`);
	}

	return {
		session,
	};
};
