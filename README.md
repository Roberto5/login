login
=====

* [Instal](#instal)
* [Config](#config)
* [Customize](#customize)
 * [Css](#css)
 * [Javascript](#javascript)
* [Multi language support](#multi-language-support)
* [Simple template engine](#simple-template-engine)
 * [Functioning](#functioning)
* [Documentation of framework used](#documentation-of-framework-used)


##Description

implement a login with zend framework

##Instal

    git clone git://github.com/pagliaccio/login.git

or download and extract the zip file.

##Config

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


##Customize

###Css

every css file is compressed and cached from the file css.php

open the file [/common/css/css.php](https://github.com/pagliaccio/login/blob/master/common/css/css.php) 

    $css=array(
		'jquery-ui.css',
		'scroll.css');

add your file css

    $key=array('NORMAL'=>'#e6e6e6',
    	'HOVER'=>'#dadada',
		'ACTIVE'=>'#eee',
		'INPUT_TEXT'=>'#000',
		'INPUT_BG'=>'#fff',
		'BACKGROUND2'=>'#aaa',
		'BACKGROUND'=>'#eee',
		'COLOR'=>'#000',
		'BORDER'=>'#001'
	);

remplace every key of array whit value

###Javascript

like a css, there are a file js.php

for add a script file open [/common/js/js.php](https://github.com/pagliaccio/login/blob/master/common/js/js.php) 
and find

    $file=array(    	
		"*framework*",
		"jquery.js",
		"jquery-ui.js",
		//uso cokie
		"jquery.cookie.js",
		// scroller
		"jquery.li-scroller.1.0.js",
		//form validate
		'jquery.validate.min.js',
		'*main script*',
		"main.js"
		,'reg.js');

element with '*content*' is a comment for separate the file.

##Multi language support

This script use Zend\_traslate. Zend\_trastlate take the word in the directory /application/language.
the file in this directory has this name:
    locale_string.csv
and contain the word width this sintax
key@value

for jquery validate the file of language support is locate in /common/js/localization/

##Simple template engine

The template engine is locate here:

 application/plugin/Tmpeng.php
view filter, remplace the key with value and traslate the string like this [stringtotranslate]
 application / plugin / myTmpEng.php
zend controller plugin, for config the view filter

###Functioning

on file .phtml 
    <?php
    //$this->name='pagliaccio';
    $this->key=array('NUM'=>6,'NAME'=>$this->name);
    //every string on [] is translate from zend_translate
    ?>
    <center>[HELLO] NAME you are on position NUM</center>
    
output
    
    <center>ciao pagliaccio you are on position 6</center>
    
you can also write the key on action controller because the view is accesible with $this->view->key

##documentation of framework used

* [jQuery](http://jquery.com)
* [Zend](www.zend.com)
* [jQuery validation](http://bassistance.de/jquery-plugins/jquery-plugin-validation/)
