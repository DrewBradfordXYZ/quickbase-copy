# A QuickBase Copy Feature

This is a TypeScript React App using the [QuickBase RESTful JSON API](https://developer.quickbase.com/) with [tflanagan/node-quickbase](https://github.com/tflanagan/node-quickbase).

## Install.

Navigate to the Pages section in your app. This is the page the lists all your code pages. In my builder account it looks something like this, but will likely be different for you.

```
https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages
```

Add this to the end.

```
?a=dbpage&pageID=PAGEID
```

Put together it looks like this.

```
https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID
```

These will be unique to your setup.

- The base URL
- APPDBID
- PAGEID

</br>

CSS goes in the head tag. Name your code-page with a .css extention.

```html
<link
  href="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"
  rel="stylesheet"
/>
```

JS goes at the bottom of the body tag. Name your code-page with a .js extention.

```html
<script src="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"></script>
```

Here is a full page HTML code-page example. Set this up once and link your .js and .css code-pages. Updating the .js and .css files will update your app.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Page Title</title>
    <link
      href="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"
      rel="stylesheet"
    />
  </head>
  <body>
    <noscript>
      <strong>
        We're sorry but this app doesn't work properly without JavaScript
        enabled. Please enable it to continue.
      </strong>
    </noscript>
    <div id="root"></div>
    <script src="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"></script>
  </body>
</html>
```

## Development

The development environment uses a user token.

```bash
npm run dev
```

In production individual temporary token's are generated.

```bash
npm run build
```

Set up .env to update code pages from the command line

```bash
npm run quickbase
```

work in progress.
