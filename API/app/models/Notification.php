<?php
require_once 'Model.php';

class Notification extends Model{

	public $table = 'notifications';

	function __construct() {
		parent::__construct();
	}

	public function add($notification){
		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(name, user_id, created)
			VALUES(:user_id, :friend_id, :created)', array(
				'user_id' => $notification['user_id'],
				'friend_id' => $notification['friend_id'],
				'created' => $this->datetime()
				));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	public function getNotification($facebook_id){
		$notifications = $this->db->exec('SELECT * FROM ' . $this->table . ' JOIN users ON ' . $this->table . '.friend_id = users.facebook_id
			WHERE user_id = :fb_id', array('fb_id' => $facebook_id));

		if(!empty($notifications)){
			foreach ($notifications as $key => $notification) {
				$category = $this->db->exec('SELECT * FROM categories WHERE id = :category_id',
					array('category_id' => $notification['category_id']));
				$notifications[$key]['category_name'] = (!empty($category)) ? $category[0]['name'] : false;
			}
		}

		return (!empty($notifications)) ? $this->encode('notifications', $notifications) : false;
	}

	public function deleteNotification($user_id, $friend_id){
		$delete = $this->db->exec('DELETE FROM ' . $this->table . ' WHERE user_id = :user_id AND friend_id = :friend_id',
			array('user_id' => $user_id, 'friend_id' => $friend_id));
		return ($delete) ? true : false;
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