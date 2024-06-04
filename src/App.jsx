import { useState, useEffect } from 'react';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const auth = getAuth(firebaseApp);

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<>
			<div className='text-5xl'>Welcome to Firebase Auth</div>
			{!user ? (
				<>
					<Link to='/login'>Go to Login</Link>
					<Link to='/register'>Go to Registration</Link>
				</>
			) : (
				<>
					<h1>Hey {user.displayName}</h1>
					<button onClick={() => signOut(auth)}>Logout</button>
				</>
			)}
		</>
	);
}

export default App;
