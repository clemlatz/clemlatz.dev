---
title: Ajouter un lien à Flus depuis une application iOS
description: J’adore l’outil de veille Flus, mais il me manquait un moyen de pouvoir facilement ajouter un lien depuis mon téléphone ou ma tablette. J’ai donc créé un raccourci pour ça et je vous explique comment.
pubDate: 2025-02-03
language: fr
heroImage: /blog/raccouris-ios-flus_menu-de-partage.jpg
---

J’adore l’outil de veille [Flus](https://flus.fr), mais il me manquait un moyen de pouvoir facilement ajouter un lien
depuis mon téléphone ou ma tablette. J’ai donc
créé [un raccourci pour ça](https://www.icloud.com/shortcuts/dd59c81abbf446e9bf52daa0ada90372) et je vous explique
comment.

## Flus, l’outil de veille presque parfait

Ces derniers temps, je prends mes distances avec les réseaux sociaux et pour ma veille, j’ai décidé d’en revenir aux
bons vieux flux RSS. Après avoir testé plusieurs aggrégateurs, j’ai découvert [Flus](https://flus.fr), que j’adore, et
qui permet aussi de sauvegarder des liens à lire plus tard, comme Pocket ou Raindrop. Pour ne rien gâcher,
c’est [open source](https://github.com/flusio/Flus) et [français](https://flus.fr/carnet/).

![Capture d'écran de la page d'accueil de Flus.fr](/blog/raccourcis-ios-flus_homepage-flus.webp)

Flus propose des extensions pour Chrome et Firefox, mais rien pour ajouter facilement un lien depuis un iPhone ou un
iPad, que j’utilisent beaucoup pour ma veille. Sur iOS et macOS, il est ~~facile~~ possible de créer un raccourci pour
faire ça, accessible ensuite dans toute l’interface depuis le bouton de partage, mais l’outil pour le faire n’est
vraiment pas intuitif.

Après m’être arraché quelques cheveux (et m’être même abaissé à demander de l’aide à ChatGPT, qui m’a répondu n’importe
quoi), j’ai fini par réussir. Je vous explique comment ci-dessous.

## Créer le raccourci

TLDR : si vous voulez utiliser le raccourci sans le recréer vous-même, vous pouvez tout simplement l’ajouter à votre
appareil [depuis ce lien](https://www.icloud.com/shortcuts/dd59c81abbf446e9bf52daa0ada90372). Vous pourrez vérifier
qu'il fait bien ce que je dis avant de l'ajouter (ce que je recommande).

### Étape 1 : créer un nouveau raccourci

1. Ouvrir l’application Raccouris sur votre appareil iOS ou macOS
2. Si vous ne l'avez pas
   encore, [téléchargez l'application « Raccourcis » depuis l'App Store](https://apps.apple.com/fr/app/raccourcis/id1462947752).
3. Appuyez sur le bouton « + » en haut à droite.

### Étape 2 : récupérer l'URL depuis l’outil de partage

1. Recherchez l'action « Obtenir l'URL de l’entrée » et ajoutez-la.
2. Cliquez sur la variable **Entrée**
3. Cliquez sur **Sélectionner une variable**
4. Cliquez sur **Entrée de raccourci**. Une nouvelle action « Recevoir l’entrée » apparaît au début du raccourci.
5. Cliquer sur **Images et 18 de plus**
6. Cliquer sur **Effacer** pour décocher toutes les cases
7. Dans la section **Web,** cocher la case **URL**. Ici, peut-être que d’autres options peuvent être utiles, je n’ai pas
   creusé.
8. Cliquer sur **Nulle part** après « Recevoir depuis »
9. Cocher **Dans la feuille de partage**
10. Cliquer sur **Continuer** après « S’il n’y a aucune entrée »

### Étape 3 : créer l’URL d’ajout à Flus

1. Cliquer sur **Rechercher des actions**
2. Chercher l’action **Texte** et l’ajouter
3. Entrer l’URL : `https://app.flus.fr/links/search?autosubmit=true&url=`. Si comme moi vous avez installé votre propre
   instance de Flus, il faut remplacer ici [app.flus.fr](http://app.flus.fr) par votre domaine.
4. Placer le curseur après le signe « = » à la fin de l’URL
5. Cliquer sur **Sélectionner une variable** puis sur **URL**

### Étape 4 : ouvrir l’URL d’ajout dans le navigateur

1. Rechercher l’action **Ouvrir les URL** et l’ajouter

Raccourcis va normalement connecter automatiquement la sortie **Texte** de l’action précédent comme entrée de cette
action.

### Étape 5 : personnaliser le raccourci

1. Cliquer sur le nom du raccourci **Ouvrir les URLs** en haut de l’écran
2. Cliquer sur **Renommer** et entrer par exemple « Ajouter à Flus »
3. Cliquer sur « Choisir une icône » et choisir par exemple l’icône wi-fi et la couleur vert clair.

Voici le résultat auquel vous devriez parvenir :

![Une capture d'écran de l'application Raccourcis montrant le résultat](/blog/raccouris-ios-flus_resultat.png)

## Utiliser le raccourci

Une fois le raccourci enregistré, il apparaîtra dans le menu de partage du système, depuis un navigateur ou n’importe
quelle application, comme ici sur l'app Le Monde.

![Capture d'écran de l'interface de partage avec le lien Ajouter à fus](/blog/raccourcis-ios-flus_depuis-lemonde.png)

Ça marche aussi bien pour l’ajout ponctuel d’un lien et que pour s’abonner à un Flux RSS. Si vous ajoutez le présent
article, il vous sera proposé soit d’enregistrer un signet (lien à lire plus tard), soit de vous suivre le site pour
être averti des prochains articles. Ça, c’est la magie de Flus !
