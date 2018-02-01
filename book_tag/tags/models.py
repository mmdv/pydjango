import django.utils.timezone as timezone
from django.db import models

#书目信息
class book_name(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30, verbose_name='书名')
    author = models.CharField(max_length=30, verbose_name='作者')
    brief = models.TextField(max_length=500,verbose_name='简介')
    chapter_total = models.IntegerField(verbose_name='章节总数')
    add_date = models.DateTimeField('保存日期', default=timezone.now)
    mod_date = models.DateTimeField('最后修改日期', auto_now=True)

    class Meta:
        verbose_name = "书名"
        verbose_name_plural = "书名"

    # 一大坑
    def __str__(self):
        return self.name

# 书目章节
class book_chapter(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    book_id = models.IntegerField(verbose_name='书目id')
    name = models.CharField(max_length=30, verbose_name='章节名')
    chapter_number = models.IntegerField(verbose_name='章节id')

    class Meta:
        verbose_name = "书目章节"
        verbose_name_plural = "书目章节"

    # 一大坑
    def __str__(self):
        return self.name
#标签云
class book_tags(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30, verbose_name='标签')
    book_id = models.IntegerField(verbose_name='书目id')
    chapter_id = models.IntegerField(verbose_name='章节id')
    text = models.TextField(max_length=140,verbose_name="具体描述")

    # 一大坑
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "标签云"
        verbose_name_plural = "标签云"