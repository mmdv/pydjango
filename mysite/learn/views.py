from django.http import HttpResponse
from django.shortcuts import render
from learn.models import register
from learn.models import course
import json
#33333333333333333333333333333333333333
def index(request):
    return render(request, 'index.html')

def insert(request):
    if request.method == 'POST':
        data = json.loads(request.POST.get('data'))
        print(data,'++++++++++++++++++++')
        print(type(data))
    # 获取id列最大长度
    # 写入数据库
    register.objects.create(company=data[0],name=data[1],phone=data[2],email=data[3],position=data[4],count=data[5])
    return HttpResponse(True)

def select(request):
    courses = list(course.objects.values('id','name','brief','imgurl'))
    print(courses, '0000000--------------------------------')
    return HttpResponse(json.dumps(courses))