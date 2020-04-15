const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

// compile scss into css
function style(){
	return gulp.src('./scss/**/*.scss')
	
	.pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
	// .pipe(concat('all.css'))
	.pipe(rename({dirname: "./css/min", suffix: '.min'}))
	.pipe(cleanCSS())
    .pipe(gulp.dest('./'))
	.pipe(browserSync.stream());
	
}

gulp.task('svgstore', function () {
    return gulp
        .src('./images/svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./images'));
});

gulp.task('html', function(){
	return gulp.src('*.html')
	.pipe(browserSync.reload({stream: true}))
});

function watch(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('./scss/**/*.scss', gulp.parallel('style'));
	gulp.watch('./*.html', gulp.parallel('html'))
	gulp.watch('./js/**/*.js', gulp.parallel('html'));

}
exports.watch = watch;
exports.style = style;
