# A QuickBase Copy Feature

This is a TypeScript React App using the [QuickBase RESTful JSON API](https://developer.quickbase.com/) with [tflanagan/node-quickbase](https://github.com/tflanagan/node-quickbase).

## Install

Download this repository

```bash
git clone https://github.com/DrewBradfordXYZ/quickbase-copy.git
cd quickbase-copy
```

Install dependencies

```bash
npm install # create a node_modules folder
```

Rename the enviornment files

```bash
mv .env.example .env
mv .env.example.development .env.development
mv .env.example.production .env.production
```

Create 3 code pages in your QuickBase App while noting their PageID

- quickbase-copy.html
- quickbase-copy.js
- quickbase-copy.css

Update and follow the directions in the three enviornment variable files.

- .env.development
- .env.production
- .env

Run the development environment and see how it looks.

```bash
npm run dev
```

Build the production files. Check the /dist/quickbase-copy.html

If there are comments in the html file, update the .env variables and rerun the command.

```bash
npm run build
```

Update the QuickBase code pages

```bash
npm run quickbase

# If you recieve success messages, your code pages are now updated with app content
# Your app is now in production.
```

Create a button to launch quickbase-copy.html

work in progress.
