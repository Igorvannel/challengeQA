import { test, expect } from '@playwright/test';
import { UserCreationProfilePage } from '../pages/UserCreationProfilePage';

test.describe('Tests de validation du formulaire de création d\'utilisateur', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    // Initialiser l'objet page pour la page de création du profil utilisateur
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Accéder à l'URL de la page d'inscription
    await page.goto('https://playwright-lab.web.app/');
  });

  test('Doit afficher une erreur lorsque les champs obligatoires sont vides', async () => {
    // Vider les champs et soumettre le formulaire
    await userCreationProfilePage.clearFields();
    await userCreationProfilePage.submitForm();
    
    // Vérifier que les champs obligatoires ont bien la classe d\'erreur
    await expect(userCreationProfilePage.firstNameInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.lastNameInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.emailInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.passwordInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.confirmPasswordInput).toHaveClass(/error/);
  });

  test('Doit soumettre avec des données valides', async () => {
    // Remplir le formulaire avec des données valides
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.submitForm();
    
    // Vérifier que l\'URL a changé (ou vous pouvez ajouter d\'autres critères de succès)
    await expect(userCreationProfilePage.page).toHaveURL('https://success-url.com');
  });

  test('Doit afficher une erreur si la confirmation du mot de passe ne correspond pas', async () => {
    // Remplir le formulaire avec des mots de passe non correspondants
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password124!');
    await userCreationProfilePage.submitForm();
    
    // Vérifier que le champ "confirmation du mot de passe" a la classe d\'erreur
    await expect(userCreationProfilePage.confirmPasswordInput).toHaveClass(/error/);
  });

  test('Doit accepter les champs optionnels (genre)', async () => {
    // Remplir le champ optionnel du genre
    await userCreationProfilePage.fillOptionalFields('male', '', '', '', '', '');
    
    // Vérifier que la valeur sélectionnée est "male"
    await expect(userCreationProfilePage.page.locator('select[name="gender"]')).toHaveValue('male');
  });

  test('Doit accepter les champs optionnels (numéro de téléphone)', async () => {
    // Remplir le champ optionnel du numéro de téléphone
    await userCreationProfilePage.fillOptionalFields('', '', '1234567890', '', '', '');
    
    // Vérifier que le numéro de téléphone est correctement saisi
    await expect(userCreationProfilePage.page.locator('input[name="phoneNumber"]')).toHaveValue('1234567890');
  });

  test('Doit afficher une erreur si un email invalide est fourni', async () => {
    // Remplir le formulaire avec un email invalide
    await userCreationProfilePage.fillForm('John', 'Doe', 'invalid-email', 'Password123!', 'Password123!');
    await userCreationProfilePage.submitForm();
    
    // Vérifier que le champ email a la classe d\'erreur
    await expect(userCreationProfilePage.emailInput).toHaveClass(/error/);
  });

  test('Doit accepter les champs optionnels (adresse)', async () => {
    // Remplir le champ optionnel de l'adresse
    await userCreationProfilePage.fillOptionalFields('', '', '', '123 rue Principale, Ville, Pays', '', '');
    
    // Vérifier que l'adresse est correctement saisie
    await expect(userCreationProfilePage.page.locator('input[name="address"]')).toHaveValue('123 rue Principale, Ville, Pays');
  });

  test('Doit accepter les champs optionnels (URL LinkedIn)', async () => {
    // Remplir le champ optionnel de l\'URL LinkedIn
    await userCreationProfilePage.fillOptionalFields('', '', '', '', 'https://linkedin.com/in/johndoe', '');
    
    // Vérifier que l\'URL LinkedIn est correctement saisie
    await expect(userCreationProfilePage.page.locator('input[name="linkedinUrl"]')).toHaveValue('https://linkedin.com/in/johndoe');
  });

  test('Doit accepter les champs optionnels (URL GitHub)', async () => {
    // Remplir le champ optionnel de l\'URL GitHub
    await userCreationProfilePage.fillOptionalFields('', '', '', '', '', 'https://github.com/johndoe');
    
    // Vérifier que l\'URL GitHub est correctement saisie
    await expect(userCreationProfilePage.page.locator('input[name="githubUrl"]')).toHaveValue('https://github.com/johndoe');
  });

});
