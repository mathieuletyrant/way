<?php

class DealController extends Controller{

	public $uses = array('Deal', 'Category');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){


		$categories = $this->Category->get(array('fields' => array('id', 'name')));
		$f3->set('categories', $categories);
		echo View::instance()->render('deal/add.htm');
	}

	public function first($f3){
		$deal = $this->Deal->getFirst();

		if(!empty($deal)){
			echo $this->Deal->encode('deals', $deal);
		}else{
			$this->send_error(array('code' => '204', 'message' => 'Deal not found'));
		}
	}

	public function section($f3){
		$deals = $this->Deal->getBySection($f3->get('PARAMS.section'), $f3->get('PARAMS.page'));
		if(!empty($deals)){
			echo $this->Deal->encode('deals', $deal);
		}else{
			$this->send_error(array('code' => '204', 'message' => 'Deal not found'));
		}
	}

}

?>