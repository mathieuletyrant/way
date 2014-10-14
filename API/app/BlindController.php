<?php

class BlindController extends Controller {

	public $uses = array('Question', 'Model');

	function __construct() {
		parent::__construct();
	}

	public function generate($f3, $d = null){
		if(!empty($d['number'])){
			echo $this->Question->generate($d['number']);
		}else{
			echo $this->Question->generate();
		}
	}

	public function singleplayer($f3, $d){

	}

	public function multiplayer($f3, $d){
		if(!empty($d['category']) && !empty($d['number'])){
			echo $this->Question->generate_multi($d['category'], $d['number']);
		}else{
			$this->send_error('Request error', 'missing or wrong parameters');
		}
	}

	/**
	*	Mode solo
	*	4 questions par categories
	*	5 categories
	*	homme/femme
	**/

	/**
	*	Mode multi
	*	@param nom_categorie
	*	@param nombre_questions
	**/

}


 ?>