<?php

class Controller {

	protected $token = 'KDR8u9vuRH8i6hx8V4e6';
	protected $request;

	function __construct() {
		session_start();

		if(!empty($_SESSION['alert'])){
			unset($_SESSION['alert']);
		}

		if(!empty($this->uses)){
			foreach($this->uses as $use){
				$this->loadModel($use);
			}
		}

		$this->request = $this->get_header();
		/*if(!isset($this->request['token']) || $this->request['token'] != $this->token){
			$this->send_error(array('code' => '401', 'name' => 'authentification fail', 'message' => 'wrong token'));
			die();
		}*/
	}

	public function init($f3, $params = null){
		if(!empty($params['ok'])){
			$this->loadModel('Model');
			//$this->Model->generate_categories();
			// $this->Model->generate_questions();
			$this->Model->generate_responses();
		}
	}

	/**
	*	Retourne le tableau contenant les Headers de la requete
	*	@return Request Header
	**/
	protected function get_header(){
		if (!function_exists('apache_request_headers')) {
			function apache_request_headers() {
				foreach($_SERVER as $key=>$value) {
					if (substr($key,0,5)=="HTTP_") {
						$key=str_replace(" ","-",ucwords(strtolower(str_replace("_"," ",substr($key,5)))));
						$out[$key]=$value;
					}else{
						$out[$key]=$value;
					}
				}
				return $out;
			}
		}else{
			return apache_request_headers();
		}
	}

	protected function loadModel($name){
		require_once 'models/' . $name. '.php';
		$this->$name = new $name();
	}

	protected function send_error($error = array()){
		echo json_encode($error['error'] = $error);
	}

	protected function alert($type, $message){
		$_SESSION['alert']['type'] = 'alert ' . $type;
		$_SESSION['alert']['message'] = $message;
	}

}

?>