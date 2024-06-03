import { initializeApp } from 'firebase/app';

// Web App's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDUTFoLF9hEjPvCFA-K72MOeyp2sZegzUA',
	authDomain: 'fir-auth-project-48724.firebaseapp.com',
	projectId: 'fir-auth-project-48724',
	storageBucket: 'fir-auth-project-48724.appspot.com',
	messagingSenderId: '186310286781',
	appId: '1:186310286781:web:cbb0c1d8f86751461686d4',
	databaseUrl:
		'https://console.firebase.google.com/u/0/project/fir-auth-project-48724/database/fir-auth-project-48724-default-rtdb/data/~2F',
};

// Initializing Firebase
export const firebaseApp = initializeApp(firebaseConfig);
