module.exports = function(grunt){

	grunt.initConfig({
		db_dump: {
			"local": {
				"options": {
					"title": "Way DB",
					"database": "way",
					"user": "root",
					"pass": "root",
					"host": "localhost",
					"backup_to": "dump/dump.sql"
				}
			},
		}
	});


	grunt.loadNpmTasks('grunt-mysql-dump');
}