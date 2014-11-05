<?php

class UsersController extends Controller{

	public $uses = array('User');

	function __construct() {
		parent::__construct();
		// $this->loadModel('User');
	}

	public function get($f3){
		if(!empty($f3->get('PARAMS.id'))){
			echo $this->User->get($f3->get('PARAMS.id'));
		}else{
			echo $this->User->get();
		}
	}

	public function exist($f3, $params) {
		if($user = $this->User->exist($params['id'])){
			echo $this->User->encode('user', $user);
		}else{
			echo $this->send_error(array('code' => '404', 'message' => 'user not found'));
		}
	}

	public function register($f3){
		// file_put_contents('log.txt', $f3->get('POST'));

		if(!empty($user = $f3->get('POST'))){
			if($this->User->validate($user)){
				if($this->User->register($user)){
					echo $this->User->encode('notification', array('code' => '201', 'message' => 'user added'));
				}else{
					$this->send_error(array('code' => '400', 'message' => 'database error'));
				}
			}else{
				$this->send_error(array('code' => '400', 'message' => 'bad request invalid data'));
			}

		}else{
			// echo View::instance()->render('user/add.htm');
			$this->send_error(array('code' => '400', 'message' => 'bad request'));
		}
	}

}

?>