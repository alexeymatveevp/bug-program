bug-program
===========

Bug program for test school 2014 Feb

== Online ==
online demo can be found here
http://188.120.236.130:8000/

== Bug list ==
v1.0:
1.	user can enter name more than 20 and get server error
2.	user can enter email more than 40 and get server error
3.	client date format is “mm.dd.YYYY” while the server is “dd.mm.YYYY”
4.	birth date can be incorrect – nothing will fall, but “None” will be written instead
5.	there is no server validation, client can be overpassed by javascript disabling, so we can store person with no “sex” or “email” for example
6.	XSS vulnerability to Name field
7.	/admin url is enabled
