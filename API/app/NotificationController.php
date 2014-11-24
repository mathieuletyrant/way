<?php

class NotificationController extends Controller{

	public $uses = array('Notification', 'Category');

	function __construct() {
		parent::__construct();
	}

	/**
	*	Request for add notification
	*	@param object $f3
	*	@return json
	**/
	public function add($f3){
		if(!empty($notification = $f3->get('POST'))) {

			if($this->Notification->validate($notification)){

				if(!empty($notification['category'])){
					$category = $this->Category->getByName($notification['category']);
					if(!empty($category)) {
						$notification['category_id'] = $category['id'];
					}
				}

				if($this->Notification->add($notification)){
					$this->send_message(array('code' => '201', 'message' => 'notification added'));
				}else{
					$this->send_message(array('code' => '400', 'message' => 'database error'));
				}

			}else{ $this->send_message(array('code' => '400', 'message' => 'bad request')); }

		}else{ $this->send_message(array('code' => '400', 'message' => 'bad request')); }
	}

	/**
	*	Request for get notification
	*	@param object $f3
	*	@return json
	**/
	public function get($f3){
		if($f3->get('PARAMS.receiver_id')){
			if($this->Notification->getNotification($f3->get('PARAMS.receiver_id'))){
				echo $this->Notification->getNotification($f3->get('PARAMS.receiver_id'));
			}else{
				$this->send_message(array('code' => '204', 'message' => 'notification not found'));
			}
		}
	}

	/**
	*	Request for delete notification
	*	@param object $f3
	*	@return json
	**/
	public function delete($f3){
		if(!empty($user_id = $f3->get('PARAMS.user_id')
			&& !empty($friend_id = $f3->get('PARAMS.friend_id')))){
			if($this->Notification->deleteNotification($user_id, $friend_id)){
				$this->send_message(array('code' => '200', 'message' => 'notification deleted'));
			}else{
				$this->send_message(array('code' => '404', 'message' => 'notification not found'));
			}
		}
	}


}

 ?>