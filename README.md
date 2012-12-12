login
=====

##description

implement a login with zend framework

##install

    git clone git://github.com/pagliaccio/login.git

or download and extract the zip file.

##config

Create a database and import this file /docs/database.sql

open the file /application/configs/application.ini

    resources.db.params.host = "localhost"
    resources.db.params.username = "user"
    resources.db.params.password = "password"
    resources.db.params.dbname = "dbname"
    resources.db.adapter = "pdo_mysql"
    resources.db.isDefaultTableAdapter = "true"

Configure the database

    app.version = "0.1"

version of the app

    app.local = 0
    
for determines if scrip run on web or on local server (display banner, send email ecc...)
    
    app.debug = 0
    
debug mode

    app.email.validation = 1
    
active the validatio of accounts from email

    app.mobile=0
    
active the style or/and layout for mobile device (mobile interface not implemented)

    app.prefix=""
    
prefix of the table (if your database have more app)
    
    app.site="name site"
    
the name of site
    
    app.url= "http://miosito.org/"
    
url of the homepage
    
    app.webmail="admin@host.com"
    
email of web master
