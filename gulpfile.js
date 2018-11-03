var gulp = require('gulp');

var sass = require('gulp-sass');

var server = require('gulp-webserver');

var autoprefixer = require('gulp-autoprefixer');

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
    return gulp.src('src')
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

gulp.task('dev',gulp.series('devCss','devServer','watch'))