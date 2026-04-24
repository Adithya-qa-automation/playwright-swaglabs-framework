import {test as base} from '@playwright/test'
import Cart from '../pages/Cart'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'
import CartState from '../utils/CartState';

type MyFixtures = {
    cart: Cart;
    checkoutCompletePage: CheckoutCompletePage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutPage: CheckoutPage;
    loginPage: LoginPage;
    productPage: ProductPage;
    cartState: CartState;
}

export const test = base.extend<MyFixtures>({

    cart: async({page, cartState}, use) =>{
        await use(new Cart(page, cartState))
    },
    checkoutCompletePage: async({page}, use)=>{
        await use(new CheckoutCompletePage(page))
    },
    checkoutOverviewPage: async({page, cartState}, use)=>{
        await use(new CheckoutOverviewPage(page, cartState))
    },
    checkoutPage: async({page}, use)=>{
        await use(new CheckoutPage(page))
    },
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page))
    },
    productPage: async({page, cartState}, use)=>{
        await use(new ProductPage(page, cartState))
    },
    cartState: async({}, use)=>{
        await use(new CartState())
    }


})