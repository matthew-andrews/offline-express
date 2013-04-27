module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      iframe_client: {
        files: {
          'lib/iframe/client.min.js': ['lib/iframe/client.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['uglify']);
};