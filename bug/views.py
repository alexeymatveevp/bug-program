from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from datetime import datetime
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import RequestContext, loader
from bug.models import *
import json
from bug.validate import Validator


def list(request):
    persons = [row for row in Person.objects.all()]
    template = loader.get_template('list.html')
    context = RequestContext(request, {
        'persons': persons
    })
    return HttpResponse(template.render(context), content_type="text/html")


def add(request):
    if request.method == 'GET':
        positions = [row.position for row in Position.objects.all()]
        template = loader.get_template('add.html')
        context = RequestContext(request, {
            'positions': positions
        })
        return HttpResponse(template.render(context))
    elif request.method == 'POST':
        print request.POST['account'], request.POST['email'], request.POST['sex'], request.POST['position']
        valid = Validator.validateRegistration(request)
        print 'registration request valid: ', valid
        if valid:
            birthDateRequest = datetime.strptime(request.POST['birthDate'], "%m/%d/%Y")
            person = Person(account=request.POST['account'], first_name=request.POST['firstname'], last_name=request.POST['lastname'],
                            birthDate=birthDateRequest, email=request.POST['email'],
                            sex=request.POST['sex'], position=Position(position=request.POST['position']))
            person.save()

            newuser = User.objects.create_user(request.POST['account'], request.POST['email'], request.POST['passwd'])
            newuser.save()

            response_data = {'result': 'ok'}
        else:
            response_data = {'result': 'fault'}
        return HttpResponse(json.dumps(response_data), content_type="application/json")


def index(request):
    template = loader.get_template('index.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context), content_type="text/html")


@login_required
def profile(request, account):
    if request.method == 'GET':
        positions = [row.position for row in Position.objects.all()]
        person = Person.objects.get(account=account)
        template = loader.get_template('profile.html')
        context = RequestContext(request, {
            'person': person,
            'current_profile': account,
            'positions': positions
        })
        return HttpResponse(template.render(context), content_type="text/html")
    elif request.method == 'POST':
        person = Person.objects.get(account=account)
        if request.POST.get('account') is not None:
            person.account=request.POST.get('account')
        if request.POST.get('firstname') is not None:
            person.first_name=request.POST.get('firstname')
        if request.POST.get('lastname') is not None:
            person.last_name=request.POST.get('lastname')
        if request.POST.get('email') is not None:
            person.email=request.POST.get('email')
        if request.POST.get('bday') is not None:
            person.birthDate=datetime.strptime(request.POST.get('bday'), "%m/%d/%Y")
        if request.POST.get('position') is not None:
            person.position=Position.objects.get(position=request.POST.get('position'))
        if request.POST.get('about') is not None:
            person.about=request.POST.get('about')
        person.save()
        return HttpResponse(json.dumps({'result': 'ok'}), content_type="application/json")


def login_view(request):
    template = loader.get_template('login.html')
    context = RequestContext(request, {
        'next': request.GET['next']
    })
    return HttpResponse(template.render(context), content_type="text/html")


def do_login(request):
    uname = request.POST['username']
    passwd = request.POST['password']
    next = request.POST['next']

    user = authenticate(username=uname, password=passwd)
    if user is not None:
        login(request, user)
        return redirect(next)
    else:
        template = loader.get_template('login.html')
        context = RequestContext(request, {
            'message': 'Username or password is not correct',
            'next': next
        })
        return HttpResponse(template.render(context), content_type="text/html")


def logout_view(request):
    logout(request)
    return redirect('/')