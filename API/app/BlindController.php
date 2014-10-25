<?php

class BlindController extends Controller {

	public $uses = array('Question', 'Category');

	function __construct() {
		parent::__construct();
	}

	/**
	*	Mode solo
	*	4 questions par categories
	*	5 categories
	*	homme/femme
	**/
	public function singleplayer($f3, $d){

		$categories = $this->Category->getBySex($d['sex']);

		foreach ($categories as $key => $category) {
			$questions[$category['name']] = $this->Question->getByCategory($category['id'], $limit = 4);
		}

		echo $this->Question->encode('questions', $questions);
	}

	/**
	*	Mode multi
	*	@param nom_categorie
	*	@param nombre_questions
	**/
	public function multiplayer($f3, $d){
		if(!empty($d['category']) && !empty($d['number'])){
			echo $this->Question->encode('questions', $this->Question->generate_multi($d['category'], $d['number']));
		}else{
			$this->send_error('Request error', 'missing or wrong parameters');
		}
	}





}


 ?>