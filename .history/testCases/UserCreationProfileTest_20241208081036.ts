import { test, expect } from '@playwright/test';
import { UserCreationProfilePage } from '../pages/UserCreationProfilePage';

test.describe('Tests de soumission avec des informations valides', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    // Initialiser l'objet page pour la page de création du profil utilisateur
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Accéder à l'URL de la page d'inscription
    await page.goto('https://playwright-lab.web.app/');
  });

  test('Soumettre un formulaire avec des informations valides et tous les champs optionnels remplis', async ({ page }) => {
    // Remplir le formulaire avec des informations valides
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    
    // Remplir les champs optionnels
    await userCreationProfilePage.fillOptionalFields('male', '1990-01-01', '1234567890', '123 rue Principale, Ville, Pays', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe');
    
    // Soumettre le formulaire
    await userCreationProfilePage.submitForm();
    
    // Vérifier l'alerte de succès
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Submission successful');
      await dialog.accept();
    });
  });

  test('Soumettre le formulaire avec des informations valides sans remplir les champs optionnels', async ({ page }) => {
    // Remplir le formulaire avec des informations valides (uniquement les champs obligatoires)
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    
    // Soumettre le formulaire sans remplir les champs optionnels
    await userCreationProfilePage.submitForm();
    
    // Vérifier l'alerte de succès
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
    // Initialiser l'objet page pour la page de création du profil utilisateur
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Accéder à l'URL de la page d'inscription
    await page.goto('https://playwright-lab.web.app/');
  });

  // Test 1: Validation du champ Prénom (champ obligatoire et lettres uniquement)
  test('Validation du champ Prénom - Doit afficher une erreur si le champ est vide', async ({ page }) => {
    // Laisser vide et soumettre
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    // Vérifie que l'erreur "Please fill in this field" est affichée pour le champ Prénom
    const isFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isFirstNameErrorDisplayed).toBe(true);
  });

  test('Validation du champ Prénom - Doit afficher une erreur si le prénom contient des chiffres', async ({ page }) => {
    // Entrer un prénom invalide avec des chiffres et soumettre
    await userCreationProfilePage.fillForm('John123', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    // Vérifie que l'erreur est affichée pour un prénom invalide
    const isInvalidFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isInvalidFirstNameErrorDisplayed).toBe(true);
  });

  // Test 2: Validation du champ Nom (champ obligatoire et lettres uniquement)
  test('Validation du champ Nom - Doit afficher une erreur si le champ est vide', async ({ page }) => {
    // Laisser vide et soumettre
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    
    // Vérifie que l'erreur pour le champ Nom est bien affichée
    expect(await userCreationProfilePage.checkForError('last-name')).toBe(true);
  });

  test('Validation du champ Nom - Doit afficher une erreur si le nom contient des chiffres', async ({ page }) => {
    // Entrer un nom invalide avec des chiffres et soumettre
    await userCreationProfilePage.fillForm('', 'Smith123@!', '', '', '');
    await userCreationProfilePage.submitForm();
    
    // Vérifie que l'erreur est affichée pour un nom invalide
    expect(await userCreationProfilePage.checkForError('last-name')).toBe(true);
  });

  // Test 3: Validation du champ Email (format valide)
  test('Validation du champ Email - Doit afficher une erreur si l\'email est vide', async ({ page }) => {
    // Laisser vide et soumettre
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('email')).toBe(true);
  });

  test('Validation du champ Email - Doit afficher une erreur si l\'email est invalide (format incorrect)', async ({ page }) => {
    // Entrer un email invalide et soumettre
    await userCreationProfilePage.fillForm('', 'john.smith.com', '', '', '');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('email')).toBe(true);
  });

  // Test 4: Validation du champ Mot de passe (doit contenir des chiffres et des symboles)
  test('Validation du champ Mot de passe - Doit afficher une erreur si le mot de passe est faible', async ({ page }) => {
    // Entrer un mot de passe faible et soumettre
    await userCreationProfilePage.fillForm('', '', '', 'password', 'password');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('password')).toBe(true);
  });

  // Test 5: Validation du champ Confirmation du mot de passe (doit correspondre)
  test('Validation du champ Confirmation du mot de passe - Doit afficher une erreur si les mots de passe ne correspondent pas', async ({ page }) => {
    // Entrer un mot de passe et sa confirmation différente, puis soumettre
    await userCreationProfilePage.fillForm('', '', '', 'Password123!', 'DifferentPassword!');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('confirm-password')).toBe(true);
  });
});

test.describe('Tests des champs optionnels', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    // Initialiser l'objet page pour la page de création du profil utilisateur
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Accéder à l'URL de la page d'inscription
    await page.goto('https://playwright-lab.web.app/');
  });

  // Test 6: Validation du champ Genre (valeurs valides uniquement)
  test('Validation du champ Genre - Doit afficher une erreur si le genre est invalide', async ({ page }) => {
    const genders = ['male', 'female', 'prefer not to say'];
    for (const gender of genders) {
      await userCreationProfilePage.fillOptionalFields(gender, '', '', '', '', '');
      await userCreationProfilePage.submitForm();
      expect(await userCreationProfilePage.checkForError('gender')).toBe(false);
    }
  });

  // Test 7: Validation du champ Date de naissance (format valide)
  test('Validation du champ Date de naissance - Doit echouer pour un format de date invalide', async ({ page }) => {
    // Entrer une date invalide et soumettre
    await userCreationProfilePage.fillOptionalFields('', '2024-02-30', '', '', '', '');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('dob')).toBe(true);
  });

  // Test 8: Validation du champ Numéro de téléphone (doit contenir 10 chiffres)
  test('Validation du champ Numéro de téléphone - Doit afficher une erreur si le numéro est invalide', async ({ page }) => {
    // Entrer un numéro de téléphone invalide et soumettre
    await userCreationProfilePage.fillOptionalFields('', '', '12345abcde', '', '', '');
    await userCreationProfilePage.submitForm();
    // Vérifie que l'erreur est affichée pour un prénom invalide
    const isInvalidFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isInvalidFirstNameErrorDisplayed).toBe(true);
  });

  // Test 9: Validation du champ Adresse (format valide)
  test('Validation du champ Adresse - Doit afficher une erreur si l\'adresse est invalide', async ({ page }) => {
    // Entrer une adresse invalide et soumettre
    await userCreationProfilePage.fillOptionalFields('', '', '', '123 Main St!', '', '');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('address')).toBe(true);
  });

  // Test 10: Validation du champ LinkedIn URL (format valide)
  test('Validation du champ LinkedIn URL - Doit afficher une erreur pour un format d\'URL invalide', async ({ page }) => {
    // Entrer une URL invalide et soumettre
    await userCreationProfilePage.fillOptionalFields('', '', '', '', 'linkedin.com/johnsmith', '');
    await userCreationProfilePage.submitForm();
      // Vérifie que l'erreur est affichée pour un prénom invalide
    const isInvalidFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isInvalidFirstNameErrorDisplayed).toBe(true);
  });

  // Test 11: Validation du champ GitHub URL (format valide)
  test('Validation du champ GitHub URL - Doit afficher une erreur pour un format d\'URL invalide', async ({ page }) => {
    // Entrer une URL invalide et soumettre
    await userCreationProfilePage.fillOptionalFields('', '', '', '', '', 'github.com/johnsmith');
    await userCreationProfilePage.submitForm();
    
    // Vérifie que l'erreur est affichée pour un prénom invalide
    const isInvalidFirstNameErrorDisplayed = await userCreationProfilePage.checkForError('first-name');
    expect(isInvalidFirstNameErrorDisplayed).toBe(true);
  });
});

test.describe('Tests de soumission du formulaire', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    // Initialiser l'objet page pour la page de création du profil utilisateur
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Accéder à l'URL de la page d'inscription
    await page.goto('https://playwright-lab.web.app/');
  });

  // Test 13: Soumettre le formulaire avec des données obligatoires manquantes
  test('Soumettre le formulaire avec des données obligatoires manquantes - Doit afficher des erreurs pour les champs manquants', async ({ page }) => {
    await userCreationProfilePage.fillForm('', '', '', '', '');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('first-name')).toBe(true);
  });

  // Test 14: Soumettre le formulaire avec des données invalides
  test('Soumettre le formulaire avec des données invalides - Doit afficher des erreurs pour les champs invalides', async ({ page }) => {
    await userCreationProfilePage.fillForm('John123', 'Smith123', 'john.smith.com', 'password', 'password');
    await userCreationProfilePage.submitForm();
    expect(await userCreationProfilePage.checkForError('first-name')).toBe(true);
  });
});
