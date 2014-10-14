<?php
require_once 'Model.php';

class Question extends Model {

	function __construct() {
		parent::__construct();
	}

	public function get($id = null){
		if(!empty($id)){

		}else{
			$question = $this->db->exec('SELECT * FROM questions');
		}
		return $this->encode('questions', $question);
	}

	public function add($f3){
		$this->db->exec('INSERT INTO questions(name, category_id, created)
			VALUES(:name, :category_id, :created',
				array(
					'name' => $f3->get('POST.name'),
					'category_id' => $f3->get('POST.category_id'),
					'created' => $this->datetime()
					)
				);
	}


}

 ?>