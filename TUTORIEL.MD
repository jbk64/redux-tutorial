# redux-tutorial

## Qu'est ce que Redux?

> Redux est une bibliothèque open-source JavaScript de gestion d'état pour applications web. Elle est plus couramment utilisée avec des bibliothèques comme React ou Angular pour la construction d'interfaces utilisateur.

Redux. (2020, janvier 14). Wikipédia, l'encyclopédie libre.

C'est une librairie de code JavaScript qui facilite la gestion de l'état des applications JavaScript en implémentant un "conteneur d'état".

Il vous aide à écrire des applications qui ont un comportement cohérent, fonctionnant dans différents environnements (client, serveur et natif), et qui sont facilement testables. Cerise sur le gâteau, il offre une merveilleuse expérience de développement, comme l'édition de code en direct combiné avec une gestion d'erreur étape par étape.

Vous pouvez utiliser Redux conjointement avec React, ou avec toute autre bibliothèque de vue. C'est une libraire légère (2kb).

## Pourquoi utiliser Redux?

## Connaissances pré-requises


## Installation

Installer avec `npm`:
```
npm install redux
```

Installer avec `yarn`:
```
yarn add redux
```

## Démarrage

## Action & reducer

Le seul moyen de changer l'état de l'application est d'émettre une ***action***.

Une action est un objet décrivant un évènement qui doit changer l'état de l'application de manière cohérente. Par exemple dans le cas d'une application de commerce en ligne: un article a été ajouté dans le panier.

L'action est ensuite traitée par un ***reducer***, une fonction qui est responsable de changer l'état de l'application selon les actions reçues.

Ainsi avec Redux, au lieu de changer l'état de l'application directement, on spécifie des changements au travers d'objets appelés ***actions***, qui sont traités par des fonctions appelées ***reducers***

## Stockage

## Concepts avancés

## Références

https://redux.js.org/
https://redux.js.org/introduction/examples

https://github.com/reduxjs/redux

https://fr.wikipedia.org/wiki/Redux
https://en.wikipedia.org/wiki/Redux_(JavaScript_library)

https://github.com/yasakura/redux-in-french
