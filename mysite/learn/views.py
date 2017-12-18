from django.http import HttpResponse
from django.shortcuts import render
from learn.models import register
from learn.models import course
from learn.models import history
from learn.models import feedback
from learn.models import lecturer
from learn.models import message

import json
#33333333333333333333333333333333333333
def index(request):
    return render(request, 'index.html')
def insert(request):
    if request.method == 'POST':
        data = json.loads(request.POST['data'])
        print(data,'++++++++++++++++++++')
        print(type(data))
    # 获取id列最大长度
    # 写入数据库
    try:
        register.objects.create(company=data[0],name=data[1],phone=data[2],email=data[3],position=data[4],count=data[5],courseid=data[6])
    except Exception as err:
        return HttpResponse(False)
        print(err)
    return HttpResponse(True)

# 显示课程
def select_course(request):
    courses = list(course.objects.values('id','name','brief','imgurl'))
    return HttpResponse(json.dumps(courses))

#显示历史/反馈
def select_history(requset):
    his = list(history.objects.values('id','name','imgurl'))
    return HttpResponse(json.dumps(his))

#显示客户留言
def select_message(requset):
    mess = list(feedback.objects.values('id','companyname','evaluator','content')[:4])
    return HttpResponse(json.dumps(mess))

#显示往期公司列表
def select_company(request):
    company_name = list(history.objects.values('id','companyname','filtertype')[:5])
    return HttpResponse(json.dumps(company_name))

#显示置顶回顾图片
def select_pic(request):
    pics = list(history.objects.values('imgurl','top','name').filter(top="true"))
    return HttpResponse(json.dumps(pics))

#点击公司加载对应图片,课程名
def select_click(request):
    if request.is_ajax() and request.method == 'POST':
        id_val = request.POST['id']
        # print(request.POST['id'])
    pics = list(history.objects.values('imgurl','filtertype','name').filter(id=id_val))
    return HttpResponse(json.dumps(pics))
    # pics = list(history.objects.values('imgurl','filtertype').filter(id=''))

#讲师风采
def select_lec(request):
    lecturers = list(lecturer.objects.values('id','brief','courseid','imgurl','content','motto','name')[:4])
    # print(lecturers)
    # lsr = history.objects.values('name').filter(id=int(lecturers['courseid']))
    # print(lsr)
    for i in lecturers:
        temp = history.objects.values('name').filter(id=i['courseid'])
        course_name = temp[0]['name']
        i['courseid'] = course_name
    return HttpResponse(json.dumps(lecturers))

#写入留言
def insert_message(request):
    if request.is_ajax() and request.method == 'POST':
        data = json.loads(request.POST['leave_mess'])
        # print(data,'----------------')
        message.objects.create(name=data[0],phone=data[1],companyname=data[2],email=data[3],message=data[4])

    return HttpResponse(True)
