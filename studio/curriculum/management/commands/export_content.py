from __future__ import annotations

import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from curriculum.models import Phrase


class Command(BaseCommand):
    help = "Write Phrase rows to src/lib/content/phrases.generated.json for the player."

    def handle(self, *args, **options):
        rows = [
            {
                "id": phrase.slug,
                "tw": phrase.traditional,
                "pinyin": phrase.pinyin,
                "en": phrase.english,
                "when": phrase.when,
                "tags": [tag for tag in phrase.tags.split(",") if tag],
                "roles": [role for role in phrase.roles.split(",") if role] or None,
            }
            for phrase in Phrase.objects.all()
        ]
        out = Path(settings.PLAYER_DIR) / "src" / "lib" / "content" / "phrases.generated.json"
        out.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        self.stdout.write(f"wrote {len(rows)} phrases -> {out}")
