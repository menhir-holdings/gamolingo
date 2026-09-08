from django.db import models


class Phrase(models.Model):
    slug = models.SlugField(unique=True)
    traditional = models.CharField(max_length=32)
    pinyin = models.CharField(max_length=64)
    english = models.CharField(max_length=160)
    when = models.TextField()
    tags = models.CharField(max_length=160, help_text="comma-separated")
    roles = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["slug"]

    def __str__(self) -> str:
        return f"{self.traditional} ({self.slug})"


class Champion(models.Model):
    riot_id = models.CharField(max_length=40, unique=True)
    english = models.CharField(max_length=80)
    traditional = models.CharField(max_length=80)
    pinyin = models.CharField(max_length=120)
    cn_name = models.CharField(max_length=80)
    cn_title = models.CharField(max_length=80)
    lanes = models.CharField(max_length=80)
    icon = models.URLField()

    class Meta:
        ordering = ["english"]

    def __str__(self) -> str:
        return f"{self.english} · {self.traditional}"
