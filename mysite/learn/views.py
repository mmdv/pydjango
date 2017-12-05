from django.http import HttpResponse
from django.shortcuts import render
from learn.models import register
from learn.models import course
from learn.models import history
from learn.models import feedback

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

# 显示课程
def select_course(request):
    courses = list(course.objects.values('id','name','brief','imgurl'))
    print(courses, '0000000--------------------------------')
    return HttpResponse(json.dumps(courses))

#显示历史/反馈
def select_history(requset):
    his = list(history.objects.values('id','name','imgurl'))
    print(his,'00000--------')
    return HttpResponse(json.dumps(his))

#显示客户留言
def select_message(requset):
    mess = list(feedback.objects.values('id','name','imgurl'))
    print(mess,'00000--------')
    return HttpResponse(json.dumps(mess))

#显示往期公司列表
def select_company(request):
    company_name = list(history.objects.values('companyname','filtertype')[:5])
    return HttpResponse(json.dumps(company_name))

#显示置顶回顾图片
def select_pic(request):
    pics = list(history.objects.values('imgurl','top').filter(top="true"))
    return HttpResponse(json.dumps(pics))