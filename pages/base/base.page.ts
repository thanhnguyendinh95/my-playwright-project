import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model class
 * All page objects should extend this class
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for page to load
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Click on element
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   */
  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of element
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 30000): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  /**
   * Click on element using CSS or XPath locator
   * Automatically detects if the locator is XPath (starts with // or /) or CSS
   */
  async clickByLocator(locator: string, timeout: number = 30000): Promise<void> {
    const isXPath = locator.startsWith('//') || locator.startsWith('/') || locator.startsWith('(');
    const element = isXPath 
      ? this.page.locator(locator)
      : this.page.locator(locator);
    
    await element.waitFor({ state: 'visible', timeout });
    // Scroll element into view before clicking to ensure it's interactable
    // Use manual scroll directly as it's more reliable than scrollIntoViewIfNeeded
    try {
      await element.evaluate((el) => el.scrollIntoView({ behavior: 'auto', block: 'center' }));
      await this.page.waitForTimeout(200); // Brief wait for scroll to complete
    } catch (scrollError) {
      // If scrolling fails, continue anyway - element might still be clickable
      // This can happen if element is in a non-scrollable container
    }
    await element.click({ timeout });
  }

  /**
   * Get locator for CSS or XPath selector
   */
  getLocator(locator: string): Locator {
    return this.page.locator(locator);
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: string, timeout: number = 30000): Promise<void> {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible', timeout });
    await element.scrollIntoViewIfNeeded();
  }
}

