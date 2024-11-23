---
title: Gérer ses radiateurs Tiko / Mon Pilotage Elec avec Siri et Apple Home
description: Le chaînon manquant entre vos radiateurs Tiko et vos appareils Apple grâce à HomeBridge.
pubDate: 2024-01-05
heroImage: /homebridge-tiko/hero-image.png
language: fr
---

[Tiko](https://www.tiko.fr/) (aussi appelé [Mon Pilotage elec](https://particuliers.engie.fr/landing/mon-pilotage-elec-sea.html) 
par Engie) est une excellente solution pour programmer et gérer ses radiateurs électriques depuis son
téléphone, tout en surveillant sa consommation électrique. Pour ne rien gâcher, le service est gratuit, sans frais
d’installation, sans abonnement et sans engagement.

![Tableau de bord Tiko](/homebridge-tiko/tableau-de-bord-tiko.png)

Son seul défaut est qu’il n’est pas, aujourd’hui, compatible avec Apple Homekit. Impossible donc de contrôler les
radiateurs avec Siri ou avec une Apple Watch, de voir la température de chaque pièce dans l’application Maison
d’iOS ou encore de profiter des automatisations HomeKit.

Heureusement, en attendant un éventuel support officiel de la plateforme d’Apple, il est possible
d’utiliser [Homebridge](https://homebridge.io) et le plugin **homebridge-tiko** que j'ai créé pour faire le lien entre
les deux. L’application « Maison » ne remplacera pas l’excellente application Tiko et ne permettra pas notamment pas de
gérer la programmation. Mais la passerelle Homebridge ouvrira la possibilité au contrôle des radiateurs à la voix ou au
déclenchement de scénario basés, par exemple, sur la présence des personnes au domicile.

[Le code source de mon plugin homebridge-tiko est disponible sur Github](https://github.com/clemlatz/homebridge-tiko/),
mais vous trouverez un guide complet d'installation et de configuration ci-après.

## 1. Installation de Homebridge

Pour accéder au service Tiko depuis l’application « Maison », il vous faudra installer Homebridge sur un serveur,
c’est-à-dire un ordinateur allumé et connecté en permanence à internet. De mon côté, j’utilise un Raspberry Pi dans un
domicile et la Freebox Delta dans un autre.

La procédure, qui varie selon votre système d’exploitation, est
décrite [dans la documentation de Homebridge](https://github.com/homebridge/homebridge/wiki).

L’installation est terminée lorsque vous avez créé un mot de passe pour accéder à l’interface d’administration de
Homebridge et scanné le QRCode pour ajouter Homebridge à votre « maison » Apple.

## 2. Installation du plugin Tiko

Homebridge propose un important catalogue de plugins permettant d’interconnecter à « Maison » de nombreux services
n’étant pas nativement compatible avec HomeKit. Ici, c'est le plugin homebridge-tiko qui permet de faire le lien avec le
service Tiko.

Depuis l’interface d’administration Homebridge, cliquez sur **Plugins** puis recherchez le plugin *homebridge-tiko* et
installez-le.

![Une recherche du plugin "homebridge-tiko" dans HomeBridge](/homebridge-tiko/installation-du-plugin-tiko.png)

Redémarrez ensuite Homebridge pour finaliser l’installation du plugin.

## 3. Configuration du plugin Tiko

Une fois Homebridge redémarré, vous pouvez passer à la configuration du plugin.

Depuis la page **Plugins** de homebridge, localisez le plugin **homebridge-tiko** et cliquez sur la petite roue dentée,
sur **Réglages**, puis remplissez les champs comme suit.

![Un exemple de configuration du plugin](/homebridge-tiko/configuration-du-plugin-tiko.png)

- **Nom de la plateforme** : Par défaut, "Tiko". Peut-être personnalisé pour distinguer plusieurs configurations
  correspondant à plusieurs domiciles.
- **Login Tiko** : Votre adresse e-mail de connexion à Tiko.
- **Mot de passe Tiko** : Votre mot de passe de connexion à Tiko.

Les deux dernières options sont facultatives.

- **Endpoint Tiko** : Par défaut, Tiko utilisera le domaine du site français (https://particuliers-tiko.fr/) mais vous
  pouvez utiliser cette option pour configurer un autre endpoint.
- **Identifiant de propriété** : Si vous utilisez Tiko dans plusieurs domiciles, Homebridge choisira par défaut le
  premier. Vous pouvez configurer ici le domicile à utiliser en indiquant son identifiant de propriété. Vous pouvez
  trouver cet identifiant à la fin de l'url du tableau de bord Tiko lorsque ce domicile est
  sélectionné :<br /> `https://particuliers-tiko.fr/dashboard/{identifiant}`

![Emplacement de l'identifiant de propriété dans la barre d'adresse](/homebridge-tiko/identifiant-de-propriete.png)

Enregistrez puis redémarrez Homebridge pour finaliser la configuration du plugin.

## 4. Utilisation

### Contrôle de la température

Une fois Homebridge redémarré, vos radiateurs Tiko devraient apparaître sous la forme de thermostats sur la page
**Accessoires** de HomeBridge (sinon, vérifiez dans les logs Homebridge qu'il n'y a pas un problème de connexion à Tiko)
et dans l'application **Maison** de vos appareils Apple (sinon, vérifiez l'ajout du pont Homebridge à votre domicile).

Vous pouvez à présent voir la température actuelle et modifier la température cible dans chacune des pièces où se trouve
un radiateur Tiko, à l'aide de Siri ou de l'application Maison.

### Définition d'un mode Tiko

À cause des limitations de Homekit, il n'est pas possible de choisir directement les modes Tiko (Boost, Absence,
Hors-gel) depuis l'application Maison, mais on peut mettre un radiateur en mode "Hors-gel" en le mettant sur "Éteint"
ou de le mettre en mode "Boost" en le mettant sur "Chauffer".

<div class="text-center">
  <img 
    alt="Un radiateur programmé sur le mode Autom. et à 19°" 
    src="/homebridge-tiko/radiateur-autom-19-degres.png" 
    width="300"
  />
</div>

Voici les équivalences pour chaque mode :

| Instruction "Maison" | Mode Tiko     |                                   Température |
|----------------------|---------------|----------------------------------------------:|
| Éteint               | Hors-gel      |                                            7° |
| Refroidir            | Absence       |                                           17° | 
| Chauffer             | Boost         |                                           25° |
| Autom.               | Programmation | Selon programmation <br/>ou consigne manuelle |

Mettre un radiateur sur "Autom." revient à n'activer aucun mode Tiko, c'est-à-dire à respecter la programmation. C'est
le seul mode où il est possible de régler manuellement la température, puisque les autres modes ont une température
prédéfinie et forcée.

Si un mode autre que "Autom." est défini, les instructions de changement de température seront
ignorés. Si une température est définie en mode "Autom.", la consigne sera appliquée jusqu'au prochain changement
programmé de température (c'est le fonctionnement du service Tiko).

### Automatisations HomeKit

Grâce à l'intégration HomeKit, il est possible de programmer certaines automatisations qui seraient impossibles à
réaliser uniquement avec l'application Tiko, par exemple, activer le mode "Absence" lorsque la dernière personne quitte
le domicile et le désactiver lorsqu'une personne arrive.

<div class="text-center">
  <img 
    alt="Un exemple d'automatisation : Quand la dernière personne quitte la maison, éteindre les radiateurs" 
    src="/homebridge-tiko/automatisation-homekit.jpeg" 
    width="500"
  />
</div>
