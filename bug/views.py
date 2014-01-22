from django.shortcuts import render
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
        print request['name'], request['birthDate'], request['email'], request['sex'], request['position']
        person = Person(name=request['name'], birthDate=request['birthDate'], email=request['email'], sex=request['sex'], position=Position(position=request['position']))
        response_data = {}
        response_data['result'] = 'ok'
        return HttpResponse(json.dumps(response_data), content_type="application/json")