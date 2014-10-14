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

	public function generate_categories(){
		$this->db->exec("INSERT INTO `categories` (`name`, `sex`, `created`) VALUES
			('Hipster', 'homme', '" . $this->datetime() . "'),
			('Barbie', 'femme', '" . $this->datetime() . "'),
			('Geek', 'homme', '" . $this->datetime() . "'),
			('Hippie', 'homme', '" . $this->datetime() . "'),
			('Candide', 'homme', '" . $this->datetime() . "'),
			('Bad Boy', 'homme', '" . $this->datetime() . "'),
			('Kéké', 'homme', '" . $this->datetime() . "'),
			('Intello', 'homme', '" . $this->datetime() . "'),
			('Garçon Manqué', 'femme', '" . $this->datetime() . "'),
			('Geek', 'femme', '" . $this->datetime() . "'),
			('Hippie', 'femme', '" . $this->datetime() . "'),
			('Bad Girl', 'femme', '" . $this->datetime() . "'),
			('Coquine', 'femme', '" . $this->datetime() . "'),
			('Intello', 'femme', '" . $this->datetime() . "')");
	}
}

?>