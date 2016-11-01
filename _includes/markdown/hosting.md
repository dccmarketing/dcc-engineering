
## Introduction

We currently host our client sites with SiteGround, Inc.


<h2 id="config">General Configuration{% include toplink.html %}</h2>

We setup almost all our client accounts with the same configuration in cPanel.

* PHP 7
* Customize the Optimize Website section with the list below:

`application/atom+xml, application/javascript, application/json, application/ld+json,application/manifest+json,application/rdf+xml, application/rss+xml, application/schema+json, application/vnd.geo+json, application/vnd.ms-fontobject, application/x-font-ttf, application/x-javascript, application/x-web-app-manifest+json, application/xhtml+xml, application/xml, font/eot, font/opentype, image/bmp, image/svg+xml, image/vnd.microsoft.icon, image/x-icon, text/cache-manifest, text/css, text/html, text/javascript, text/plain, text/vcard, text/vnd.rim.location.xloc, text/vtt, text/x-component, text/x-cross-domain-policy, text/xml`

* Create an alias/parked domain using the temporary domain, which follows this pattern:
*clientname*.dcc.site
* Configure Supercacher:
	* Turn on Static Cache
	* Add the site to the Dynamic Cache.
	* DO NOT USE memcached.
	* Make sure these settings are the same in the SG CachePress plugin in WordPress, if applicable.


<h2 id="email">Email{% include toplink.html %}</h2>

We do not host any client's email. Period.

However, since we use cPanel, additional configuration of the DNS settings to allow messages from contact forms and the site to reach the client. The following changes only need to be made under the following conditions:

* The site has contact forms
* The contact form submissions are delivered to an email on the same domain as the site.

If the conditions are met, use the MX Lookup tool with the domain on mxtoolbox.com to discover which email service the client uses.


### Google Apps

* Go to Mail > MX Entry
* Add three entries
	1. Priority: 10, Destination: ASPMX.L.GOOGLE.COM
	2. Priority: 20, Destination: ALT1.ASPMX.L.GOOGLE.COM
	3. Priority: 30, Destination: ALT3.ASPMX.L.GOOGLE.COM
* Delete the priority 0 record.


### Other Email Systems (including Outlook 365)

* Go to Domains > Advanced DNS Zone Editor
* Select the real domain (not the temp domain)
* Edit the mail.domainname.com record
* Change the type from CNAME to A
* Paste the IP address from mxtoolbox.com into the Address field
* Click the “Edit Record” button
* Go back to cPanel home
* Go to Mail > MX Entry
* Select the real domain
* Click the “edit” link on the priority zero record
* Change the Destination to “mail.domainname.com”
* Click the “Edit” button
* In the Email Routing section (at the top), choose “Remote Mail Exchanger” and click the “Change” button


### SMTP Plugin

If those solutions do not work, try installing the Easy SMTP plugin and configuring it to use a client's account to send messages.
