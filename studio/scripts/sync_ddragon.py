#!/usr/bin/env python3
"""Pull en_US / zh_TW / zh_CN champion names from Data Dragon into the player."""

from __future__ import annotations

import json
import urllib.request
from pathlib import Path

from pypinyin import Style, lazy_pinyin

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "lib" / "content" / "champions.json"
VERSION_URL = "https://ddragon.leagueoflegends.com/api/versions.json"

LANE_OVERRIDES: dict[str, list[str]] = {
    "Aatrox": ["top"],
    "Ahri": ["mid"],
    "Akali": ["mid", "top"],
    "Alistar": ["support"],
    "Amumu": ["jungle"],
    "Aphelios": ["adc"],
    "Ashe": ["adc"],
    "Aurora": ["mid"],
    "Bard": ["support"],
    "Blitzcrank": ["support"],
    "Braum": ["support"],
    "Caitlyn": ["adc"],
    "Camille": ["top"],
    "Darius": ["top"],
    "Elise": ["jungle"],
    "Ezreal": ["adc"],
    "Fiora": ["top"],
    "Garen": ["top"],
    "Graves": ["jungle"],
    "Irelia": ["top", "mid"],
    "JarvanIV": ["jungle"],
    "Jax": ["top", "jungle"],
    "Jhin": ["adc"],
    "Jinx": ["adc"],
    "KSante": ["top"],
    "Kaisa": ["adc"],
    "Karma": ["support", "mid"],
    "Katarina": ["mid"],
    "Kayn": ["jungle"],
    "KhaZix": ["jungle"],
    "Kindred": ["jungle"],
    "Leblanc": ["mid"],
    "LeeSin": ["jungle"],
    "Lillia": ["jungle"],
    "Lucian": ["adc", "mid"],
    "Lulu": ["support"],
    "Malphite": ["top", "mid"],
    "Milio": ["support"],
    "MissFortune": ["adc"],
    "Nami": ["support"],
    "Nautilus": ["support"],
    "Nidalee": ["jungle"],
    "Orianna": ["mid"],
    "Ornn": ["top"],
    "Pyke": ["support"],
    "Rakan": ["support"],
    "Rell": ["support"],
    "Renekton": ["top"],
    "Sett": ["top", "support"],
    "Smolder": ["adc"],
    "Sylas": ["mid", "jungle"],
    "Syndra": ["mid"],
    "Teemo": ["top"],
    "Thresh": ["support"],
    "TwistedFate": ["mid"],
    "Varus": ["adc"],
    "Viego": ["jungle"],
    "Viktor": ["mid"],
    "XinZhao": ["jungle"],
    "Yasuo": ["mid", "top"],
    "Yone": ["mid", "top"],
    "Zed": ["mid", "jungle"],
    "Zeri": ["adc"],
}


def default_lanes(tags: list[str]) -> list[str]:
    lanes: list[str] = []
    if "Marksman" in tags:
        lanes.append("adc")
    if "Support" in tags:
        lanes.append("support")
    if "Mage" in tags:
        lanes.append("mid")
    if "Assassin" in tags:
        lanes.extend(["mid", "jungle"])
    if "Fighter" in tags:
        lanes.extend(["top", "jungle"])
    if "Tank" in tags:
        lanes.extend(["top", "jungle", "support"])
    seen: list[str] = []
    for lane in lanes:
        if lane not in seen:
            seen.append(lane)
    return seen or ["fill"]


def load(locale: str, version: str) -> dict:
    url = (
        "https://ddragon.leagueoflegends.com/cdn/"
        f"{version}/data/{locale}/champion.json"
    )
    with urllib.request.urlopen(url) as response:
        return json.load(response)["data"]


def main() -> None:
    with urllib.request.urlopen(VERSION_URL) as response:
        version = json.load(response)[0]
    en = load("en_US", version)
    tw = load("zh_TW", version)
    cn = load("zh_CN", version)
    champs = []
    for key, row in en.items():
        tw_row = tw[key]
        cn_row = cn[key]
        tw_name = tw_row["name"]
        champs.append(
            {
                "id": key,
                "key": row["key"],
                "en": row["name"],
                "tw": tw_name,
                "cnName": cn_row["name"],
                "cnTitle": cn_row["title"],
                "twTitle": tw_row["title"],
                "pinyin": " ".join(lazy_pinyin(tw_name, style=Style.TONE)),
                "tags": row.get("tags", []),
                "lanes": LANE_OVERRIDES.get(key) or default_lanes(row.get("tags", [])),
                "icon": (
                    "https://ddragon.leagueoflegends.com/cdn/"
                    f"{version}/img/champion/{row['image']['full']}"
                ),
            }
        )
    champs.sort(key=lambda item: item["en"])
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {"version": version, "champions": champs}
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(champs)} champions ({version}) -> {OUT}")


if __name__ == "__main__":
    main()
