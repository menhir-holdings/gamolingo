<script lang="ts">
	import { ui } from '$lib/copy';
	import Gloss from '$lib/components/Gloss.svelte';
	import { login, logout, me, pullSave, pushSave, register, type Session } from '$lib/account';
	import { loadProfile, loadProgress, hydrateFromCloud } from '$lib/progress';

	let email = $state('');
	let password = $state('');
	let session = $state<Session | null>(null);
	let message = $state('');
	let needsDb = $state(false);
	let busy = $state(false);

	$effect(() => {
		void me().then((next) => {
			session = next;
		});
	});

	async function afterAuth(next: Session) {
		session = next;
		const cloud = await pullSave();
		hydrateFromCloud(cloud?.profile ?? null, cloud?.progress ?? null);
		await pushSave(loadProfile(), loadProgress());
		message = '進度已存到雲端。換電腦登入同一個帳號就還在。';
		needsDb = false;
	}

	async function onRegister() {
		busy = true;
		const result = await register(email.trim(), password);
		busy = false;
		if (result.session) await afterAuth(result.session);
		else {
			message = result.error ?? 'Could not register.';
			needsDb = (result.error ?? '').includes('not connected');
		}
	}

	async function onLogin() {
		busy = true;
		const result = await login(email.trim(), password);
		busy = false;
		if (result.session) await afterAuth(result.session);
		else {
			message = result.error ?? 'Could not log in.';
			needsDb = (result.error ?? '').includes('not connected');
		}
	}

	async function onLogout() {
		await logout();
		session = null;
		message = '';
		needsDb = false;
	}
</script>

<p class="kicker">cloud save</p>
<h1><Gloss {...ui.account} /></h1>
<p class="lede">
	This browser already keeps your 課表. An account is for the other PC: same role, same pool, same
	completed lessons after you log in.
</p>

{#if session}
	<p class="ok">{session.email}</p>
	<button type="button" onclick={onLogout}><Gloss {...ui.logout} /></button>
{:else}
	<form
		onsubmit={(event) => {
			event.preventDefault();
			void onLogin();
		}}
	>
		<label>Email <input type="email" bind:value={email} autocomplete="username" required /></label>
		<label>Password <input type="password" bind:value={password} autocomplete="current-password" minlength="8" required /></label>
		<div class="row">
			<button type="submit" disabled={busy}><Gloss {...ui.login} /></button>
			<button type="button" class="ghost" disabled={busy} onclick={onRegister}><Gloss {...ui.register} /></button>
		</div>
	</form>
{/if}

{#if message}
	<p class="lede">{message}</p>
{/if}
{#if needsDb}
	<p class="lede">
		Cloud save needs the Neon database on this Vercel project. Accept
		<a href="https://vercel.com/menhir-holdings/~/integrations/accept-terms/neon?source=cli">marketplace terms</a>,
		then tell me to retry the install.
	</p>
{/if}

<style>
	h1 {
		margin: 0.2rem 0 0.8rem;
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
		line-height: 1.5;
	}
	.ok {
		color: var(--color-jade);
		font-family: var(--font-serif);
	}
	form {
		display: grid;
		gap: 0.8rem;
		margin: 1.2rem 0;
		max-width: 24rem;
	}
	label {
		display: grid;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: var(--color-mist);
	}
	input {
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: var(--color-cream);
		padding: 0.7rem 0.8rem;
	}
	.row {
		display: flex;
		gap: 0.6rem;
	}
	button {
		background: var(--color-gold);
		color: #1a1406;
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
	}
	.ghost {
		background: transparent;
		color: var(--color-cream);
		border: 1px solid #2a332e;
	}
	a {
		color: var(--color-gold);
		text-decoration: underline;
	}
</style>
