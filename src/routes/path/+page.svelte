<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { buildPath, roleLabel } from '$lib/path';
	import { loadProfile, loadProgress } from '$lib/progress';

	const profile = $derived(browser ? loadProfile() : null);
	const progress = $derived(browser ? loadProgress() : null);
	const path = $derived(profile ? buildPath(profile) : []);
	const totalMin = $derived(path.reduce((sum, mod) => sum + mod.minutes, 0));
</script>

{#if !profile}
	<p>先配課。</p>
	<button type="button" onclick={() => goto('/onboard')}>開始</button>
{:else}
	<p class="kicker">{roleLabel(profile.role).tw} · {profile.goal} · ~{totalMin} min</p>
	<h1>你的課表</h1>
	<p class="lede">
		Built from your role and pool. HSK {profile.hsk}.
		{#if profile.placementScore !== null}
			摸底 {profile.placementScore}%.
		{/if}
	</p>
	<ol>
		{#each path as mod, index (mod.id)}
			{@const done = progress?.completed.includes(mod.id)}
			<li class:done>
				<a href={`/lesson/${mod.id}`}>
					<span class="n">{String(index + 1).padStart(2, '0')}</span>
					<div>
						<strong>{mod.titleTw}</strong>
						<em>{mod.title} · {mod.minutes}m</em>
						<p>{mod.blurb}</p>
					</div>
					<span class="st">{done ? '過了' : '開始'}</span>
				</a>
			</li>
		{/each}
	</ol>
{/if}

<style>
	h1 {
		margin: 0.3rem 0 0.6rem;
		font-size: 2.1rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}
	.lede {
		color: var(--color-mist);
	}
	ol {
		list-style: none;
		padding: 0;
		margin: 1.4rem 0;
		display: grid;
		gap: 0.55rem;
	}
	a {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.9rem;
		align-items: start;
		background: var(--color-panel);
		border: 1px solid #2a332e;
		padding: 0.9rem;
	}
	.n {
		color: var(--color-gold);
		font-variant-numeric: tabular-nums;
	}
	strong {
		font-family: var(--font-serif);
		font-size: 1.2rem;
		display: block;
	}
	em {
		color: var(--color-mist);
		font-style: normal;
		font-size: 0.82rem;
	}
	li p {
		margin: 0.35rem 0 0;
		color: var(--color-mist);
		font-size: 0.92rem;
	}
	.st {
		color: var(--color-gold);
		font-size: 0.8rem;
	}
	.done a {
		opacity: 0.7;
	}
	button {
		background: var(--color-gold);
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
	}
</style>
