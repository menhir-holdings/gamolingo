<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { loadProfile } from '$lib/progress';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
	const profile = $derived(browser ? loadProfile() : null);
</script>

<svelte:head>
	<title>Gamolingo · 台服 chat</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell">
	<header>
		<a class="mark" href="/">GAMOLINGO</a>
		<nav>
			<a href="/path">課表</a>
			<a href="/dex">英雄</a>
			<a href="/sim">實戰</a>
			<button
				type="button"
				onclick={() => {
					goto('/onboard');
				}}>{profile ? '重配' : '配課'}</button
			>
		</nav>
	</header>
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
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 2rem;
		border-bottom: 1px solid #222a26;
		padding-bottom: 0.9rem;
	}
	.mark {
		font-weight: 700;
		letter-spacing: 0.18em;
		font-size: 0.82rem;
		color: var(--color-gold);
	}
	nav {
		display: flex;
		gap: 0.9rem;
		align-items: center;
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
		padding: 0.2rem 0.55rem;
		font-size: 0.8rem;
	}
</style>
