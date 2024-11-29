<script>
    import { page } from '$app/stores';
    import { signIn } from '@auth/sveltekit/client';

    const googleLogin = async () => {
        if (!$page.data.session) {
            await signIn('google');
        }
    };
</script>

<svelte:head>
    <title>Login</title>
    <meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="flex items-center justify-center h-full overflow-x-hidden -mt-12">
    <button on:click={googleLogin}>Login with Google</button>
</div>