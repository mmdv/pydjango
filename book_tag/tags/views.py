from django.shortcuts import render
from django.http import HttpResponse
from tags.models import book_name
from tags.models import book_tags
from tags.models import book_chapter
import json

from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html')

def tags(request):
    return render(request,'tags.html')

# 获取全部书名列表
def select_book(request):
    book_info = list(book_name.objects.values('id', 'name', 'author','time'))
    print(book_info)
    return HttpResponse(json.dumps(book_info))

#获取当前书名&简介
def select_info(request):
    if request.method == 'POST':
        data = json.loads(request.POST['book_id'])
    book_mess = list(book_name.objects.values('name','brief').filter(id=data))
    return HttpResponse(json.dumps(book_mess))

# 获取章节
def select_chapter(request):
    if request.method == 'POST':
        data = json.loads(request.POST['book_id'])
    chapter = list(book_chapter.objects.values('id','name','chapter_number').filter(book_id=data))
    print(chapter)
    return HttpResponse(json.dumps(chapter))

# 获取关键词标签
@csrf_exempt #解决post请求验证问题
def select_tags(request):
    if request.method == 'POST':
        print(request.POST)
        book_id_select = json.loads(request.POST['book_id'])
        chapter_id_select = json.loads(request.POST['chapter_id'])
    tags = list(book_tags.objects.values('id','text').filter(book_id=book_id_select).filter(chapter_id=chapter_id_select))
    print(tags)
    return HttpResponse(json.dumps(tags))