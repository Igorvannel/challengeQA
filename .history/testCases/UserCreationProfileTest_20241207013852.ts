import { test, expect } from '@playwright/test';
import { UserCreationProfilePage } from './pages/UserCreationProfilePage';

test.describe('User Creation Form Validation Tests', () => {
  let userCreationProfilePage: UserCreationProfilePage;

  test.beforeEach(async ({ page }) => {
    // Initialize the page object for the user creation profile page
    userCreationProfilePage = new UserCreationProfilePage(page);
    // Go to the signup page URL
    await page.goto('https://playwright-lab.web.app/');
  });

  test('Should display error when required fields are empty', async () => {
    // Clear fields and submit the form
    await userCreationProfilePage.clearFields();
    await userCreationProfilePage.submitForm();
    
    // Assert that error classes are added to required fields
    await expect(userCreationProfilePage.firstNameInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.lastNameInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.emailInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.passwordInput).toHaveClass(/error/);
    await expect(userCreationProfilePage.confirmPasswordInput).toHaveClass(/error/);
  });

  test('Should submit with valid data', async () => {
    // Fill the form with valid data
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password123!');
    await userCreationProfilePage.submitForm();
    
    // Assert that the URL changes (or you can add other success criteria)
    await expect(userCreationProfilePage.page).toHaveURL('https://success-url.com');
  });

  test('Should show error if password confirmation does not match', async () => {
    // Fill the form with mismatched passwords
    await userCreationProfilePage.fillForm('John', 'Doe', 'john.doe@example.com', 'Password123!', 'Password124!');
    await userCreationProfilePage.submitForm();
    
    // Assert that the password input has an error class
    await expect(userCreationProfilePage.confirmPasswordInput).toHaveClass(/error/);
  });

  test('Should accept optional fields (gender)', async () => {
    // Fill the optional field for gender
    await userCreationProfilePage.fillOptionalFields('male');
    
    // Assert that the selected value is "male"
    await expect(userCreationProfilePage.page.locator('select[name="gender"]')).toHaveValue('male');
  });

  test('Should accept optional fields (phone number)', async () => {
    // Fill the optional field for phone number
    await userCreationProfilePage.fillPhoneNumber('1234567890');
    
    // Assert that the phone number is entered correctly
    await expect(userCreationProfilePage.phoneNumberInput).toHaveValue('1234567890');
  });

  test('Should show error if invalid email format is provided', async () => {
    // Fill the form with an invalid email
    await userCreationProfilePage.fillForm('John', 'Doe', 'invalid-email', 'Password123!', 'Password123!');
    await userCreationProfilePage.submitForm();
    
    // Assert that the email input field has an error class
    await expect(userCreationProfilePage.emailInput).toHaveClass(/error/);
  });
  
  // Add more tests for other optional fields as required, such as address, LinkedIn URL, etc.
});
