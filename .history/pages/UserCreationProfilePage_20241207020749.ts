export class UserCreationProfilePage {
  private page: Page;
  private firstNameInput = '#first-name';  // Ajusté pour utiliser l'ID
  private lastNameInput = '#last-name';    // Ajusté pour utiliser l'ID
  private emailInput = '#email';           // Ajusté pour utiliser l'ID
  private passwordInput = '#password';     // Ajusté pour utiliser l'ID
  private confirmPasswordInput = '#confirm-password';  // Ajusté pour utiliser l'ID
  private genderSelect = '#gender1';       // Ajusté pour utiliser l'ID
  private dobInput = '#date-of-birth';     // Ajusté pour utiliser l'ID
  private phoneInput = '#phone-number';    // Ajusté pour utiliser l'ID
  private addressInput = '#address';       // Ajusté pour utiliser l'ID
  private linkedinInput = '#linkedin-url'; // Ajusté pour utiliser l'ID
  private githubInput = '#github-url';     // Ajusté pour utiliser l'ID
  private submitButton = 'button[type="submit"]';
  private errorMessages = '.error-message';
  private successMessage = '.success-message';

  constructor(page: Page) {
    this.page = page;
  }

  // Remplir les champs requis
  async fillForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  // Remplir les champs optionnels
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

  // Soumettre le formulaire
  async submitForm() {
    await this.page.click(this.submitButton);
  }

  // Effacer tous les champs
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
    const error = await this.page.locator(`${this.errorMessages} [data-for="${fieldName}"]`).isVisible();
    return error;
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
