from django.contrib import admin
from bug.models import *

# Register your models here.

class PersonAdmin(admin.ModelAdmin):
    list_display = ['account', 'birthDate', 'sex', 'position']


class PositionAdmin(admin.ModelAdmin):
    list_display = ['position']


admin.site.register(Position, PositionAdmin)
admin.site.register(Person, PersonAdmin)