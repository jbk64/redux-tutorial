# redux-tutorial

## Qu'est ce que Redux?

> Redux est une bibliothèque open-source JavaScript de gestion d'état pour applications web. Elle est plus couramment utilisée avec des bibliothèques comme React ou Angular pour la construction d'interfaces utilisateur.

Redux. (2020, janvier 14). Wikipédia, l'encyclopédie libre.

C'est une librairie de code JavaScript qui facilite la gestion de l'état des applications JavaScript en implémentant un "conteneur d'état".

Il vous aide à écrire des applications qui ont un comportement cohérent, fonctionnant dans différents environnements (client, serveur et natif), et
 qui sont facilement testables. Cerise sur le gâteau, il offre une bonne expérience de développement, comme l'édition de code en direct combiné avec
  une gestion d'erreur étape par étape.

Vous pouvez utiliser Redux conjointement avec React, ou avec toute autre bibliothèque de vue.

## Pourquoi utiliser Redux?

A mesure que les applications web deviennent de plus en plus complexes, leur code doit gérer de plus en plus d'état.

L'état de l'application peut prendre en compte des réponses de serveur, des données dans le cache, ou des données locales qui n'ont pas encore été synchronisées avec le serveur.

Ainsi, le développement d'interfaces monte en complexité également, car pour chaque changement d'état il faut potentiellement modifier l'interface graphique.

Redux est une librairie qui tente de résoudre ce problème en proposant un système de gestion d'état prédictible et cohérent.

## Installation

Installer avec `npm`:
```
npm install redux
```

Installer avec `yarn`:
```
yarn add redux
```

## Les principes de base

1. L'état entier de l'application est stocké dans une unique structure d'object JavaScript (le ***store***).

1. L'état de l'application est en mode lecture seule et ne peut pas être modifié directement. Le seul moyen de mettre à jour l'état de l'application est d'émettre une ***action***. Une action est un objet qui décrit un évènement qui affecte l'état de l'application.

1. Les mises à jour de l'état sont réalisées par des fonctions pures, appelées ***reducers***. Celles-ci prennent en paramètre l'état inital avant
 la mise à jour d'état ainsi qu'une action. Basée sur les évènements décrits par l'action, l'état global de l'application est mise à jour.

Ainsi Redux rend explicite le fait que chaque changement d'état est associé à une action qui n'est qu'un simple objet JavaScript qui peut être
 tracé et journalisé à des fins de débuggage.

## Utilisation

Imaginons une application de commerce en ligne avec un système classique de panier de produits.

L'état du panier serait donc géré dans le ***store*** unique, dans une structure d'objet simple:
```javascript
{
    panier: [],

    // autres variables d'état
    afficherProduitsEpuisés: false,
    themeSombre: true,
    ...
}
```

Commençons par définir des actions qui pourraient
 modifier l'état d'une telle application.
 
 Voici un exemple d'action qui pourrait modifier la liste des produits actuellement dans le panier.
 
 ```javascript
// Types d'action
const AJOUTER_PRODUIT = 'AJOUTER_PRODUIT'
const RETIRER_PRODUIT = 'RETIRER_PRODUIT'

// Actions spécifiques utilisant les types définis
const actionAjouter = {
    type: AJOUTER_PRODUIT,
    idProduit: 3456
}
const actionRetirer = {
    type: RETIRER_PRODUIT,
    idProduit: 5362
}
```

Ces actions ont pour objectif d'ajouter ou de retirer un produit à la liste du panier par son identifiant.

Enfin, nous écrivons une fonction ***reducer*** qui a pour responsabilité de traiter d'évaluer l'action et de modifier l'état global de l'application en conséquence :

```javascript
panier = (state = [], action) => {
    switch (action.type) {
        case 'AJOUTER_PRODUIT':
            // ajouter le produit au panier
            return state
        case 'RETIRER_PRODUIT':
            // retirer le produit du panier
            return state
        default:
            return state
    }  
}
```

Nous pouvons écrire

## Concepts avancés

## Références

https://redux.js.org/
https://redux.js.org/introduction/examples

https://github.com/reduxjs/redux

https://fr.wikipedia.org/wiki/Redux
https://en.wikipedia.org/wiki/Redux_(JavaScript_library)

https://github.com/yasakura/redux-in-french
