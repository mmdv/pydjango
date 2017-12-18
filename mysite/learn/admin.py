from django.contrib import admin
from .models import register
from .models import course
from .models import history
from .models import feedback
from .models import lecturer
from .models import message
# Register your models here.

class registerAdmin(admin.ModelAdmin):
    list_display = ('company','name','count')
admin.site.register(register,registerAdmin)


@admin.register(course)
class courseAdmin(admin.ModelAdmin):
    list_display = ('id','name','coursetype','brief','years','starttime','endtime','enrolment','teacher','location','goodat','evaluation','courseroffer','days','province')
@admin.register(history)
class historyAdmin(admin.ModelAdmin):
    list_display = ('id','name','companyname','time')
@admin.register(feedback)
class feedbackAdmin(admin.ModelAdmin):
    list_display = ('id','companyname','evaluator','content','time')
@admin.register(lecturer)
class lecturerAdmin(admin.ModelAdmin):
    list_display = ('id','name','brief','motto','content','phone','email','price')
@admin.register(message)
class messageAdmin(admin.ModelAdmin):
    list_display = ('id','name','phone','companyname','email','message')


