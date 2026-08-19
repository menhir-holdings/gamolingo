from __future__ import annotations

import json
import re
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from curriculum.models import Champion, Phrase

PHRASE_BLOCK = re.compile(
    r"id:\s*'(?P<id>[^']+)'.*?tw:\s*'(?P<tw>[^']+)'.*?pinyin:\s*'(?P<pinyin>[^']+)'.*?en:\s*'(?P<en>[^']+)'.*?when:\s*'(?P<when>[^']+)'.*?tags:\s*\[(?P<tags>[^\]]*)\]",
    re.S,
)


class Command(BaseCommand):
    help = "Load Data Dragon champions + player phrases.ts into Django."

    def handle(self, *args, **options):
        player = Path(settings.PLAYER_DIR)
        champ_path = player / "src" / "lib" / "content" / "champions.json"
        payload = json.loads(champ_path.read_text(encoding="utf-8"))
        count = 0
        for row in payload["champions"]:
            Champion.objects.update_or_create(
                riot_id=row["id"],
                defaults={
                    "english": row["en"],
                    "traditional": row["tw"],
                    "pinyin": row["pinyin"],
                    "cn_name": row.get("cnName") or "",
                    "cn_title": row.get("cnTitle") or "",
                    "lanes": ",".join(row["lanes"]),
                    "icon": row["icon"],
                },
            )
            count += 1
        self.stdout.write(f"champions: {count}")

        source = (player / "src" / "lib" / "content" / "phrases.ts").read_text(encoding="utf-8")
        phrases = 0
        for match in PHRASE_BLOCK.finditer(source):
            tags = ",".join(
                part.strip().strip("'\"")
                for part in match.group("tags").split(",")
                if part.strip()
            )
            Phrase.objects.update_or_create(
                slug=match.group("id"),
                defaults={
                    "traditional": match.group("tw"),
                    "pinyin": match.group("pinyin"),
                    "english": match.group("en"),
                    "when": match.group("when"),
                    "tags": tags,
                },
            )
            phrases += 1
        self.stdout.write(f"phrases: {phrases}")
