# Offline Express

Note: This does not currently work yet.

## What this package is

It's a piece of express middleware that sits between express and your express application.

It uses the techniques described within the tutorial series **[How to make an offline HTML5 web app, FT style](http://labs.ft.com/2012/08/basic-offline-html5-web-app/)** to help deliver a reliable and robust offline experience in a way that is completely agnostic to your specific HTML5 application.

The main techniques it uses in particular:-

> We use the appcache to store just enough Javascript, CSS and HTML to get the web app started (we call this the bootstrap) then deliver the rest through an ajax request, eval() it, then store it in localStorage.
>
> And we don’t use it for the majority of our Javascript, HTML & CSS; or content (including images).

**Offline express** will take care of:

- Managing that bootstrap;
- Ensuring the your user's appcache's only ever contain bootstrap code (never content);
- And implementing any work arounds for specific browser bugs or inconsistencies.

## What this package isn't

It is not a magic bullet and it will not solve all of your problems. Offline is hard.

All this package can do is make the working with the app cache spec a little easier - but you still need to ensure you *design* your apps offline in mind first.

## Server side usage

```javascript
var express = require('express');
var app = express();
var offline = require('offline-express/server');

// An express style callback that returns app bootstrap code.
// See: http://labs.ft.com/2012/08/basic-offline-html5-web-app/
var boot = require('localstorage-boot');

app.use(offline({
  bootCallback: boot
  api: 'api'
}));
```

## Client side usage

We expect you to be using Common JS modules.

```javascript

// At the point in your code where you want to
var offline = require('offline-express/client.js');

offline();
```

Note: the options listed in the client side should match the
server side - and should **never change**. Changing them may prevent existing users from upgrading).

## Options

### [`api`] - optional

If you serve API URLs (as in URLs that return non-HTML content such as json, xml or csv that will be parsed by javascript) on the same domain as your offline app you can specify the subfolder in which your api lives.

We don't want the browser to return a whole bootstrap Javascript file to your api requests. If you provide an `api` *offline* will ensure any offline requests to URLs within that namespace have the word "OFFLINE" returned to them instead.

## End points

All of these end points are internal - you don't need to know about or use any of these. They are listed here for informational purposes only.

This mini-express app exposes the following end-points:-

#### yourapp.com/

During the app cache update process **offline express** will hijack your application's root URL. This is so that only the boot code will be (and not actual app content) is cached inside your user's application caches.

The way it does this and the reasons why is described at length in Tutorial 4).
#### yourapp.com/offline/iframe

An iframe which has the appcache manifest in its `<html>` tag. This is require to solve the problems identified in Tutorial 3.

#### yourapp.com/offline/appcache.manifest

The appcache manifest itself - currently the only technology capable of enabling offline mode on HTML5 web apps. Note - need to ensure the right headers are sent back.

#### yourapp.com/offline/api-fallback

An API end point to fallback to when the user is offline. It simply returns the word "offline". Should be a plain text response.