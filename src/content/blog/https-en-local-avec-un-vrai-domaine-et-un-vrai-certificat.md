---
title: HTTPS en local avec un vrai domaine et un vrai certificat
description: Une solution élégante pour exposer une application web locale avec un vrai nom de domaine et un vrai certificat SSL, en utilisant Caddy et acme-dns.
pubDate: 2026-03-27
language: fr
heroImage: /blog/https-en-local-avec-un-vrai-domaine-et-un-vrai-certificat.png
category: web
---

J'ai parfois besoin d'exposer une application web en local (Astro dans mon cas) avec un vrai nom de domaine et un vrai
certificat SSL, pour pouvoir utiliser des fonctionnalités comme les passkeys (WebAuthn) qui nécessitent un contexte
sécurisé. Autrefois, je faisais quelque chose de compliqué en forwardant un port de ma machine à travers mes deux
routeurs ou en générant un certificat auto-signé, mais c'était pénible à mettre en place, notamment pour que ça
fonctionne depuis un appareil comme un iPhone.
Aujourd'hui, j'ai trouvé une solution beaucoup plus élégante que je partage ici.

## Objectifs

- Pouvoir accéder à mon sous-domaine `local.example.org` sur le réseau local uniquement
- HTTPS avec certificat reconnu universellement (pas d'avertissement du navigateur)
- Compatible avec [WebAuthn](https://developer.mozilla.org/fr/docs/Web/API/Web_Authentication_API) (connexion avec
  Passkeys)
- Simple à mettre en place et à maintenir : pas de port forwarding, pas de certificat auto-signé, pas de manipulation
  sur les clients, renouvellement automatique du certificat

## Prérequis

- Un nom de domaine domaine (`example.org` dans ce tutoriel)
- Caddy compilé avec le plugin acme-dns (voir étape 3)

## 1. S'enregistrer sur acme-dns

Mon super hébergeur [alwaysdata](https://www.alwaysdata.com/fr/inscription/?from=215e2fb8) (lien sponsorisé) propose un
service de DNS, mais ne permet pas de faire du CNAME vers un domaine géré par un
tiers. Impossible donc d'utiliser acme-dns directement avec alwaysdata, mais il est possible d'utiliser le service
public `auth.acme-dns.io` pour faire le lien entre les deux.

Utiliser la commande suivante pour s'enregistrer sur acme-dns et obtenir les credentials nécessaires à la validation du
certificat :

```bash
curl -X POST https://auth.acme-dns.io/register
```

On obtient en réponse un JSON contenant les informations suivantes :

```json
{
  "username": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "fulldomain": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.auth.acme-dns.io",
  "subdomain": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

Sauvegarder ces credentials dans un fichier `acme-dns.json` :

```json
{
  "local.example.org": {
    "username": "...",
    "password": "...",
    "fulldomain": "...",
    "subdomain": "..."
  }
}
```

## 2. Créer les enregistrements DNS

Dans l'interface du registrar, aller sur la page **Enregistrements DNS**, puis ajouter
deux entrées :

| Hostname                   | Type  | Valeur                                         |
|----------------------------|-------|------------------------------------------------|
| `personae`                 | A     | `192.168.x.x` *(IP locale fixe de la machine)* |
| `_acme-challenge.personae` | CNAME | *(valeur fulldomain obtenue à l'étape 1)*      |

L'enregistrement A pointe vers l'IP privée de la machine cible. Hors du réseau local, depuis internet, la connexion
tombera en timeout. Mais c'est bien suffisant pour mon cas d'usage, qui est d'accéder à l'application depuis le réseau
local uniquement.

Si l'adresse IP locale de la machine cible change, il faudra mettre à jour l'enregistrement A. Le mieux est d'assigner
une IP fixe à la machine sur le routeur (bail DHCP statique) pour éviter d'avoir à faire cette manipulation.

NB : Les enregistrements DNS sont publics et cet enregistrement A révèle que l'IP est utilisée sur le réseau local,
mais rien de plus (si la confidentialité est importante).

## 3. Compiler Caddy avec le plugin acme-dns

Nous allons utiliser Caddy comme serveur web pour faire le reverse proxy vers l'application locale (port 443 => port
1234), mais aussi le plugin acme-dns pour gérer la création du certificat SSL.

Le service public [auth.acme-dns.io](https://github.com/acme-dns/acme-dns) est gratuit et maintenu par la
communauté. J'ai cru comprendre qu'il était possible de l'auto-héberger pour ne pas dépendre d'un tiers, mais je n'ai
pas testé.

Problème : Caddy ne supporte pas acme-dns nativement. Il faut le compiler avec xcaddy :

```bash
go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
xcaddy build --with github.com/caddy-dns/acmedns
```

Remplacer le binaire Caddy existant par celui compilé, puis lui donner le droit d'écouter sur le port 443 sans sudo :

```bash
sudo mv caddy $(which caddy)
sudo setcap cap_net_bind_service=+ep $(which caddy)
```

## 4. Configurer Caddy

Créer un fichier `Caddyfile` à la racine du projet :

```
local.example.org {
	tls {
		dns acmedns ./acme-dns.json
	}
	reverse_proxy localhost:1234
}
```

Dans mon cas, le serveur web écoute sur le port 1234 en local, mais le port est à adapter selon la configuration du
projet.

## 5. Gérer Caddy et Astro avec pm2

Dans mon cas, j'utilise pm2 pour gérer le process du serveur web. J'ai ajouté Caddy à l'`ecosystem.config.js` existant :

```jsx
module.exports = {
  apps: [
    {
      name: 'caddy',
      script: 'caddy',
      args: 'run --config /chemin/absolu/vers/Caddyfile',
      interpreter: 'none',
      watch: false,
    },
    {
      name: 'projet-local',
      script: 'node',
      args: './dist/server/entry.mjs',
      env_file: '.env',
    },
  ],
}
```

Lancer les deux processus :

```bash
pm2 start ecosystem.config.js
```

Au premier démarrage, Caddy va automatiquement :

1. Appeler l'API acme-dns pour déposer le token de validation
2. Demander le certificat à Let's Encrypt
3. Stocker le certificat localement
4. Le renouveler automatiquement avant expiration

## 6. Enjoy !

Le serveur web est maintenant accessible à l'adresse `https://local.example.org` depuis le réseau local, avec un
certificat SSL reconnu par tous les navigateurs. Il n'y a aucune manipulation à faire sur les clients, et dans mon cas
les passkeys fonctionnent parfaitement depuis un iPhone, ce qui n'était pas le cas avec un certificat auto-signé.
