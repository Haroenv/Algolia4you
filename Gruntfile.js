module.exports = function(grunt) {

	//grunt.file.expandMapping
	//<!-- include: "type": "css", "files": "<%= sources.all.css %>" -->

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sources:{
			all: {
				css: [
					'maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
					'css/open-iconic-bootstrap.min.css',
					'fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic',
					'css/app.min.css'
				],
				js : [],
			},
			index: {
				'css': ['css/app.min.css', 'css/autocomplete.css']
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},
		uglify: {
			options:{
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/app.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
      		files: ['Gruntfile.js', 'src/**/*.js'],
	      	options: {
		        // options here to override JSHint defaults
		        globals: {
		          jQuery: true,
		          console: true,
		          module: true,
		          document: true
		        }
	      	}
	    },
	    htmllint: {
	    	src : ['index.html', 'algolia.html'],
	    	options: {
	    		force: true,
	    		'attr-name-style': 'dash',
	    		'id-class-style': 'dash'
	    	}
	    },
	    cssmin: {
  			options: {
    			mergeIntoShorthands: false,
    			roundingPrecision: -1
  			},
  			target: {
	    		files: {
	      			'css/app.min.css': ['css/style.css', 'css/autocomplete.css']
	    		}
	  		}
		},
		includeSource: {
			options: {
				basePath: '',
				baseUrl: '',
				templates: {
					html: {
				  		js: '<script src="{filePath}"></script>',
				    	css: '<link rel="stylesheet" type="text/css" href="{filePathDecoded}" />',
				  	}
				}
			},
			target: {
			  files: {
			    'index.html': 'tpl/index.tpl.html'
			  }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-include-source');

	grunt.registerTask('default', ['jshint','concat', 'uglify', 'cssmin', 'htmllint']);

};