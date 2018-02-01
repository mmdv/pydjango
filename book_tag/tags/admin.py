from django.contrib import admin
from .models import book_chapter,book_tags,book_name

class book_nameAdmin(admin.ModelAdmin):
    list_display = ('id','name','author','chapter_total') #添加字段显示
    search_fields = ('id','name','author','chapter_total') #添加快速查询栏

admin.site.register(book_name,book_nameAdmin)
admin.site.register(book_chapter)
admin.site.register(book_tags)


