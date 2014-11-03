<?php
require_once 'Model.php';

class Notification extends Model{

	public $table = 'notifications';

	function __construct() {
		parent::__construct();
	}

	public function add($notification){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(name, message, user_id, created)
			VALUES(:name, :message, :user_id, :created', array(
				'name' => $notification['name'],
				'message' => $notification['message'],
				'user_id' => $notification['user_id'],
				'created' => $this->datetime()
				));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	public function validate($notification){
		$validate = true;

		if(empty($notification['name'])){ $validate = false; }
		if(empty($notification['message'])){ $validate = false; }
		if(empty($notification['user_id'])){ $validate = false; }

		return $validate;
	}


}

?>