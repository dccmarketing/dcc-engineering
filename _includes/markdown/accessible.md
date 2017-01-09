
## Introduction

We believe creating good markup helps create a better user experience. It also enables and enhances everything from search engine optimization, accessibility, usability - all of which aids in stimulating demand for the business.

Generally speaking, its best to follow the official [W3 WAI accessibility standards](https://www.w3.org/standards/webdesign/accessibility) and exceptions to those rules should be rare and clearly outlined in the project documentation. While many consider [Section 508 accessibility standards](https://www.section508.gov/) a requirement only applying to government projects, they actually establish basic principles for any project.

Ultimately, accessibility is about expanding the potential audience for the client by making the website more usable by those who alternative browsers. Accessibility is intended to make the web experience better for everyone and positively affects SEO, usability, readability, etc. Many businesses have no accessibility requirements, but it should be integrated as much as possible and enhanced when required by the client.



## HTML Markup {% assign anchor="html" %}{% include toplink.html %}

Markup should be semantic when possible and describe the structure of the content in the most minimal way possible.

* All HTML should be structured properly and should pass in a validator. As an example, headings should be nested and in the proper order and not used just for styling.
* Use HTML5.
* When appropriate, use semantic tags like header, footer, main, caption, aside, etc.
* Use the proper spacing for self-closing tags.
* Use double quotes for attribute values.
* Headings should be nested properly - h1, then h2, then h3, etc.
* Headings should not be skipped, like an h4 inside an h2 without the h3 parent between.



## Skip Link {% assign anchor="skiplink" %}{% include toplink.html %}

The first element after the opening body tag should be the skip to content link. This link should be styled to only appear when focused on and should linked directly to the main content element. This link is used by alternative browsers, particularly screen readers used by deaf users, to allow for skipping past lengthy menus to get straight to the content.

WordPress theme should include support for the screen-reader-text class. `_s` has this built-in already. The proper styling for this class is:

```css
/* Text meant only for screen readers */
.screen-reader-text {
	clip : rect(1px 1px 1px 1px);
	clip : rect(1px, 1px, 1px, 1px);
	height : 1px;
	overflow : hidden;
	position : absolute !important;
	white-space : nowrap;
	width : 1px;
}

.screen-reader-text:focus {
	background-color : #fff;
	border-radius : 3px;
	box-shadow : 0 0 2px 2px rgba(0, 0, 0, 0.6);
	clip : auto !important;
	color : blue;
	display : block;
	font-size : 0.875 em;
	font-weight : bold;
	height : auto;
	left : 5px;
	line-height : normal;
	padding : 15px 23px 14px;
	text-decoration : none;
	top : 5px;
	width : auto;
	z-index : 100000; /* Above WP toolbar */
}
```



## ARIA Roles and Landmarks {% assign anchor="aria" %}{% include toplink.html %}

ARIA roles help browsers more easily determine what each element's function is in relation to the rest of the page. For example, `[role="contentinfo"]` tells the browser this element is the site footer and `[role="banner"]` tells the browser this element is the site header. These roles can be applied to the header, footer, forms, the main content area, etc. 

If ARIA roles and landmarks are done properly, they can be used for styling, which helps enforce their proper usage. If a set of styles only apply to the header, one could use the `[role="banner"]` as the selector instead of something like .site-header. While the selector complexity increases, this minor trade-off is worth enforcing proper accessibility attributes in the markup.
