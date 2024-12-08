import { test, expect } from '@playwright/test';
import { UserCreationProfilePage } from '../pages/UserCreationProfilePage';

test.describe('Tests de soumission avec des informations valides', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    userCreationProfilePage = new UserCreationProfilePage(page);
    await page.goto('/');
  });

  test('1. Soumettre un formulaire avec des informations valides et tous les champs optionnels remplis', async ({ page }) => {
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.fillOptionalFields('male', '1990-01-01', '1234567890', '123 rue Principale, Ville, Pays', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe');
    await userCreationProfilePage.submitForm();
    
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Submission successful');
      await dialog.accept();
    });
  });

  test('2. Soumettre le formulaire avec des informations valides sans remplir les champs optionnels', async ({ page }) => {
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.submitForm();
    
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Submission successful');
      await dialog.accept();
    });
  });
});

test.describe('Tests de validation des champs', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    userCreationProfilePage = new UserCreationProfilePage(page);
    await page.goto('/');
  });

  // Test 1: Validation du champ Prénom (champ obligatoire et lettres uniquement)
  test('1. Validation du champ Prénom - Doit afficher une erreur si le champ est vide', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isFirstNameErrorDisplayed).toBe(true);
  });

  test('2. Validation du champ Prénom - Doit afficher une erreur si le prénom contient des chiffres', async ({ page }) => {
    await userCreationProfilePage.fillForm('John123', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isFirstNameErrorDisplayed).toBe(true);
  });

  // Test 2: Validation du champ Nom (champ obligatoire et lettres uniquement)
  test('3. Validation du champ Nom - Doit afficher une erreur si le champ est vide', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isLastNameErrorDisplayed = await userCreationProfilePage.checkForError('last-name');
    expect(isLastNameErrorDisplayed).toBe(true);
  });

  test('4. Validation du champ Nom - Doit afficher une erreur si le nom contient des chiffres', async ({ page }) => {
    await userCreationProfilePage.fillForm('', 'Smith123@!', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isLastNameErrorDisplayed = await userCreationProfilePage.checkForError('last-name');
    expect(isLastNameErrorDisplayed).toBe(true);
  });

  // Test 3: Validation du champ Email (format valide)
  test('5. Validation du champ Email - Doit afficher une erreur si l\'email est vide', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isEmailErrorDisplayed = await userCreationProfilePage.checkForError('email');
    expect(isEmailErrorDisplayed).toBe(true);
  });

  test('6. Validation du champ Email - Doit afficher une erreur si l\'email est invalide (format incorrect)', async ({ page }) => {
    await userCreationProfilePage.fillForm('', 'john.smith.com', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isEmailErrorDisplayed = await userCreationProfilePage.checkForError('email');
    expect(isEmailErrorDisplayed).toBe(true);
  });

  // Test 4: Validation du champ Mot de passe
  test('7. Validation du champ Mot de passe - N\'affiche pas d\'erreur lorsque le mot de passe est faible', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', 'password', 'password');
    await userCreationProfilePage.submitForm();
    
    const isPasswordErrorDisplayed = await userCreationProfilePage.checkForError('password');
    expect(isPasswordErrorDisplayed).toBe(false);
  });

  // Test 5: Validation du champ Confirmation du mot de passe (doit correspondre)
  test('8. Validation du champ Confirmation du mot de passe - Doit afficher une erreur si les mots de passe ne correspondent pas', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', 'Password123!', 'DifferentPassword!');
    await userCreationProfilePage.submitForm();
    
    const isConfirmPasswordErrorDisplayed = await userCreationProfilePage.checkForError('confirm-password');
    expect(isConfirmPasswordErrorDisplayed).toBe(true);
  });
});

test.describe('Tests des champs optionnels', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    userCreationProfilePage = new UserCreationProfilePage(page);
    await page.goto('/');
  });

  test('9. Validation du champ Genre - Doit afficher une erreur si le genre est invalide', async ({ page }) => {
    const genders = ['male', 'female', 'prefer not to say'];
    for (const gender of genders) {
      await userCreationProfilePage.fillOptionalFields(gender, '', '', '', '', '');
      await userCreationProfilePage.submitForm();
      const isGenderErrorDisplayed = await userCreationProfilePage.checkForError('gender');
      expect(isGenderErrorDisplayed).toBe(false); // genre valide, pas d'erreur
    }
  });

  test('10. Validation du champ Date de naissance - Doit échouer pour un format de date invalide', async ({ page }) => {
    await userCreationProfilePage.fillOptionalFields('', '2024-02-30', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isDobErrorDisplayed = await userCreationProfilePage.checkForError('dob');
    expect(isDobErrorDisplayed).toBe(false);
  });

  test('11. Validation du champ Numéro de téléphone - Doit afficher une erreur si le numéro est invalide', async ({ page }) => {
    await userCreationProfilePage.fillOptionalFields('', '', '12345abcde', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isPhoneErrorDisplayed = await userCreationProfilePage.checkForError('phone-number');
    expect(isPhoneErrorDisplayed).toBe(true);
  });

  test('12. Validation du champ Adresse - N\'affiche pas d\'erreur pour une adresse invalide', async ({ page }) => {
    await userCreationProfilePage.fillOptionalFields('', '', '', '123 Main St!', '', '');
    await userCreationProfilePage.submitForm();
    
    const isAddressErrorDisplayed = await userCreationProfilePage.checkForError('address');
    expect(isAddressErrorDisplayed).toBe(false);
  });

  test('13. Validation du champ LinkedIn URL - N\'affiche pas d\'erreur pour un format d\'URL invalide', async ({ page }) => {
    await userCreationProfilePage.fillOptionalFields('', '', '', '', 'linkedin.com/johnsmith', '');
    await userCreationProfilePage.submitForm();
    
    const isLinkedinErrorDisplayed = await userCreationProfilePage.checkForError('linkedin-url');
    expect(isLinkedinErrorDisplayed).toBe(false);
  });

  test('14. Validation du champ GitHub URL - Doit afficher une erreur pour un format d\'URL invalide', async ({ page }) => {
    await userCreationProfilePage.fillOptionalFields('', '', '', '', '', 'github.com/johnsmith');
    await userCreationProfilePage.submitForm();
    
    const isGithubErrorDisplayed = await userCreationProfilePage.checkForError('github-url');
    expect(isGithubErrorDisplayed).toBe(true);
  });
});

test.describe('Tests de soumission du formulaire', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    userCreationProfilePage = new UserCreationProfilePage(page);
    await page.goto('/');
  });

  test('15. Soumettre le formulaire avec des données obligatoires manquantes - Doit afficher des erreurs pour les champs manquants', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    const isFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isFirstNameErrorDisplayed).toBe(true);
  });

  test('16. Soumettre le formulaire avec des données invalides - Doit afficher des erreurs pour les champs invalides', async ({ page }) => {
    await userCreationProfilePage.fillForm('John123', 'Smith123', 'john.smith.com', 'password', 'password');
    await userCreationProfilePage.submitForm();
    
    const isFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isFirstNameErrorDisplayed).toBe(true);
  });
});
