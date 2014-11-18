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
			'response_id' => (!empty($response['response_id'])) ? $response['response_id'] : null,
			'blind_id' => $response['blind_id'],
			'created' => $this->datetime()
			));

		return ($response) ? $this->db->lastInsertId() : false;
	}

	public function validate($response){
		$validate = true;

		if(empty($response['question_id'])){ $validate = false; }
		if(empty($response['blind_id'])){ $validate = false; }

		return $validate;
	}

	public function getTrue($blind_id, $category_id){
		$user_responses = $this->db->exec('SELECT * FROM ' . $this->table . '
			JOIN questions ON ' . $this->table . '.question_id = questions.id
			JOIN answers  ON ' . $this->table . '.response_id = answers.id
			WHERE questions.category_id = :category_id
			AND answers.status = :status
			AND ' . $this->table . '.blind_id = :blind_id',
			array(
				'category_id' => $category_id,
				'status' => true,
				'blind_id' => $blind_id
			));
		return (!empty($user_responses)) ? $user_responses : false;
	}

}

?>