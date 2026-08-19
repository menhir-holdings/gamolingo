<script lang="ts">
	import { ui } from '$lib/copy';
	import Gloss from '$lib/components/Gloss.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { loadProfile } from '$lib/progress';
	import { me } from '$lib/account';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
	const profile = $derived(browser ? loadProfile() : null);
	let email = $state<string | null>(null);

	$effect(() => {
		if (!browser) return;
		void me().then((session) => {
			email = session?.email ?? null;
		});
	});
</script>

<svelte:head>
	<title>Gamolingo · 台服 chat</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell">
	<header>
		<a class="mark" href="/">GAMOLINGO</a>
		<nav>
			<a href="/path"><Gloss compact {...ui.path} /></a>
			<a href="/dex"><Gloss compact {...ui.dex} /></a>
			<a href="/sim"><Gloss compact {...ui.sim} /></a>
			<a href="/account"><Gloss compact {...ui.account} /></a>
			<button
				type="button"
				onclick={() => {
					goto('/onboard');
				}}><Gloss compact {...(profile ? ui.reset : ui.setup)} /></button
			>
		</nav>
	</header>
	{#if email}
		<p class="who">{email}</p>
	{/if}
	<main>
		{@render children()}
	</main>
</div>

<style>
	.shell {
		min-height: 100svh;
		max-width: 720px;
		margin: 0 auto;
		padding: 1.25rem 1.1rem 3rem;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		margin-bottom: 0.6rem;
		border-bottom: 1px solid #222a26;
		padding-bottom: 0.9rem;
	}
	.mark {
		font-weight: 700;
		letter-spacing: 0.18em;
		font-size: 0.82rem;
		color: var(--color-gold);
		padding-bottom: 0.35rem;
	}
	nav {
		display: flex;
		gap: 0.85rem;
		align-items: flex-end;
		font-size: 0.92rem;
	}
	nav a {
		color: var(--color-mist);
	}
	nav a:hover {
		color: var(--color-cream);
	}
	nav button {
		background: transparent;
		border: 1px solid #3a3320;
		color: var(--color-gold);
		padding: 0.15rem 0.45rem 0.35rem;
	}
	.who {
		color: var(--color-mist);
		font-size: 0.78rem;
		margin: 0 0 1.2rem;
	}
</style>
