<?php
require_once 'Model.php';

class Notification extends Model{

	public $table = 'notifications';

	function __construct() {
		parent::__construct();
	}

	/**
	*	Add notification into database
	*	@param array $notification
	*	@return int / boolean
	**/
	public function add($notification) {
		$insert = $this->db->exec('INSERT INTO ' . $this->table . '(receiver_id, type, user_id, friend_id, blind_id, category_id, message, created)
			VALUES(:receiver_id, :type, :user_id, :friend_id, :blind_id, :category_id, :message, :created)', array(
				'receiver_id' => $notification['receiver_id'],
				'type' => $notification['type'],
				'user_id' => (!empty($notification['user_id'])) ? $notification['user_id'] : '',
				'friend_id' => (!empty($notification['friend_id'])) ? $notification['friend_id'] : '',
				'blind_id' => (!empty($notification['blind_id'])) ? $notification['blind_id'] : '',
				'category_id' => (!empty($notification['category_id'])) ? $notification['category_id'] : '',
				'message' => (!empty($notification['message'])) ? $notification['message'] : '',
				'created' => $this->datetime()
				));
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	/**
	*	Get notification
	*	@param int $facebook_id
	*	@return json / boolean
	**/
	public function getNotification($receiver_id){
		$notifications = $this->db->exec('SELECT notifications.id, notifications.blind_id, notifications.type, notifications.category_id,
			u1.facebook_id as "facebook_id1", u1.firstname as "firstname1", u1.lastname as "lastname1", u1.picture as "picture1",
			u2.facebook_id as "facebook_id2", u2.firstname as "firstname2", u2.lastname as "lastname2", u2.picture as "picture2"
			FROM ' . $this->table . '
			JOIN users u1 ON ' . $this->table . '.user_id = u1.facebook_id
			JOIN users u2 ON ' . $this->table . '.friend_id = u2.facebook_id
			WHERE receiver_id = :receiver_id', array('receiver_id' => $receiver_id));

		if(!empty($notifications)){
			foreach ($notifications as $key => $notification) {
				if(!empty($notification['category_id'])){
					$category = $this->db->exec('SELECT * FROM categories WHERE id = :category_id',
						array('category_id' => $notification['category_id']));
					$notifications[$key]['category'] = (!empty($category)) ? $category[0]['name'] : false;
				}
			}
		}

		return (!empty($notifications)) ? $this->encode('notifications', $notifications) : false;
	}

	/**
	*	Delete notification
	*	@param int $user_id
	*	@param int $friend_id
	*	@return boolean
	**/
	public function deleteNotification($id){
		$delete = $this->db->exec('DELETE FROM ' . $this->table . ' WHERE id = :id',
			array('id' => $id));
		return ($delete) ? true : false;
	}

	/**
	*	Check data validity
	*	@param array $notification
	*	@return boolean $validate
	**/
	public function validate($notification){
		$validate = true;

		if(empty($notification['receiver_id'])){ $validate = false; }
		if(empty($notification['type'])){ $validate = false; }

		return $validate;
	}


}

?>