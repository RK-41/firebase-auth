import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import {
	getAuth,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { firebaseApp } from '../firebase';

const auth = getAuth(firebaseApp);

function RegistrationPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const firebase = useFirebase();

	const registerUser = () => {
		firebase.registerUserWithEmailAndPassword(email, password).then(() =>
			updateProfile(auth.currentUser, {
				displayName: name,
			})
		);
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, [user]);

	return (
		<div className='m-4 flex flex-col gap-1'>
			{!user ? (
				<>
					<div>Registration Page</div>

					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						placeholder='name'
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>

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

					<button className='w-max' onClick={registerUser}>
						Register!
					</button>
				</>
			) : (
				<>
					<h1>You have successfully registered!</h1>
					<button onClick={() => signOut(auth)}>Logout</button>
				</>
			)}
		</div>
	);
}

export default RegistrationPage;
