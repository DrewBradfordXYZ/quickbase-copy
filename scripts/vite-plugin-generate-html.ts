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
        : ["<-QUICKBASE-CSS-PAGE-IDS->"];
      const jsPageIds = process.env.QUICKBASE_JS_PAGE_IDS
        ? process.env.QUICKBASE_JS_PAGE_IDS.split(",")
        : ["<-QUICKBASE-JS-PAGE-IDS->"];
      const quickbasePagesUrl =
        process.env.QUICKBASE_PAGES_URL || "<-QUICKBASE-PAGES-URL->";

      const cssLinks = cssPageIds
        .map(
          (id, index) =>
            `${
              index === 0 ? "" : "  "
            }\t<link href="${quickbasePagesUrl}?a=dbpage&pageID=${id.trim()}" rel="stylesheet">`
        )
        .join("\n");

      const jsScripts = jsPageIds
        .map(
          (id, index) =>
            `${
              index === 0 ? "" : "  "
            }\t<script src="${quickbasePagesUrl}?a=dbpage&pageID=${id.trim()}"></script>`
        )
        .join("\n");

      const commentsPageUrl = process.env.QUICKBASE_PAGES_URL
        ? ""
        : "    <!-- Update QUICKBASE_PAGES_URL in the .env file. -->";

      const commentsCssPageIds = process.env.QUICKBASE_CSS_PAGE_IDS
        ? ""
        : "    <!-- Update QUICKBASE_CSS_PAGE_IDS in the .env file. -->";

      const commentsJsPageIds = process.env.QUICKBASE_JS_PAGE_IDS
        ? ""
        : "    <!-- Update QUICKBASE_JS_PAGE_IDS in the .env file. -->";

      let commentsEnvRename = "";
      if (commentsPageUrl && commentsCssPageIds && commentsJsPageIds) {
        commentsEnvRename =
          "    <!-- Make sure to rename the .env.example file to .env -->";
      }

      let htmlContent = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickBase Copy</title>`;

      if (commentsEnvRename) htmlContent += `\n${commentsEnvRename}`;
      if (commentsPageUrl) htmlContent += `\n${commentsPageUrl}`;
      if (commentsCssPageIds) htmlContent += `\n${commentsCssPageIds}`;

      htmlContent += `
  ${cssLinks}
</head>
<body>
  <noscript>
    <strong>
    We're sorry but this app doesn't work properly without
    JavaScript enabled. Please enable it to continue.
    </strong>
  </noscript>
  <div id="root"></div>`;

      if (commentsPageUrl) htmlContent += `\n${commentsPageUrl}`;
      if (commentsJsPageIds) htmlContent += `\n${commentsJsPageIds}`;

      htmlContent += `
  ${jsScripts}
</body>
</html>`;

      // Writing to file
      fs.writeFileSync(
        path.join(__dirname, "../dist/quickbase-copy.html"),
        htmlContent,
        "utf8"
      );
    },
  };
}

export default generateHtmlPlugin;
