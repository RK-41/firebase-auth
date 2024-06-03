/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';
import { firebaseApp } from '../firebase.js';

const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
	const registerUserWithEmailAndPassword = (email, password) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const loginWithEmailAndPassword = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const putData = (key, data) => set(ref(database, key), data);

	return (
		<FirebaseContext.Provider
			value={{
				registerUserWithEmailAndPassword,
				loginWithEmailAndPassword,
				putData,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};
