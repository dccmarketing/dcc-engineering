
## Introduction

There are many factors that influence a user's experience with a website. As developers, we are able to control some of those, but many are out of our hands, such as the client's connection speed. We should do as much as possible to mitigate predictable issues to make each user's experience with a site as close to optimal as possible.

Many studies have proven when a site loads slowly or behaves slow, users will leave the site. In addition, search engines are now weighing site load speed as part of their ranking algorithms. Fortunately, there are several good practices we can use to help.



## Hosting  {% assign anchor="hosting" %}{% include toplink.html %}

We currently host our client sites with SiteGround, Inc. Make use of their SuperCacher plugin, CloudFlare, and other tools to decrease the site load time.



## CSS & SCSS Practices {% assign anchor="css" %}{% include toplink.html %}

Stylesheets should be as simple and lightweight as possible. Ideally, critical CSS would be added to the header of each page so it renders as quickly as possible. Since the dynamic nature of WordPress makes it rather difficult to determine the critical CSS for each possible page, the public-facing stylesheet should be minified and optimized to be as small as possible. Aside from critical CSS, themes and plugin should only output one stylesheet per location (public, admin, customizer, editor, etc).

We do not currently use any particular naming convention for classes (ITCSS, OOCSS, BEM, etc). If one is used in a project, the documentation should explain the convention and it should be used consistently throughout the project. Either way, class names should follow a consistent pattern and clearly describe where they are used.

There are few rules we adhere to:
* Never use CSS imports. Use @imports in SASS, but not in CSS.
* Use as few selectors as possible to apply styles, ideally a single class.


### Pre-Processors

We prefer SASS to generate our stylesheets. SASS allows for advanced functionality and convenience over using standard CSS. In addition to nesting, loops, variables, functions, and mixins, SASS requires a pre-processing tool to create the final stylesheet, allowing additional optimization like auto-prefixing, minification, and combining media queries.

See the Reusable page for how techniques for both CSS and SCSS that help reduce file size.

Our typical SASS structure includes at least:

* `style.scss` - imports all the other SASS files.
* `_vars.scss` - contains all the variables and/or imports other variable files.
* `_mixins.scss` - imports all the mixins, extensions, and function files.
* `_normalize.scss` or `_sanitize.scss` - our preferred reset tools.
* Files for each part of theme: `_header.scss`, `_footer.scss`, `_main-menu.scss`, etc.

This structure applies to smaller, simpler projects (like this site). For WordPress theme, our starter theme has adapted the more complex structure used by `_s`.

Nested selectors are considered best practice, however do not abuse them. The end result should still use as few selectors as possible. There are always exceptions to the rule, but that is widely considered a best practice. Always use nesting for:

* pseudo-classes
* pseudo-elements
* component states
* media queries

Use primarily @mixins instead of @extends for performance and to keep the resulting code sane.


### Task Runners

We use gulp to process all our files (PHP, CSS, JS, etc). It compiles our SCSS into CSS, but also uses plugins to automatically apply the appropriate CSS prefixes and minifies the output. It is not required to use gulp, but we have a great starting gulpfile to use for both themes and plugins. It may require a slight reconfiguration of the project's files and folder to accommodate the expected input and output locations. The gulpfile should be included in the git repo so it could be used by any other developer in the future.
[gulpfile repo]()


### Other Best Practices

CSS @import statements should be avoided. These are render-blocking and don't allow for parallel downloading - each sheet has to wait until the previous one is done. If multiple standard CSS stylesheets are required for a project, use the standard <link> tag in the header for each stylesheet. In WordPress, use the wp_enqueue_style() function for each stylesheet. [Reference 1](https://www.stevesouders.com/blog/2009/04/09/dont-use-import/)
[Reference 2](https://www.giftofspeed.com/optimize-css-delivery/)
[Reference 3](https://premium.wpmudev.org/blog/eliminate-render-blocking-issues-hummingbird/)



## PHP Practices {% assign anchor="php" %}{% include toplink.html %}

Stay in PHP and exit only when you need to display HTML. Spaces in HTML typically don't affect anything, but there are instances where the returns, tabs, and spaces for code formatting affect the output. In the PHP community, it is widely considered "best practice" to stay in PHP until you need to exit and display HTML.

**Do this:**

```php
<?php
do_action( 'before_content' );

?><div class="content-area"><?php

	function_call_1();
	function_call_2();
	function_call_3();

?></div><?php

do_action( 'after_content' );
```

**Not this:**

```php
<?php
do_action( 'before_content' ); ?>

<div class="content-area">

	<?php function_call_1(); ?>
	<?php function_call_2(); ?>
	<?php function_call_3(); ?>

</div>

<?php do_action( 'after_content' ); ?>
```

When writing functions, return as early as possible. Instead of wrapping the remaining code in a positive if() statement, check for a condition and return if it is not met. This increases the readability of the code by removing most of the indenting required for additional if statements and also clearly shows what conditions are expected in the rest of the function.

If your function takes a parameter, check if the parameter is valid first. If the parameter cannot be empty, check if its empty. If its supposed to be a particular data type, check for that data type. If the proper conditions aren't met, return.

```php
<?php
function example( $param ) {

	if ( empty( $param ) ) { return; }
	if ( ! absint( $param ) ) { return; }

	return $param * 5;

}
```

### Caching Database Calls

One of the most interesting things adopted from 10up was the caching query results from WP_Query. After experimenting and trying multiple variations of their sample code, we currently use the following code to cache a database query for five minutes.

The optional cache name allows you to create multiple caches for different parts of the site (home news, home calendar, posts, etc). Any of the standard WP_Query parameters can be passed along in the $params array to override the defaults.

```php
<?php
/**
 * Returns a post object of the requested post type
 *
 * @param 	string 		$post 			The name of the post type
 * @param   array 		$params 		Optional parameters
 * @param 	string 		$cache 			Optional name for a separate cache
 *
 * @return 	object 		A post object
 */
function custom_get_posts( $post, $params = array(), $cache = '' ) {

	if ( empty( $post ) ) { return -1; }

	$return = '';
	$cache_name = 'posts';

	if ( ! empty( $cache ) ) {

		$cache_name = '' . $cache . '_posts';

	}

	$return = wp_cache_get( $cache_name, 'posts' );

	if ( false === $return ) {

		$args['post_type'] = $post;
		$args['post_status'] = 'publish';
		$args['order_by'] = 'date';
		$args['posts_per_page'] = 50;
		$args['no_found_rows'] = true;
		$args['update_post_meta_cache'] = false;
		$args['update_post_term_cache'] = false;

		$args 	= wp_parse_args( $params, $args );
		$query 	= new WP_Query( $args );

		if ( ! is_wp_error( $query ) && $query->have_posts() ) {

			wp_cache_set( $cache_name, $query, 'posts', 5 * MINUTE_IN_SECONDS );

			$return = $query;

		}

	}

	return $return;

} // custom_get_posts()
```



## Javascript Practices {% assign anchor="js" %}{% include toplink.html %}

Just like with CSS, scripts should be minified and concatenated. Ideally, there should only be one file per theme or plugin - something like theme-public.js or plugin-public.js. Scripts should be loaded asychronously in the footer to prevent render blocking issues.

Write scripts in vanilla Javascript when possible. The fewer dependencies, the better. That said, jQuery is typically already loaded for the front end of WordPress, so its fine to use that when its available. Try to limit additional libraries and requirements beyond what is already built into WordPress. Even then, use them sparingly. While most of these libraries are really good and helpful, it is yet-another-thing-to-load, which takes its toll on mobile and slower connections.


## Webfonts {% assign anchor="webfonts" %}{% include toplink.html %}

We have recently adopted use of Bram Stein's [Font Face Observer](https://github.com/bramstein/fontfaceobserver) script to help load 



## Image Practices {% assign anchor="images" %}{% include toplink.html %}

Images should be compressed and sized for their intended usage. If you're planning to use an image as a headshot, it will most likely smaller vs using it as a hero image. If you can't size the image for it exact usage size, try to get close.


### SVGs {% assign anchor="svgs" %}{% include toplink.html %}





## Tools {% assign anchor="tools" %}{% include toplink.html %}

There are quite a few tools that can help find speed bottlenecks. Here are a few we use regularly:

* Parker - Command-line CSS Analysis Tool - helps find ways to reduce the complexity of stylesheets and optimize for speed and easier troubleshooting.
* 
* 
* 
