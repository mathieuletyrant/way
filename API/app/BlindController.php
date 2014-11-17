<?php

class BlindController extends Controller {

	public $uses = array('Question', 'Category', 'Answer', 'Blind', 'UserResponse');

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
		$questions = array();

		foreach ($categories as $key => $category) {
			$question = $this->Question->getByCategory($category['id'], $limit = 4);
			if (!empty($question)) {
				$questions = $question;
			}
		}


		if(!empty($questions)){
			echo $this->Question->encode('questions', $questions);
		}else{
			$this->send_message(array('code' => '204', 'message' => 'not data found'));
		}
	}

	/**
	*	Mode multi
	*	@param nom_categorie
	*	@param nombre_questions
	**/
	public function multiplayer($f3, $d){
		if(!empty($d['category']) && !empty($d['number'])){
			$questions = $this->Question->generate_multi($d['category'], $d['number']);
			if(!empty($questions)){
				echo $this->Question->encode('questions', $questions);
			}else{
				$this->send_message(array('code' => '204', 'message' => 'not data found'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'missing or wrong parameters'));
		}
	}

	public function start($f3){

		if($blind = $f3->get('POST')){
			if($this->Blind->validate($blind)){
				if($blind_id = $this->Blind->create($blind)){
					$this->send_message(array('blind' => array('id' => $blind_id)));
				}else{
					$this->send_message(array('code' => '400', 'message' => 'database error'));
				}
			}else{
				$this->send_message(array('code' => '400', 'message' => 'missing parameters'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'bad request'));
		}
	}

	public function update($f3){
		if($blind = $f3->get('POST')){
			if($this->Blind->updateStatus($blind['id'], $blind['status'])){
				$this->send_message(array(
					'code' => '200',
					'message' => 'blind status updated to ' . $blind['status']
					));
			}else{
				$this->send_message(array('code' => '400', 'message' => 'database error'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'bad request'));
		}
	}

	public function response($f3){
		if($response = $f3->get('POST')){
			if($this->UserResponse->validate($response)){
				if($this->UserResponse->add($response)){
					$this->send_message(array('code' => '200', 'message' => 'response added'));
				}else{
					$this->send_message(array('code' => '400', 'message' => 'database error'));
				}
			}else{
				$this->send_message(array('code' => '400', 'message' => 'missing parameters'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'bad request'));
		}
	}





}


 ?>