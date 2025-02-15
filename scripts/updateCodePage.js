import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // this line is needed to get the absolute path of the current file in an ES6 module,
const __dirname = path.dirname(__filename);

const getLatestIndexFile = (extension) => {
  const assetsDir = path.resolve(__dirname, "../dist/assets");
  const files = fs.readdirSync(assetsDir);
  const indexFile = files.find(
    (file) => file.startsWith("index-") && file.endsWith(extension)
  );
  if (!indexFile) {
    throw new Error(
      `Index file not found in dist/assets directory with extension ${extension}`
    );
  }
  return path.join(assetsDir, indexFile);
};

async function takeScreenshot(page, filename) {
  const screenshotPath = path.join(__dirname, filename);
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);
}

const updateCodePage = async () => {
  const quickbaseUrl = process.env.QUICKBASE_LOGIN_URL;
  const quickbasePagePath = process.env.QUICKBASE_PAGE_URL;
  const username = process.env.QUICKBASE_USERNAME;
  const password = process.env.QUICKBASE_PASSWORD;
  const jsPageId = process.env.QUICKBASE_JS_PAGE_ID;
  const cssPageId = process.env.QUICKBASE_CSS_PAGE_ID;

  const jsFilePath = getLatestIndexFile(".js");
  const cssFilePath = getLatestIndexFile(".css");
  const jsCodeContent = fs.readFileSync(jsFilePath, "utf8");
  const cssCodeContent = fs.readFileSync(cssFilePath, "utf8");

  // --no-sandbox is required when running Puppeteer on a Linux server
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  try {
    // Log in to QuickBase
    await page.goto(quickbaseUrl);
    console.log("Signing into QuickBase");
    await page.type("input[name='loginid']", username);
    await page.type("input[name='password']", password);
    await page.click("#signin");
    console.log("Loading Page...");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    console.log("Signed In to QuickBase.");

    // Check if login was successful
    const loginError = await page.$(".login-error");
    if (loginError) {
      throw new Error("Login failed. Please check your credentials.");
    }

    // Function to update code page content
    const updatePageContent = async (pageId, codeContent) => {
      const url = `${quickbasePagePath}${pageId}`;
      console.log(`Go to Code Page ${pageId} ...`);
      await page.goto(url);
      await page.waitForNavigation({ waitUntil: "networkidle0" });

      // Update the code page content
      await page.evaluate((codeContent) => {
        const codeEditor = document.querySelector("#pagetext");
        if (codeEditor) {
          codeEditor.value = codeContent;
        }
      }, codeContent);

      // Save the changes
      await page.click("#btnSaveDone");
      console.log(`Updating Code Page ${pageId} ...`);
      await page.waitForNavigation();
      console.log(`Saved Code Page ${pageId}`);
    };

    // Update JavaScript code page
    await updatePageContent(jsPageId, jsCodeContent);

    // Update CSS code page
    await updatePageContent(cssPageId, cssCodeContent);

    // Set to true to test screenshot capture
    if (false) {
      throw new Error("Intentional error for testing screenshot capture.");
    }
  } catch (error) {
    console.error("Something went wrong, check the screenshot", error);
    try {
      // Take a screenshot for debugging
      await takeScreenshot(
        page,
        "./screenshots-puppeteer/error_codepage_screenshot.png"
      );
    } catch (screenshotError) {
      console.error("Error capturing screenshot:", screenshotError);
    }
  } finally {
    await browser.close();
  }
};

updateCodePage();
