from django.db import models

# Create your models here.
class register(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    company = models.CharField(max_length=30,verbose_name='公司')
    name = models.CharField(max_length=30,verbose_name='姓名')
    phone = models.IntegerField(verbose_name='电话')
    email = models.CharField(max_length=30,verbose_name='邮箱')
    position = models.CharField(max_length=30,verbose_name='地点')
    count = models.IntegerField(verbose_name='报名人数')
    courseid = models.IntegerField(verbose_name='课程名称')

    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "报名信息"
    def __str__(self):
        return self.company

# 课程表
class course(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30,verbose_name='课程名')
    coursetype = models.CharField(max_length=30,verbose_name='课程类型')  #课程类型
    brief = models.TextField(verbose_name='课程简介')
    years = models.IntegerField(verbose_name='开课年份')  #开课年份
    starttime = models.CharField(max_length=30,verbose_name='开始时间')
    endtime = models.CharField(max_length=30,verbose_name='结束时间')
    enrolment = models.IntegerField(verbose_name='报名人数') #报名人数
    imgurl = models.CharField(max_length=30)
    fileurl = models.CharField(max_length=30)
    teacher = models.IntegerField()
    location = models.CharField(max_length=30,verbose_name='地址')
    goodat = models.TextField(verbose_name='专长')  #擅长
    evaluation = models.TextField(verbose_name='课程评价')  #评价
    courseroffer = models.IntegerField(verbose_name='课程报价')  #课程报价
    days = models.IntegerField(verbose_name='课程天数')  #课程天数
    province = models.CharField(max_length=30,verbose_name='开课城市')  #开课城市

    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "课程库"
    # 一大坑
    def __str__(self):
        return self.name

# 往期回顾信息表
class history(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30,verbose_name='课程名')
    companyname = models.CharField(max_length=30,verbose_name='公司')   #从客户库获取公司名 ??
    filtertype = models.CharField(max_length=30)  #筛选辨别标识
    top = models.CharField(max_length=6)
    couseid = models.CharField(max_length=30)  # 课程库id
    teacherid = models.IntegerField() #讲师id
    time = models.CharField(max_length=20,verbose_name='留言时间') #时间
    imgurl = models.CharField(max_length=300)
    imgurll = models.CharField(max_length=30)

    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "往期回顾"
    # 一大坑
    def __str__(self):
        return self.name

#客户反馈表
class feedback(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    companyname = models.CharField(max_length=30,verbose_name='评价公司')   #从客户库获取公司名 ??
    evaluator = models.CharField(max_length=30,verbose_name='评价者')  #评价者姓名
    content = models.TextField(verbose_name='评价内容')    #评价内容
    time = models.CharField(max_length=30,verbose_name='评价时间') #时间
    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "客户反馈"

#讲师表
class lecturer(models.Model):
    id = models.AutoField(max_length=11,primary_key=True)
    name = models.CharField(max_length=30,verbose_name='姓名')
    brief = models.TextField(max_length=140,verbose_name='讲师简介')  # 讲师简介
    motto = models.TextField(max_length=100,verbose_name='座右铭') #讲师座右铭
    top = models.CharField(max_length=6) #是否置顶
    courseid = models.CharField(max_length=10)  # 课程库id
    imgurl = models.CharField(max_length=300)
    content = models.TextField(max_length=140,verbose_name='讲师描述')
    phone = models.IntegerField(verbose_name='电话')
    email = models.CharField(max_length=30,verbose_name='邮箱')
    fileurl = models.CharField(max_length=300)
    price = models.IntegerField(verbose_name='报价')

    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "讲师信息"

    # 一大坑
    def __str__(self):
        return self.name

#留言表
class message(models.Model):
    id = models.AutoField(max_length=11, primary_key=True,)
    name = models.CharField(max_length=30,verbose_name='姓名') #姓名
    phone = models.IntegerField(verbose_name='电话')#电话
    companyname = models.TextField(max_length=30,verbose_name='公司')  # 公司
    email = models.TextField(max_length=30,verbose_name='邮箱')  # 邮箱
    message = models.TextField(max_length=300,verbose_name='留言')  #留言内容

    class Meta:
        verbose_name = "选课报名"
        verbose_name_plural = "客户留言"
    # 一大坑
    def __str__(self):
        return self.companyname