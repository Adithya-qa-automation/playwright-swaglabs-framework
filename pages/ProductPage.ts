import {Page,Locator, expect} from '@playwright/test';
import LoginPage from './LoginPage';
import CartState from '../utils/CartState';

export default class ProductPage{

    public page:Page;
    public cartState: CartState;
    public readonly sideMenuIcon: Locator;
    public readonly logoutLink: Locator;
    public readonly closeMenuBtn: Locator;
    public readonly productPageTitle: Locator
    public readonly productsParentDiv: Locator;
    public readonly eachProductDiv: Locator;
    public readonly productsName: Locator;
    public readonly ProductsPrice: Locator;
    public readonly productsAddToCartBtn: Locator;
    public readonly sortDropdown: Locator;
    public productTOAddPrice: (value: string) => Locator;
    //public addedToCartCount: number;
    public readonly addToCartCount: Locator
    public readonly cart:Locator;
    public productAddToCartBtn: (value: string) => Locator;
   
    

    constructor(page:Page, cartState: CartState){
        this.page = page;
        this.cartState = cartState
        this.sideMenuIcon = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.closeMenuBtn = page.getByRole('button', { name: 'Close Menu' });
        this.productPageTitle = page.locator('[data-test="title"]');
        this.productsParentDiv = page.locator('[data-test="inventory-list"]');
        this.eachProductDiv = this.productsParentDiv.locator("div.inventory_item");
        this.productsName = this.productsParentDiv.locator('[data-test="inventory-item-name"]')
        this.ProductsPrice = this.productsParentDiv.locator('[data-test="inventory-item-price"]')
        this.productsAddToCartBtn = this.productsParentDiv.locator('button');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
       // this.addedToCartCount = 0;
        this.addToCartCount = this.page.locator('[data-test="shopping-cart-badge"]');
        this.cart = this.page.locator('[data-test="shopping-cart-link"]');

        this.productTOAddPrice =  (value: string)=> {return this.page.locator('[data-test="inventory-item"]').filter({
            has: this.page.locator('[data-test="inventory-item-name"]', {hasText: value})
        }).locator('[data-test="inventory-item-price"]')};

        this.productAddToCartBtn =  (value: string)=> {return this.page.locator('[data-test="inventory-item"]').filter({
            has: this.page.locator('[data-test="inventory-item-name"]', {hasText: value})
        }).locator("button")};
        
    }

    async confirmUserLoggedinSuccessfully(){
        await expect(this.page).toHaveURL("/inventory.html")
        await this.sideMenuIcon.click();
        await expect(this.logoutLink).toBeVisible();
        await expect(this.logoutLink).toBeEnabled();
        await this.closeMenuBtn.click();
    }

    async validateProductPageIsShown(){
        await expect(this.page).toHaveURL("/inventory.html")
        await expect(this.productPageTitle).toHaveText("Products")
        await expect(this.eachProductDiv.first()).toBeVisible()
        await expect(this.eachProductDiv).toHaveCount(6)
    }

    async validateNamePriceAddtocartOptionsForEachProducts(){
        for(let i = 0; i < await this.eachProductDiv.count(); i++){
            await expect(this.productsName.nth(i)).toBeVisible();
            await expect(this.ProductsPrice.nth(i)).toBeVisible();
            await expect(this.productsAddToCartBtn.nth(i)).toBeVisible();
            await expect(this.productsAddToCartBtn.nth(i)).toHaveText("Add to cart")
            await expect(this.productsName.nth(i)).not.toHaveText("");
            await expect(this.ProductsPrice.nth(i)).toContainText('$');
        }
    }

    async validateSortPriceLowToHigh(){
        await this.sortDropdown.selectOption("lohi");
        const allPriceString = await this.ProductsPrice.allTextContents();
        const allPriceNumber = allPriceString.map(x=>Number(x.replace('$','')));
        const sortedAllPriceNumber = [...allPriceNumber].sort((a,b)=> a-b);
        expect(allPriceNumber).toEqual(sortedAllPriceNumber);
    }

    async addProductsToCart(productName: string){
       this.cartState.addProduct(productName,(await this.productTOAddPrice(productName).textContent())!);
        await this.productAddToCartBtn(productName).click();
        await expect(this.productAddToCartBtn(productName)).toHaveText("Remove");
    }

    async validateAddToCartCount(){
        await expect(this.addToCartCount).toHaveText(String(this.cartState.getCount()))
    }

    async gotoCartPage(){
        await this.cart.click();
    }

}