<?php

class QuestionController extends Controller{


	public $uses = array('Question', 'Category', 'Answer');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){

		if($f3->exists('POST.submit')){
			if($this->Question->validate($f3->get('POST'))){

				$question['name'] = $f3->get('POST.name');
				$question['category_id'] = $f3->get('POST.category_id');

				$file = $f3->get('FILES')['question_file'];
				$file['category'] = $this->Category->get(array('conditions' => array('id' => $question['category_id'])))['name'];

				$question['file'] = ($filepath = $this->Question->upload($file)) ? $filepath: null;

				if($id = $this->Question->add($question)){

					foreach ($f3->get('POST.reponses') as $key => $answer) {
						$status = ($key == $f3->get('POST.status')) ? true: false;

						$insert = $this->Answer->add(array(
							'question_id' => $id,
							'answer' => $answer,
							'status' => $status
							));
						if(!$insert){ $this->alert('alet-danger', "Erreur lors de l'enregistrement d'une reponse"); }
					}

					$this->alert('alert-success', 'Votre question a bien été enregistré');
				}else{
					$this->alert('alert-danger', "Erreur lors de l'enregistrement de votre question");
				}

			}else{
				$this->alert('alert-danger', "Veuillez renseigner tout les champs du formulaire");
			}

		}

		$categories = $this->Category->get(array('fields' => array('id', 'name')));
		$f3->set('categories', $categories);
		echo View::instance()->render('add.htm');
	}

	public function view($f3){
		$questions = $this->Question->get();

		$f3->set('questions', $questions);
		echo View::instance()->render('list.htm');
	}


}


?>