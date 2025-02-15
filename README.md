# A QuickBase Copy Feature

This is a TypeScript React App using the [QuickBase RESTful JSON API](https://developer.quickbase.com/) with [tflanagan/node-quickbase](https://github.com/tflanagan/node-quickbase).

The development environment uses a user token.

```bash
npm run dev
```

In production individual temporary token's are generated.

```bash
npm run build
```

This is a work in progress.

</br>

## Follow these steps to link your code pages together.

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

These are the three things to look out for that will be unique to you.

1. The base URL
2. APPDBID
3. PAGEID

</br>

CSS goes in the head tag. Name your code page with a .css extention.

```html
<link
  href="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"
  rel="stylesheet"
/>
```

JS goes at the bottom of the body tag. Name your code page with a .js extention.

```html
<script src="https://builderprogram-USERNAME.quickbase.com/nav/app/APPDBID/action/AppDBPages?a=dbpage&pageID=PAGEID"></script>
```

Here is a full page HTML example.

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
