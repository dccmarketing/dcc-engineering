
## Introduction

A good user experience is vital to stimulating demand for that business through their website. We strive to make the site easy to use for both our client and their clients. From a developer's perspective, the site should be easily maintainable and the code should be readable and fully documented.


## General Code {% assign anchor="code" %}{% include toplink.html %}

These are opinionated, general coding practices that should be followed to maintain readability, ease of maintenance, and in some cases, sanity.

* Always use brackets. Being explicit about the meaning and limits of the code is important and increases the readability of the code.
* When code in an IF statement or loop contains HTML, use the if / endif, while / endwhile, foreach / endforeach syntax instead.
* Absolutely no shorthand PHP tags. Just do it correctly the first time.
* Don't use a closing PHP tag at the end of a file. Adding a closing tag increases the likelihood of the whitespace error, so leave it off.
* Use Yoda conditions in comparisons, you will.
* Use hard tabs equivalent to four spaces for indenting. Spaces are for masochists.



## CSS {% assign anchor="css" %}{% include toplink.html %}

* Default font size is 16px. Go larger rather than smaller for readability and increased effectiveness. [Your Body Text Is Too Small](https://blog.attackthefront.io/your-body-text-is-too-small-5e02d36dc902)
* Text sizes should be expressed in EMs or REMs, not pixels or points; except for the base font size. EMs and REMs allow the end user to resize the text easily proportionately.
* Content areas should be sized using percentages or EMs to allow for responsiveness and text resizing.
* Use box-sizing: border-box on the HTML element and inherit it on everything else. Google's [Paul Irish]() explains this really well.
* Use the most specific property (background-color vs background).
* List properties in alphabetical order.


### Frameworks & Grids

We are not opposed to using CSS frameworks such as Bootstrap or Foundation, but they tend to be overkill for our highly customized designs, so we typically do not use them. If needed, only use the necessary portion of the framework and leave the rest out.

We also do not use any particular grid framework either. As long as your grid methodology doesn't radically increase the size of the stylesheet or add significant complexity, you're welcome to use what you prefer.





## Browser Support {% assign anchor="browsers" %}{% include toplink.html %}

We only support the latest version of current web browsers and the previous two versions of that browser that are still supported by the vendor.

As far as IE/Edge support, we only support the current version of Edge, IE 10, and IE 11. Previous versions of IE are not supported and would be considered out-of-scope if support is requested by a client. If older browser support is required for a project, plan to use a separate stylesheet for those browsers.



## WordPress Functionality

If WordPress already does something, use it. Don't re-invent the wheel. 

Here are some examples of functionality that can be accomplished using built-in WordPress components: 

* Global or site-wide elements such as default images, header or footer text labels, etc - use the Customizer.
* Navigation or menu-like components, especially social network links - use the built-in WordPress Menus system.
* Hero images - use the Featured Image for the post type. If additional images are needed, then consider adding fields to accommodate.



## Developing Themes {% assign anchor="themes" %}{% include toplink.html %}

Most themes developed for or by DCC are custom-built. The ease and flexibility provided by building a custom theme significantly outweighs the speed-to-market and code quality of a pre-built theme.

New themes should be developed using the `_s` project as the basis. `_s` already includes many best practices and is the '1000 hour head-start' for building even the most basic theme. [Underscores Generator](http://underscores.me/)

We have our own starter theme/framework called Rosh, which is based on `_s`, and you are welcome to use that as well. It already contains many of the patterns and practices described here, as well many helpful functions and some very basic styling.

We typically do not use theme frameworks, although if one must be used, we prefer [Genesis by Studiopress](http://www.studiopress.com/features/).

We don't typically use page builders, but we do have a licensed copy of Divi by Elegant Themes and have used it for small, low-budget projects.



## Developing Plugins {% assign anchor="plugins" %}{% include toplink.html %}

We are contributors to the WordPress Plugin Boilerplate and prefer that as the basis of custom-built plugins. We do have a starter plugin available that contains many of the common plugin parts - settings page, custom post types, taxonomies, metaboxes, etc - you can use as the foundation for building a custom plugin.

There are many instances where the WPPB is not required or simply overkill. Those decisions should be agreed on in advance.



## Using Plugins {% assign anchor="using" %}{% include toplink.html %}

For speed-to-market purposes, we prefer using off-the-shelf plugins for very specific functionality. However, these plugins should be well-known and tested plugins.

We have licenses available for several common plugins:

* Formidable Pro - contact forms
* Advanced Custom Fields - metaboxes and fields
* Soliloquy - sliders
* Video User Manuals - user training
* WP Google Analytics Events Pro - Google analytics event tracking

If creating any of the above functionality, please use one of these plugins for that purpose. Using a different plugin needs to be discussed and agreed on in advance and the documented discussion archived in case a question arises later.

Additional licensed plugins should be agreed on and approved in advance. Deciding who owns the license (DCC, client, outside developer, etc) and any license ownership transfer process needs to be determined before the plugin is purchased or used.

If an annually licensed plugin (like anything from WooThemes) is purchased for a client, remember to add it to their billing account in WHMCS.


### Sliders

Clients love sliders, despite overwhelming evidence they don't work or help them achieve their goals. If a slider is required, please use the Soliloquy plugin. We already have training available and this plugin is one of the easiest for clients to use for managing sliders.


### Advanced Custom Fields

While ACF offers a significant advantages, great care should be taken to avoid over-dependence on it. Sadly, it slows down the admin when used extensively. If possible, code your own metaboxes and fields rather than using ACF. At minimum, use ACF only for advanced field like repeaters and hand code the rest.

ACF should not be used to create small applications or plugin-like functionality, especially if it should be available with any theme in the future (like a portfolio). All functionality should be done in a separate plugin.

If ACF is used, consider exporting the code and putting that into a separate file instead of installing the plugin on the production site. Install the plugin if the client anticipates adding fields in the future. Many code snippets are available on the DCC github account, use them.


### Plugins to Avoid

There are certain plugins to avoid like the plague:

* Ubermenu. Don't use it. Ever. Learn to build your own responsive menus and custom menus. We have code available on Github for adding icons, SVGs, and such to a menu item.
* [Revolution Slider](http://torquemag.io/2016/05/sucuri-report-outdated-plugins-leading-cause-wordpress-site-hacks/). Sliders should generally be avoided when possible but use Soliloquy when a slider is required. Revolution Slider requires an annual, per-site license as well, so ensure the client knows this upfront and that the license is purchased specifically for that site.


### Our Standard Suite of Plugins

There are some plugins we add to every site, mostly for security and maintenance purposes. This list is constantly being re-evaluated and updated.

* iThemes Security - comprehensive site security.
* Exploit Scanner - malware and vulnerability scanner.
* Email Address Encoder - prevents email address scraping by bots.
* Disable Comments - disables the WordPress commenting system altogether.
* Broken Link Checker - checks and notifies site admin about broken links.
* Optimus - Compresses image files.
* Yoast SEO - all-around SEO tool.
* SG CachePress - caching assistant for our hosting company, SiteGround.

There are other plugins that we install if needed.

* Better Search Replace - find and replace for the database.
* WordPress Importer - imports data from another WordPress installation.
* GatherContent Importer - imports content from the GatherContent service.
* Regenerate Thumbnails - Regenerates thumbnail images after changing sizes.

We also have a suite of plugins that have been developed at DCC that should be used for the following purposes. Documentation for these plugins is in development.

* Employees - employee/staff directory or any management of people that may need to display on the front-end.
* Now Hiring - job openings/postings.
* Anchorhead - automatically adds a linked table of contents at the top of pages/posts based on the H2s in the page.
* Formidable CachePress - Flushes SiteGround cache when Formidable form options are updated.
* Formidable No Webmails - Prevents users from submitting common webmail providers (Gmail, Yahoo, Hotmail, etc) in an email field.


