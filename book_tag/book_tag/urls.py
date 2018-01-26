"""book_tag URL Configuration

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
from tags import views as tags_views #new
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', tags_views.index,name='index'),#new
    url(r'^select_book$', tags_views.select_book,name='select_book'),#new
    url(r'^select_tags$', tags_views.select_tags,name='select_tags'),#new
]
