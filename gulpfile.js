var gulp = require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('html',function(){
	gulp.src('./index.html')
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}))
});
gulp.task('css',function(){
	gulp.src(['node_modules/todomvc-app-css/index.css','css/**/*.css'])
	.pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({stream:true}));
})
gulp.task('js',function(){
	gulp.src('js/**/*.js')
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.reload({stream:true}))
})

gulp.task('watch',['html','css','js'],function(){
	gulp.watch('css/**/*.css',['css']);
	gulp.watch('js/**/*.js',['js']);
	gulp.watch('index.html',['html']);
})

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'dist/'
		}
	})
})

gulp.task('default',['watch','serve']);