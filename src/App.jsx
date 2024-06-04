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
		<div className='h-screen pb-16 bg-gradient-to-r from-orange-600 to-pink-600 text-white'>
			<div className='text-3xl sm:text-4xl md:text-5xl py-10 font-bold text-center text-white drop-shadow-lg'>
				Welcome to Firebase Auth
			</div>

			{!user ? (
				<div className='my-10 py-4 flex justify-center flex-wrap gap-4'>
					<Link
						to='/login'
						className='w-[180px] px-4 py-2 rounded-md bg-blue-700 text-white text-center hover:bg-blue-800 shadow-md'
					>
						Go to Login
					</Link>
					<Link
						to='/register'
						className='w-[180px] px-4 py-2 rounded-md bg-orange-500 text-white text-center hover:bg-orange-700 shadow-md'
					>
						Go to Registration
					</Link>
				</div>
			) : (
				<div className='w-full max-w-[600px] mx-auto my-10 py-4 rounded-md flex flex-col justify-center items-center flex-wrap gap-4 shadow-xl bg-transparent/5 backdrop-blur-2xl drop-shadow-lg'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-medium my-2'>
						Hey {user.displayName}
					</h2>
					<h3 className='text-lg sm:text-xl md:text-2xl'>You are logged in!</h3>
					<button
						onClick={() => signOut(auth)}
						className='w-[180px] my-4 px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 shadow-md'
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
