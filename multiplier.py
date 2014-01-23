import sys
import os
import shutil

def main():
	os.chdir('..')
	for i in range(15):
		instanceDir = './prod/inst'+str(i)
		port = 8000+i
		shutil.copytree('bug-program',instanceDir)
		os.chdir(instanceDir)
		os.system('python manage.py runserver ' + str(port) + ' &')
		os.chdir('../..')

if __name__ == "__main__":
    main()