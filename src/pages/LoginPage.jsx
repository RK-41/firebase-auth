import { useState } from 'react';
import { useFirebase } from '../context/Firebase';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const firebase = useFirebase();

	return (
		<div className='m-4 flex flex-col gap-1'>
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
		</div>
	);
}

export default LoginPage;
