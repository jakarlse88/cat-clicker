// Gulp.js configuration
const gulp = require('gulp'),
	devBuild = (process.env.NODE_ENV !== 'production'),
	newer = require('gulp-newer'),
	htmlclean = require('gulp-htmlclean'),
	concat = require('gulp-concat'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	connect = require('gulp-connect'),
	imagemin = require('gulp-imagemin');

	// folders
const folder = {
	src: 'src/',
	build: 'build/',
};

// image processing
gulp.task('images', function() {
	var out = folder.build + 'images/';
	return gulp.src(folder.src + 'images/**/*')
		.pipe(newer(out))
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(out))
		.pipe(connect.reload());
});
  
// HTML processing
gulp.task('html', ['images'], function() {
	var out = folder.build,
		page = gulp.src(folder.src + 'index.html')
			.pipe(newer(out))
			.pipe(connect.reload());
  
	// minify production code
	if (!devBuild) {
		page = page.pipe(htmlclean());
	}
  
	return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {

	var jsbuild = gulp.src(folder.src + 'js/**/*')
		.pipe(deporder())
		.pipe(concat('main.js'))
		.pipe(connect.reload());
  
	if (!devBuild) {
		jsbuild = jsbuild
			.pipe(stripdebug())
			.pipe(uglify());
	}
  
	return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
  
});

// CSS processing
gulp.task('css', ['images'], function() {

	var postCssOpts = [
		assets({ loadPaths: ['images/'] }),
		autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
		mqpacker
	];
  
	if (!devBuild) {
		postCssOpts.push(cssnano);
	}
  
	return gulp.src(folder.src + 'scss/main.scss')
		.pipe(sass({
			outputStyle: 'nested',
			imagePath: 'images/',
			precision: 3,
			errLogToConsole: true
		}))
		.pipe(postcss(postCssOpts))
		.pipe(gulp.dest(folder.build + 'css/'))
		.pipe(connect.reload());
  
});
  
// run all tasks
gulp.task('run', ['html', 'css', 'js']);

// watch for changes
gulp.task('watch', function() {

	// image changes
	gulp.watch(folder.src + 'images/**/*', ['images']);
  
	// html changes
	gulp.watch(folder.src + 'index.html', ['html']);
  
	// javascript changes
	gulp.watch(folder.src + 'js/**/*', ['js']);
  
	// css changes
	gulp.watch(folder.src + 'scss/**/*', ['css']);
  
});

// default task
gulp.task('default', ['run', 'watch', 'connect']);

// webserver w/ livereload
gulp.task('connect', function() {
	connect.server({
		root: 'src',
		livereload: true
	});
});