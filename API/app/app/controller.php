<?php

class Controller {


	function __construct() {

	}

	protected function loadModel($name){
		require_once 'models/' . $name. '.php';
		$this->$name = new $name();
	}


}

 ?>