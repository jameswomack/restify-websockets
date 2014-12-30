'use strict';

var stylish = require('jshint-stylish');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var jade = require('gulp-jade');


/*
 * Configuration
 */
var paths = {
  client: {
    js: 'browser-src/js/**/*.js',
    html: ['./browser-src/html/index.jade', './browser-src/html/templates/**/*.jade'],
    css: 'browser-src/css/*.styl'
  },
  server: {
    js: 'servers/http/**/*.js'
  }
};


/*
 * Shared functions
 */
function jadeMe(srcPath, destPath, locals){
    locals = locals || {};
    return gulp.src(srcPath)
        .pipe(jade({
         locals: locals
    }))
    .pipe(gulp.dest(destPath));
}
function lintMe(path){
  return gulp.src([path])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}

/*
 * Tasks
*/

// Rerun the task when a file changes
gulp.task(function watch(){
  //gulp.watch(paths.client.css, ['stylus']);
  gulp.watch(paths.client.js, gulp.series('clientLint','bruglify'));
  gulp.watch(paths.client.html, gulp.parallel('templatesJade','indexJade'));
  gulp.watch(paths.server.js, gulp.series('serverLint'));
});


gulp.task(function daemon(){
  return nodemon({
    script: './servers/http/index.js',
    ext: 'js',
    watch: [paths.client.js,paths.client.html,paths.server.js],
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start',  gulp.series('watch'))
    .on('change', gulp.series('watch'))
    .on('restart', function () {
      console.info('restarted!');
    });
});


gulp.task(function bruglify(){
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./browser-src/js/*.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task(function indexJade(){
  return jadeMe(paths.client.html[0],
        './public/');
});
gulp.task(function templatesJade(){
  return jadeMe(paths.client.html[1],
        './public/templates/');
});
gulp.task('jade', gulp.parallel('indexJade','templatesJade'));

gulp.task(function clientLint(){
  return lintMe(paths.client.js);
});
gulp.task(function serverLint(){
  return lintMe(paths.server.js);
});
gulp.task('lint',        gulp.parallel('clientLint','serverLint'));

gulp.task('daemon:prep', gulp.parallel('bruglify','jade','lint'));

gulp.task('default',     gulp.series('daemon:prep','daemon'));
