<?php
require_once 'Model.php';

class Deal extends Model{

	public $table = 'good_deals';

	function __construct() {
		parent::__construct();
	}

	public function getFirst(){
		$deal = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE first = :first', array('first' => '1'));
		return (!empty($deal)) ? $deal : false;
	}

	public function getBySection($section){
		$deals = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE section = :section', array('section' => strtolower($section)));
	}

}

 ?>