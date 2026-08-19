# Gamolingo

**HSK 不是 soloQ。這是。**

Onboarding and catch-up trainer for **台服 League of Legends chat**. Survival lines, role calls, 巴龍, and champion names as Taiwan actually says them.

For an HSK 5–6 Pinyin user who already queues Taiwan. Microsoft Pinyin → Traditional is the IME; this product is the eight-second vocabulary.

- **Preview / prod:** Vercel project `gamolingo` (PR previews). Canonical later: https://gamolingo.menhir-holdings.com ([MT-181](https://linear.app/menhir-holdings/issue/MT-181))
- **Linear:** [Gamolingo](https://linear.app/menhir-holdings/project/gamolingo-f647145249e3)
- **Repo:** https://github.com/menhir-holdings/gamolingo

## User story

You queued 台服. Flash is down. Someone typed two characters. You have eight seconds to type two back — not an English sentence, and not a 陸服 name. The path is: your role, your pool, the lines you actually send.

Chrome (navbar, buttons) is Traditional with pinyin under it and English on hover. Lesson options stay bare until you answer; then every option reveals pinyin and meaning.

## Path

1. Role + champ pool + goal + HSK band
2. Optional 摸底
3. Tailored 課表 (survive / shotcall / full)
4. Drills (situation → TW line, type pinyin, 台服 champ names)
5. Timed 實戰 chat sim

Champion names are Data Dragon `en_US` / `zh_TW` only (patch baked into `src/lib/content/champions.json`).

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Player | **SvelteKit** on Vercel | Menhir ships GitHub → Vercel. This is a client-heavy drill app (timers, localStorage, SPA). SvelteKit is the lattice player that actually deploys. |
| Curriculum studio | **Django** in `studio/` | Admin + seed/export for phrases. Not the public runtime. |
| Player accounts | Email/password on the SvelteKit API + Neon | Saved 課表 has to live where the player runs. Django-on-Vercel is [MT-180](https://linear.app/menhir-holdings/issue/MT-180) for the studio, not a second login. |
| Not used | Meteor, Rails | Meteor wants its own Galaxy/Node host and DDP. Rails wants a persistent app server. Neither is how Menhir products go out. |

Progress is **localStorage on this device** immediately, and **cloud save after 註冊** once Neon is connected (`DATABASE_URL` + `AUTH_SECRET`).

## Develop

Preview on the PR is the test path. Local:

```bash
npm install
npm run dev
```

Refresh champ names (TW + pinyin only):

```bash
python -m pip install pypinyin
npm run content:champs
```

Django studio (curriculum admin):

```bash
cd studio
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py seed_curriculum
python manage.py createsuperuser
python manage.py runserver
```

Admin is http://127.0.0.1:8000/admin/. `export_content` writes `src/lib/content/phrases.generated.json`.

## License

All Rights Reserved © Menhir Holdings
