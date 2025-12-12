

# 💬 Mdd

Projet Fullstack d'une application de blog réalisée dans le cadre de la formation OpenClassrooms


## 🛠️ Fonctionnalités

- Authentification sécurisée avec JWT
- Publication d'articles
- Publication de commentaires
- Modification de profil
- Système d'abonnement à des thèmes

## 📦 Installation

1. Cloner le projet
```bash 
git clone https://github.com/ThomasLebel/openclassrooms-MDD.git
cd openclassrooms-MDD
```
2. Créer la base de données MySQL

```bash 
CREATE DATABASE mdd;
```
3. Configurer les variables d’environnement backend
- Remplissez le fichier application propoerties avec l'url de la BDD, le login, le password et une clé générée aléatoirement pour les JWT

4. Installer les dépendances et démarrer le backend
```bash
cd back
mvn clean install
mvn spring-boot:run
```

4. Installer les dépendances et démarrer le frontend
```bash
cd front
npm i
npm start
```

L’application devrait être accessible sur http://localhost:3001 par défaut
