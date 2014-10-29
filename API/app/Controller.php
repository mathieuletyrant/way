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

	/**
	*	Charge un model associés à une table de la base de données
	*	@param $name Nom du model (respecter la casse)
	**/
	protected function loadModel($name){
		require_once 'models/' . $name. '.php';
		$this->$name = new $name();
	}

	/**
	*	Afficher une erreur de retour JSON
	*	@param $error tableau associatif
	**/
	protected function send_error($error = array()){
		echo json_encode($error['error'] = $error);
	}

	/**
	*	Affiche un message d'alert sur une vue HTML
	*	@param $type Type de l'alert
	*	@param $message Message de l'alert
	**/
	protected function alert($type, $message){
		$_SESSION['alert']['type'] = 'alert ' . $type;
		$_SESSION['alert']['message'] = $message;
	}

	/**
	*	Reindex tableau d'upload
	*	@param $file_post Tableau de type $_FILES
	**/
	protected function reindexUpload($file_post) {

		$file_ary = array();
		$file_count = count($file_post['name']);
		$file_keys = array_keys($file_post);

		for ($i=0; $i<$file_count; $i++) {
			foreach ($file_keys as $key) {
				$file_ary[$i][$key] = $file_post[$key][$i];
			}
		}

		return $file_ary;
	}
}

?>