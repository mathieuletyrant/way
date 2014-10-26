<h2>Ajouter une question</h2>

<form method="post" action="/question/add">
	<input type="text" name="name">
	<select name="category" id="">

			<option value="<?= $category['id']; ?>"></option>

	</select>
	<input type="file" name="question_file">
	<input type="submit" value="Ajouter la question">
</form>

