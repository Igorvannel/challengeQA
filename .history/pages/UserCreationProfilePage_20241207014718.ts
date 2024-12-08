import { Page } from 'playwright';

export class UserCreationProfilePage {
  private page: Page;
  private firstNameInput = 'input[name="firstName"]';
  private lastNameInput = 'input[name="lastName"]';
  private emailInput = 'input[name="email"]';
  private passwordInput = 'input[name="password"]';
  private confirmPasswordInput = 'input[name="confirmPassword"]';
  private genderSelect = 'select[name="gender"]';
  private dobInput = 'input[name="dob"]';
  private phoneInput = 'input[name="phoneNumber"]';
  private addressInput = 'input[name="address"]';
  private linkedinInput = 'input[name="linkedinUrl"]';
  private githubInput = 'input[name="githubUrl"]';
  private submitButton = 'button[type="submit"]';
  private errorMessages = '.error-message'; // Adjust this selector based on your actual error message selector.
  private successMessage = '.success-message'; // Adjust this selector based on your actual success message selector.

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

  // Fill optional fields (e.g., Gender, Date of Birth, Phone, Address, LinkedIn, GitHub)
  async fillOptionalFields(gender: string, dob: string, phone: string, address: string, linkedin: string, github: string) {
    if (gender) {
      await this.page.selectOption(this.genderSelect, gender);
    }
    if (dob) {
      await this.page.fill(this.dobInput, dob);
    }
    if (phone) {
      await this.page.fill(this.phoneInput, phone);
    }
    if (address) {
      await this.page.fill(this.addressInput, address);
    }
    if (linkedin) {
      await this.page.fill(this.linkedinInput, linkedin);
    }
    if (github) {
      await this.page.fill(this.githubInput, github);
    }
  }

  // Submit the form
  async submitForm() {
    await this.page.click(this.submitButton);
  }

  // Clear all fields
  async clearFields() {
    await this.page.fill(this.firstNameInput, '');
    await this.page.fill(this.lastNameInput, '');
    await this.page.fill(this.emailInput, '');
    await this.page.fill(this.passwordInput, '');
    await this.page.fill(this.confirmPasswordInput, '');
    await this.page.fill(this.dobInput, '');
    await this.page.fill(this.phoneInput, '');
    await this.page.fill(this.addressInput, '');
    await this.page.fill(this.linkedinInput, '');
    await this.page.fill(this.githubInput, '');
  }

  // Check if an error message is displayed for a specific field
  async checkForError(fieldName: string): Promise<boolean> {
    const error = await this.page.locator(`${this.errorMessages} [data-for="${fieldName}"]`).isVisible();
    return error;
  }

  // Get the success message after form submission
  async getSuccessMessage(): Promise<string> {
    return await this.page.locator(this.successMessage).textContent();
  }

  // Check if the form was submitted successfully
  async isFormSubmittedSuccessfully(): Promise<boolean> {
    const successMessage = await this.page.locator(this.successMessage).isVisible();
    return successMessage;
  }
}
