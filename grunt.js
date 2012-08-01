/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-imagine');

  // Recess helper function
  var recessOptions = function(bool) {
    bool = ((typeof bool === 'undefined')? false : bool);
    var config = {
      compile: true,
      compress: bool,
      noIDs: false,
      noJSPrefix: false,
      noOverqualifying: false,
      noUnderscores: false,
      noUniversalSelectors: false,
      prefixWhitespace: false,
      strictPropertyOrder: false,
      zeroUnits: false
    };

    return config;
  };

  // Directory structure
  var dirs = {};
      dirs.assets = 'assets/';
      dirs.css = dirs.assets + 'css/';
      dirs.less = dirs.assets + 'less/';
      dirs.img = dirs.assets + 'img/';
      dirs.js = {};
        dirs.js.base = dirs.assets + 'js/';
        dirs.js.libs = dirs.js.base + 'libs/';
        dirs.js.src = dirs.js.base + 'src/';
      dirs.dist = {};
        dirs.dist.base = 'dist/';
        dirs.dist.js = dirs.dist.base + 'js/';
        dirs.dist.css = dirs.dist.base + 'css/';
        dirs.dist.img = dirs.dist.base + 'img/';


  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: ['grunt.js', dirs.js.src + '*.js']
    },
    watch: {
      less: {
        files: [dirs.less + '*.less'],
        tasks: 'recess'
      },
      images: {
        files: [dirs.img + '*.*'],
        tasks: 'imgmin'
      }
    },
    concat: {
      libs: {
        src : dirs.js.libs + '*.js',
        dest: dirs.dist.js + 'libs.js'
      }
    },
    min: {
      libs: {
        src : dirs.js.libs + '*.js',
        dest: dirs.dist.js + 'libs.js'
      }
    },
    pngmin: {
        src: [dirs.img + '*.png'],
        dest: dirs.dist.base
    },
    gifmin: {
        src: [dirs.img + '*.gif'],
        dest: dirs.dist.base
    },
    jpgmin: {
        src: [dirs.img + '*.jpg', dirs.img + '*.jpeg'],
        dest: dirs.dist.base
    },
    recess: {
      max: {
        src: [dirs.less + 'base.less'],
        dest: dirs.dist.css + 'style.css',
        options: recessOptions(false)
      },
      min: {
        src: [dirs.less + 'base.less'],
        dest: dirs.dist.css + 'style.min.css',
        options: recessOptions(true)
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'recess');
  grunt.registerTask('imgmin', 'pngmin gifmin jpgmin');
};
