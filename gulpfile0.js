/* GULP FILE Created by alex */

//Requires
const gulp = require( 'gulp' ); // gulp
const browserSync = require( 'browser-sync' ); // Sync the server
const del = require( 'del' ); // Delete files
const runSequence = require( 'run-sequence' )
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const minifyHTML = require( 'gulp-minify-html' ); // Minify HTML
const removeHtmlComments = require( 'gulp-remove-html-comments' ); // Remove HTML Comments
const sass = require( 'gulp-sass' ); // Sass conversion
const uglify = require( 'gulp-uglify' ); // minify the css
const cleanCSS = require( 'gulp-clean-css' ); // remove comments and minify the css
const rename = require( 'gulp-rename' ); // required for re-naming files.
const plumber = require( 'gulp-plumber' ); // prevent pipe breaking where there are lots of files and some break
const sourcemaps = require( 'gulp-sourcemaps' ); // this does something

// For Prod
const wiredep = require( 'wiredep' ).stream;
var htmlclean = require( 'gulp-htmlclean' );
var dev = true;
var stripCssComments = require( 'gulp-strip-css-comments' );
var minify = require( 'gulp-minify' );


//Variables - TODO get this from a config file.
//TODO fix the custom JS to be minified and update html pages.
var page_files = './src/*.html';
var sass_files = "./src/styles/scss/style.scss";
var cssminname = "style.min.css";

var paths = {
  src: 'app/**/*',
  srcHTML: 'app/**/*.html',
  srcCSS: 'app/**/*.css',
  srcJS: 'app/**/*.js',
  srcPAGESSASS: 'app/styles/scss/pages/*.scss',
  srcSASS: 'app/**/style.scss',
  srcIMG: 'app/assets/**/*',
  srcPORTALS: 'app/Portals/**/*',
  srcFONTS: 'app/styles/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
  tmp: 'tmp',
  tmpIndex: 'tmp/index.html',
  tmpCSS: 'tmp/styles/css',
  tmpPAGESCSS: 'tmp/styles/css/pages',
  tmpJS: 'tmp/**/*.js',
  tmpFONTS: 'tmp/styles/css/fonts',
  tmpIMG: 'tmp/assets/',
  tmpPORTALS: 'tmp/Portals',
  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/styles/css',
  distPAGESCSS: 'dist/styles/css/pages',
  distJS: 'dist/**/*.js',
  distFONTS: 'dist/styles/css/fonts',
  distIMG: 'dist/assets/',
  distPORTALS: 'dist/Portals'
};


gulp.task( 'html.tmp', function () {
  return gulp.src( paths.srcHTML )
    .pipe( gulp.dest( paths.tmp ) );
} );

// As above with some cleaning
gulp.task( 'html.prod', function () {
  return gulp.src( paths.srcHTML )
    .pipe( $.useref( { searchPath: [ '.tmp', 'app', '.' ] } ) )
    // .pipe($.if('*.js', $.uglify()))
    .pipe( $.if( '*.css', $.cssnano( { safe: true, autoprefixer: false } ) ) )
    .pipe( $.if( '*.html', $.htmlmin( { collapseWhitespace: true } ) ) )
    .pipe( $.if( '*.html', $.removeHtmlComments() ) )
    .pipe( $.if( '*.html', $.htmlclean( {
      protect: /<\!--%fooTemplate\b.*?%-->/g,
      edit: function ( html ) { return html.replace( /\begg(s?)\b/ig, 'omelet$1' ); }
    } ) ) )
    .pipe( gulp.dest( paths.dist ) );
} );

gulp.task( 'img.tmp', function () {
  return gulp.src( paths.srcIMG )
    .pipe( gulp.dest( paths.tmpIMG ) );
} );

// As above with a minification on images
gulp.task( 'img.prod', function () {
  return gulp.src( paths.srcIMG )
    .pipe( $.cache( $.imagemin() ) )
    .pipe( gulp.dest( paths.distIMG ) );
} );


gulp.task( 'portals.tmp', function () {
  return gulp.src( paths.srcPORTALS )
    .pipe( gulp.dest( paths.tmpPORTALS ) );
} );
// As above with a different destination
gulp.task( 'portals.prod', function () {
  return gulp.src( paths.srcPORTALS )
    .pipe( gulp.dest( paths.distPORTALS ) );
} );


gulp.task( 'scripts.tmp', () => {
  return gulp.src( paths.srcJS )
    .pipe( $.plumber() )
    .pipe( $.sourcemaps.init() )
    .pipe( $.babel() )
    .pipe( $.sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.tmp ) )
    .pipe( reload( { stream: true } ) );
} );

// Copy of above with the minify command
gulp.task( 'scripts.prod', () => {
  return gulp.src( paths.srcJS )
    .pipe( $.plumber() )
    .pipe( $.sourcemaps.init() )
    .pipe( $.babel() )
    .pipe( $.sourcemaps.write( '.' ) )
    .pipe( minify( {
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      exclude: [ 'tasks' ],
      ignoreFiles: [ '.combo.js', '-min.js' ]
    } ) )
    .pipe( gulp.dest( paths.dist ) );
} );

gulp.task( 'sass_css.tmp', function () {
  return gulp.src( paths.srcSASS ) // get the sass files for the style.css (this will compile all related css files.)
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( sass( {
      style: 'expanded',
      sourceComments: 'normal'
    } ) )
    .pipe( cleanCSS( { level: { 1: { specialComments: 0 } } } ) ) //minify*/
    .pipe( rename( cssminname ) )
    .pipe( gulp.dest( paths.tmpCSS ) ); // save the css files to the directory
} );
/* Styles
gulp.task('styles', function() {
 return gulp.src('src/sass/**.scss')
   .pipe(sass({errLogToConsole: true}))
   .pipe(sass({
      style: 'expanded',
      sourceComments: 'normal'
    }))
   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
   .pipe(gulp.dest('build/dev/css'))
   //.pipe(minifyCSS())
   .pipe(gulp.dest('build/production/css'));
});*/

// Prod variance
gulp.task( 'sass_css.prod', function () {
  return gulp.src( paths.srcSASS ) // get the sass files for the style.css (this will compile all related css files.)
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( cleanCSS( { level: { 1: { specialComments: 0 } } } ) ) //minify*/
    .pipe( rename( cssminname ) )
    .pipe( gulp.dest( paths.distCSS ) ) // save the css files to the directory
  ;
} );

gulp.task( 'pages_css.tmp', function () {
  return gulp.src( paths.srcPAGESSASS )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( sass( {
      style: 'expanded',
      sourceComments: 'normal'
    } ) )
    .pipe( gulp.dest( paths.tmpPAGESCSS ) );
} );


// Prod variance
gulp.task( 'pages_css.prod', function () {
  return gulp.src( paths.srcPAGESSASS )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( paths.distPAGESCSS ) );
} );

gulp.task( 'styles.tmp', function () {
  gulp.start( 'sass_css.tmp' );
  gulp.start( 'pages_css.tmp' );
  gulp.start( 'fonts.tmp' );
  return gulp.src( paths.srcCSS )
    .pipe( $.plumber() )
    .pipe( gulp.dest( paths.tmp ) );
} );

// As above with sourcemapps and a new prod location
gulp.task( 'styles.prod', function () {
  gulp.start( 'sass_css.prod' );
  gulp.start( 'pages_css.prod' );
  gulp.start( 'fonts.prod' );
  return gulp.src( paths.srcCSS )
    .pipe( $.plumber() )
    .pipe( $.sourcemaps.init() )
    //.pipe( $.autoprefixer( { browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR' ] } ) )
    .pipe( $.sourcemaps.write() )
    .pipe( gulp.dest( paths.dist ) );
} );

gulp.task( 'fonts.tmp', () => {
  return gulp.src( paths.srcFONTS )
    .pipe( gulp.dest( paths.tmpFONTS ) );
} );
// As above with a new location
gulp.task( 'fonts.prod', () => {
  return gulp.src( paths.srcFONTS )
    .pipe( gulp.dest( paths.distFONTS ) );
} );


gulp.task( 'build.tmp', [ 'html.tmp', 'portals.tmp', 'img.tmp', 'styles.tmp', 'scripts.tmp' ], () => {
  return gulp.src( 'dist/**/*' ).pipe( $.size( { title: 'build', gzip: true } ) );
} );

// Note
gulp.task( 'build.prod', [ 'scripts.prod', 'html.prod', 'img.prod', 'portals.prod', 'styles.prod' ], () => {
  return gulp.src( 'dist/**/*' ).pipe( $.size( { title: 'build', gzip: true } ) );
} );

gulp.task( 'serve.tmp', () => {
  runSequence( [ 'clean.tmp' ], [ 'build.tmp' ], () => {
    browserSync( {
      notify: false,
      ghostMode: false,
      port: 9001,
      server: {
        baseDir: 'tmp',
        routes: {
          '/scripts': '.tmp/scripts',
          '/node_modules': 'node_modules'
        }
      }
    } );

    gulp.watch( 'app/*.html', [ 'html.tmp' ] ).on( 'change', browserSync.reload );
    gulp.watch( 'app/styles/**/*', [ 'styles.tmp' ] ).on( 'change', browserSync.reload );
    gulp.watch( 'app/scripts/**/*', [ 'scripts.tmp' ] ).on( 'change', browserSync.reload );
    gulp.watch( 'app/js/**/*', [ 'scripts.tmp' ] ).on( 'change', browserSync.reload );
    gulp.watch( 'app/assets/images' [ 'images.tmp' ] ).on( 'change', browserSync.reload );

    gulp.watch( [
      'tmp'
    ] ).on( 'change', browserSync.reload );
  } );
} );


gulp.task( 'scripts', () => {
  return gulp.src( 'app/scripts/**/*.js' )
    .pipe( $.plumber() )
    .pipe( $.sourcemaps.init() )
    .pipe( $.babel() )
    .pipe( $.sourcemaps.write( '.' ) )
    .pipe( gulp.dest( paths.dist + '/scripts' ) );
} );

gulp.task( 'scripts2', () => {
  return gulp.src( 'app/plugins/**/*.js' )
    .pipe( minify( {
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      exclude: [ 'tasks' ],
      ignoreFiles: [ '.combo.js', '-min.js' ]
    } ) )
    .pipe( gulp.dest( 'dist/plugins' ) );
} );

// HTML PAGES
//
gulp.task( 'html', function () {
  console.log( '--- starting: function pages ---' )
  return gulp.src( page_files )
    .pipe( minifyHTML() )
    .pipe( removeHtmlComments() )
    .pipe( gulp.dest( paths.dist ) );
  //apply the header and footer from fooTemplate
  // remove comments
} );

// Styling functions
// Css will move files for the build and minimise etc.
// sass-css will compile out the css
// Sass and CSS files must be re-compiled through "gulp css" in order to update the css files.
gulp.task( 'sass_css', function () {
  return gulp.src( sass_files ) // get the sass files for the style.css (this will compile all related css files.)
    .pip( $.plumber() )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( cleanCSS( { level: { 1: { specialComments: 0 } } } ) ) //minify*/
    .pipe( rename( cssminname ) )
    .pipe( gulp.dest( paths.dist + "/css" ) ); // save the css files to the directory
} );

// FONTS
// At the moment this is never used.
// download the local copies of the fonts and the push to the folder

// TODO: https://discourse.roots.io/t/pulling-font-face-css-files-automatically-into-your-workflow-with-gulp/4213

gulp.task( 'styles', function () {
  gulp.start( 'sass_css' );
  gulp.start( 'fonts' );
  return gulp.src( './src/css/*' )
    .pipe( $.plumber() )
    .pipe( gulp.dest( dest + "/styles/css" ) );
} );


// UTILITIES

gulp.task( 'clean.dist', function () {
  console.log( "--- starting: function clean ---" )
  return del( [ paths.dist + '/**/*', ] );
} );

gulp.task( 'clean.tmp', function () {
  console.log( "--- starting: function clean ---" )
  return del( [ paths.tmp + '/**/*', ] );
} );