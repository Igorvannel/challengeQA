# Plan de Test : Formulaire de Création de Profil Utilisateur

## 1. Objectif du Test
L'objectif de ce plan de test est de valider le bon fonctionnement du formulaire de création de profil utilisateur sur l'application Web, en vérifiant que :
- Les champs obligatoires sont correctement validés.
- Les champs optionnels sont validés si remplis.
- Les erreurs sont affichées correctement pour les entrées invalides.
- Le formulaire peut être soumis avec des données valides.

## 2. Scénarios de Test
Les scénarios de test couvrent à la fois les cas de soumission avec des données valides et des données invalides, la validation des champs, et les tests de soumission avec des champs manquants ou invalides.

### Tests de Soumission avec Données Valides
| **ID du Test** | **Titre du Test** | **Objectif** | **Étapes** | **Critères de Réussite** |
| -------------- | ------------------ | ------------ | ----------- | ------------------------ |
| TC-01 | Soumettre avec toutes les informations valides | Vérifier la soumission réussie du formulaire avec toutes les informations (obligatoires et optionnelles) | 1. Remplir tous les champs avec des données valides. <br> 2. Soumettre le formulaire. | 1. Un message de succès "Submission successful" apparaît. |
| TC-02 | Soumettre avec des informations valides sans les champs optionnels | Vérifier la soumission réussie du formulaire avec seulement les champs obligatoires | 1. Remplir les champs obligatoires. <br> 2. Soumettre le formulaire. | 1. Un message de succès "Submission successful" apparaît. |

### Tests de Validation des Champs
| **ID du Test** | **Titre du Test** | **Objectif** | **Étapes** | **Critères de Réussite** |
| -------------- | ------------------ | ------------ | ----------- | ------------------------ |
| TC-03 | Validation du champ Prénom - Champ vide | Vérifier que l'erreur est affichée si le prénom est vide | 1. Laisser le champ Prénom vide. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Prénom. |
| TC-04 | Validation du champ Prénom - Prénom avec des chiffres | Vérifier que l'erreur est affichée si le prénom contient des chiffres | 1. Saisir "John123" dans le champ Prénom. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Prénom. |
| TC-05 | Validation du champ Nom - Champ vide | Vérifier que l'erreur est affichée si le nom est vide | 1. Laisser le champ Nom vide. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Nom. |
| TC-06 | Validation du champ Nom - Nom avec des chiffres | Vérifier que l'erreur est affichée si le nom contient des chiffres | 1. Saisir "Smith123" dans le champ Nom. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Nom. |
| TC-07 | Validation du champ Email - Champ vide | Vérifier que l'erreur est affichée si l'email est vide | 1. Laisser le champ Email vide. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Email. |
| TC-08 | Validation du champ Email - Email invalide | Vérifier que l'erreur est affichée pour un format d'email invalide | 1. Saisir "john.smith.com" dans le champ Email. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Email. |
| TC-09 | Validation du champ Mot de Passe - Faible | Vérifier que l'erreur est affichée si le mot de passe est faible | 1. Saisir "password" dans le champ Mot de Passe. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Mot de Passe. |
| TC-10 | Validation du champ Confirmation du Mot de Passe | Vérifier que l'erreur est affichée si les mots de passe ne correspondent pas | 1. Saisir "Password123!" et "DifferentPassword!" dans les champs Mot de Passe et Confirmation. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Confirmation du Mot de Passe. |

### Tests de Validation des Champs Optionnels
| **ID du Test** | **Titre du Test** | **Objectif** | **Étapes** | **Critères de Réussite** |
| -------------- | ------------------ | ------------ | ----------- | ------------------------ |
| TC-11 | Validation du champ Genre | Vérifier que l'erreur est affichée pour un genre invalide | 1. Essayer de soumettre avec un genre non valide (ex : "autre"). | 1. Pas d'erreur si le genre est valide. |
| TC-12 | Validation du champ Date de Naissance | Vérifier que l'erreur est affichée pour une date invalide | 1. Saisir une date invalide, comme "2024-02-30". <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Date de Naissance. |
| TC-13 | Validation du champ Numéro de Téléphone | Vérifier que l'erreur est affichée pour un numéro de téléphone invalide | 1. Saisir "12345abcde" dans le champ Téléphone. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Téléphone. |
| TC-14 | Validation du champ Adresse | Vérifier que l'erreur est affichée pour une adresse invalide | 1. Saisir "123 Main St!" dans le champ Adresse. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ Adresse. |
| TC-15 | Validation du champ LinkedIn URL | Vérifier que l'erreur est affichée pour un format d'URL invalide | 1. Saisir "linkedin.com/johnsmith" dans le champ LinkedIn URL. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ LinkedIn URL. |
| TC-16 | Validation du champ GitHub URL | Vérifier que l'erreur est affichée pour un format d'URL invalide | 1. Saisir "github.com/johnsmith" dans le champ GitHub URL. <br> 2. Soumettre le formulaire. | 1. Une erreur est affichée pour le champ GitHub URL. |

### Tests de Soumission du Formulaire avec Données Manquantes ou Invalides
| **ID du Test** | **Titre du Test** | **Objectif** | **Étapes** | **Critères de Réussite** |
| -------------- | ------------------ | ------------ | ----------- | ------------------------ |
| TC-17 | Soumettre avec des données obligatoires manquantes | Vérifier que des erreurs sont affichées pour les champs obligatoires manquants | 1. Laisser les champs obligatoires vides. <br> 2. Soumettre le formulaire. | 1. Des erreurs sont affichées pour les champs manquants. |
| TC-18 | Soumettre avec des données invalides | Vérifier que des erreurs sont affichées pour des données invalides | 1. Saisir des valeurs invalides dans les champs (par exemple, "John123" pour le prénom, "john.smith.com" pour l'email). <br> 2. Soumettre le formulaire. | 1. Des erreurs sont affichées pour les champs invalides. |

## 3. Critères de Réussite
Pour que le test soit considéré comme réussi :
1. Les erreurs doivent être correctement affichées pour les champs invalides ou manquants.
2. Le message de succès "Submission successful" doit apparaître lorsque toutes les informations sont valides.
3. Le formulaire ne doit pas être soumis tant que des erreurs sont présentes.

## 4. Environnement de Test
Les tests seront exécutés sur les navigateurs suivants :
- Google Chrome (version la plus récente)
- Firefox (version la plus récente)
- Microsoft Edge (version la plus récente)

## 5. Outils de Test
- **Outil de test** : Playwright
- **Langage de programmation** : TypeScript
- **Framework de tests** : Playwright Test

