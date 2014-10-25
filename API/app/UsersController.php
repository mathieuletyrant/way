<?php

class UsersController extends Controller{

	public $uses = array('User');

	function __construct() {
		parent::__construct();
		// $this->loadModel('User');
	}

	public function get($f3, $params = null){
		if(!empty($params['id'])){
			echo $this->User->get($params['id']);
		}else{
			echo $this->User->get();
		}
	}

	public function exist($f3, $params){
		if($user = $this->User->exist($params['id'])){
			echo $this->User->encode('user', $user);
		}else{
			echo $this->send_error(array('code' => '404', 'message' => 'User not found'));
		}
	}

	public function register($f3){
		$this->User->register($f3);
	}

	public function response($f3){

	}



}

?>