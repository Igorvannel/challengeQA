import { Page } from '@playwright/test';

export class UserCreationProfilePage {
  private page: Page;
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private emailInput = '#email';
  private passwordInput = '#password';
  private confirmPasswordInput = '#confirm-password';
  private genderMaleRadio = '#gender1';       // Bouton radio pour Male
  private genderFemaleRadio = '#gender2';     // Bouton radio pour Female
  private genderPreferNotToSayRadio = '#gender3'; // Bouton radio pour Prefer not to say
  private dobInput = '#date-of-birth';
  private phoneInput = '#phone-number';
  private addressInput = '#address';
  private linkedinInput = '#linkedin-url';
  private githubInput = '#github-url';
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
      // Sélectionner le genre en fonction de la valeur
      if (gender === 'Male') {
        await this.page.click(this.genderMaleRadio);  // Sélectionner le genre Male
      } else if (gender === 'Female') {
        await this.page.click(this.genderFemaleRadio);  // Sélectionner le genre Female
      } else if (gender === 'Prefer not to say') {
        await this.page.click(this.genderPreferNotToSayRadio);  // Sélectionner l'option "Prefer not to say"
      }
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
 
      // Attendre que le bouton de soumission soit visible et cliquable
      const submitButton = await this.page.locator('._button_1kwjy_175');
      
      // Attendre que le bouton soit visible
      await submitButton.waitFor({ state: 'visible' });
    
      // Cliquer sur le bouton
      await submitButton.click();
    
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

// Vérifier si un champ a un message d'erreur
async checkForError(fieldName: string): Promise<boolean> {
  // Sélecteur pour trouver l'élément <p> après chaque champ de formulaire
  const errorSelector = `input[name="${fieldName}"] + p, select[name="${fieldName}"] + p, textarea[name="${fieldName}"] + p`;
  const errorElement = await this.page.$(errorSelector);

  // Si un message d'erreur est trouvé, vérifier s'il contient du texte
  if (errorElement) {
    const errorText = await errorElement.textContent();
    return errorText && errorText.trim() !== '';  // Vérifie que le texte n'est pas vide
  }

  // Retourne false si aucun message d'erreur n'est trouvé
  return false;
}
}

