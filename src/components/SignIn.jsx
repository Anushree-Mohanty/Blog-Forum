// import { useState } from 'react';
// import { useOutletContext, useNavigate } from 'react-router-dom';
// import { z } from 'zod';

// const signInSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
// });

// function SignIn() {
//   const { handleSignIn } = useOutletContext();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState(null);
//   const [loginError, setLoginError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors(null);
//     setLoginError('');

//     const result = signInSchema.safeParse({ email, password });

//     if (!result.success) {
//       setErrors(result.error.format());
//     } else {
//       const storedUser = JSON.parse(localStorage.getItem('blogUser'));

//       if (storedUser && storedUser.email === email && storedUser.password === password) {
//         handleSignIn(email);
//         localStorage.setItem('blogUser', JSON.stringify(storedUser));
//         navigate('/');
//       } else {
//         setLoginError('Invalid email or password. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//           {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email._errors[0]}</p>}
//         </div>
//         {/* Password */}
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//           {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password._errors[0]}</p>}
//         </div>

//         {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             Sign In
//           </button>
//         </div>

//         <p className="text-center text-sm mt-3">
//           Don’t have an account?{' '}
//           <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

function SignIn() {
  const { handleSignIn } = useOutletContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setLoginError('');

    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.format());
    } else {
      const storedUser = JSON.parse(localStorage.getItem('blogUser'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        handleSignIn(email);
        navigate('/');
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email._errors[0]}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password._errors[0]}</p>}
        </div>

        {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
