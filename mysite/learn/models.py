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
