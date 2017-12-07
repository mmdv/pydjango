from django.db import models

# Create your models here.
class register(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    company = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    phone = models.IntegerField()
    email = models.CharField(max_length=30)
    position = models.CharField(max_length=30)
    count = models.IntegerField()
    courseid = models.IntegerField()

# 课程表
class course(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30)
    coursetype = models.CharField(max_length=30)  #课程类型
    brief = models.TextField()
    years = models.IntegerField()  #开课年份
    starttime = models.CharField(max_length=30)
    endtime = models.CharField(max_length=30)
    enrolment = models.IntegerField() #报名人数
    imgurl = models.CharField(max_length=30)
    fileurl = models.CharField(max_length=30)
    teacher = models.IntegerField()
    location = models.CharField(max_length=30)
    goodat = models.TextField()  #擅长
    evaluation = models.TextField()  #评价
    courseroffer = models.IntegerField()  #课程报价
    days = models.IntegerField()  #课程天数
    province = models.CharField(max_length=30)  #开课城市

    # 一大坑
    def __str__(self):
        return self.name

# 往期回顾信息表
class history(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30)
    companyname = models.CharField(max_length=30 )   #从客户库获取公司名 ??
    filtertype = models.CharField(max_length=30)  #筛选辨别标识
    top = models.CharField(max_length=6)
    couseid = models.CharField(max_length=30)  # 课程库id
    teacherid = models.IntegerField() #讲师id
    time = models.CharField(max_length=20) #时间
    imgurl = models.CharField(max_length=300)
    imgurll = models.CharField(max_length=30)
    # 一大坑
    def __str__(self):
        return self.name

#客户反馈表
class feedback(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    companyname = models.CharField(max_length=30 )   #从客户库获取公司名 ??
    evaluator = models.CharField(max_length=30)  #评价者姓名
    content = models.TextField()    #评价内容
    time = models.CharField(max_length=30) #时间

#讲师表
class lecturer(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    name = models.CharField(max_length=30)
    brief = models.TextField(max_length=140)  # 讲师简介
    motto = models.TextField(max_length=100) #讲师座右铭
    top = models.CharField(max_length=6) #是否置顶
    courseid = models.CharField(max_length=10)  # 课程库id
    imgurl = models.CharField(max_length=300)
    content = models.TextField(max_length=140)
    phone = models.IntegerField()
    email = models.CharField(max_length=30)
    fileurl = models.CharField(max_length=300)
    price = models.IntegerField()

    # 一大坑
    def __str__(self):
        return self.name

#留言表
class message(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30) #姓名
    phone = models.IntegerField()#电话
    companyname = models.TextField(max_length=30)  # 公司
    email = models.TextField(max_length=30)  # 邮箱
    message = models.TextField(max_length=300)  #留言内容

    # 一大坑
    def __str__(self):
        return self.name