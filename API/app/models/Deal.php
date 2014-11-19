<?php
require_once 'Model.php';

class Deal extends Model{

	public $table = 'good_deals';

	function __construct() {
		parent::__construct();
	}

	/**
	*	Add deal into database
	*	@param array $deal
	*	@return  int / boolean $deal_id
	**/
	public function add($deal){
		// suppresion de l'ancien deal à la une
		if($deal['first']){
			$deal_first = $this->getFirst($deal['category_id']);
			$st = $this->db->prepare('DELETE FROM deal_firsts WHERE id = :id');
			$st->execute(array('id' => $deal_first['id']));
		}

		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(name, section, description, address, lat, lng, img, category_id, created)
			 VALUES(:name, :section, :description, :address, :lat, :lng, :img, :category_id, :created)', array(
				'name' => $deal['name'],
				'section' => $deal['section'],
				'description' => $deal['description'],
				'address' => (!empty($deal['lieu'])) ? $deal['lieu'] : '',
				'lat' => $deal['lat'],
				'lng' => $deal['lng'],
				'img' => $deal['img'],
				'category_id' => $deal['category_id'],
				'created' => $this->datetime()
			 	));

		$deal_id = $this->db->lastInsertId();

		if($insert && $deal['first']){
			$st = $this->db->prepare('INSERT INTO deal_firsts(deal_id, created) VALUES(:deal_id, :created)');
			$first = $st->execute(array(
				'deal_id' => $deal_id,
				'created' => $this->datetime()
				));
		}

		return ($insert) ? $deal_id : false;
	}

	/**
	*	Get first deal by category
	*	@param int $category_id
	*	@return array / boolean $deal
	**/
	public function getFirst($category_id){
		$deal = $this->db->exec('SELECT * FROM good_deals
			JOIN deal_firsts ON good_deals.id = deal_firsts.deal_id
			WHERE category_id = :category_id',
			array('category_id' => $category_id));

		if(!empty($deal)){
			$category = $this->db->exec('SELECT name FROM categories WHERE id = :id',
			array('id' => $deal[0]['category_id']));
			$deal[0]['category'] = $category[0]['name'];
			return $deal[0];
		}else{
			return false;
		}
	}

	/**
	*	Get Deal by Section
	*	@param string $section
	*	@param int $page
	*	@return array / boolean $deal
	**/
	public function getBySection($section, $page = null){

		$start = ($page == 0) ? 1 : ($page - 1) * 6;
		$end = $start + 6;

		$deals = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE section = :section LIMIT ' . $start . ', ' . $end,
			array('section' => strtolower($section)));

		return (!empty($deals)) ? $deals : false;
	}

	/**
	*	Get Deal by Id
	*	@param int $deal_id
	*	@return array / boolean $deal
	**/
	public function getById($deal_id){
		$deal = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE id = :id', array(
			'id' => $deal_id));

		if(!empty($deal)){
			$category = $this->db->exec('SELECT name FROM categories WHERE id = :category_id',
				array('category_id' => $deal[0]['category_id']));
			$deal[0]['category'] = $category[0]['name'];
			return $deal[0];
		}else{
			return false;
		}
	}

	/**
	*	Get Deal by Category
	*	@param int $category_id
	*	@return array / int $deals
	**/
	public function getByCategory($category_id){

		$deals = $this->db->exec('SELECT * FROM ' . $this->table . '
			WHERE category_id = :category_id
			AND id NOT IN (SELECT deal_id FROM deal_firsts)',
			array('category_id' => $category_id));

		if(!empty($deals)){
			foreach ($deals as $key => $deal) {
				$category = $this->db->exec('SELECT name FROM categories WHERE id = :category_id',
				array('category_id' => $deal['category_id']));

				$deals[$key]['category'] = $category[0]['name'];
			}
			return $deals;
		}else{
			return false;
		}
	}

	/**
	*	Check data validity
	*	@param array $deal
	*	@return boolean $validate
	**/
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