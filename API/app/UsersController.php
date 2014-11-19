<?php

class UsersController extends Controller{

	public $uses = array('User', 'Category', 'UserResponse', 'Blind');

	function __construct() {
		parent::__construct();
	}

	public function login($f3){

		if($login = $f3->get('POST')){

			if($login['username'] == 'way' && sha1($login['password']) == USER_PASS){
				$login['password'] = sha1($login['password']);
				$this->sessionSet('user', $login);
				$this->alert('alert alert-success', "Authentification reussi");
				if (!empty($_SESSION['redirect'])) {
					$f3->reroute($_SESSION['redirect']['from']);
				}
			}else{
				$this->alert('alert alert-danger', "Nom d'utilisateur ou mot de passe incorrect");
			}
		}
		echo View::instance()->render('user/login.htm');
	}

	public function get($f3){
		if(!empty($f3->get('PARAMS.id'))){
			if($user = $this->User->getUser($f3->get('PARAMS.id'))){
				echo $user;
			}else{ echo $this->send_message(array('code' => '404', 'message' => 'user not found')); }
		}else{
			$this->send_message(array('code' => '400', 'message' => 'bad request'));
		}
	}

	public function exist($f3, $params) {
		if($user = $this->User->exist($params['id'])){
			echo $this->User->encode('user', $user);
		}else{
			echo $this->send_message(array('code' => '404', 'message' => 'user not found'));
		}
	}

	public function register($f3){
		// file_put_contents('log.txt', $f3->get('POST'));

		if(!empty($user = $f3->get('POST'))){
			if($this->User->validate($user)){
				if($this->User->register($user)){
					echo $this->User->encode('notification', array('code' => '201', 'message' => 'user added'));
				}else{
					$this->send_message(array('code' => '400', 'message' => 'database error'));
				}
			}else{
				$this->send_message(array('code' => '400', 'message' => 'bad request invalid data'));
			}

		}else{
			// echo View::instance()->render('user/add.htm');
			$this->send_message(array('code' => '400', 'message' => 'bad request'));
		}
	}

	public function category($f3){
		if($category = $this->Category->getByName($f3->get('PARAMS.category'))){
			if($this->User->updateCategory($f3->get('PARAMS.facebook_id'), $category['id'])){
				$this->send_message(array(
					'code' => '200',
					'message' => 'category updated to ' . $category['name'] . ' for user ' . $f3->get('PARAMS.facebook_id')
					));
			}else{
				$this->send_message(array('code' => '400', 'message' => 'database error'));
			}
		}else{
			$this->send_message(array('code' => '400', 'message' => 'category not found'));
		}
	}

	public function profil($f3){
		$total = array();
		$blinds = $this->Blind->get(array(
			'conditions' => array(
				'user_id' => $f3->get('POST.facebook_id')
				)
			));
		$categories = $this->Category->get(array(
			'conditions' => array(
				'sex' => $f3->get('POST.sex')
				)
			));
		foreach ($categories as $key => $category) {
			$total[$category['name']] = 0;
		}

		if (!empty($blinds) && count($blinds) == count($blinds, COUNT_RECURSIVE)){
			$tmp = $blinds;
			unset($blinds);
			$blinds[0] = $tmp;
		}


		if(empty($blinds)) {
			$this->send_message(array(
				'code' => '400',
				'message' => 'user never played blind test'));
			return;
		}

		foreach ($blinds as $key => $blind) {
			foreach ($categories as $key => $category) {
				$responses = $this->UserResponse->getTrue($blind['id'], $category['id']);
				if(!empty($responses)){
					$total[$category['name']] += count($responses);
				}
			}
		}

		$profil = array_search(max($total), $total);

		if(($total_sum = array_sum($total)) != 0){
			foreach ($total as $key => $t) {
				$total[$key] = ($t * 100) / $total_sum;
			}
		}

		$this->send_message(array('user' => array(
				'profil' => $profil,
				'total' => $total
			)));
	}

}

?>