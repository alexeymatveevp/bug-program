from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from django.template import RequestContext, loader
from bug.models import *
from django.core import serializers
import json

# Create your views here.

def index(request):
        persons = [row for row in Person.objects.all()]
        template = loader.get_template('index.html')
        context = RequestContext(request, {
            'persons': persons
        })
        return HttpResponse(template.render(context), content_type="text/html")
    

def add(request):
    if (request.method == 'GET'):
        positions = [row.position for row in Position.objects.all()]
        template = loader.get_template('add.html')
        context = RequestContext(request, {
            'positions': positions
        })
        return HttpResponse(template.render(context))
    elif (request.method == 'POST'):
        print request.POST['name'], request.POST['email'], request.POST['sex'], request.POST['position']
        birthDateRequest = None
        try:
            birthDateRequest = datetime.strptime(request.POST['birthDate'], "%d/%m/%Y")
        except Exception:
            print 'date is not correct: ', request.POST['birthDate']
        person = Person(name=request.POST['name'], birthDate=birthDateRequest, email=request.POST['email'], sex=request.POST['sex'], position=Position(position=request.POST['position']))
        person.save()
        response_data = {}
        response_data['result'] = 'ok'
        return HttpResponse(json.dumps(response_data), content_type="application/json")

def validate(request):
    template = loader.get_template('validate.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context), content_type="text/html")