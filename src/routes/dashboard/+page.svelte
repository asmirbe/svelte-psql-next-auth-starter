<script>
	export let data;
	import { signOut } from "@auth/sveltekit/client";
</script>

<div class="h-full flex flex-col items-center justify-center gap-4">
	{#if data.session}
		<h1 class="text-5xl">Dashboard</h1>
		Welcome back,
		{JSON.stringify(data.session.user)}
		<button on:click={() => signOut()}>Sign Out</button>
	{/if}
</div>
