<?php

require_once 'Model.php';

class Category extends Model{

	public $table = 'categories';

	function __construct() {
		parent::__construct();
	}

	/**
	*	Get category by sex
	*	@param string $sex
	*	@return array $data
	**/
	public function getBySex($sex){
		return $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE sex = :sex',
			array('sex' => $sex));
	}

	/**
	*	Get by Name
	*	@param array $category
	*	@return array / boolean
	**/
	public function getByName($category){
		$category = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE name LIKE :name',
			array('name' => '%' . strtolower($category) . '%'));
		return (!empty($category)) ? $category[0] : false;
	}

}

 ?>