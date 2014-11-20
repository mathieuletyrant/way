<?php

class QuestionController extends Controller{


	public $uses = array('Question', 'Category', 'Answer');

	function __construct() {
		parent::__construct();
	}

	public function add($f3){

		if(!empty($f3->get('POST'))){
			header('Content-Type: application/json');

			if($this->Question->validate($f3->get('POST'))){

				$question['name'] = $f3->get('POST.name');
				$question['category_id'] = $f3->get('POST.category_id');

				/* upload music file for question */
				$category = $this->Category->get(array('conditions' => array('id' => $question['category_id'])))['name'];
				$file = $f3->get('FILES')['question_file'];
				$file['category'] = $category;
				$question['file'] = ($filepath = $this->Question->upload($file)) ? $filepath: null;

				if($id = $this->Question->add($question)){

					$answer_file = $this->reindexUpload($f3->get('FILES')['answer']); // reindex array

					foreach ($f3->get('POST.reponses') as $key => $answer) {

						$answer_file[$key]['category'] = $category;
						// upload image answer
						$answer_path = $this->Answer->upload($answer_file[$key]);

						$status = ($key == $f3->get('POST.status')) ? true: false;

						$insert = $this->Answer->add(array(
							'question_id' => $id,
							'answer' => $answer,
							'file' => $answer_path,
							'status' => $status
							));

						if(!$insert){
							$this->alert('alet-danger', "Erreur lors de l'enregistrement d'une reponse");
							echo json_encode(array('code' => 'alert-danger', 'message' => "Erreur lors de l'enregistrement d'une reponse"));
						}
					}

					$this->alert('alert-success', 'Votre question a bien été enregistré');
					echo json_encode(array('code' => 'alert-success', 'message' => "Votre question a bien été enregistré"));

				}else{
					$this->alert('alert-danger', "Erreur lors de l'enregistrement de votre question");
					echo json_encode(array('code' => 'alert-danger', 'message' => "Erreur lors de l'enregistrement de votre question"));
				}

			}else{
				$this->alert('alert-danger', "Veuillez renseigner tout les champs du formulaire");
				echo json_encode(array('code' => 'alert-danger', 'message' => "Veuillez renseigner tout les champs du formulaire"));
			}

		}else{
			$categories = $this->Category->get(array('fields' => array('id', 'name')));
			$f3->set('categories', $categories);
			echo View::instance()->render('question/add.htm');
		}
	}


}


?>