import { useState, useEffect } from 'react';
import { FirebaseProvider } from './context/Firebase';
import { LoginPage, RegistrationPage } from './pages';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('hey', user.email);
				setUser(user);
			} else {
				console.log('you are logged out');
				setUser(null);
			}
		});
	}, []);

	return (
		<FirebaseProvider>
			<div className='text-5xl'>Firebase Auth</div>
			{!user ? (
				<>
					<LoginPage />
					<RegistrationPage />
				</>
			) : (
				<>
					<h1>Hey {user.email}</h1>
					<button onClick={() => signOut(auth)}>Logout</button>
				</>
			)}
		</FirebaseProvider>
	);
}

export default App;
