import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import chalk from "chalk";

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
    console.log(chalk.bold.underline.whiteBright("Logging in to QuickBase"));
    let loginSuccess = false;
    const maxLoginAttempts = 3;
    let loginAttempt = 0;

    while (!loginSuccess && loginAttempt < maxLoginAttempts) {
      try {
        loginAttempt++;
        if (loginAttempt > 1) {
          console.log(chalk.blue(`Login attempt ${loginAttempt}`));
        }
        await page.goto(quickbaseUrl, { timeout: 60000 });
        await page.type("input[name='loginid']", username);
        await page.type("input[name='password']", password);
        await page.click("#signin");
        await page.waitForNavigation({
          waitUntil: "networkidle0",
          timeout: 60000,
        });

        // Check if login was successful
        const loginError = await page.$(".login-error");
        if (loginError) {
          throw new Error("Login failed. Please check your credentials.");
        }

        console.log(chalk.bold.green("Signed In to QuickBase."));
        loginSuccess = true;
      } catch (loginError) {
        console.error(
          chalk.red(
            `Login attempt ${loginAttempt} failed: ${loginError.message}`
          )
        );
        if (loginAttempt >= maxLoginAttempts) {
          console.error(
            chalk.bold.bgRed("Max login attempts reached. Exiting.")
          );
          await browser.close();
          return;
        }
        // Add a delay before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    // Function to update code page content
    const updatePageContent = async (pageId, codeContent) => {
      const url = `${quickbasePagePath}${pageId}`;
      const maxRetries = 3;
      let attempt = 0;
      let success = false;

      while (attempt < maxRetries && !success) {
        try {
          attempt++;
          if (attempt === 1) {
            console.log(chalk.bold.whiteBright(`Go to code-page ${pageId}`));
          } else {
            console.log(
              chalk.bold.whiteBright(
                `Attempt ${attempt}: Go to code-page ${pageId}`
              )
            );
          }

          console.log(chalk.blue(`Navigating to ${url}`));
          await page.goto(url, { timeout: 30000 }); // 30 seconds timeout
          await page.waitForSelector("#pagetext", { timeout: 30000 }); // Wait for the element where the code goes

          // Check if the page loaded correctly
          const pageTitle = await page.title();

          console.log(chalk.bold.whiteBright(`Opened code-page ${pageId}`));
          success = true;
        } catch (error) {
          console.error(
            chalk.yellow(
              `Attempt ${attempt}: Failed to navigate to code-page ${pageId}`
            )
          );

          const enableErrorDetails = false; // Set to true to display error details

          if (attempt >= maxRetries) {
            console.error(chalk.bold.bgRed("Max retries reached."));
            console.error(chalk.bold.red(`${url}`));
            if (enableErrorDetails) {
              console.error(error);
            }
            return;
          }

          // Add a delay before retrying
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }

      // Update the code page content
      await page.evaluate((codeContent) => {
        const codeEditor = document.querySelector("#pagetext");
        if (codeEditor) {
          codeEditor.value = codeContent;
        }
      }, codeContent);

      // Save the changes
      await page.click("#btnSaveDone");
      console.log(chalk.bold.white(`Updating code-page ${pageId} ...`));
      await page.waitForNavigation();
      console.log(chalk.bold.bgGreen(`Successfully saved code-page ${pageId}`));
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
