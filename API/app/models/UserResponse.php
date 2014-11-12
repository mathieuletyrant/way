<?php

require_once 'Model.php';

class UserResponse extends Model{

	public $table = 'user_responses';

	function __construct() {
		parent::__construct();
	}

	public function add($response){
		$insert = $this->db->prepare('INSERT INTO ' . $this->table . '(question_id, response_id, blind_id, created)
			VALUES(:question_id, :response_id, :blind_id, :created)');
		$response = $insert->execute(array(
			'question_id' => $response['question_id'],
			'response_id' => $response['response_id'],
			'blind_id' => $response['blind_id'],
			'created' => $this->datetime()
			));
		return ($response) ? $this->db->lastInsertId() : false;
	}

	public function validate($response){
		$validate = true;

		if(empty($response['question_id'])){ $validate = false; }
		if(!isset($response['response_id'])){ $validate = false; }
		if(empty($response['blind_id'])){ $validate = false; }

		return $validate;
	}

}

?>