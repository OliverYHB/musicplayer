var gulp = require("gulp");
// 用插件开服务器
var connect = require("gulp-connect");
var less = require("gulp-less")

gulp.task("task2",function(){
    console.log(222);
})

gulp.task("task1",["task2"],function(){
    console.log(111);
})


gulp.task("html",function(){
    gulp.src("./src/index.html")
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload())
})

gulp.task("watch",function(){
    gulp.watch("./src/index.html",["html"])
    gulp.watch("./src/less/*.less",["less"])
    gulp.watch("./src/js/*.js",["js"])
})

gulp.task("less",function(){
    gulp.src("./src/less/*.less")
    .pipe(less())
    .pipe(gulp.dest("./dist/css"))
    .pipe(connect.reload())
})

gulp.task("js",function(){
    gulp.src("./src/js/*.js")
    .pipe(gulp.dest("./dist/js"))
    .pipe(connect.reload())
})
gulp.task("server",function () {
    connect.server({
        root: "dist",
        port: "3939",
        livereload:true
    })
})

gulp.task("default",["html","watch","server","less","js"])