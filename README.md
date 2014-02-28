bug-program
===========

Bug program for t-systems test school 2014 Feb.

Program is written for education purpose to **help students understand quality assuarance system** and give them a sandbox to play before the big game begins. Every version of application is distributed in it's own branch, so **every next lession the new version of bug-program can be introduced** with new bug list. The idea it to **simulate real application** which can change from version to version and write new tests for new version as well as **perform regression tests for previous version functionality**.

### Online
Online demo can be found here

http://davidluckystar:8001/

### Specification
Actual specification can be found in file **spec_and_buglist.docx** in this repository

### Bug list
v1.0:

1. user can enter name more than 20 and get server error
2. user can enter email more than 40 and get server error
3. client date format is “mm.dd.YYYY” while the server is “dd.mm.YYYY”
4. birth date can be incorrect – nothing will fall, but “None” will be written instead
5. there is no server validation, client can be overpassed by javascript disabling, so we can store person with no “sex” or “email” for example
6. XSS vulnerability to Name field
7. /admin url is enabled
