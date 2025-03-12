# frontend-kiddiz

# 🎠 Kiddiz - Application Mobile

## 📝 Description

**Kiddiz** est une application mobile de **vente et d'achat de jouets d'occasion** entre particuliers.
Elle permet aux utilisateurs de publier des annonces, d'acheter des articles, d'échanger des messages et de gérer leurs transactions en toute simplicité.

Développée avec **React Native** et **Expo**, l'application utilise **Redux** pour la gestion de l'état et **React Navigation** pour la navigation.

---

## 📂 Structure du projet

```
📦 kiddiz-app
├── 📁 components        # Composants réutilisables (boutons, barres de recherche, etc.)
│   ├── ButtonBig.js
│   ├── ButtonHalf.js
│   ├── ButtonIcon.js
│   ├── ButtonProfil.js
│   ├── ButtonSmall.js
│   ├── HeaderNavigation.js
│   ├── RadioButton.js
│   ├── SearchBar.js
│   ├── WelcomeHome.js
│
├── 📁 screens          # Écrans principaux de l'application
│   ├── AddArticlesScreen.js
│   ├── ArticleScreen.js
│   ├── ChatScreen.js
│   ├── ConnectionScreen.js
│   ├── FAQScreen.js
│   ├── FavorisScreen.js
│   ├── HomeScreen.js
│   ├── InvoiceScreen.js
│   ├── MessagerieScreen.js
│   ├── ModifyArticleScreen.js
│   ├── MyArticlesScreen.js
│   ├── ProfilScreen.js
│   ├── SellerScreen.js
│   ├── SigninScreen.js
│   ├── SignupScreen.js
│   ├── TransactionsScreen.js
│
├── 📁 models           # Modèles de données
│   ├── Article.js
│   ├── ArticleTransaction.js
│   ├── Client.js
│
├── 📁 redux            # Gestion de l'état global avec Redux
│   ├── users.js
│
├── App.js              # Point d'entrée principal de l'application
├── package.json        # Dépendances et scripts
└── README.md           # Documentation du projet
```

---

## 🚀 Installation

### **1️⃣ Prérequis**
- **Node.js** (v16+ recommandé)
- **Expo CLI** (`npm install -g expo-cli`)
- **Un appareil ou un émulateur iOS/Android**

### **2️⃣ Cloner le projet**
```bash
git clone https://github.com/votre-repo/kiddiz-app.git
cd kiddiz-app
```

### **3️⃣ Installer les dépendances**
```bash
npm install
```

### **4️⃣ Lancer l'application**
```bash
npm start
```
Puis, scannez le QR Code avec **Expo Go** sur votre téléphone ou exécutez sur un émulateur.

---

## 🎨 **Fonctionnalités principales**

✅ **Créer un compte et se connecter** (Signup / Signin)  
✅ **Publier et modifier un article** (AddArticlesScreen, ModifyArticleScreen)  
✅ **Acheter un article** (InvoiceScreen, TransactionsScreen)  
✅ **Gérer ses annonces et favoris** (MyArticlesScreen, FavorisScreen)  
✅ **Envoyer et recevoir des messages** (MessagerieScreen, ChatScreen)  
✅ **Voir les vendeurs et leur profil** (SellerScreen, ProfilScreen)  
✅ **Consulter une FAQ et de l'aide** (FAQScreen)  
✅ **Barre de recherche et filtres avancés** (SearchBar)  

---

## 📸 Aperçu de l'application

### Page d'accueil :
![Accueil](assets/screenshots/home_screen.png)

### Page de vente d'un article :
![Ajout d'article](assets/screenshots/add_article_screen.png)

### Chat avec un vendeur :
![Messagerie](assets/screenshots/chat_screen.png)

---

## 🔌 API Backend

L'application communique avec un backend Node.js via différentes routes API :

### 📍 Authentification

- **POST** `/users/signup` → Créer un compte
- **POST** `/users/signin` → Connexion

### 📍 Articles

- **GET** `/articles` → Récupérer tous les articles
- **POST** `/articles` → Ajouter un article
- **PUT** `/articles/:id` → Modifier un article
- **DELETE** `/articles/:id` → Supprimer un article

### 📍 Transactions

- **PUT** `/articles/buy` → Acheter un article et mettre à jour le stock

> ⚡ **Remarque** : Tous les appels API nécessitent un `token` utilisateur pour authentifier la requête.

---

## 🚧 Roadmap

✔️ **Phase 1** : Développement du MVP  
✔️ **Phase 2** : Ajout du chat entre acheteurs/vendeurs  
🔜 **Phase 3** : Intégration des paiements Stripe  
🔜 **Phase 4** : Système d'évaluation des vendeurs  

---

## ⚡ Commandes utiles Expo

```bash
# Lancer l'application en mode développement
npx expo start

# Lancer l'application sur Android
npx expo start --android

# Lancer l'application sur iOS (nécessite un Mac)
npx expo start --ios

# Générer un build pour Play Store/App Store
eas build --platform android
eas build --platform ios
```

---

## 🏗 **Développement & Contribution**

Vous souhaitez contribuer ? Suivez ces étapes :

1. **Forker** le repo
2. **Créer une branche**
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalité
   ```
3. **Coder 🚀**
4. **Faire un commit**
   ```bash
   git commit -m "Ajout de la fonctionnalité X"
   ```
5. **Pousser les changements**
   ```bash
   git push origin feature/nom-de-la-fonctionnalité
   ```
6. **Ouvrir une pull request**

---

## 📜 **Licence**
Ce projet est sous **licence MIT**. Vous êtes libre de l'utiliser et de le modifier tant que vous mentionnez les auteurs originaux.

---

## 💬 **Contact**
📧 **Email** : contact@kiddiz.com  
🌍 **Site Web** : [www.kiddiz.com](https://www.kiddiz.com)  
🐙 **GitHub** : [@votre-github](https://github.com/votre-github)

---

🔥 **Merci d'utiliser Kiddiz !** 🎠  
Si vous aimez ce projet, ⭐ **étoilez-le** sur GitHub ! 🚀


