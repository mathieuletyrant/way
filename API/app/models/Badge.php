<?php
require_once 'Model.php';

class Badge extends Model {

	public $table = 'badges';

	function __construct() {
		parent::__construct();
	}

	public function add($badge){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . ' (name, picture, category_id, created)
			VALUES(:name, :picture, :category_id, :created)',
			array(
				'name' => $badge['name'],
				'picture' => $badge['picture'],
				'category_id' => $badge['category_id'],
				'created' => $this->datetime()
				));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	public function validate($badge){
		$validate = true;

		if(empty($badge['name'])){ $validate = false; }
		if(empty($badge['category_id'])){ $validate = false; }

		return $validate;
	}

}

?>