
## Introduction

We prefer to keep our styling as simple as possible and lightweight. Multiple and/or large CSS files can intefere with the user experience, especially on slower connections and mobile, so optimize in favor of speed and reduced file size.

Stylesheets should be easy to understand and intelligible. Class names should follow a consistent pattern and clearly describe where they are used.

First and foremost, we follow the [WordPress CSS coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/css/). Keeping consistent makes it easy to maintain any project a year later, debug things when problem arise, and simply understand the code, especially when multiple developers are involved. Following the same standards as core makes it easier to read core code and make contributions.


<h2 id="syntax">Syntax and Formatting{% include toplink.html %}</h2>

This is not comprehensive, but the following reiterates the coding standards we follow:

* List one selector per line.
* List one property per line.
* Put the opening bracket on the same line as the last class name and the closing bracket on a separate line.
* Selector names should be all lowercase and use hyphens to separate words.
* Name selectors so you can tell what they style and/or where they are used.
* Avoid over-qualifying selectors.
* Use a space before the opening bracket and after the colon for properties.
* Use hex codes for colors instead of RGBA or HSL.
* Always end properties with a semi-colon.
* Use double quotes instead of single quotes.
* Use lowercase for values, except for font names.
* Line-height and zero-value properties are unitless.
* Don't restate default properties.

**Do this:**

```css
.btn-header,
.btn-footer {
	background-color: #ffffff;
	font-family: "Open Sans", sans-serif;
	padding-bottom: 0.5em;
}
```

**Not this:**

```css
main header wrap button.btn-header, main footer wrap button.btn-footer { background:#fff; font:"Open Sans", sans-serif; padding:0 0 0.5em 0; }
```

We do have a few, mostly minor, differences and our own best practices, conventions, and standards:

* Never use CSS imports. Use @imports in SASS, but not in CSS.
* Use the most specific property (background-color vs background).
* List properties in alphabetical order.
* Use ARIA-based selectors when applicable.
* Use as few selectors as possible.
* Use hex codes for SASS variables. Shortening is not required since the pre-processor will handle that.
* Nest pseudo elements and media queries inside the selector in SASS.
* Don't worry about vendor-specific prefixes; its handled by the pre-processor.
* Text sizes should be expressed in EMs or REMs, not pixels or points; except to set the initial text size. EMs and REMs allow the end user to resize the text easily proportionately.
* Default font size is 16px.
* Use box-sizing: border-box on the HTML element and inherit it on everything else. Check out the [reference section](/refs), specifically the article by Google's Paul Irish for additional reading.
* Use hard tabs equivalent to four spaces for indenting.


<h2 id="sass">SASS{% include toplink.html %}</h2>

We prefer SASS to create our CSS. SASS allows for advanced functionality and convenience over using standard CSS. In addition to nesting, loops, variables, functions, and mixins, SASS requires a [preprocessing tool](/tools) to create the final CSS file, allowing additional optimization like auto-prefixing, minification, and combining media queries.

Many times, reusable styling is put into a mixin and included using SASS. There are still plenty of times when creating reusable classes is highly advantageous, like creating a library of styles used in form plugins or for buttons. Generally, we prefer to use as few classes as possible to keep the markup neat and readable.

Our typical SASS structure includes at least:

* `style.scss` - imports all the other SASS files.
* `_vars.scss` - contains all the variables.
* `_mixins.scss` - contains all the mixins, extensions, and functions.
* `normalize.scss` or `sanitize.scss` - our preferred reset tools.
* Files for each part of theme: `_header.scss`, `_footer.scss`, `_main-menu.scss`, etc.

This structure applies to smaller, simpler projects (like this site). For WordPress theme, our starter theme has adapted the more complex structure used by `_s`.

Nested selectors are considered best practice, however do not abuse them. The end result should still use as few selectors as possible. There are always exceptions to the rule, but that is widely considered a best practice. Always use nesting for:

* pseudo-classes
* pseudo-elements
* component states
* media queries

Use primarily @mixins instead of @extends for performance and to keep the resulting code sane.


<h2 id="browsers">Browser Support{% include toplink.html %}</h2>

We only support the latest version of current web browers and the previous two versions of that browser.

As far as IE/Edge support, we only support the current version of Edge, IE 10, and IE 11. Previous versions of IE are not supported and would be considered out-of-scope if support is requested by a client. If older browser support is required for a project, plan to use a separate stylesheet for those browsers.


<h2 id="documentation">Documentation{% include toplink.html %}</h2>

Commenting in CSS should follow the PHPDoc standard when describing sections of styling, mixins, extensions, and functions.


<h2 id="libs">Libraries & Dependencies{% include toplink.html %}</h2>

Currently, we do not use any of the common styling libraries like BootStrap or Foundation. While we're not averse to using them, they tend to be overkill for the highly customized designs we produce.


### Grids

Most of the themes we build are not built to a strict grid, so we do not have a preference for any particular grid system.


### Resets

Since we use `_s` as the basis for our themes, we typically use [normalize.css](http://necolas.github.io/normalize.css/) as our primary reset tool. You may also use [sanitize.css](https://github.com/10up/sanitize.css) from 10up as well.
