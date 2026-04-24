import {Page, Locator, expect} from '@playwright/test';

export default class CheckoutPage{
public readonly firstNameTxtbox: Locator;
public readonly lastNameTxtbox: Locator;
public readonly postalcodeTxtbox: Locator;
public readonly continueBtn: Locator;

constructor(page: Page){
    this.firstNameTxtbox = page.locator('[data-test="firstName"]');
    this.lastNameTxtbox = page.locator('[data-test="lastName"]');
    this.postalcodeTxtbox = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
}

async enterCheckOutDetailsAndContinue(firstName: string, lastName: string, postalCode: string){
    await this.firstNameTxtbox.fill(firstName)
    await this.lastNameTxtbox.fill(lastName)
    await this.postalcodeTxtbox.fill(postalCode)
    await this.continueBtn.click();
}
}