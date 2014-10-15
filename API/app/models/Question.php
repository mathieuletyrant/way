<?php
require_once 'Model.php';

class Question extends Model {

	public $table = 'questions';

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
		$this->db->exec('INSERT INTO ' . $this->table . '(name, category_id, created)
			VALUES(:name, :category_id, :created)',
			array(
				'name' => $question['name'],
				'category_id' => $question['category_id'],
				'created' => $this->datetime()
				)
			);

	}

	public function generate_multi($category_name, $number){
		$category = $this->db->exec('SELECT id FROM categories WHERE LOWER(name) LIKE :name',
			array('name' => '%' . strtolower($category_name) . '%'));

		$questions = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE category_id = :category_id ORDER BY RAND() LIMIT ' . $number,
			array('category_id' => $category[0]['id']));

		return $this->encode('questions', $questions);
	}

	public function getByCategory($category_id, $limit){
		return $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE category_id = :category_id ORDER BY RAND() LIMIT ' . $limit,
			array('category_id' => $category_id));
	}
}

?>