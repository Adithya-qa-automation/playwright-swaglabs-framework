import {Page, Locator, expect} from '@playwright/test';

export default class CheckoutCompletePage{
    public page: Page;
    public readonly checkoutCompleteTxt:Locator;

    constructor(page: Page){
        this.page = page;
        this.checkoutCompleteTxt = this.page.locator('[data-test="complete-text"]');
    }

    async verifyCheckoutCompleteTxtMsg(){
        await expect(this.page).toHaveURL("/checkout-complete.html");
        await expect(this.checkoutCompleteTxt).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
    }
}
