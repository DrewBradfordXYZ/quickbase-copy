# QuickBase Copy

This is a TypeScript React App using the [QuickBase RESTful JSON API](https://developer.quickbase.com/) with [tflanagan/node-quickbase](https://github.com/tflanagan/node-quickbase) and [DrewBradfordXYZ/quickbase-codepages](https://github.com/DrewBradfordXYZ/quickbase-codepages).

## Description

Temporary authentication tokens give access to the QuickBase RESTful JSON API in production and a User Token is used in the development enviornment. API requests have been tested and work in both cases.

This project is under development and its intended purpose will evolve.

## Prerequisites

- Node.js version 14.x or higher
- A QuickBase account with the necessary permissions (a free builder account will work)

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

Rename the environment files

```bash
mv .env.example .env
mv .env.example.development .env.development
mv .env.example.production .env.production
```

Create 3 code pages in your QuickBase App while noting their PageID

- quickbase-copy.html
- quickbase-copy.js
- quickbase-copy.css

## Configuration

Update the `.env`, `.env.development`, and `.env.production` files with your QuickBase credentials and other necessary information.

## Usage

To start the development server, use:

```bash
npm run dev
```

To build the production files, use:

```bash
npm run build
# Inspect /dist/quickbase-copy.html.
# If .env is missing information there will be comments.
```

To update the QuickBase code pages automatically, use:

```bash
# .env variables are a prerequisite
npm run quickbase
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
