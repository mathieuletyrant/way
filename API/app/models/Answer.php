<?php
require_once 'Model.php';

class Answer extends Model {

	public $table = 'answers';

	function __construct() {
		parent::__construct();
	}

	public function add($answer){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . ' (question_id, answer, file, status, created)
			VALUES(:question_id, :answer, :file, :status, :created)',
			array(
				'question_id' => $answer['question_id'],
				'answer' => $answer['answer'],
				'file' => $answer['file'],
				'status' => $answer['status'],
				'created' => $this->datetime()
				));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

}

?>