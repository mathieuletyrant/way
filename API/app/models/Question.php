<?php
require_once 'Model.php';

class Question extends Model {

	function __construct() {
		parent::__construct();
	}

	public function get($id = null){
		if(!empty($id)){
			$question = $this->db->exec('SELECT * FROM questions WHERE id = :id', array('id' => $id));
		}else{
			$question = $this->db->exec('SELECT * FROM questions');
		}
		return $this->encode('questions', $question);
	}

	public function add($question){
		$this->db->exec('INSERT INTO questions(name, category_id, created)
			VALUES(:name, :category_id, :created)',
				array(
					'name' => $question['name'],
					'category_id' => $question['category_id'],
					'created' => $this->datetime()
					)
				);
	}

	public function generate($number = 10){
		$question = $this->db->exec('SELECT * FROM questions ORDER BY RAND() LIMIT ' . $number);
		return $this->encode('questions', $question);
	}




}

 ?>