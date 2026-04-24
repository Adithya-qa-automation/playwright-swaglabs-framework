import {Page, Locator, expect} from '@playwright/test';
import CartState from '../utils/CartState';

export default class CheckoutOverviewPage{

    public page: Page;
    public cartState: CartState;
    public readonly parentProduct: Locator;
    public productPrice: (value: string)=>Locator;
    public itemTotalTxt: Locator;
    public totalTaxTxt: Locator;
    public readonly totalPriceTxt: Locator;
    public readonly finishBtn: Locator;


    constructor(page: Page, cartState: CartState){
        this.page = page;
        this.cartState = cartState;
        this.parentProduct = this.page.locator('[data-test="inventory-item"]');
        this.productPrice = (value: string)=>{ return this.parentProduct.filter({
            has: this.page.locator('[data-test="inventory-item-name"]',{hasText: value})}).locator('[data-test="inventory-item-price"]')}
        this.itemTotalTxt = this.page.locator('[data-test="subtotal-label"]');
        this.totalTaxTxt = this.page.locator('[data-test="tax-label"]');
        this.totalPriceTxt = this.page.locator('[data-test="total-label"]');
        this.finishBtn = this.page.locator('[data-test="finish"]');
    }

    async validateProductNameAndPrice(){
       
        for(const [productName, productPrice] of this.cartState.getAll()){
            
            await expect(this.productPrice(productName)).toHaveText(productPrice)
        }
        
    }

    async validateItemTotalAndTax(){
    
        await expect(this.itemTotalTxt).toHaveText(`Item total: $${this.cartState.getTotalPrice()}`)
        
       
        await expect(this.totalTaxTxt).toHaveText(`Tax: $${this.cartState.getTax()}`)
        await expect(this.totalPriceTxt).toHaveText(`Total: $${this.cartState.getTotalPrice() + this.cartState.getTax()}`)
    }

    async clickFinishButton(){
        await this.finishBtn.click();
    }
}