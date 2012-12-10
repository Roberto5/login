<?php
/**
 * user
 *
 * @author pagliaccio
 * @version
 */
require_once 'Zend/Db/Table/Abstract.php';
class Model_User extends Zend_Db_Table_Abstract {
	/**
	 * The default table name
	 */
	protected $_primary = 'id';
	/**
	 *
	 * @var Zend_Db_Table_Row_Abstract
	 */
	public $data;
	static private $instance;
	public $role;
	function __construct ($option)
	{
		$this->_name=PREFIX.'user';
		parent::__construct();
		if (is_int($option)) $query="`id`='$option'";
		elseif (is_array($option)) $query=$option;
		else throw new Zend_Db_Table_Exception(' $option params is not int or array');
		$this->data= $this->fetchRow($query);
		$id=intval($this->data['id']);
		self::$instance=$this;
	}
	static function getInstance($option=0) {
		if (self::$instance) return self::$instance;
		else return new Model_User($option);
	}
	/**
	 * registra un utente, ritorna true se la registrazione &egrave; andata bene.
	 * @param Array $vect indice per il campo e valore come valore
	 * @return bool
	 */
	static function register ($data)
	{
		if ($data) {
			$data['code_time']=time();
			self::getDefaultAdapter()->insert(PREFIX.'user',$data);
			return true;
		} else {
			return false;
		}
	}
	/**
	 * modifica i valori dell'utente
	 * @param Array $data indice per il campo e valore come valore
	 * @return bool
	 */
	function updateU ($data)
	{
		if ($data) {
			if (isset($data['code'])) {
				$data['code_time']=time();
			}
			return $this->update($data,"`id`='".$this->data['id']."'");
		}
		return false;
	}
}
?>