from django.db import models

# Create your models here.

class Position(models.Model):
	position = models.CharField(max_length=40, primary_key=True)
	class Meta:
		db_table = 'position'
	def __unicode__(self):
		return self.position


class Person(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    birthDate = models.DateField()
    email = models.CharField(max_length=40)
    sex = models.CharField(max_length=6)
    position = models.ForeignKey(Position, db_column="position")
    class Meta:
    	db_table = 'person'
    def __unicode__(self):
    	return self.name

