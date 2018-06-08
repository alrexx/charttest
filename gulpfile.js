/* GULP FILE Created by alex */

//Requires
var gulp = require( 'gulp' ); // gulp
var browserSync = require( 'browser-sync' ); // Sync the server

gulp.task( 'serve', function () {
  browserSync( {
    notify: false,
    ghostMode: false,
    port: 9001,
    server: {
      baseDir: '',
      directory: false,
      index: "index.htm"
    }
  } );
  gulp.watch( 'app/*' ).on( 'change', browserSync.reload );
} );