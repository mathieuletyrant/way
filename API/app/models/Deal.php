<?php
require_once 'Model.php';

class Deal extends Model{

	public $table = 'good_deals';

	function __construct() {
		parent::__construct();
	}

	public function add($deal){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(name, section, description, lat, lng, img, first, category_id, created)
			 VALUES(:name, :section, :description, :lat, :lng, :img, :first, :category_id, :created)', array(
				'name' => $deal['name'],
				'section' => $deal['section'],
				'description' => $deal['description'],
				'lat' => $deal['lat'],
				'lng' => $deal['lng'],
				'img' => $deal['img'],
				'first' => $deal['first'],
				'category_id' => $deal['category_id'],
				'created' => $this->datetime()
			 	));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	public function getFirst(){
		$deal = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE first = :first', array('first' => '1'));
		return (!empty($deal)) ? $deal[0] : false;
	}

	public function getBySection($section, $page = null){

		$start = ($page == 0) ? 1 : ($page - 1) * 6;
		$end = $start + 6;

		$deals = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE section = :section LIMIT ' . $start . ', ' . $end,
			array('section' => strtolower($section)));

		return (!empty($deals)) ? $deals : false;
	}

	public function validate($deal){
		$validate = true;

		if(empty($deal['name'])){ return false; }
		if(empty($deal['section'])){ return false; }
		if(empty($deal['description'])){ return false; }
		if(empty($deal['category_id'])){ return false; }

		if(!empty($deal['lieu'])){
			if(empty($deal['lat'])){ return false; }
			if(empty($deal['lng'])){ return false; }
		}

		return $validate;
	}

}

 ?>