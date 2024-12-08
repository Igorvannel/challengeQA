import { Page } from 'playwright';

export class UserCreationProfilePage {
  private page: Page;
  private firstNameInput = 'input[name="firstName"]';
  private lastNameInput = 'input[name="lastName"]';
  private emailInput = 'input[name="email"]';
  private passwordInput = 'input[name="password"]';
  private confirmPasswordInput = 'input[name="confirmPassword"]';
  private genderSelect = 'select[name="gender"]';
  private submitButton = 'button[type="submit"]';
  
  constructor(page: Page) {
    this.page = page;
  }

  // Fill in the required fields
  async fillForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  // Submit the form
  async submitForm() {
    await this.page.click(this.submitButton);
  }

  // Fill optional fields (e.g., Gender)
  async fillOptionalFields(gender: string) {
    await this.page.selectOption(this.genderSelect, gender);
  }

  // Clear all fields
  async clearFields() {
    await this.page.fill(this.firstNameInput, '');
    await this.page.fill(this.lastNameInput, '');
    await this.page.fill(this.emailInput, '');
    await this.page.fill(this.passwordInput, '');
    await this.page.fill(this.confirmPasswordInput, '');
  }
}
