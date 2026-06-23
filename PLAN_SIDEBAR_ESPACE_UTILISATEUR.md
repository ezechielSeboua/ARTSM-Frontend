# Plan — Sidebar Espace Utilisateur

## Objectif
Remplacer le header horizontal de l'espace utilisateur par une sidebar verticale
identique en style à celle du dashboard admin (bleu foncé, amber actif, Framer Motion).

---

## Étapes

### 1. Ajouter la route `/espace-utilisateur/profil` dans App.jsx
- Importer `ProfilPage`
- Ajouter `<Route path="profil" element={<ProfilPage />} />` dans les routes de l'espace utilisateur

### 2. Créer le composant `UserSpaceSidebar`
Fichier : `src/components/UserSpaceSidebar.jsx`

Contenu :
- Même structure que `SideBar.jsx` (Framer Motion, collapse, bouton bascule)
- Liens de navigation :
  - Tableau de bord → `/espace-utilisateur`
  - Mon profil     → `/espace-utilisateur/profil`
  - Sécurité       → `/espace-utilisateur/securite`
- Footer :
  - Bloc identité utilisateur (nom + rôle coloré)
  - Retour au site → `/`
  - Déconnexion

### 3. Refactoriser `UserSpaceLayout.jsx`
- Supprimer l'ancien `<header>` sticky
- Adopter la structure `min-h-screen flex` du `DashboardLayout`
- Intégrer `<UserSpaceSidebar>` à gauche
- Garder `<Outlet />` dans le contenu principal à droite
- Conserver toute la logique existante (fetchProfile, redirections, auth:logout)

### 4. Vérifier et nettoyer
- S'assurer que `ProfilPage` s'affiche correctement dans le nouveau layout
- S'assurer que `SecuritePage` s'affiche correctement
- Vérifier le backdrop mobile (clic pour fermer la sidebar)
- Supprimer les imports devenus inutiles dans `UserSpaceLayout`

---

## Résultat attendu

| Élément            | Avant                  | Après                        |
|--------------------|------------------------|------------------------------|
| Navigation         | Header sticky en haut  | Sidebar collapsible à gauche |
| Style              | Blanc / minimaliste    | Bleu foncé / amber (= admin) |
| Routes disponibles | `/` + `/securite`      | `/` + `/profil` + `/securite`|
| Mobile             | Header plein écran     | Backdrop + sidebar en overlay|
