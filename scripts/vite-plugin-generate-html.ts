import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Plugin } from "vite";

dotenv.config();

function generateHtmlPlugin(): Plugin {
  return {
    name: "generate-html-codepage",
    closeBundle() {
      const cssPageIds = process.env.QUICKBASE_CSS_PAGE_IDS
        ? process.env.QUICKBASE_CSS_PAGE_IDS.split(",")
        : ["<-MissingCSSPageId->"];
      const jsPageIds = process.env.QUICKBASE_JS_PAGE_IDS
        ? process.env.QUICKBASE_JS_PAGE_IDS.split(",")
        : ["<-MissingJSPageId->"];
      const quickbasePagesUrl =
        process.env.QUICKBASE_PAGES_URL ||
        "<-MissingUrlOfThePageThatListsAllCodepages->";

      const cssLinks = cssPageIds
        .map(
          (id) =>
            `  <link href="${quickbasePagesUrl}?a=dbpage&pageID=${id.trim()}" rel="stylesheet">`
        )
        .join("\n");

      const jsScripts = jsPageIds
        .map(
          (id) =>
            `  <script src="${quickbasePagesUrl}?a=dbpage&pageID=${id.trim()}"></script>`
        )
        .join("\n");

      const comments = process.env.QUICKBASE_PAGES_URL
        ? ""
        : "  <!--Update manually or update QUICKBASE_PAGES_URL in the .env file  -->\n";

      const htmlContent = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickBase Copy</title>
${comments}${cssLinks}
</head>
<body>
  <noscript>
    <strong>
    We're sorry but this app doesn't work properly without
    JavaScript enabled. Please enable it to continue.
    </strong>
  </noscript>
  <div id="root"></div>
${comments}${jsScripts}
</body>
</html>
      `;

      fs.writeFileSync(
        path.resolve(__dirname, "../dist/quickbase-copy.html"),
        htmlContent.trim()
      );
    },
  };
}

export default generateHtmlPlugin;
