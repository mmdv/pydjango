from django.db import models

#书目信息
class book_name(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    name = models.CharField(max_length=30, verbose_name='书名')
    author = models.CharField(max_length=30, verbose_name='作者')
    brief = models.TextField(max_length=140,verbose_name='简介')
    chapter_total = models.IntegerField(verbose_name='章节总数')
    time = models.CharField(max_length=30, verbose_name='时间')

    class Meta:
        verbose_name = "书名"
        verbose_name_plural = "作者"

    # 一大坑
    def __str__(self):
        return self.name

# 书目章节
class book_chapter(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    book_id = models.IntegerField(verbose_name='书目id')
    name = models.CharField(max_length=30, verbose_name='章节名')
    chapter_number = models.IntegerField(verbose_name='章节数')

    class Meta:
        verbose_name = "书名"
        verbose_name_plural = "作者"

    # 一大坑
    def __str__(self):
        return self.name
#标签云
class book_tags(models.Model):
    id = models.AutoField(max_length=11, primary_key=True)
    book_id = models.IntegerField(verbose_name='书目id')
    text = models.TextField(max_length=140,verbose_name="标签")