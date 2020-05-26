# Tutoriel Redux, Jack Barker

![React](<https://i.imgur.com/As15QGv.jpg>)

## Qu'est ce que Redux?

> Redux est une bibliothèque open-source JavaScript de gestion d'état pour applications web. Elle est plus couramment utilisée avec des frameworkscomme React ou Angular pour la construction d'interfaces utilisateur.

Redux. (2020, janvier 14). Wikipédia, l'encyclopédie libre.

C'est une librairie de code JavaScript développée par Facebook qui facilite la gestion de l'état des applications JavaScript en implémentant un "conteneur d'état".

Redux vous aide à écrire des applications qui ont un comportement cohérent, qui fonctionnent dans différents environnements (client, serveur et natif), et qui sont facilement testables. Redux propose une API très légère et vous est utilisable avec React Native, ou avec toute autre bibliothèque de vue.

## Pourquoi utiliser Redux?

A mesure que les applications web et mobiles deviennent plus complexes, leur code doit gérer de plus en plus d'état.

L'état de l'application peut prendre en compte des réponses de serveur, des données dans le cache, un input de l'utilisateur, ou des données locales qui n'ont pas encore été synchronisées avec le serveur.

Ainsi, le développement d'interfaces monte en complexité également, car pour chaque changement d'état il faut potentiellement modifier l'interface graphique.

Redux tente de mitiger ce problème en proposant un système de gestion d'état prédictible et cohérent, et qui facilite le débugging d'application complexes.

## Installation avec `npm`

Installer avec `npm`:
```
npm install redux
npm install react-redux
```

## Les principes de base

### L'état global de l'application est stocké dans un objet

L'état entier de l'application est stocké dans une unique structure d'object JavaScript, un arbre d'état contenu dans le ***store***.

Par exemple, pour le cas d'une application de Todo liste, l'état global de l'application pourrait être stockée ainsi :

```javascript
{
    todos: [],
    visibilityFilter: "SHOW_ALL"
}
```

### L'état de l'application est en mode lecture seule et ne peut pas être modifié directement

Le seul moyen de mettre à jour l'état de l'application est d'émettre une ***action***. Une action est un objet qui décrit un évènement qui affecte l'état de l'application.

Un exemple d'action qui contiendrait les informations nécessaire pour muter l'état global de l'application:

```javascript
{
    type: 'ADD_TODO',
    text: 'Learn Redux'
}
```

### Les mises à jour de l'état sont réalisées par des fonctions pures, appelées ***reducers***

Celles-ci prennent en paramètre l'état initial avant la mise à jour d'état ainsi qu'une action. Selon les évènements décrits par l'action, l'état global de l'application est mise à jour.

Un reducer est une fonction pure care elle ne prend pas en compte de variables externes ou globales, mais seulement les paramètres qui lui sont passés. Le reducer retourne toujours une nouvelle instance de l'état modifié.

```javascript
myReducer = (state, action) => {
    // ...
    return state
}
```



Ainsi Redux rend explicite le fait que chaque action déclenche une fonction reducer qui déclenche à sont tour un appel vers le store qui stocke l'état de l'application.

![Action, reducer, store](<https://i.imgur.com/XN0SVfM.png>)

## Utilisation

Imaginons une application de Todo Liste très simple qui permet d'ajouter des tâches et de les cocher quand elles sont terminées. L'affichage des tâches peut être filtrée par leur statut de visibilité.



![Todo list](<https://i.imgur.com/SeqivcX.png>)

L'état entier de l'applicaton pourrait être stockée dans un objet de ce type:

```javascript
{
    todos: [],
    visibilityFilter: 'SHOW_ALL'
}
```

### Actions

Commençons par définir des actions qui pourraient modifier l'état d'une telle application. Les actions représentent les opérations que l'utilisateur peut faire qui modifient l'état de l'application.

Nous pouvons définir les actions qui permettent d'ajouter ou cocher un todo, ou de filtrer les todos affichés.

***`actions/index.js`***

 ```javascript
// simulation d'une séquence d'identifiants uniques
let nextTodoId = 0

// ajouter un todo
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

// modifier le filtre d'affichage
export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

// cocher un todo
export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})

// constantes de valeurs de filtre
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
 ```

### Reducers

Ces actions devront être consommées par des fonctions reducer afin de modifier l'état global.

Dans ***`reducers/index.js`***, nous pouvons définir les fonctions qui transformeront l'état de l'application pour ajouter ou cocher des todos ou modifier le filtre d'affichage. C'est ici que nous faisons un mapping des actions de l'utilisateur sur des traitements cohérents de l'état de l'application.

Redux ne dit pas comment structurer les fonctions reducer d'une application. Ici, les deux reducers sont combinés à l'aide de la fonction `combineReducers`.

***`reducers/index.js`***

```javascript
import {combineReducers} from 'redux'
import {VisibilityFilters} from '../actions'

// combinaison de deux reducers
export default combineReducers({
    
    // reducer: actions todo
    todos: (state = [], action) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [
                    ...state,
                    {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }
                ]
            case 'TOGGLE_TODO':
                return state.map(todo =>
                    todo.id === action.id ? {...todo, completed: !todo.completed} : todo
                )
            default:
                return state
        }
    },
    
    // reducer: modifier le filtre
    visibilityFilter: (state = VisibilityFilters.SHOW_ALL, action) => {
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
                return action.filter
            default:
                return state
        }
    }
})

```

Il est important de noter que chaque reducer est une fonction pure qui ne prend en compte que ses paramètres (pas de variable locales ou globales). Elles retournent toujours une nouvelle instance de l'objet `state`.

Nous avons donc mis en place les actions et les reducers, et il ne manque plus qu'à implémenter les composants de présentation et les containers.

### Composants

Le fichier `components/TodoList.js` définit le composant de la liste de tâches.

***`components/TodoList.js`***

```javascript

import React from 'react'

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

const TodoList = ({ todos, toggleTodo }) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
        ))}
    </ul>
)

export default TodoList
```



Le fichier `components/Filter.js` définit le composant de filtre en tant que boutton.

***`components/TodoList.js`***

```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
)
export default Filter
```



Enfin, le composant `components/Filter.js` définit la section qui contient tous les filtres.

***`components/Filter.js`***

```javascript
import React from 'react'
import FilterContainer from '../containers/FilterContainer'
import { VisibilityFilters } from '../actions'

const Filter = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
)

const Filters = () => (
    <div>
        <span>Show: </span>
        <FilterContainer filter={VisibilityFilters.SHOW_ALL}>All</FilterContainer>
        <FilterContainer filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterContainer>
        <FilterContainer filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterContainer>
    </div>
)

export default Filters
```

Les composants de présentation définis, il faut maintenant implémenter des composants React qui serviront à appeler le `store` et à fournir des données au composants de présentation, les containers. 

Ce pattern propose d'isoler le code faisant appel au Redux `store` dans un composant séparé via la fonction `connect()`. Celle-ci est optimisée pour intéragir avec l'arbre d'état Redux. La fonction `dispatch()`, elle, permet d'invoquer des actions afin de faire des écritures sur l'état de l'application.

### Containers

Le container de la liste a besoin de lire l'état global de l'application et dispatcher l'action `toggleTodo`. Cela est fait à l'aide des fonctions `mapStateToProps` et `mapDispatchToProps`.

***`containers/TodoListContainer.js`***

```javascript
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

// filtre des todos
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

// récupérer les todos du state et les passer 
const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

// invoquer l'action "cocher un todo" avec un id
const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```



Le container des filtres doit récupérer l'état actuel de la sélection de filtre et dispatcher l'action de modification du filtre.

***`containers/FilterContainer.js`***

```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Filter from '../components/Filter'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default FilterContainer
```



Le container `AddTodoContainer` ne fait que dispatcher l'action `addTodo`:

***`containers/AddTodoContainer.js`***

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodoContainer = ({ dispatch }) => {
    let input

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    // action addTodo
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}
            >
                <input ref={node => (input = node)} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default connect()(AddTodoContainer)
```

Il ne reste plus qu'à lier le tout dans le fichier `App.js`:

***`App.js`***

```javascript
import React from 'react'
import Filters from './src/components/Filters'
import AddTodo from './src/containers/AddTodoContainer'
import VisibleTodoList from './src/containers/TodoListContainer'
import {Provider} from 'react-redux'
import rootReducer from './src/reducers'
import { createStore } from 'redux'

// Initialisation du store
const store = createStore(rootReducer)

const App = () => (
    // Passer le store à tous les containers
    <Provider store={store}>
        <AddTodo />
        <VisibleTodoList />
        <Filters />
    </Provider>
)

export default App
```

Tous les composants containers ont besoin d'avoir accès au store. Le composant React Redux `Provider` permet de rendre le store accessible à tous les containers sans devoir le passer explicitement à chacun.

L'application est maintenant fonctionelle et utilise Redux pour sa gestion d'état.

## Conclusion

Dans cette petite implémentation de la gestion d'état dans React avec Redux, nous avons séparé la logique en différents objets avec différentes responsabilités:

* les ***actions***, les objets qui décrivent les évènements qui doivent modifier l'état de l'application,
* les ***reducers***, les fonctions qui transforment l'état de l'application,
* les composants React qui composent l'interface et permettent d'activer les actions via les composants containers.

Dans le paradigme Redux, la gestion d'état est simplifiée en puisque tous les composants se basent sur un même état commun global. Toute
 modification de l'état est forcément traçable vers une action avec un certain type et des paramètres. Ceci permet d'augmenter la maintenabilité et
  les possiblités de débuggage pas à pas.



## Références

Le code de ce tutoriel: <https://github.com/jckbrkr/redux-tutorial>

La documentation de Redux: https://redux.js.org/

Exemple Todo List: https://redux.js.org/basics/example

Wikipédia: https://fr.wikipedia.org/wiki/Redux

