<?php
require_once 'Model.php';

class User extends Model{

	public $table = 'users';

	function __construct() {
		parent::__construct();
	}

	public function getUser($id){
		$user = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE facebook_id = :id', array('id' => $id));

		if(empty($user)){ return false; }

		$category = $this->db->exec('SELECT * FROM categories WHERE id = :category_id',
			array('category_id' => $user[0]['category_id']));

		$user[0]['category_name'] = (!empty($category)) ? $category[0]['name'] : false;

		return $this->encode('users', $user[0]);
	}

	public function exist($id){
		$user = $this->db->exec('SELECT facebook_id, firstname, lastname, picture, sex
			FROM ' . $this->table . ' WHERE facebook_id = :id',
			array('id' => $id));
		return (count($user) == 1) ? $user[0] : false;
	}

	public function register($user){
		$insert = $this->db->exec('INSERT INTO users(facebook_id, firstname, lastname, picture, sex, created)
			VALUES (:fb_id, :fname, :lname, :picture, :sex, :created)',
				array(
					'fb_id' => $user['facebook_id'],
					'fname' => $user['firstname'],
					'lname' => $user['lastname'],
					'picture' => $user['picture'],
					'sex' => $user['sex'],
					'created' => $this->datetime()
					)
				);
		return ($insert) ? $this->db->lastInsertId() : false;
	}

	public function updateCategory($facebook_id, $category_id){
		$update = $this->db->exec('UPDATE ' . $this->table . ' SET category_id = :category_id WHERE facebook_id = :facebook_id',
			array('category_id' => $category_id, 'facebook_id' => $facebook_id));
		return $update;
	}

	public function validate($user){
		$validate = true;

		if(empty($user['facebook_id'])){ return false; }
		if(empty($user['firstname'])){ return false; }
		if(empty($user['lastname'])){ return false; }
		if(empty($user['picture'])){ return false; }
		if(empty($user['sex'])){ return false; }

		return $validate;
	}

}

 ?>