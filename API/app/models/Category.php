<?php

require_once 'Model.php';

class Category extends Model{

	public $table = 'categories';

	function __construct() {
		parent::__construct();
	}

	public function getBySex($sex){
		return $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE sex = :sex OR sex = "all"',
			array('sex' => $sex));
	}

	public function getByName($category){
		$category = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE name LIKE :name',
			array('name' => '%' . strtolower($category) . '%'));
		return (!empty($category)) ? $category[0] : false;
	}

}

 ?>