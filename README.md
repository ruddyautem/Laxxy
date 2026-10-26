# Laxxy

Démo de discussion React/Vite, Redux et Firebase, organisée comme **un espace partagé entre les utilisateurs connectés**. Tous les membres authentifiés peuvent lire les canaux.

Configurer les variables Firebase publiques de `src/firebase.js`, activer Google dans Firebase Authentication, puis lancer `bun install --frozen-lockfile`, `bun run dev` et `bun run build`.

Les règles `firestore.rules` lient les nouveaux messages à l’UID et au profil du compte authentifié. Les messages et canaux existants restent lisibles. Les écritures attendent la confirmation et conservent le brouillon en cas d’erreur. Seuls 100 messages récents et 100 canaux sont demandés au départ ; le défilement charge davantage d’historique.

Avant publication : tester dans les émulateurs Firebase deux comptes autorisés, un visiteur déconnecté et un expéditeur falsifié, puis déployer les règles sur le projet choisi. `firebase.json` décrit la configuration locale. Cette démonstration ne fournit pas des canaux confidentiels avec une liste de membres par salon.
