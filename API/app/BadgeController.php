<?php

class BadgeController extends Controller{

	public $uses = array('Category', 'Badge');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){
		if($f3->get('POST.submit')){
			if($this->Badge->validate($f3->get('POST'))){
				$badge = $f3->get('POST');

				$category = $this->Category->get(array('conditions' => array('id' => $badge['category_id'])))['name'];
				$file = $f3->get('FILES')['image_file'];
				$file['category'] = $category;
				$badge['picture'] = ($filepath = $this->Badge->upload($file)) ? $filepath: null;

				if($this->Badge->add($badge)){
					$this->alert('alert-success', 'Votre badge a bien été enregistré');
				}else{
					$this->alert('alert-danger', "Erreur lors de l'enregistrement de votre badge");
				}

			}else{
				$this->alert('alert-danger', "Veuillez renseigner tout les champs du formulaire");
			}
		}

		$categories = $this->Category->get(array('fields' => array('id', 'name')));
		$f3->set('categories', $categories);
		echo View::instance()->render('badge/add.htm');

	}


}
 ?>