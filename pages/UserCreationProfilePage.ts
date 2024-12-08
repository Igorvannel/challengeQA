import { Page } from '@playwright/test';

export class UserCreationProfilePage {
  private page: Page;

  // Sélecteurs des champs de saisie
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private emailInput = '#email';
  private passwordInput = '#password';
  private confirmPasswordInput = '#confirm-password';
  private genderMaleRadio = '#gender1';
  private genderFemaleRadio = '#gender2';
  private genderPreferNotToSayRadio = '#gender3';
  private dobInput = '#date-of-birth';
  private phoneInput = '#phone-number';
  private addressInput = '#address';
  private linkedinInput = '#linkedin-url';
  private githubInput = '#github-url';
  private submitButton = 'button[type="submit"]';

  // Sélecteurs des messages d'erreur et de succès
  private errorMessages = '.error-message';
  private successMessage = '.success-message';

  constructor(page: Page) {
    this.page = page;
  }

  // Remplir les champs requis du formulaire
  async fillForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  // Remplir les champs optionnels du formulaire
  async fillOptionalFields(gender: string, dob: string, phone: string, address: string, linkedin: string, github: string) {
    if (gender) await this.selectGender(gender);
    if (dob) await this.page.fill(this.dobInput, dob);
    if (phone) await this.page.fill(this.phoneInput, phone);
    if (address) await this.page.fill(this.addressInput, address);
    if (linkedin) await this.page.fill(this.linkedinInput, linkedin);
    if (github) await this.page.fill(this.githubInput, github);
  }

  // Sélectionner un genre
  private async selectGender(gender: string) {
    switch (gender) {
      case 'Male':
        await this.page.click(this.genderMaleRadio);
        break;
      case 'Female':
        await this.page.click(this.genderFemaleRadio);
        break;
      case 'Prefer not to say':
        await this.page.click(this.genderPreferNotToSayRadio);
        break;
    }
  }

  // Soumettre le formulaire
  async submitForm() {
    const submitButton = await this.page.locator('._button_1kwjy_175');
    await submitButton.waitFor({ state: 'visible' });
    await submitButton.click();
  }

  // Effacer tous les champs du formulaire
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

  // Vérifier si un message d'erreur est affiché pour un champ spécifique
  async checkForError(fieldName: string): Promise<boolean> {
    const errorSelector = `input[name="${fieldName}"] + p, select[name="${fieldName}"] + p, textarea[name="${fieldName}"] + p`;
    const errorElement = await this.page.$(errorSelector);

    if (errorElement) {
      const errorText = await errorElement.textContent();
      console.log(`Error text for ${fieldName}: "${errorText}"`);
      return errorText && errorText.trim() !== '';
    }

    return false;
  }

  // Obtenir le message de succès après la soumission du formulaire
  async getSuccessMessage(): Promise<string> {
    return await this.page.locator(this.successMessage).textContent();
  }

  // Vérifier si le formulaire a été soumis avec succès
  async isFormSubmittedSuccessfully(): Promise<boolean> {
    const successMessage = await this.page.locator(this.successMessage).isVisible();
    return successMessage;
  }
}
