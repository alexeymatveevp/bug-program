from django.db import models

# Create your models here.

class Position(models.Model):
    position = models.CharField(max_length=40, primary_key=True)

    class Meta:
        db_table = 'position'

    def __unicode__(self):
        return self.position


class Person(models.Model):
    account = models.CharField(max_length=30, primary_key=True)
    first_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20, null=True)
    birthDate = models.DateField(null=True)
    email = models.CharField(max_length=40, null=True)
    sex = models.CharField(max_length=6)
    position = models.ForeignKey(Position, db_column="position", null=True)
    about = models.CharField(max_length=400, null=True)

    class Meta:
        db_table = 'person'

    def __unicode__(self):
        return self.account

