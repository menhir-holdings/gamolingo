<script lang="ts">
	import { champions, patchVersion } from '$lib/content/champs';
	import { ui } from '$lib/copy';
	import Gloss from '$lib/components/Gloss.svelte';

	let query = $state('');

	const rows = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return champions.filter((champ) => {
			if (!q) return true;
			return (
				champ.en.toLowerCase().includes(q) ||
				champ.tw.includes(query.trim()) ||
				champ.pinyin.toLowerCase().includes(q)
			);
		});
	});
</script>

<p class="kicker">Data Dragon {patchVersion}</p>
<h1><Gloss {...ui.dex} /></h1>
<p class="lede">English splash name · 台服 Traditional with pinyin under it. Hover 中文 for English.</p>
<div class="tools">
	<input bind:value={query} placeholder="Yasuo / 犽宿 / ya su" />
</div>
<table>
	<thead>
		<tr>
			<th></th>
			<th>EN</th>
			<th>台服</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as champ (champ.id)}
			<tr>
				<td><img src={champ.icon} alt="" width="28" height="28" /></td>
				<td>{champ.en}</td>
				<td class="tw"><Gloss tw={champ.tw} pinyin={champ.pinyin} en={champ.en} /></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	h1 {
		margin: 0.2rem 0 0.5rem;
		font-size: 2rem;
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
	.tools {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin: 1rem 0;
		flex-wrap: wrap;
	}
	.tools input:not([type='checkbox']) {
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: inherit;
		padding: 0.55rem 0.7rem;
		min-width: 180px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.92rem;
	}
	th {
		text-align: left;
		color: var(--color-mist);
		font-weight: 500;
		padding: 0.4rem 0.3rem;
		border-bottom: 1px solid #2a332e;
	}
	td {
		padding: 0.4rem 0.3rem;
		border-bottom: 1px solid #1a211e;
		vertical-align: middle;
	}
	.tw {
		font-family: var(--font-serif);
		font-size: 1.05rem;
	}
</style>
