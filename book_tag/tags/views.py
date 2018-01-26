from django.shortcuts import render
from django.http import HttpResponse
from tags.models import book_name
from tags.models import book_tags
import json

from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html')

def select_book(request):
    book_info = list(book_name.objects.values('id', 'name', 'author','time'))
    print(book_info)
    return HttpResponse(json.dumps(book_info))

@csrf_exempt #解决post请求验证问题
def select_tags(request):
    if request.method == 'POST':
        data = json.loads(request.POST['book_id'])
        print(data, '++++++++++++++++++++')
        print(type(data))
    tags = list(book_tags.objects.values('id','text').filter(book_id=data))
    print(tags)
    return HttpResponse(json.dumps(tags))