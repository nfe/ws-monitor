var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var notify = require('gulp-notify');
var runseq = require('run-sequence');
var mocha = require('gulp-mocha');
var async = require('async');

var paths = {
	tscripts : {
		appSrc : ['app/**/*.ts'],
		appDest : 'build/app',
		testSrc: ['test/**/*.ts'],
		testDest: 'build/test'
	},
	test: {
		src: ['build/test/**/*.js']
	}
};

function compile() {
	return gulp.src(paths.tscripts.appSrc)
						 .pipe(tsc({
								module: "commonjs",
								emitError: false
						 }))
						 .pipe(gulp.dest(paths.tscripts.appDest));
}

function testCompile() {
	return gulp.src(paths.tscripts.testSrc)
						 .pipe(tsc({ module: "commonjs", emitError: false	}))
						 .pipe(gulp.dest(paths.tscripts.testDest));
}

function test() {
	return gulp.src(paths.test.src)
						 .pipe(mocha({reporter: 'spec'}))
						 .on("error", notify.onError({
							message: "Error: <%= error.message %>",
							title: "Error running tests"
						 }));
}



gulp.task('default', ['buildrun']);


// ** Running ** //

gulp.task('run', shell.task([
  'node build/app/index.js'
]));

gulp.task('buildrun', function (cb) {
	runseq('build', 'run', cb);
});

// ** Watching ** //


gulp.task('watch', function () {
	gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

gulp.task('watchrun', function () {
	gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
	compile()
});
gulp.task('compile:test', function () {
	testCompile()
});

gulp.task('test', ['compile:test'], function() {
	test()
});
