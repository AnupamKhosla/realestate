const gulp = require('gulp');
const webp = require('gulp-webp');
var rtlcss = require('rtlcss');
var fs = require("fs");
var browserSync = require('browser-sync').create();



gulp.task('rtl', function(cb) { 
    var fileContent = fs.readFileSync("./css/style.css", "utf8");
    var result = rtlcss.process( fileContent );
    fs.writeFileSync('./css/style_rtl.css', result);    
    cb();
});



gulp.task('browser-sync', function() {    
    gulp.src('./img/*')
        .pipe(webp())
        .pipe(gulp.dest('dist'));
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});