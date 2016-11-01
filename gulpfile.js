/**
 * Gulpfile for DCC Engineering Standards Jekyll site
 */

/**
 * Project Variables
 */
var styleSRC            = './_scss/style.scss';
var styleDestination    = './css/';
var jsPublicSRC         = './_js/*.js';
var jsPublicFile        = 'public';
var jsPublicDestination = './js/';
var deploy 				   = '_deploy/'
var projectURL 			= 'localhost:3005';

// Watch files paths.
var styleWatchFiles         = './_scss/*.scss'; // Path to all *.scss files inside css folder and inside them.
var publicJSWatchFiles      = ['./_js/*.js']; // Path to all custom JS files.
var cssWatchFiles 			= './css/*.css';

/**
 * Load gulp plugins and assing them semantic names.
 */
var gulp 			   = require( 'gulp' ); // Gulp of-course
var gulpLoadPlugins  = require( 'gulp-load-plugins' );
var plugins          = gulpLoadPlugins();
var child            = require( 'child_process' );

var browserSync      = require( 'browser-sync' ).create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.

// Import files
var pkg 			= require( './package.json' );

/**
 * Browsers you care about for autoprefixing.
 */
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

/**
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * @link http://www.browsersync.io/docs/options/
 */
gulp.task( 'browser-sync', function() {
	browserSync.init({
		proxy: projectURL,
		open: true,
		injectChanges: true,
        browser: "google chrome"
	});
});

/**
 * Creates style.css.
 */
gulp.task( 'publicStyle', function () {
    gulp.src( styleSRC )
        .pipe( plugins.sourcemaps.init() )
        .pipe( plugins.sass( {
            errLogToConsole: true,
            includePaths: ['./sass'],
            outputStyle: 'compact',
            precision: 10
        } ) )
        .on('error', console.error.bind(console))
		.pipe( plugins.autoprefixer( AUTOPREFIXER_BROWSERS ) )

        .pipe( plugins.sourcemaps.write( { includeContent: false } ) )
        .pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
        .pipe( plugins.sourcemaps.write ( styleDestination ) )
        .pipe( plugins.lineEndingCorrector() )
        .pipe( gulp.dest( styleDestination ) )

        .pipe( plugins.filter( '**/*.css' ) ) // Filtering stream to only css files
 		.pipe( plugins.mergeMediaQueries( { log: true } ) ) // Merge Media Queries only for final version.
 		.pipe( plugins.cssnano())
 		.pipe( plugins.lineEndingCorrector() )
 		.pipe( gulp.dest( styleDestination ) )

 		.pipe( plugins.filter( '**/*.css' ) ) // Filtering stream to only css files
 		//.pipe( plugins.browserSync.reload( {stream:true, once: true} ) ) // Reloads style.css if that is enqueued.
 		.pipe( plugins.notify( { message: 'TASK: "publicStyle" Completed! 💯', onLast: true } ) );
});

/**
 * Concatenate and uglify public JS scripts.
 */
gulp.task( 'publicJS', function() {
	gulp.src( jsPublicSRC )
		.pipe( plugins.concat( jsPublicFile + '.js' ) )
		.pipe( plugins.lineEndingCorrector() )
		.pipe( plugins.rename( {
			basename: jsPublicFile,
			suffix: '.min'
		}))
		.pipe( plugins.uglify() )
		.pipe( plugins.lineEndingCorrector() )
		.pipe( gulp.dest( jsPublicDestination ) )
		.pipe( plugins.notify( { message: 'TASK: "publicJS" Completed! 💯', onLast: true } ) );
});

gulp.task( 'html', ['jekyll'], function() {
	return gulp.src( '/*.html' )
        .pipe( plugins.htmlmin( {collapseWhitespace: true} ) )
        .pipe( gulp.dest( deploy ) )
        //.pipe( plugins.browserSync.reload( {stream:true, once: true} ) );
        .pipe( plugins.notify( { message: 'TASK: "html" Completed! 💯', onLast: true } ) );
});

gulp.task('jekyll', () => {
	const jekyll = child.spawn('jekyll', ['build',
		'--watch',
	    '--incremental',
	    '--drafts'
	]);

	const jekyllLogger = (buffer) => {
		buffer.toString()
			.split(/\n/)
			.forEach((message) => plugins.util.log('Jekyll: ' + message)
		);
	};

	jekyll.stdout.on('data', jekyllLogger);
	jekyll.stderr.on('data', jekyllLogger);
});

gulp.task( 'deploy', function() {
	return gulp.src( './dist/**/*' )
		.pipe( plugins.ghPages() );
});

gulp.task('serve', () => {
	browserSync.init({
		browser: "google chrome",
		files: ['_site/**'],
		port: 4000,
		server: {
			baseDir: '_site'
		}
	});

	gulp.watch(cssWatchFiles, ['publicStyle']);
});

/**
 * Watches for file changes and runs specific tasks.
 */

gulp.task( 'default', ['publicStyle', 'html', 'publicJS', 'jekyll', 'serve'], function () {
    gulp.watch( styleWatchFiles, ['publicStyle'] ); // Reload on SCSS file changes.
    gulp.watch([('_source/', '*.html')], ['html']);
    gulp.watch( publicJSWatchFiles, ['publicJS'] ); // Reload on publicJS file changes.
});
