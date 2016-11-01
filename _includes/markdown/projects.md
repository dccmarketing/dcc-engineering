
## Introduction

<h2 id="dev-themes">Developing Themes</h2>

Most themes developed for or by DCC are custom-built. The ease and flexibility provided by building a custom theme significantly outweighs the speed-to-market of a pre-built theme.

New themes should be developed using the `_s` project as the basis. `_s` already includes many best practices and is a 1000 hour head-start for building even the most basic theme.

We have our own starter theme, which is based on `_s`, and you are welcome to use that as well. It already contains many of the patterns and practices described here, as well many helpful functions and some basic styling.

We typically do not use theme frameworks, although if one must be used, we prefer [Genesis by Studiopress](http://www.studiopress.com/features/).

<h2 id="dev-plugins">Developing Plugins{% include toplink.html %}</h2>

We are contributors to the WordPress Plugin Boilerplate and prefer that as the basis of custom-built plugins. We do have a starter plugin available that contains many of the common plugin parts - settings page, custom post types, taxonomies, metaboxes, etc - you can use as the foundation for building a custom plugin.

There are many instances where the WPPB is not required or simply overkill. Those decisions should be agreed on in advance.

<h2 id="site">Site Setup{% include toplink.html %}</h2>

<h2 id="plugins">Using Plugins{% include toplink.html %}</h2>

For speed-to-market purposes, we prefer using off-the-shelf plugins. However, these plugins should be well-known and tested plugins. However, there should not be any plugins used as a crutch because you don't know how to do something.

We have licenses available for several common plugins:

* Formidable Pro - contact forms
* Advanced Custom Fields - metaboxes and fields
* Soliloquy - sliders
* Duplicator Pro - site mgiration and backups
* Video User Manuals - user training
* WP Google Analytics Events Pro - Google analytics event tracking

If creating any of the above functionality, please use one of these plugins for that purpose. Using a different plugin needs to be discussed and agreed on in advance and the documented discussion archived in case a question arises later.

Additional licensed plugins should be agreed on and approved in advance. Deciding who owns the license (DCC, client, outside developer, etc) and any license ownership transfer process needs to be determined before the plugin is purchased or used.

If an annually licensed plugin (like anything from WooThemes) is purchased for a client, remember to add it to their billing account in WHMCS.

### Sliders

Clients love sliders, despite overwhelming evidence they don't work or help them achieve their goals. If a slider is required, please use the Solioquy plugin. We already have training available and this plugin is one of th easiest to use for managing sliders.

### Advanced Custom Fields

While ACF offers a significant advantages, great care should be taken to avoid over-dependence on it. We favor using the built-in functionality over plugins. One should also explore coding standard metaboxes and fields rather than using ACF. Many code snippets are available on the DCC github account, use them.

Some examples:

* Global or site-wide elements - use the Customizer instead.
* Sliders - use Soliloquy.
* Navigation or menu-like components - use the built-in WordPress Menus system.


### Plugins to Avoid

There are certain plugins we avoid like the plague:

* Ubermenu. Don't use it. Ever. Learn to build your own responsive menus and custom menus. We have code available on Github for adding icons, SVGs, and such to a menu item.
* [Revolution Slider](http://torquemag.io/2016/05/sucuri-report-outdated-plugins-leading-cause-wordpress-site-hacks/). Sliders should generally be avoided when possible and use Soliloquy when a slider is required. This plugin requires an annual, per-site license as well, so ensure the client knows this upfront.

### Our Standard Suite of Plugins

There are some plugins we add to every site, mostly for security and maintenance purposes. This list is constantly being re-evaluated and updated.

* iThemes Security - comprehensive site security.
* Exploit Scanner - malware and vulnerability scanner.
* Email Address Encoder - prevents email address scraping by bots.
* Disable Comments - disables the WordPress commenting system altogether.
* Broken Link Checker - checks and notifies site admin about broken links.
* Optimus/WP Smush - Compresses image files.
* Yoast SEO - all-around SEO tool.
* SG CachePress - caching assistant for our hosting company, SiteGround.

There are other plugins that we install if needed.

* Scripts-to-Footer - forces scripts to be loaded in the footer.
* Better Search Replace - find and replace for the database.
* WordPress Importer - imports data from another WordPress installation.
* GatherContent Importer - imports content from the GatherContent service.
* Regenerate Thumbnails - Regenerates thumbnail images after changing sizes.

We also have a suite of plugins that have been developed at DCC that should be used for the following purposes. Documentation for these plugins is in development.

* Employees - employee/staff directory or any management of people that may need to display on the front-end.
* Now Hiring - job openings/postings.
* Anchorhead - automatically adds a table of contents at the top of pages/posts that contain H2 headings.
* Formidable CachePress - Flushes SiteGround cache when Formidable form options are updated.
* Formidable No Webmails - Prevents users from submitting common webmail providers (Gmail, Yahoo, Hotmail, etc) in an email field.

<h2 id="wp">WordPress Best Practices{% include toplink.html %}</h2>

* Use the built-in Posts post type for News.
* Rename the admin menu item to "News". See our Gists for code.
* Rename the default Posts category to "News" or "General". Either way, rename to something other than "Uncategorized".
* Any global element that would be otherwise managed as a theme setting, should be managed in the Customizer.
* If the item on the page is a menu (navigation to another place), it should be managed in Menus in the admin.
* Social Links should also be managed as a menu.
