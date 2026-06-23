# Plan — Intégration API Espace Candidat

## Terminé

- [x] **Étape 1** — Brancher les concours réels
  - `MOCK_COMPETITIONS` remplacé par `GET /api/events/competitions/mine/`
  - États chargement / erreur / vide gérés

- [x] **Étape 2** — Brancher le bouton "Soumettre ma candidature"
  - Connecté sur `POST /api/interactions/admission/`
  - `first_name`, `last_name`, `email`, `phone` pré-remplis depuis le store
  - Champs `academic_level` (select) et `birth_date` ajoutés
  - États succès / erreur gérés via modal

- [x] **Étape 3** — Brancher l'abonnement aux alertes
  - Toggle ON connecté sur `POST /api/events/subscribe-competition-alert/`
  - Bannière "Données fictives" retirée

- [x] **Étape 5** — État initial du toggle d'alerte
  - Statut chargé depuis `GET /api/events/competitions/alert-status/` au montage
  - `localStorage` supprimé — source de vérité = backend

- [x] **Étape 6** — Désabonnement aux alertes
  - Toggle OFF connecté sur `DELETE /api/events/subscribe-competition-alert/`
  - Message "bientôt disponible" retiré

- [x] **Étape 4** — Lister mes candidatures
  - `MOCK_CANDIDATURES` supprimé, remplacé par `GET /api/interactions/admissions/me/`
  - États chargement / erreur / vide gérés
  - KPI et dernière candidature dans l'onglet Accueil mis à jour
