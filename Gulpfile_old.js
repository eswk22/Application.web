var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var path = require('path');

var config = {
  
};

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

function getWebConfig(type,env){
  var folderPath = 'webpack-server';
  if(type === 'client'){
    folderPath = 'webpack-client';
  }
switch (env) {
  case 'prod':
  case 'production':
    module.exports = require('./config/' + folderPath  +'/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/' + folderPath  +'/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports =  require('./config/' + folderPath  +'/webpack.dev')({env: 'development'});
}
return module.exports;
}

gulp.task('frontend-build', function(done) {
    var frontendConfig = getWebConfig('client',gutil.env.env);
    webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function() {
    var frontendConfig = getWebConfig('client',gutil.env.env);
  webpack(frontendConfig).watch(100, onBuild());
});

gulp.task('backend-build', function(done) {
    var backendConfig = getWebConfig('back-end',gutil.env.env);
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function() {
    var backendConfig = getWebConfig('back-end',gutil.env.env);
  webpack(backendConfig).watch(100, onBuild());
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('run', ['backend-watch', 'frontend-watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'build/backend'), 
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});