import { test } from '../fixtures/testFixtures'
import TestData from '../test-data/TestData.json'

test.beforeEach(async({loginPage})=>{

  await loginPage.navigateToLoginPage();

  })

test.describe("E2E Flow", ()=>{

  test("Swag Labs End to End workflow @wip", async({loginPage, productPage, cart, checkoutPage, checkoutOverviewPage, checkoutCompletePage})=>{

  await test.step("Enter correct user credentials and hit login button", async()=>{
  await loginPage.loginWithCredentials(process.env.USER_NAME!, process.env.PASSWORD!)
  })

  await test.step("Validate the URL after login as expected and Validate the presence of Logout button in side menu after successful login", async()=>{
  await productPage.confirmUserLoggedinSuccessfully();
  })

  await test.step("Validate the product page is shown after the login", async()=>{
  await productPage.validateProductPageIsShown();
  })

  await test.step("Validate the products page contains all the product name, price and add to cart button", async()=>{
  await productPage.validateNamePriceAddtocartOptionsForEachProducts();
  })

  await test.step("Validate the sort by price low to high function", async()=>{
    await productPage.validateSortPriceLowToHigh();
  })


  await test.step("Add multiple products to cart by product name", async()=>{
    await productPage.addProductsToCart(TestData.product1);
      await productPage.addProductsToCart(TestData.product2);
  })
  await test.step("Validate the number shown above cart symbol is matching to number of products added to cart", async()=>{
    await productPage.validateAddToCartCount();
  })

  await test.step("Goto cart page", async()=>{
    await productPage.gotoCartPage();
  })

  await test.step("validate the product details in cart", async()=>{
    await cart.validateProductDetailsCartPage(TestData.product1);
    await cart.validateProductDetailsCartPage(TestData.product2);
  })

  /* await test.step("Remove a product from cart and validate", async()=>{
    await cart.RemoveOneItemfromCartAndValidate(TestData.product2)
  
  }) */

  await test.step("Validate the number shown above cart symbol is matching to number of products in the cart after removal", async()=>{
    await productPage.validateAddToCartCount();
  })

  await test.step("Hit on the checkout button", async()=>{
   await cart.hitCheckoutButton();
  })

  await test.step("Enter details in checkout page and hit continue", async()=>{
    await checkoutPage.enterCheckOutDetailsAndContinue(TestData.checkout_firstname, TestData.checkout_lastname, TestData.checkout_postalcode);
  })

  await test.step("Validate the product name and price in checkout overview page", async()=>{
    await checkoutOverviewPage.validateProductNameAndPrice()
  })

  await test.step("Validate the Item total, Calculated tax(8%) and grand total", async()=>{
    await checkoutOverviewPage.validateItemTotalAndTax()
  })

  await test.step("hit on finish button", async()=>{
    await checkoutOverviewPage.clickFinishButton()
  })

  await test.step("Validate Checkout complete page", async()=>{
    await checkoutCompletePage.verifyCheckoutCompleteTxtMsg();
  })

})
})

test.describe("Login Negative",()=>{


  test("Validate error handling when try to login with incorrect credentials", async({loginPage})=>{
 
  await test.step("Enter Incorrect user credentials and hit login button and validate the error message", async()=>{
    await loginPage.ValidateloginWithIncorrectCredentials(process.env.INCORRECT_USER_NAME!, process.env.INCORRECT_PASSWORD!)
    })

  
  }) 
})
