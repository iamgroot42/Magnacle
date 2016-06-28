
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// Build the site using grunt-includes
		includes: {
			build: {
				cwd: 'views',
				src: [ 'index.html' ],
				dest: '.',
				options: {
					flatten: true,
					banner: '<!-- Site built using grunt includes! -->\n'
				}
			}
		} , 

		watch: {
			files: ['views/*.html'],
			tasks: ['includes'] ,
			options: {
				debounceDelay: 250,
			},
		} 

	});

	// Load plugins used by this task gruntfile
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Task definitions
	grunt.registerTask('build', [  'includes']);
	grunt.registerTask('default', ['build']);
};