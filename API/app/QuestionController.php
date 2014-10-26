<?php

class QuestionController extends Controller{


	public $uses = array('Question', 'Category');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){
		if($f3->exists('POST.submit')){

			echo $f3->get('POST.name');
		}

		$categories = $this->Category->get(array('fields' => array('id', 'name')));
		$f3->set('categories', $categories);
		echo View::instance()->render('add.htm');
	}


}


?>