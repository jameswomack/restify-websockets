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
gulp.task('watch', function () {
  gulp.watch(paths.client.css, ['stylus']);
  gulp.watch(paths.client.js, ['clientLint', 'browserify']);
  gulp.watch(paths.client.html, ['templatesJade', 'indexJade']);
  gulp.watch(paths.server.js, ['serverLint']);
});


gulp.task('daemon', function () {
  return nodemon({
    script: './servers/http/index.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.info('restarted!');
    });
});


gulp.task('browserify', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./browser-src/js/*.js'])
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('indexJade', function() {
  return jadeMe(paths.client.html[0],
        './public/');
});
gulp.task('templatesJade', function() {
  return jadeMe(paths.client.html[1],
        './public/templates/');
});
gulp.task('jade', ['indexJade','templatesJade']);

gulp.task('clientLint', function() {
  return lintMe(paths.client.js);
});
gulp.task('serverLint', function() {
  return lintMe(paths.server.js);
});
gulp.task('lint', ['clientLint','serverLint']);

// This runs if you simply enter `gulp`
gulp.task('default', ['browserify','jade','lint','daemon']);
