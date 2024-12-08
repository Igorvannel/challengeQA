import { test, expect } from '@playwright/test';
import { UserCreationProfilePage } from '../pages/UserCreationProfilePage';

test.describe('Tests de soumission avec des informations valides', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    userCreationProfilePage = new UserCreationProfilePage(page);
    await page.goto('https://playwright-lab.web.app/');
  });

  test('Soumettre le formulaire avec l\'option de genre Male', async ({ page }) => {
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.fillOptionalFields('Male', '1990-01-01', '1234567890', '123 rue Principale, Ville, Pays', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe');
    await userCreationProfilePage.submitForm();

    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('Submission successful');
      await dialog.accept();
    });
  });

  test('Soumettre le formulaire avec l\'option de genre Female', async ({ page }) => {
    await userCreationProfilePage.fillForm('Jane', 'Smith', 'jane.smith@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.fillOptionalFields('Female', '1992-05-15', '0987654321', '456 rue secondaire, Ville, Pays', 'https://linkedin.com/in/janesmith', 'https://github.com/janesmith');
    await userCreationProfilePage.submitForm();

    page.once('dialog', async dialog => {
      ex
