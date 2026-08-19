from django.contrib import admin

from .models import Champion, Phrase


@admin.register(Phrase)
class PhraseAdmin(admin.ModelAdmin):
    list_display = ("traditional", "pinyin", "english", "tags")
    search_fields = ("traditional", "pinyin", "english", "slug")


@admin.register(Champion)
class ChampionAdmin(admin.ModelAdmin):
    list_display = ("english", "traditional", "pinyin", "cn_name")
    search_fields = ("english", "traditional", "cn_name", "riot_id")
