<script lang="ts">
	import { champions, patchVersion } from '$lib/content/champs';
	import { trapIds } from '$lib/content/traps';

	let query = $state('');
	let trapsOnly = $state(false);

	const rows = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return champions.filter((champ) => {
			if (trapsOnly && !(trapIds as readonly string[]).includes(champ.id)) return false;
			if (!q) return true;
			return (
				champ.en.toLowerCase().includes(q) ||
				champ.tw.includes(query.trim()) ||
				champ.cnName.includes(query.trim()) ||
				champ.pinyin.toLowerCase().includes(q)
			);
		});
	});
</script>

<p class="kicker">Data Dragon {patchVersion}</p>
<h1>英雄名冊</h1>
<p class="lede">EN · 台服 · 陸服 client name. The last column is why 寒冰 does not land on 台服.</p>
<div class="tools">
	<input bind:value={query} placeholder="search" />
	<label><input type="checkbox" bind:checked={trapsOnly} /> CN traps only</label>
</div>
<table>
	<thead>
		<tr>
			<th></th>
			<th>EN</th>
			<th>台服</th>
			<th>pinyin</th>
			<th>陸服</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as champ (champ.id)}
			<tr>
				<td><img src={champ.icon} alt="" width="28" height="28" /></td>
				<td>{champ.en}</td>
				<td class="tw">{champ.tw}</td>
				<td class="py">{champ.pinyin}</td>
				<td>{champ.cnName}</td>
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
	.py {
		color: var(--color-mist);
	}
</style>
