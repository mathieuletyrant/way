<?php

class BlindController extends Controller {

	function __construct() {
		parent::__construct();
		$this->loadModel('Question');
	}

	public function generate($f3, $params = null){
		echo $this->Question->get();
	}

}


 ?>