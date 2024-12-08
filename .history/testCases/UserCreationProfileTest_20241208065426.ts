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

  test('Le formulaire avec des informations valides et champs optionnels remplis', async ({ page }) => {
    // Remplir le formulaire avec des informations valides
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    
    // Remplir les champs optionnels
    await userCreationProfilePage.fillOptionalFields('male', '1990-01-01', '1234567890', '123 rue Principale, Ville, Pays', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe');
    
    // Soumettre le formulaire
    await userCreationProfilePage.submitForm();
    
    // Vérifier l'alerte de succès
    page.once('dialog', async dialog => {
      // Vérifier que l'alerte est bien une alerte
      expect(dialog.type()).toBe('alert');
      
      // Vérifier que l'alerte contient le message exact "Submission successful"
      expect(dialog.message()).toBe('Submission successful');

      // Accepter l'alerte pour la fermer
      await dialog.accept();
    });
  });

  test('Soumettre le formulaire avec des informations valides sans les champs optionnels', async ({ page }) => {
    // Remplir le formulaire avec des informations valides (uniquement les champs obligatoires)
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    
    // Soumettre le formulaire sans remplir les champs optionnels
    await userCreationProfilePage.submitForm();
    
    // Vérifier l'alerte de succès
    page.once('dialog', async dialog => {
      // Vérifier que l'alerte est bien une alerte
      expect(dialog.type()).toBe('alert');
      
      // Vérifier que l'alerte contient le message exact "Submission successful"
      expect(dialog.message()).toBe('Submission successful');

      // Accepter l'alerte pour la fermer
      await dialog.accept();
    });
  });
});
