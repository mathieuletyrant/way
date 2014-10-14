<?php

class BlindController extends Controller {

	public $uses = array('Question', 'Model');

	function __construct() {
		parent::__construct();
	}

	public function generate($f3, $params = null){
		if(!empty($params['number'])){
			echo $this->Question->generate($params['number']);
		}else{
			echo $this->Question->generate();
		}
	}

}


 ?>