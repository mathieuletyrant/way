<?php

class Model {

	protected $db;

	function __construct() {
		$this->db = new \DB\SQL('mysql:host=localhost;port=3306;dbname=way','root','root');
	}

	public function encode($name, $data = array()){
		header('Content-Type: application/json');
		return '{"' . $name . '": ' . json_encode($data) . '}';
	}

	public function datetime(){
		return date('Y-m-d H:i:s');
	}

	public function generate_questions(){
		for($i = 0; $i < 20; $i++){
			$name = file_get_contents('http://loripsum.net/api/1/short/plaintext');
			$id = $this->db->exec('SELECT id FROM categories ORDER BY RAND() LIMIT 1')[0];
			$category_id= $id['id'];
			$this->db->exec('INSERT INTO questions(name, category_id, created) VALUES(:name, :category_id, :created)',
				array('name' => $name, 'category_id' => $category_id, 'created' => $this->datetime()));
		}
	}

	public function generate_responses($question_id){

	}

	public function generate_categories(){
		$this->db->exec("INSERT INTO `categories` (`name`, `sex`, `created`) VALUES
			('Geek', 'all', '" . $this->datetime() . "'),
			('DragQueen', 'male', '" . $this->datetime() . "'),
			('Hippie', 'all', '" . $this->datetime() . "'),
			('Bad Boy', 'male', '" . $this->datetime() . "'),
			('Keke', 'male', '" . $this->datetime() . "'),
			('Barbie', 'female', '" . $this->datetime() . "'),
			('Bad Girl', 'female', '" . $this->datetime() . "'),
			('Candide', 'female', '" . $this->datetime() . "')");
	}
}

?>