<?php

class Controller {


	function __construct() {
		if(!empty($this->uses)){
			foreach($this->uses as $use){
				$this->loadModel($use);
			}
		}
	}

	protected function loadModel($name){
		require_once 'models/' . $name. '.php';
		$this->$name = new $name();
	}

	public function init($f3, $params = null){
		if(!empty($params['ok'])){
			$this->loadModel('Model');
			$this->Model->generate_questions();
		}
	}


}

?>