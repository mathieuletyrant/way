<?php

class BlindController extends Controller {

	public $uses = array('Question', 'Category', 'Answer', 'Blind', 'UserResponse');

	function __construct() {
		parent::__construct();
	}

	/**
	*	Get singleplayer blindtest
	*	Mode solo
	*	4 questions par categories
	*	5 categories
	*	homme/femme
	*	@param object $f3
	*	@return json list of questions/responses
	**/
	public function singleplayer($f3){

		$categories = $this->Category->getBySex($f3->get('PARAMS.sex'));
		$questions = array();

		foreach ($categories as $key => $category) {
			$question = $this->Question->getByCategory($category['id'], $limit = 4);
			if (!empty($question)) {
				if(sizeof($question) > 1){
					foreach ($question as $key => $q) {
						$questions[] = $q;
					}
				}else{
					$questions[] = $question[0];
				}

			}
		}

		if(!empty($questions)){
			echo $this->Question->encode('questions', $questions);
		}else{
			$this->send_message(array('code' => '204', 'message' => 'not data found'));
		}
	}

	/**
	*	Get multiplayer blind test
	*	@param object $f3
	**/
	public function multiplayer($f3){
		if(!empty($f3->get('PARAMS.category')) && !empty($f3->get('PARAMS.number'))){
			$questions = $this->Question->generate_multi(
				$f3->get('PARAMS.category'), $f3->get('PARAMS.number')
				);

			if(!empty($questions)){
				echo $this->Question->encode('questions', $questions);
			}else{
				$this->send_message(array('code' => '204', 'message' => 'not data found'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'missing or wrong parameters'));
		}
	}

	/**
	*	Initialize a blind test
	*	@param object $f3
	*	@return json
	**/
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

	/**
	*	Update blind test status
	*	@param object $f3
	**/
	public function status($f3){
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

	/**
	*	Request for blind response
	*	@param object $f3
	*	@return json
	**/
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

	/**
	*	Get question and answers from blind
	*	@param object $f3
	*	@return array
	**/
	public function blindResponse($f3){

		$blind = array();
		$responses = $this->UserResponse->getResponse($f3->get('PARAMS.blind_id'));

		if(empty($responses)){
			$this->send_message(array('code' => '400', 'message' => 'no data found'));
			return;
		}

		foreach ($responses as $key => $response) {
			$question = $this->Question->get(array(
					'conditions' => array('id' => $response['question_id'])
 				));
			$answer = $this->Answer->get(array(
					'conditions' => array('question_id' => $question['id'])
				));

			$blind[$key]['question'] = $question;
			$blind[$key]['answers'] = $answer;
		}

		if(!empty($blind)){
			echo $this->Blind->encode('questions', $blind);
		}else{
			$this->send_message(array('code' => '400', 'message' => 'no data found'));
		}
	}

}

 ?>