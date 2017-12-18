from django.contrib import admin
from .models import Article,Person

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title','pub_date','update_time')
# Register your models here.

class PersonAdmin(admin.ModelAdmin):
    list_display = ('full_name',)
# Register your models here.
admin.site.register(Article,ArticleAdmin)
admin.site.register(Person,PersonAdmin)