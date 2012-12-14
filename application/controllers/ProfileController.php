<?php

class ProfileController extends Zend_Controller_Action
{
	/**
	 * 
	 * @var Model_User
	 */
	private $user;
    public function init()
    {
        $this->view->option=array(
        		//'prova'=>array('name'=>'[PROVA]','value'=>'prova')
        );
        $this->user=Model_User::getInstance();
    }

    public function indexAction()
    {
        $this->view->can=Zend_Registry::get('config')->editusername;
        
        $this->view->key=array('NICK'=>$this->user->data['username'],'EMAIL'=>$this->user->data['email']);
    }

    public function editAction()
    {
        $this->_helper->layout->disableLayout();
    	$this->_helper->viewRenderer->setNoRender(true);
    	$bool='false';$mess='""';
    	$form=new Form_Register();
    	if ($e=$form->getElement($_POST['key'])) {
    		if ($e->isValid($_POST['value'])) {
    			$bool='true';
    			$this->user->updateU(array($_POST['key']=>$_POST['value']));
    		}
    		else $mess='"'.$this->_t->_('DATA_ERROR').'"';
    	}
    	else {
    		$mess='"'.$this->_t->_('DATA_ERROR').'"';
    	}
    	$this->view->setScriptPath(APPLICATION_PATH.'/views/scripts/template');
    	echo str_replace(array('BOOL','MESS'), array($bool,$mess), $this->view->render('ajax.phtml'));
    }

    public function ctrlAction()
    {
    	$this->_helper->layout->disableLayout();
    	$this->_helper->viewRenderer->setNoRender(true);
    	header("Content-type: application/json");
    	$username=$_POST['username'];
    	$email=$_POST['email'];
    	$db=new Zend_Validate_Db_NoRecordExists(array('table'=>PREFIX.'user','field'=>'username'));
    	$bool=true;
    	if ($username) {
    		$alnum= new Zend_Validate_Alnum();
    		$db->setField('username');
    		$bool= (($alnum->isValid($username)) && ($db->isValid($username)));
    	}
    	if ($email) {
    		$db->setField('email');
    		$vemail=new Zend_Validate_EmailAddress();
    		$bool= (($db->isValid($email)) && ($vemail->isValid($email)));
    	}
    	echo json_encode($bool);
    }


}





