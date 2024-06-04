import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';

const auth = getAuth(firebaseApp);

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const firebase = useFirebase();

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
		<div className='m-4 flex flex-col gap-1'>
			{!user ? (
				<>
					<div>Login Page</div>

					<label htmlFor='email'>Email</label>
					<input
						type='text'
						name='email'
						placeholder='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>

					<label htmlFor='Password'>Password</label>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<button
						className='w-max'
						onClick={() => firebase.loginWithEmailAndPassword(email, password)}
					>
						Login!
					</button>
				</>
			) : (
				<>
					<h1>Hey {user.displayName}</h1>
					<button onClick={() => signOut(auth)}>Logout</button>
				</>
			)}
		</div>
	);
}

export default LoginPage;
