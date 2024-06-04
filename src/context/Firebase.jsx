/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { firebaseApp } from '../firebase.js';

const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
	const registerUserWithEmailAndPassword = (email, password) => {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const loginWithEmailAndPassword = (email, password) => {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const updateUserProfile = (name) => {
		return updateProfile(firebaseAuth.currentUser, {
			displayName: name,
		});
	};

	return (
		<FirebaseContext.Provider
			value={{
				registerUserWithEmailAndPassword,
				loginWithEmailAndPassword,
				updateUserProfile,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};
