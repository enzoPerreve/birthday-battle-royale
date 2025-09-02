# Birthday Battle Royale - API Documentation

## Overview
Cette API complète permet de gérer un système de Battle Royale pour anniversaires avec toutes les fonctionnalités nécessaires.

## Base URL
- **Production**: `https://birthday-battle-royale.vercel.app/api`
- **Development**: `http://localhost:3000/api`

## Authentication
Certains endpoints nécessitent un token admin dans le header :
```
X-Admin-Token: Agathe0211/
```

---

## 📋 Core API Endpoints

### 🔍 Health Check
- **GET** `/health`
- **Description**: Vérifie le statut de l'API
- **Response**: `{ success: true, message: "Health check OK!" }`

### 👤 User Registration
- **POST** `/register`
- **Body**: `{ name, contact, phrase }`
- **Description**: Enregistre un nouvel utilisateur

### 🔐 Admin Verification
- **POST** `/verify`
- **Body**: `{ token: "Agathe0211/" }`
- **Description**: Vérifie le token administrateur

---

## 🎮 Game Management

### 📋 Games List
- **GET** `/games`
- **Query Params**: 
  - `status` (waiting|active|completed)
  - `limit` (number)
- **Description**: Récupère la liste des jeux

### ➕ Create Game
- **POST** `/games`
- **Body**: `{ name, maxParticipants }`
- **Description**: Crée un nouveau jeu

### 🎯 Game Control (Admin Only)
- **POST** `/game-control`
- **Headers**: `X-Admin-Token: Agathe0211/`
- **Body**: `{ gameId, action }`
- **Actions**: `start`, `pause`, `resume`, `end`, `reset`
- **Description**: Contrôle l'état d'un jeu

---

## 👥 User Management

### 📋 Users List
- **GET** `/users`
- **Query Params**: 
  - `status` (active|inactive|eliminated)
  - `gameId` (filter by game)
  - `search` (search by name/contact)
  - `limit` (number)
- **Description**: Récupère la liste des utilisateurs

### ❌ Delete User (Admin Only)
- **DELETE** `/users?userId=USER_ID`
- **Headers**: `X-Admin-Token: Agathe0211/`
- **Description**: Supprime un utilisateur

---

## 🤝 Game Participation

### ➕ Join Game
- **POST** `/join-game`
- **Body**: `{ gameId, userId }`
- **Description**: Fait rejoindre un utilisateur à un jeu

### ➖ Leave Game
- **DELETE** `/join-game`
- **Body**: `{ gameId, userId }`
- **Description**: Fait quitter un utilisateur d'un jeu

---

## ⚔️ Battle System

### 🎯 Execute Battle
- **POST** `/battle`
- **Body**: `{ gameId, round }`
- **Description**: Exécute une manche de bataille avec éliminations aléatoires

### 📜 Battle History
- **GET** `/battle?gameId=GAME_ID`
- **Description**: Récupère l'historique des batailles d'un jeu

---

## 📊 Statistics

### 🌍 Global Statistics
- **GET** `/stats`
- **Description**: Statistiques globales du système

### 🎮 Game Statistics
- **GET** `/stats?gameId=GAME_ID`
- **Description**: Statistiques d'un jeu spécifique

### 👤 User Statistics
- **GET** `/stats?userId=USER_ID`
- **Description**: Statistiques d'un utilisateur spécifique

---

## 🔔 Notifications

### 📋 Get Notifications
- **GET** `/notifications`
- **Query Params**: 
  - `gameId` (filter by game)
  - `userId` (filter by user)
  - `limit` (number)
- **Description**: Récupère les notifications

### ➕ Create Notification
- **POST** `/notifications`
- **Body**: `{ type, title, message, gameId?, userId?, broadcast? }`
- **Description**: Crée une nouvelle notification

### ✅ Mark as Read
- **PATCH** `/notifications`
- **Body**: `{ notificationId, read: true }`
- **Description**: Marque une notification comme lue

---

## 📝 Response Format

Toutes les réponses suivent ce format standard :

```json
{
  "success": true|false,
  "message": "Description message",
  "data": { ... },
  "timestamp": "2025-09-02T20:26:13.486Z"
}
```

## 🚨 Error Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden (Admin access required)
- **404**: Not Found
- **405**: Method Not Allowed
- **500**: Internal Server Error

---

## 🔧 Testing

Utilisez la page de test complète : `/api-test`

Cette page permet de tester tous les endpoints avec une interface graphique.

## 🎯 Game Flow

1. **Création** → `/games` (POST)
2. **Inscription** → `/join-game` (POST)
3. **Démarrage** → `/game-control` (POST: start)
4. **Bataille** → `/battle` (POST)
5. **Répéter** jusqu'à un gagnant
6. **Statistiques** → `/stats` (GET)

## 🔄 CORS

Tous les endpoints supportent CORS avec les headers :
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,OPTIONS,PATCH,DELETE,POST,PUT`
- `Access-Control-Allow-Headers: ...`
