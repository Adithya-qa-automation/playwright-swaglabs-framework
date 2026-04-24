import {Locator, Page, expect} from '@playwright/test';
import CartState from '../utils/CartState';
export default class Cart{
    public page: Page;
    public cartState: CartState;
    public readonly parentProductPrice: Locator;
    public cartPriceValue: (value: string) => Locator;
    public cartRemoveBtn: (value: string) => Locator;
    public productDetailInCart: (value: string) => Locator;
    public readonly checkoutBtn: Locator;

    constructor(page:Page, cartState: CartState){
        this.page = page;
        this.cartState = cartState
        this.parentProductPrice = this.page.locator(".cart_item_label");
        this. cartPriceValue = (value: string)=>{ return this.parentProductPrice.filter({
            has: this.page.locator('[data-test="inventory-item-name"]',{hasText: value})}).locator('[data-test="inventory-item-price"]')}
        this. cartRemoveBtn = (value: string)=>{ return this.parentProductPrice.filter({
            has: this.page.locator('[data-test="inventory-item-name"]',{hasText: value})}).locator('[class="btn btn_secondary btn_small cart_button"]')}
        this. productDetailInCart = (value: string)=>{ return this.parentProductPrice.filter({
            has: this.page.locator('[data-test="inventory-item-name"]',{hasText: value})})}
        this.checkoutBtn = this.page.locator('[data-test="checkout"]');

        
        }   

    async validateProductDetailsCartPage(productName: string){
        const cartPrice = this.cartPriceValue(productName)
        await expect(cartPrice).toHaveText((this.cartState.getPrice(productName))!)
       
    }

    async RemoveOneItemfromCartAndValidate(productName: string){
        const removeBtn: Locator = this.cartRemoveBtn(productName)
        await removeBtn.click();
        await expect(this.productDetailInCart(productName)).not.toBeVisible();
        this.cartState.removeProduct(productName);
        
    }

    async hitCheckoutButton(){
        await this.checkoutBtn.click()
    }
  


}