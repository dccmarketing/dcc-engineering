
## Introduction

We believe creating good markup helps create a better user experience. It also enables and enhances everything from search engine optimization, accessibility, usability - all of which aids in stimulating demand for the business.

Markup should be semantic when possible and describe the structure of the content in the most minimal way possible.


<h2 id="html">HTML{% include toplink.html %}</h2>

We follow the [WordPress HTML coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/html/).

* All HTML should be structured properly and should pass in a validator. As an example, headings should be nested and in the proper order and not used just for styling.
* Use HTML5.
* When appropriate, use semantic tags like header, footer, main, caption, aside, etc.
* Use the proper spacing for self-closing tags.
* Use double quotes for attribute values.


<h2 id="a11y">Accessibility{% include toplink.html %}</h2>

We follow the [WordPress Accessibility Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/accessibility-coding-standards/). Generally speaking, its best to follow the official [W3 WAI accessibility standards](https://www.w3.org/standards/webdesign/accessibility) and exceptions to those rules should be rare clearly outlined in the project documentation. While many consider [Section 508 accessibility standards](https://www.section508.gov/) a requirement only applying to government projects, they actually establish basic accessibility principles for any project. We clearly recognize that many businesses have no requirement for accessibility. However, accessibility is intended to make the web experience better for everyone and affects everything else (SEO, usability, readability, etc) in a positive way. Accessibility should be integrated as much as possible and enhanced when required by the client.

One example of integrating accessibility is applying styles to ARIA roles and landmarks instead of classes. Use selectors like `[role="banner"]` to style the site header and `[role="contentinfo"]` for styling the site footer. This means the role must be defined in the tag, otherwise the style doesn't apply. The same can be done for the footer, main content area, form fields, etc. This encourages learning and using the ARIA roles and landmarks properly and a negligible change for front-end developers.


<h2 id="images">Images, Icons, and Fonts{% include toplink.html %}</h2>

### Hero / Banner Images

Use the built-in Featured Image feature for managing hero/banner images.

When using a hero image in a theme, a default image option should be provided in the Customizer as a fallback when a page does not have its own hero image.

If additional images are needed for a post type, either build a metabox or use ACF.

Images should be compressed using tools like ImageOptim prior to use in a theme or uploading to the WordPress Media Library.

### Web Fonts

Web-safe fonts should be preferred over others. However, there are times when a different font or set of fonts is required by the client's brand standards. In many cases, similar replacement fonts can be found on Google fonts and many clients prefer this over licensing the "real" font. As far as font services, we prefer using Google fonts over others, but other services may be used if a particular font must be licensed. Lastly, if a font is available for web use (either licensed or free) and the font is not available through a font service, add the font files and the corresponding font-family declarations to the project.

Our preferences (in order) for fonts are:

1. Web-safe/system font
2. Google Fonts
3. Other web font services (Typekit, Fonts.com, etc)
4. Font Files and font-family declarations

We have code available in the starter theme for integrating Google Fonts easily and properly. The code was developed based on code from one of the Automattic developers.

### SVGs

We highly prefer using SVGs over fonts for icons. SVGs can be loaded like images, from a sprite, or inlined with the PHP/HTML. They are just as easy to work with, scalable, and animatable. Our starter theme already contains a small library of commonly used icons and symbols, including social media and website logos, as well as the code for using those SVGs inline.

If a project requires an indeterminate number of icons and/or other options have been exhausted, then consider using a project like [Font Awesome](http://fontawesome.io/). While Font Awesome clearly provides value by adding hundreds of available icons, the additional CSS weight is not worth it for small numbers of icons.

An alternative to using Font Awesome is the [Dashicons](https://developer.wordpress.org/resource/dashicons) font that's built into WordPress. While it wasn't intended for use on the front end, the icons still work there and appear in many projects already. Dashicons does have a limited quantity of icons available, so it may be better to stick with SVGs instead. Quite a few of the Dashicons are already included in the SVG library available in the starter theme.
