var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');
var cssmin = require('gulp-cssmin');
var sketch = require('gulp-sketch');

gulp.task('sass', function() {
   return sass('src/scss/style.scss', {
         sourcemap: true
      }).on('error', function(err) {
         console.error('Error!', err.message);
      })
      .pipe(autoprefixer({
         browsers: ['last 2 versions', 'ie 8', 'ie 9'],
         map: {
            inline: false
         }
      }))
      .pipe(base64({
        extensions: ['woff2','woff','svg']
      }))
      .pipe(cssmin({
         sourceMap: true
      }))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('static/css/'))
});

gulp.task('icons', function() {
   return gulp.src('sketch/icons.sketch')
      .pipe(sketch({
         export: 'artboards',
         formats: 'svg'
      }))
      .pipe(gulp.dest('src/scss/svg/'));
});

gulp.task('scripts', function() {
   gulp.src([
        //  "bower_components/jquery/dist/jquery.min.js",
        //  "bower_components/jquery-textfill/source/jquery.textfill.min.js",
        //  "bower_components/jquery-cycle/jquery.cycle.lite.js",
         //  "bower_components/selectize/dist/js/standalone/selectize.min.js",
         //  "bower_components/FlexiColorPicker/colorpicker.min.js",
         //  "bower_components/jquery-simplecolorpicker/jquery.simplecolorpicker.js",
         //  "bower_components/jquery-validation/dist/jquery.validate.min.js",
         //  "public/js/colorpicker.min.js"
         //  "bower_components/jquery-ui/ui/minified/core.js",
         //  "bower_components/jquery-ui/ui/minified/effect.min.js",
         //  "bower_components/jquery-ui/ui/minified/widget.js",
         //  "bower_components/jquery-ui/ui/minified/mouse.js",
         //  "bower_components/jquery-ui/ui/minified/position.js",
         //  "bower_components/jquery-ui/ui/minified/draggable.js",
         //  "bower_components/jquery-ui/ui/minified/slider.js",
      ])
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest("static/js/"))
});

gulp.task('watch', function() {
  gulp.watch(['src/scss/*.scss','sketch/*.sketch','public/js/*.js'], function() {
     runSequence('sass')
  });
});

gulp.task('default', ['watch']);
