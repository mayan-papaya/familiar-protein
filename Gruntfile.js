module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      server: {
        src: ['server/**/*.js'],
        options: {
          'node': true,
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'curly': true,
          'eqeqeq': true,
          'immed': true,
          'indent': 2,
          'latedef': true,
          'newcap': true,
          'noarg': true,
          'regexp': true,
          'undef': true,
          'unused': 'vars',
          'trailing': true,
          'smarttabs': true,
          'white': true
        }
      },
      client: {
        src: [], //  'client/src/app.jsx','client/src/views/*.jsx'
        options: {
          'esnext': true,
          'bitwise': true,
          'camelcase': true,
          'curly': true,
          'eqeqeq': true,
          'immed': true,
          'indent': 2,
          'latedef': true,
          'newcap': true,
          'noarg': true,
          'regexp': true,
          'undef': true,
          'unused': 'vars',
          'trailing': true,
          'smarttabs': true,
          'white': true,
          // remove for production - allows console.log, etc
          'devel': true,
          globals: {
            'angular': false,
            '_': false
          }
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    webpack: {
      client: {
        entry: "./client/src/app.jsx",
        output: {
            path: "client/build",
            filename: "app.js"
        },
        module: {
            loaders: [
                { test: /\.jsx$/, loader: "jsx-loader" }
            ]
        }
      }
    },
    execute: {
      target: {
        src: ['server/server.js']
      }
    }
    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint']
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-execute');
  
  grunt.registerTask('test', ['jshint', 'webpack', 'karma']);
  grunt.registerTask('default', ['webpack', 'execute']);

};
