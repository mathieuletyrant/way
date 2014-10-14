<?php

class UsersController extends Controller{

	function __construct() {
		parent::__construct();
		$this->loadModel('User');
	}

	public function get($f3, $params = null){
		if(!empty($params['id'])){
			echo $this->User->get($params['id']);
		}else{
			echo $this->User->get();
		}
	}

	public function register($f3){
		$this->User->register($f3);
	}

	public function response($f3){

	}



}

?>