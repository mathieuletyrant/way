<?php

class DealController extends Controller{

	public $uses = array('Deal');

	function __construct() {
		parent::__construct();
	}

	public function first($f3){
		$deal = $this->Deal->getFirst();

		if(!empty($deal)){
			echo $this->Deal->encode('deal', $deal);
		}else{
			$this->send_error(array('code' => '204', 'message' => 'Deal not found'));
		}
	}

	public function section($f3){
		$deals = $this->Deal->getBySection($f3->get('PARAMS.section'), $f3->get('PARAMS.page'));
	}

}

?>