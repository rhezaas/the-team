"""Admin classes for the team app."""
from django.contrib import admin

from . import models

class MemberAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Member, MemberAdmin)