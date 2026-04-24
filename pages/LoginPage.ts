import {Page, Locator, expect} from'@playwright/test';

export default class LoginPage{

    public page: Page;
    public readonly userNameTxtbox: Locator;
    public readonly passwordTxtbox: Locator;
    public readonly loginBtn: Locator;
    public readonly errorMsgTxt: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.userNameTxtbox = page.getByPlaceholder("username");
        this.passwordTxtbox = page.getByPlaceholder("Password");
        this.loginBtn = page.getByRole("button", {name: "Login"});
        this.errorMsgTxt = page.locator('[data-test="error"]');
    }

    async navigateToLoginPage(){
        await this.page.goto("process.env.BASE_URL!")
    }

    async loginWithCredentials(username:string, password:string){
        await this.userNameTxtbox.fill(username);
        await this.passwordTxtbox.fill(password);
        await this.loginBtn.click();
    }

    async ValidateloginWithIncorrectCredentials(username:string, password:string){
        await this.userNameTxtbox.fill(username);
        await this.passwordTxtbox.fill(password);
        await this.loginBtn.click();
        await expect(this.errorMsgTxt).toHaveText("Epic sadface: Username and password do not match any user in this service")
    }
}
