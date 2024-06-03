import { useState } from 'react';
import { useFirebase } from '../context/Firebase';

function RegistrationPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const firebase = useFirebase();
	console.log('Firebase: ', firebase);

	return (
		<div className='m-4 flex flex-col gap-1'>
			<div>Registration Page</div>

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
				onClick={() =>
					firebase.registerUserWithEmailAndPassword(email, password)
				}
			>
				Register!
			</button>
		</div>
	);
}

export default RegistrationPage;
