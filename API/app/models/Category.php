<?php

class Category extends Model{

	public $table = 'categories';

	function __construct() {
		parent::__construct();
	}


	function getBySex($sex){
		return $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE sex = :sex OR sex = "all"',
			array('sex' => $sex));
	}

}

 ?>