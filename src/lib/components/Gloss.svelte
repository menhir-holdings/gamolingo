<script lang="ts">
	let {
		tw,
		pinyin,
		en,
		compact = false
	}: {
		tw: string;
		pinyin: string;
		en: string;
		compact?: boolean;
	} = $props();
</script>

<span class="gloss" class:compact title={en} aria-label={`${tw}. ${en}`}>
	<span class="tw">{tw}</span>
	{#if pinyin}
		<span class="py">{pinyin}</span>
	{/if}
	<span class="tip">{en}</span>
</span>

<style>
	.gloss {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.15;
		cursor: help;
	}
	.gloss.compact {
		align-items: center;
	}
	.tw {
		font-family: var(--font-serif);
		color: inherit;
	}
	.py {
		font-size: 0.62em;
		color: color-mix(in srgb, currentColor 58%, transparent);
		letter-spacing: 0.02em;
		margin-top: 0.12em;
	}
	.tip {
		position: absolute;
		left: 50%;
		bottom: calc(100% + 6px);
		transform: translateX(-50%);
		background: #1a1406;
		color: var(--color-gold);
		border: 1px solid #3a3320;
		padding: 0.25rem 0.45rem;
		font-size: 0.72rem;
		letter-spacing: 0.02em;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.12s ease;
		z-index: 5;
	}
	.gloss:hover .tip,
	.gloss:focus-visible .tip {
		opacity: 1;
	}
</style>
