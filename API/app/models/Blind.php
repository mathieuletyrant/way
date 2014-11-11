<?php

require_once 'Model.php';

class Blind extends Model{

	public $table = 'blinds';

	function __construct() {
		parent::__construct();
	}

	public function create($blind){
		$insert = $this->db->prepare('INSERT INTO ' . $this->table . '(status, type, user_id, friend_id, created)
			VALUES(:status, :type, :user_id, :friend_id, :created)');
		$insert->execute(array(
			'status' => $blind['status'],
			'type' => $blind['type'],
			'user_id' => $blind['user_id'],
			'friend_id' => (!empty($blind['friend_id'])) ? $blind['friend_id'] : '';
			'created' => $this->datetime()
			));
		return (!empty($insert)) ? $this->db->lastInsertId() : false;
	}

}

 ?>