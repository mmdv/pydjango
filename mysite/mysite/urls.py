"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
#22222222222222222222222222222
from learn import views as learn_views  # new

urlpatterns = [
    # 222222222222222222222222222222222222
    url(r'^$', learn_views.index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^insert$',learn_views.insert,name='insert'),
    url(r'^select_course$',learn_views.select_course,name='select_course'),
    url(r'^select_history$',learn_views.select_history,name='select_histroy'),
    url(r'^select_company$',learn_views.select_company,name='select_company'),
    url(r'^select_message$',learn_views.select_message,name='select_message'),
    url(r'^select_pic$',learn_views.select_pic,name='select_pic'),
    url(r'^select_click$',learn_views.select_click,name='select_click'),
    url(r'^select_lec$',learn_views.select_lec,name='select_lec'),
    url(r'^insert_message$',learn_views.insert_message,name='insert_message'),
    url(r'^get_file$',learn_views.get_file,name='get_file'),
]
