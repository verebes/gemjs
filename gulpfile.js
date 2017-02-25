var gulp = require("gulp");
var clean = require('gulp-clean');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var mocha = require('gulp-mocha');
var paths = {
    pages: ['src/*.html']
};

var Server = require('karma').Server;

gulp.task('clean', function() {
  return gulp.src(['dist','coverage'], {read: false} )
    .pipe(clean());
})

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done();
    }).start();
})

// gulp.task('mocha', function(){
//     gulp.src('test/*.ts')
// })


gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['test','copyHtml'], function () {
    return browserify({
        basedir: '.',
        debug: false,
        entries: ['src/painter.ts', 'src/facade.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('gem.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
})
