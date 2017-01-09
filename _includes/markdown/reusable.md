
## Introduction

Reusability refers specifically to how the code is written. Code should be written to be used in multiple places, even if there's a 99.99% chance that it won't.



## CSS & SCSS Practices {% assign anchor="css" %}{% include toplink.html %}

Reusable styles can be accomplished two ways. The first method is put the declarations in a mixin and @include it in the element's style rule. The second method is create a class with those declarations and add the class attribute to the HTML. The second method works well as a library of styles for forms or buttons. Generally, we prefer to use as few classes as possible to keep the markup neat and readable. Some areas of WordPress are easier to style using a mixin, where a class can be added easily to others. The combination of both methods typically works best and should be optimized to generate the smallest, simplest stylesheet. We recommend using the Parker CSS tool along with Gulp.js to help with this goal. 

Either way, the advantages of these approaches are:

* Keeps the CSS DRY (don't repeat yourself)
* Reduces the stylesheet file size
* Makes maintenance and troubleshooting easier
* Prevents complicated workarounds for parts of WordPress


### Resets

Since we use `_s` as the basis for our themes, we typically use [normalize.css](http://necolas.github.io/normalize.css/) as our primary reset tool. You may also use [sanitize.css](https://github.com/10up/sanitize.css) from 10up as well.


## Javascript Practices {% assign anchor="js" %}{% include toplink.html %}

Javascript should be written without any dependencies when possible. While jQuery is great tool and is available throughout WordPress, it is a third-party library and could be removed at any point. While that is unlikely, its better to prevent errors that could be easily foreseen. 

Use separate functions instead of anonymous functions.

**Do this:**

```js
var container = document.querySelector( '#site-navigation' );
container.addEventListener( 'click', clickEvent );

function clickEvent( event ) {
	
	event.preventDefault();
	// do stuff

}
```

**Not this:**

```js
var container = document.querySelector( '#site-navigation' );
container.addEventListener( 'click', function( event ){
	event.preventDefault();
	// do stuff
});
```


## PHP Practices {% assign anchor="php" %}{% include toplink.html %}

Using the WordPress hooks and filters system is a fantastic way to add markup to a template, which also makes it easily reusable. By simply adding a hook to a page template, multiple items can be added as needed using separate functions and pages can be redesigned simply by changing the hook or priority. This follows the single responsibility principle for each function and makes it simple to reuse that component in another location.

Functions should not be added to templates, they should be added to a separate file and hooked to the appropriate location.



## Documentation {% assign anchor="docs" %}{% include toplink.html %}

Always document your code! Your documentation should tell any other developer exactly what to expect from your code. Use the PHPDoc conventions and explain what happens in each function. Try to avoid inline comments, if possible.

These also apply to documenting SASS functions, JS functions, or any other code that needs to be documented (like a reusable code block for a template).

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

If a function doesn't return anything, don't use the @return tag.

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

When working with longer functions, its helpful to comment the closing bracket with the name of the function. This isn't needed for shorter functions, but makes differentiating if/else statements, loops, and function closing brackets easier.

```php
<?php
function long_example( $param ) {

	if ( empty( $param ) ) { return; }
	if ( ! absint( $param ) ) { return; }

	... 30 more lines of code

	return $param * 5;

} // long_example()
```



## git & Github  {% assign anchor="git" %}{% include toplink.html %}

We use git for version control. Each project should have a repo on the DCC Github account. Exceptions should be discussed in advance.


### Branches

When multiple developers are working on the same project, its important that each developer works on their own branch of the project. The lead developer should act as the Merge Manager to accept pull requests from the other developers on the project.

Even if there is only one developer, the final, production-ready code should be the only code in the main branch. The solo developer should work from their own branch and merge when a feature is ready.

