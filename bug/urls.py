from django.conf.urls import patterns, url

from bug import views, validate

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^list$', views.list, name='list'),
	url(r'^add$', views.add, name='add'),
	url(r'^user/(?P<account>[a-zA-Z]+)/$', views.profile, name='profile'),
	url(r'^login/*$', views.login_view, name='login view'),
	url(r'^logout$', views.logout_view, name='logout'),
	url(r'^validate/email$', validate.validate_email_exist, name='validate email exist'),
	url(r'^validate/account$', validate.validate_account_exist, name='validate account exist'),
    url(r'^account/login$', views.do_login, name='login'),
)