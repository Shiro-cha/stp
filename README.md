


# STP - Smart Task Processor

🛠️ **Type de projet** : Outil hybride **CLI + GUI (Electron)**  
🌱 **Statut** : Refonte en cours  
📦 **Tech stack** : Node.js, Electron, JavaScript (ES6+), Linux-friendly

---

## 🧠 Présentation

**STP (Smart Task Processor)** est un outil polyvalent permettant l’automatisation et la gestion de tâches système. D’abord né comme simple script CLI il y a 3 ans, il est désormais en cours de transformation en une application complète avec :

- 🧩 Une interface en ligne de commande rapide et modulaire
- 🖥️ Une interface graphique légère (via Electron) pour les utilisateurs non-tech
- 🌐 Une architecture prête à être connectée à d’autres outils

L’objectif ? Créer un assistant local qui gère des routines, des configs ou des actions systèmes avec une UX propre, tout en étant extensible via plugins.

---

## 🚀 Objectifs actuels

- ✅ Refactor du code legacy
- 🧪 Mise en place de tests unitaires
- 🔌 Système de plugins CLI
- 🖥️ GUI de setup (Electron)
- 🐧 Optimisation pour environnement Linux / serveur VPS

---

## 🔧 Installation (préliminaire)

```bash
git clone https://github.com/Shiro-cha/stp.git
cd stp
npm install
````

### ⚙️ Lancement en CLI

```bash
node cli/index.js
```

### 💻 Lancement du GUI (Electron)

```bash
npm run gui
```

---

## 📁 Arborescence (en refonte)

```
stp/
├── cli/                # Command Line Interface logic
├── gui/                # Electron GUI
├── core/               # Moteur de traitement
├── config/             # Fichiers de configuration
├── utils/              # Fonctions utilitaires
├── tests/              # Tests unitaires
└── README.md
```

---

## ✨ Fonctionnalités prévues

* [x] Traitement de tâches par commandes CLI
* [ ] Interface graphique pour config initiale
* [ ] Système de plugins (scripts personnalisés)
* [ ] Journalisation des actions
* [ ] Intégration Git / auto-push
* [ ] Notifications système (à la `notify-send`)

---

## 🔒 Sécurité & Permissions

Certaines commandes peuvent nécessiter des droits root ou sudo. Une gestion fine des permissions est en cours de développement.

---

## 🤝 Contribuer

Tu veux tester, contribuer, ou juste suggérer une idée ? Fork le projet et propose une PR propre.
Les issues sont bienvenues pour signaler bugs ou proposer des features.

---

## 📜 Licence

Projet open-source sous licence MIT.
Utilisable, modifiable, améliorable.

---

## 👤 Auteur

**Shiro Yukami**
[GitHub](https://github.com/Shiro-cha) — Passionné de software engineering, Linux, outils CLI et interfaces légères.

---
