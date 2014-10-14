<?php

class Model {

	protected $db;

	function __construct() {
		$this->db = new \DB\SQL('mysql:host=localhost;port=3306;dbname=way','root','root');
	}

	public function encode($name, $data = array()){
		return '{' . $name . ': ' . json_encode($data) . '}';
	}

	public function datetime(){
		return date('Y-m-d H:i:s');
	}
}

 ?>