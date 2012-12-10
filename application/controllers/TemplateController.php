<?php

class TemplateController extends Zend_Controller_Action
{

    public function init()
    {
        
    }

    public function indexAction()
    {
    	
    }

    public function ajaxAction()
    {
        $this->view->key=array('BOOL'=>$this->_getParam('bool','false'),'MESS'=>$this->_getParam('mess','"messaggio di errore"'));
    }


}







