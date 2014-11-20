<?php
require_once 'Model.php';

class Question extends Model {

	public $table = 'questions';

	function __construct() {
		parent::__construct();
	}

	/**
	*	Get question
	*	@param int $id
	*	@return json $question
	**/
	// public function get($id = null){
	// 	if(!empty($id)){
	// 		$question = $this->db->exec('SELECT * FROM questions WHERE id = :id', array('id' => $id));
	// 	}else{
	// 		$question = $this->db->exec('SELECT * FROM questions');
	// 	}
	// 	return $this->encode('questions', $question);
	// }

	/**
	*	Add question into database
	*	@param array $question
	*	@return int / boolean
	**/
	public function add($question){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(name, category_id, file, created)
			VALUES(:name, :category_id, :file, :created)',
			array(
				'name' => $question['name'],
				'category_id' => $question['category_id'],
				'file' => $question['file'],
				'created' => $this->datetime()
				)
			);
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	/**
	*	Generate questions for multiplayer
	*	@param string $category_name
	*	@param int $number
	*	@return array $question_responses
	**/
	public function generate_multi($category_name, $number){
		$category = $this->db->exec('SELECT id FROM categories WHERE LOWER(name) LIKE :name',
			array('name' => '%' . strtolower($category_name) . '%'));

		$questions = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE category_id = :category_id ORDER BY RAND() LIMIT ' . $number,
			array('category_id' => $category[0]['id']));

		foreach ($questions as $key => $question) {
			$question_responses[$key]['question'] = $question;
			$question_responses[$key]['anwsers'] = $this->db->exec('SELECT * FROM answers WHERE question_id = :question_id', array('question_id' => $question['id']));
		}

		// return $this->encode('questions', $questions);
		return (!empty($question_responses)) ? $question_responses: false;
	}

	/**
	*	Get by Category
	*	@param int $category_id
	*	@param int $limit
	*	@return array $question_responses
	**/
	public function getByCategory($category_id, $limit){
		$questions = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE category_id = :category_id ORDER BY RAND() LIMIT ' . $limit,
			array('category_id' => $category_id));

		if(!empty($questions)){
			foreach ($questions as $key => $question) {
				$question_responses[$key]['question'] = $question;
				$question_responses[$key]['anwsers'] = $this->db->exec('SELECT * FROM answers WHERE question_id = :question_id', array('question_id' => $question['id']));
			}
		}else{ return false; }

		return (!empty($question_responses)) ? $question_responses : false;
	}

	/**
	*	Check data validity
	*	@param array $question
	*	@return boolean $validate
	**/
	public function validate($question){
		$validate = true;

		if(empty($question['name'])){ $validate = false; }
		if(empty($question['category_id'])){ $validate = false; }
		if(empty($question['reponses'])){ $validate = false; }
		if(!isset($question['status'])){ $validate = false; }

		return $validate;
	}
}

?>