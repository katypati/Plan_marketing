# 📊 Plan Marketing PME

**Outil interactif de planification marketing pour entrepreneurs et PME**  
Développé par [Dolph Stats Consulting](https://www.dolph-stats.com) — Dakar, Sénégal

---

## 🎯 À quoi ça sert ?

La plupart des PME n'ont pas de plan marketing formalisé. Elles vendent par instinct, sans savoir exactement à qui, pourquoi, avec quel message et à quel coût.

Cet outil guide l'entrepreneur pas à pas à travers les étapes fondamentales d'une stratégie commerciale solide — de la segmentation client jusqu'au suivi des indicateurs de performance.

**Conçu pour :**
- Les entrepreneurs et PME en Afrique de l'Ouest
- Les formateurs et coaches en développement commercial
- Les programmes d'accompagnement entrepreneurial (E4Y, incubateurs, ONG)

---

## ✨ Fonctionnalités

### 7 modules complets

| Module | Ce qu'il fait |
|--------|--------------|
| 🏢 **Mon Entreprise** | Profil, offre, concurrents, analyse SWOT |
| 🔍 **Segmentation** | Cartographie des segments avec scoring automatique et CA potentiel |
| 🎯 **Ciblage** | Matrice Valeur/Potentiel, classement automatique, Buyer Persona |
| 💬 **Message** | Positionnement global et message personnalisé par segment |
| 🛠 **Mix 4P** | Produit, Prix, Distribution, Communication |
| 💰 **Simulateur de Marge** | Calcul de la marge réelle incluant tous les coûts oubliés |
| 📊 **KPIs & Plan d'action** | Plan 90 jours + tableau de bord avec tendances automatiques |

### Fonctionnalités transversales

- **Mode Coach** — tips pédagogiques activables dans chaque module
- **Barre d'avancement** — taux de complétion du plan en temps réel
- **Calculs automatiques** — CA potentiel, coût unitaire réel, marge nette, seuil de rentabilité, prix plancher, tendances KPIs
- **Diagnostic automatique** — alerte 🔴 perte / 🟠 fragile / 🟢 sain sur la marge
- **Navigation fluide** — précédent/suivant + accès direct par onglet

### Le simulateur de marge inclut

Ce que la plupart des entrepreneurs oublient :
- ✅ Coût des matières premières
- ✅ Emballage
- ✅ Transport
- ✅ Temps de travail (heures × valeur horaire)
- ✅ Pertes et invendus (%)
- ✅ Dégustations et activations
- ✅ **Coût d'acquisition client (CAC)** — budget acquisition ÷ nouveaux clients ÷ fréquence
- ✅ Charges fixes mensuelles (loyer, salaires, téléphone, électricité, frais bancaires)

---

## 🚀 Installation & Démarrage

### Prérequis

- Node.js ≥ 18
- npm ou yarn

### Installation

```bash
git clone https://github.com/votre-username/plan-marketing-pme.git
cd plan-marketing-pme
npm install
```

### Démarrage en développement

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

### Build production

```bash
npm run build
```

---

## 🛠 Stack technique

- **React** — interface utilisateur
- **CSS-in-JS** — styles inline, aucune dépendance CSS externe
- **Vite** — build tool
- Aucune dépendance externe UI — fonctionne avec React seul

---

## 📁 Structure du projet

```
plan-marketing-pme/
├── src/
│   ├── App.jsx          # Application principale (composant racine)
│   └── main.jsx         # Point d'entrée React
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 💡 Utilisation en formation

Cet outil a été conçu pour être utilisé dans le cadre de formations entrepreneuriales.

**Mode autonome** — l'entrepreneur remplit son plan seul après la formation.

**Mode coaching** — le formateur active le Mode Coach (bouton en haut à droite) pour afficher des conseils pédagogiques dans chaque module pendant la session.

**Recommandation** — utiliser en parallèle avec le fichier Excel `PlanMarketing_PME_DolphStats.xlsx` pour les calculs avancés et l'impression.

---

## 📸 Aperçu

| Segmentation | Simulateur de marge | KPIs |
|---|---|---|
| Scoring automatique par segment | Diagnostic 🔴🟠🟢 en temps réel | Tendances 📈📉 automatiques |

---

## 🌍 Contexte

Développé dans le cadre du programme **E4Y (Entrepreneurs for Youth)** en partenariat avec **IFO-OI**, pour des entrepreneurs en agroalimentaire, commerce et services en Afrique de l'Ouest.

Les exemples et données de référence sont calibrés pour le contexte économique sénégalais (FCFA, secteurs locaux, canaux de distribution locaux).

---

## 📄 Licence

MIT — libre d'utilisation, modification et distribution avec attribution.

---

## 📬 Contact

**Dolph Stats Consulting**  
Fondatrice : Katy Faye  
📧 info@dolph-stats.com  
📞 +221 77 850 08 43  
📍 Sicap Liberté VI N°6760, Dakar, Sénégal  
🌐 [www.dolph-stats.com](https://www.dolph-stats.com)

---

*Décider avec la donnée.*
