var gulp = require('gulp');

var sass = require('gulp-sass');

var server = require('gulp-webserver');

var autoprefixer = require('gulp-autoprefixer');

var clean = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var htmlmin = require('gulp-htmlmin'); //压缩html

var url = require('url');

var fs = require('fs');

var path = require('path');

gulp.task('devCss',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devCss'))
})

gulp.task('devServer',function(){
    return gulp.src('build')
    .pipe(server({
        port:9090,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;

            if(pathname === '/favicon.ico'){
                res.end('');
                return false
            }

            if(pathname === '/api/swiper'){  //接口

            }else{ //静态文件
                pathname = pathname === '/' ? 'index.html' : pathname;

                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
            }
        }
    }))
})

//开发环境
gulp.task('dev',gulp.series('devCss','devServer','watch'))

//线上环境

gulp.task('buildCss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(clean())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('buildUglify',function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('copyJs',function(){
    return gulp.src('./src/js/libs/*.js')
    .pipe(gulp.dest('./build/js/libs'))
})

gulp.task('htmlmin',function(){
    return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'))
})

gulp.task('build',gulp.series('buildCss','buildUglify','copyJs','htmlmin'))


