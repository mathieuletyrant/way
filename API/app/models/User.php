<?php
require_once 'Model.php';

class User extends Model{

	public $table = 'users';

	function __construct() {
		parent::__construct();
	}

	/**
	*	Get user
	*	@param int $id
	*	@return array $user
	**/
	public function getUser($id){
		$user = $this->db->exec('SELECT * FROM ' . $this->table . ' WHERE facebook_id = :id', array('id' => $id));

		if(empty($user)){ return false; }

		$category = $this->db->exec('SELECT * FROM categories WHERE id = :category_id',
			array('category_id' => $user[0]['category_id']));

		$user[0]['category_name'] = (!empty($category)) ? $category[0]['name'] : false;

		return $this->encode('users', $user[0]);
	}

	/**
	*	Get users by sex
	*	@param string $sex
	*	@param int $page
	*	@return array $users
	**/
	public function getBySex($sex, $page = null){

		$start = ($page == 0) ? 1 : ($page - 1) * 8;
		$end = $start + 8;

		$users = $this->db->exec('SELECT facebook_id, firstname, lastname, picture, users.sex,
			categories.id, categories.name
			FROM ' . $this->table . '
			LEFT JOIN categories ON categories.id = ' . $this->table . '.category_id
			WHERE ' . $this->table . '.sex = :sex
			LIMIT ' . $start . ', ' . $end,
			array('sex' => $sex));

		return (!empty($users)) ? $users : false;
	}

	/**
	*	Check user exist
	*	@param int $id
	*	@return array / boolean $user
	**/
	public function exist($id){
		$user = $this->db->exec('SELECT facebook_id, firstname, lastname, picture, sex
			FROM ' . $this->table . ' WHERE facebook_id = :id',
			array('id' => $id));
		return (count($user) == 1) ? $user[0] : false;
	}

	/**
	*	Register user into database
	*	@param array $user
	*	@return int / boolean
	**/
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

	/**
	*	Update category
	*	@param string $facebook_id
	*	@param int $category_id
	*	@return boolean $update
	**/
	public function updateCategory($facebook_id, $category_id){
		$update = $this->db->exec('UPDATE ' . $this->table . ' SET category_id = :category_id WHERE facebook_id = :facebook_id',
			array('category_id' => $category_id, 'facebook_id' => $facebook_id));
		return $update;
	}

	public function count($sex){
		$count = $this->db->exec('SELECT COUNT(*) as total_user FROM ' . $this->table . ' WHERE sex = :sex',
			array('sex' => $sex));
		return (!empty($count)) ? $count[0] : false;
	}

	public function search($name, $sex){
		$st = $this->db->prepare('SELECT * FROM ' . $this->table . '
			WHERE firstname LIKE :firstname OR lastname LIKE :lastname
			AND sex = :sex');
		$st->execute(array(
				'firstname' => '%' . $name . '%',
				'lastname' => '%' . $name . '%',
				'sex' => $sex
			));
		$users = $st->fetchAll();
		return (!empty($users)) ? $users : false;
	}

	/**
	*	Check data validity
	*	@param array $user
	*	@return boolean $validate
	**/
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