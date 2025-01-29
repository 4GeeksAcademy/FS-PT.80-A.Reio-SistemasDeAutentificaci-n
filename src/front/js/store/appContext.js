import React, { createContext, useContext, useState, useEffect } from "react";
import getState from "./flux.js";

// No cambies esto, es donde inicializamos nuestro contexto, por defecto es null.
export const Context = React.createContext(null);

// Esta función inyecta el store global a cualquier vista/componente donde lo quieras usar
const injectContext = (PassedComponent) => {
	const StoreWrapper = (props) => {
		// Esta es la función que se encarga de manejar el estado global
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: (updatedStore) =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions },
					}),
			})
		);

		useEffect(() => {
			// Aquí puedes hacer cualquier lógica cuando el componente se monta
			// Ahora puedes llamar la función getMessage que definimos en actions
			state.actions.getMessage(); // Esto ya debería funcionar
		}, []);

		// Pasamos el contexto a la vista que lo requiera
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;

