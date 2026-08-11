class loginPage{

    constructor(page){
        this.page = page;
        this.userEmail = page.locator('#userEmail');  
        this.userPassword = page.locator('#userPassword');
        this.loginButton = page.locator("[value='Login']");  
    }

    async goToPage(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(username, password){
        await this.userEmail.fill(username);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }
}

module.exports = {loginPage};