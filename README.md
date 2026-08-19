# Gamolingo

**HSK 不是 soloQ。這是。**

Onboarding and catch-up trainer for **台服 League of Legends chat**: survival lines, role calls, 巴龍 vs 大龍, and champion names as Taiwan actually says them.

For an HSK 5–6 Pinyin user. Microsoft Pinyin → Traditional is the IME; this product is the vocabulary.

- **Preview / prod:** Vercel project `gamolingo` (PR previews). Canonical later: https://gamolingo.menhir-holdings.com ([MT-181](https://linear.app/menhir-holdings/issue/MT-181))
- **Linear:** [Gamolingo](https://linear.app/menhir-holdings/project/gamolingo-f647145249e3)
- **Repo:** https://github.com/menhir-holdings/gamolingo

## Path

1. Role + champ pool + goal + HSK band
2. Optional 摸底
3. Tailored 課表 (survive / shotcall / local)
4. Drills (MCQ, pinyin, champ names, CN traps)
5. Timed 實戰 chat sim

Champion names are Data Dragon `en_US` / `zh_TW` / `zh_CN` (patch baked into `src/lib/content/champions.json`).

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Player | **SvelteKit** on Vercel | Menhir lattice. Interactive drills. You asked for Svelte. |
| Curriculum admin / accounts | **Django** in `studio/` | `django.contrib.auth` + admin. Seed/export JSON. Not the public runtime. |
| Not used | Meteor, Rails | They do not sit on GitHub → Vercel the way Menhir ships. |

Player progress is **localStorage** in v1. Live Django player accounts is [MT-180](https://linear.app/menhir-holdings/issue/MT-180).

## Develop

```bash
npm install
npm run dev
```

Refresh champ names:

```bash
python -m pip install pypinyin
npm run content:champs
```

Django studio (accounts + admin):

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
