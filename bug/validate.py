from datetime import datetime
import json
from django.http import HttpResponse
from bug.models import Person

__author__ = 'david'


def validate_email_exist(request):
    response = {}
    email = request.GET['email']
    emails = [row.email for row in Person.objects.all()]
    if email in emails:
        response['result'] = 'fault'
    else:
        response['result'] = 'ok'
    return HttpResponse(json.dumps(response), content_type="application/json")


def validate_account_exist(request):
    response = {}
    account = request.GET['account']
    accounts = [row.account for row in Person.objects.all()]
    if account in accounts:
        response['result'] = 'fault'
    else:
        response['result'] = 'ok'
    return HttpResponse(json.dumps(response), content_type="application/json")


class Validator:
    @staticmethod
    def name(name):
        return True

    @staticmethod
    def email(email):
        return True

    @staticmethod
    def date(date):
        try:
            birthDateRequest = datetime.strptime(date, "%m/%d/%Y")
            return True
        except Exception:
            print 'date is not correct: ', date
            return False

    @staticmethod
    def validateRegistration(request):
        c1 = Validator.name(request.POST['account'])
        c2 = Validator.email(request.POST['email'])
        c3 = Validator.date(request.POST['birthDate'])
        return c1 & c2 & c3