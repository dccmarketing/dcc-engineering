
## Introduction

Writing secure code for WordPress is not difficult to do, but does require knowledge of some special functions. There is never a time to write insecure code.


## Validate and Sanitize Inputs {% assign anchor="validate" %}{% include toplink.html %}

When data is accepted from a user, even the site admin, it should not be trusted. Sanitize and/or validate everything. WordPress includes many functions built for sanitizing data, use them at every opportunity. If a data type doesn't have a sanitization function, check the Sanitizer class in the starter plugin or theme. Beyond that, create your own sanitizer.
[Reference - WordPress VIP 1](https://vip.wordpress.com/2014/06/20/the-importance-of-escaping-all-the-things/)
[Reference - WordPress VIP 2](https://vip.wordpress.com/documentation/vip/best-practices/security/validating-sanitizing-escaping/)

```php

Validate a number field (the result should only be a integer):
$input = $_POST['number_field'];

$valid = intval( $input );


Sanitize the field for the database:
$clean = sanitize_text_field( $valid );
```



## Escape Outputs {% assign anchor="escape" %}{% include toplink.html %}

Always escape data when putting it on the page. This should be at the point where the data is being added to the page (aka ["late" escaping](https://vip.wordpress.com/documentation/vip/best-practices/security/validating-sanitizing-escaping/#always-escape-late)). WordPress has [many functions](https://codex.wordpress.org/Data_Validation) to help you here, so use them every time. When appropriate, use the internationalization version of the escape function instead. See the [translatable page](/translatable.html) for more information.

```php

$meta = get_post_meta();

Escaping content:
echo '<div class="metadata">' . esc_html( $meta[1] ) . '</div>';

Escaping attributes:
echo '<div class="' . esc_attr( $meta['attribute'] ) . '">' . esc_html( $meta[1] ) . '</div>';
```



## Use Nonces {% assign anchor="nonces" %}{% include toplink.html %}

When submitting a form, always use a nonce. This is especially true when creating metaboxes or settings pages.

The nonce should be checked at the top of the validation function.

```php
On the metabox page:
wp_nonce_field( 'some-theme', 'nonce_themename_metaboxname' );


The save meta box code (incomplete example):

function save_meta( $post_id, $post_obj ) {

	if ( ! isset( $_POST['nonce_themename_metaboxname'] ) ) { return FALSE; }
	if ( isset( $_POST['nonce_themename_metaboxname'] ) && ! wp_verify_nonce( $_POST['nonce_themename_metaboxname'], 'some-theme' ) ) { return FALSE; }

	... (rest of the function)
	
}
```