/**
 * Fuentes de información.
 * [Redux en Español] https://es.redux.js.org/
 * [Redux docs] https://redux.js.org
 */

import React from 'react';
/**
 * Paquete que proporciona todo aquello necesario para crear componentes de React.
 *
 * Virtual DOM
 * Modificar el DOM del navegador es un proceso muy costoso, pero por suerte React optimiza este trabajo.
 * En React los componentes no generan HTML directamente, lo que generan es código Javascript y una descripción virtual del DOM.
 * Al renderizar, React utiliza un algoritmo de diff para comparar la salida de los componentes con el virtual DOM actual
 * y conocer qué debe cambiar en el DOM real. De esta forma sólo se realizarán las operaciones que sean estrictamente necesarias.
 */

import ReactDOM from 'react-dom';
/**
 * Paquete que proporciona los métodos específicos para interactuar directamente con el DOM del navegador.
 * Los métodos son render(), hydrate(), unmountComponentAtNode(), findDOMNode(), createPortal().
 * Documentación: https://reactjs.org/docs/react-dom.html
 */

import { Provider } from 'react-redux';
/**
 * Todos los componentes contenedores necesitan acceso al store de Redux para que puedan suscribirse a ella.
 * Una opción sería pasarlo como un prop a cada componente contenedor. Sin embargo, este proceso se vuelve tedioso.
 * La opción mejor opción es el uso de Provider, un componente de Redux especial que permite que el store esté disponible
 * para todos los componentes del contenedor en la aplicación sin pasarlo explícitamente. Sólo es necesario utilizarlo una
 * única vez al renderizar el componente raíz, tal y como se muestra en las últimas líneas de código.
 */

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import initialState from './initial-state';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const middlewares = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
);

console.log(store);
/**
 * El store es una objeto javascript encargado de gestionar el árbol de estado de la aplicación.
 * Simplemente es un objeto que dispone de algunos métodos para ello.
 *
 * Output:
{
	dispatch: f (action),
	getState: f (),
	liftedStore: {},
	replaceReducer: f (nextReducer),
	subscribe: f (listener)
}
 */

console.log(store.getState());
/**
 * La función getState devuelve el árbol actual del estado de la aplicación.
 * Este árbol es igual al último objeto regresado por los reducers del store.
 *
 * Output:
{
	phrase: null;
}
 */

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
