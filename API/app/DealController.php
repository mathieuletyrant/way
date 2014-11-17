<?php

class DealController extends Controller{

	public $uses = array('Deal', 'Category');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){
		if($f3->get('POST.submit')){
			if($this->Deal->validate($f3->get('POST'))){
				$deal = $f3->get('POST');
				$deal['first'] = (!empty($deal['first']) && $deal['first'] == 'on') ? true: false;

				// if($deal['first']){
				// 	$old_first = $this->Deal->getFirst();
				// 	$this->Deal->id = $old_first['id'];
				// 	$this->Deal->save(array('good_deals' => array('first' => false)));
				// }

				$category = $this->Category->get(array('conditions' => array('id' => $deal['category_id'])))['name'];
				$file = $f3->get('FILES')['image_file'];
				$file['category'] = $category;
				$deal['img'] = ($filepath = $this->Deal->upload($file)) ? $filepath: null;

				if($this->Deal->add($deal)){
					$this->alert('alert-success', 'Votre deal a bien été enregistré');
				}else{
					$this->alert('alert-danger', "Erreur lors de l'enregistrement de votre deal");
				}

			}else{
				$this->alert('alert-danger', "Veuillez renseigner tout les champs du formulaire");
			}
		}

		$categories = $this->Category->get(array('fields' => array('id', 'name')));
		$f3->set('categories', $categories);
		echo View::instance()->render('deal/add.htm');
	}

	public function first($f3){
		$category = $this->Category->getByName($f3->get('PARAMS.category'));

		$deal = $this->Deal->getFirst($category['id']);

		if(!empty($deal)){
			echo $this->Deal->encode('deals', $deal);
		}else{
			$this->send_message(array('code' => '204', 'message' => 'Deal not found'));
		}
	}

	public function getById($f3){
		if($deal_id = $f3->get('PARAMS.id')){
			$deal = $this->Deal->getById($deal_id)	;

			if(!empty($deal)){
				echo $this->Deal->encode('deal', $deal);
			}else{
				$this->send_message(array('code' => '204', 'message' => 'Deal not found'));
			}

		}else{ $this->send_message(array('code' => '400', 'message' => 'bad request')); }

	}

	public function getByCategory($f3){
		if($category = $f3->get('PARAMS.category')){
			$category = $this->Category->getByName($f3->get('PARAMS.category'));

			$deals = $this->Deal->getByCategory($category['id']);

			if(!empty($deals)){
				echo $this->Deal->encode('deal', $deals);
			}else{
				$this->send_message(array('code' => '204', 'message' => 'Deal not found'));
			}

		}else{ $this->send_message(array('code' => '400', 'message' => 'bad request')); }

	}

	public function section($f3){
		$deals = $this->Deal->getBySection($f3->get('PARAMS.section'), $f3->get('PARAMS.page'));
		if(!empty($deals)){
			echo $this->Deal->encode('deals', $deal);
		}else{
			$this->send_message(array('code' => '204', 'message' => 'Deal not found'));
		}
	}

	public function view($f3){
		$deals = $this->Deal->get();
		$f3->set('deals', $deals);
		echo View::instance()->render('deal/view.htm');
	}

}

?>