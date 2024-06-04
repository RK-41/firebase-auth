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
		firebase.registerUserWithEmailAndPassword(email, password).then(() => {
			updateProfile(auth.currentUser, {
				displayName: name,
			});
			setName('');
			setEmail('');
			setPassword('');
		});
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
		<div className='h-screen pb-16 bg-gradient-to-r from-orange-600 to-pink-600 text-white'>
			<div className='text-3xl sm:text-4xl md:text-5xl py-10 font-bold text-center drop-shadow-lg'>
				Registration Page
			</div>

			{!user ? (
				<div className='max-w-[600px] m-4 mx-auto flex flex-col gap-1 bg-gray-100 rounded-md shadow-md px-4 py-6'>
					<label htmlFor='name' className='text-gray-700'>
						Name
					</label>
					<input
						type='text'
						name='name'
						placeholder='name'
						onChange={(e) => setName(e.target.value)}
						value={name}
						className='text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500'
					/>

					<label htmlFor='email' className='text-gray-700'>
						Email
					</label>
					<input
						type='text'
						name='email'
						placeholder='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className='text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500'
					/>

					<label htmlFor='Password' className='text-gray-700'>
						Password
					</label>
					<input
						type='password'
						name='password'
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className='text-black border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500'
					/>

					<button
						className='w-[120px] text-white bg-orange-500 hover:bg-orange-700 rounded-md mt-4 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-700 shadow-md'
						onClick={registerUser}
					>
						Register
					</button>
				</div>
			) : (
				<div className='w-full max-w-[600px] mx-auto my-10 py-4 rounded-md flex flex-col justify-center items-center flex-wrap gap-4 shadow-xl bg-transparent/5 backdrop-blur-2xl'>
					<h3 className='text-lg sm:text-xl md:text-2xl text-center drop-shadow-lg'>
						You have successfully registered!
					</h3>
					<button
						onClick={() => signOut(auth)}
						className='w-[180px] text-white rounded-md my-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-800 shadow-md'
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default RegistrationPage;
