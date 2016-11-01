
## Introduction

Generally, we follow the [WordPress PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/).

An important item: always use brackets. Being explicit about the meaning and limits of the code is important and increases the readability of the code.

The one exception is when the code contained in the IF statement or loop contains HTML. In that case, use the if / endif, while / endwhile, foreach / endforeach syntax.

Absolutely no shorthand PHP tags. Just do it correctly the first time.

Don't use a closing PHP tag at the end of a file. Adding a closing tag increases the likelihood of the whitespace error, so leave it off.

Use Yoda conditions in comparisons, you will.

<h2 id="patterns">Patterns & Performance {% include toplink.html %}</h2>

Stay in PHP and exit only when you need to display HTML. While most of the time spaces in HTML don't affect anything, there are instances where the returns, tabs, and spaces for code formatting affect the output. This is not the case in PHP. In the PHP world, its widely considered bests practice to stay in PHP until you need to exit and display HTML.

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

When writing functions, return as early as possible. Instead of wrapping the remaining code in a positive if() statement, check if the condition is not met and return.

If your function takes a parameters, check if the parameter is valid first. If the parameter cannot be empty, check if its empty. If its supposed to be a particular data type, check that first. If the proper conditions aren't met, return early.

```php
<?php
function example( $param ) {

	if ( empty( $param ) ) { return; } // return if $param is empty

	if ( ! absint( $param ) ) { return; } // return if the $param is not a positive integer

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

<h2 id="security">Security {% include toplink.html %}</h2>

Security, in this case, refers to what we are able to do in our code to keep things as secure as possible.

### Validate and Sanitize Inputs

When data is accepted from a user, even the site admin, it should not be trusted. Sanitize and/or validate everything. WordPress includes many functions built for sanitizing data, use them at every opportunity. If a data type doesn't have a sanitization function, check the Sanitizer class in the starter plugin or theme. Beyond that, create your own sanitizer.

```php
```

### Escape Outputs

Always escape data when putting it on the page. Again, WordPress has many functions to help you here, so use them every time. Ideally, combine them with the i18n functions below.

```php
```

### Use Nonces

<h2 id="i18n">Internationalization {% include toplink.html %}</h2>

<h2 id="docs">Style & Documentation {% include toplink.html %}</h2>

When working with longer functions, its helpful to comment the closing bracket with the name of the function. This isn't needed for shorter functions, but makes differentiating between if/else statements, loops, and function closing brackets easier.

```php
<?php
function long_example( $param ) {

	if ( empty( $param ) ) { return; } // return if $param is empty

	if ( ! absint( $param ) ) { return; } // return if the $param is not a positive integer

	... 30 more lines of code

	return $param * 5;

} // long_example()
```

### Documentation

Always document your code! Your documentation should tell any other developer exactly what to expect from your code. Use the PHPDoc conventions and explain what happens in each function. Try to avoid inline comments, if possible.

```php
<?php
/**
 * Reduce the length of a string by character count
 *
 * @param 	string 		$text 		The string to reduce
 * @param 	int 		$limit 		Max amount of characters to allow
 * @param 	string 		$after 		Text for after the limit
 *
 * @return 	string 					The possibly reduced string
 */
function shorten_text( $text, $limit = 100, $after = '...' ) {

	if ( empty( $text ) ) { return; }

	$length = strlen( $text );
	$text = substr( $text, 0, $limit );

	if ( $length > $limit ) {

		$text = $text . $after;

	} // Ellipsis

	return $text;

} // shorten_text()
```

In addition to the standard PHPDoc tags, we use several custom tags for WordPress things.

**@hooked** - shows the hook and priority for that function.

```php
<?php
/**
 * @hooked 		hook_name 		priority
 *
 * @hooked 		header_top 		10
 */
```

**@exits** - show each condition where the function exits early.

```php
<?php
/**
 * @exits 		Comments closed.
 * @exits 		There are no comments.
 */
```
If a function doesn't return anything, don't use the @return tag.
