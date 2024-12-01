<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { signIn } from "@auth/sveltekit/client";

	let email = "";
	let loading = false;
	let error = "";
	let emailSent = false; // New state to track if verification email was sent

	const handleEmailSignIn = async () => {
		if (!email) {
			error = "Please enter your email";
			return;
		}

		loading = true;
		error = "";

		try {
			const result = await signIn("email", {
				email,
				callbackUrl: "/dashboard", // Redirect after successful login
				redirect: false, // Prevent automatic redirect
			});

			if (result?.error) {
				error = "Failed to sign in. Please try again.";
			} else {
				emailSent = true; // Show success message instead of redirecting
				error = "";
			}
		} catch (err) {
			error = "Failed to sign in. Please try again.";
		} finally {
			loading = false;
		}
	};

	const handleGoogleSignIn = async () => {
		loading = true;
		try {
			await signIn("google", {
				callbackUrl: "/dashboard",
			});
		} catch (err) {
			error = "Failed to sign in with Google. Please try again.";
		} finally {
			loading = false;
		}
	};
</script>

<div class="items-center flex h-full justify-center fixed w-full z-[9999] select-none left-0 top-0">
	<div class="flex flex-col shadow-[rgba(0,0,0,0.16)_0px_0px_8px_0px,rgba(0,0,0,0.48)_0px_8px_64px_-16px,rgba(0,0,0,0.08)_0px_24px_56px_-16px] text-[rgb(51,51,51)] overflow-hidden z-[10000] w-[400px] h-auto max-h-[90dvh] p-0 rounded-lg bg-white">
		<div class="flex flex-1 flex-col overflow-y-auto items-center justify-center p-10">
			<h1 class="text-[rgb(51,51,51)] text-[1.54rem] font-semibold my-4">Welcome</h1>
			<div class="mb-8 mt-4">
				<button on:click={handleGoogleSignIn} disabled={loading} class="items-center border shadow-md text-neutral-800 h-9 cursor-pointer flex flex-row font-semibold gap-2 justify-center w-full px-3 py-2 rounded-lg border-solid border-[rgba(0,0,0,0.16)]">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 14 14">
						<g clip-path="url(#a)">
							<path fill="#4285F4" d="M7 5.727v2.711h3.767a3.228 3.228 0 0 1-1.406 2.107l2.272 1.762c1.323-1.221 2.087-3.016 2.087-5.148 0-.496-.045-.973-.127-1.432H7Z"></path>
							<path fill="#34A853" d="m3.077 8.332-.512.393L.75 10.137C1.903 12.422 4.263 14 7 14c1.89 0 3.474-.624 4.633-1.693L9.36 10.544c-.624.42-1.42.675-2.361.675-1.82 0-3.366-1.228-3.92-2.883l-.003-.004Z"></path>
							<path fill="#FBBC05" d="M.75 3.863A6.914 6.914 0 0 0 0 7c0 1.133.274 2.196.75 3.137 0 .007 2.33-1.807 2.33-1.807A4.195 4.195 0 0 1 2.857 7c0-.465.083-.91.223-1.33L.75 3.863Z"></path>
							<path fill="#EA4335" d="M7 2.787c1.03 0 1.947.357 2.68 1.044l2.004-2.005C10.468.694 8.89 0 7 0A6.988 6.988 0 0 0 .75 3.863L3.08 5.67C3.634 4.015 5.18 2.787 7 2.787Z"></path>
						</g>
						<defs><clipPath id="a"><path fill="#fff" d="M0 0h13.72v14H0z"></path></clipPath></defs>
					</svg>
					Sign in with Google
				</button>
				<div class="my-3 w-full h-px bg-neutral-200"></div>
				<form class="items-center flex flex-col w-full" on:submit|preventDefault={handleEmailSignIn}>
					<div class="mt-1 mb-4">
						<input id="email" name="email" type="email" bind:value={email} required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
					</div>

					<button type="submit" disabled={loading} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
						{loading ? "Signing in..." : "Continue"}
					</button>
				</form>
			</div>
			<div class="items-center text-[rgb(153,153,153)] text-[0.92rem] max-w-[280px] text-center">
				By using, you agree to the <a href="https://.com/legal/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
				and
				<a href="https://.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
				.
			</div>
		</div>
	</div>
</div>
