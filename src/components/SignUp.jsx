import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setSuccess('');

    const result = signUpSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.format());
    } else {
      const userData = { email, password };
      localStorage.setItem('blogUser', JSON.stringify(userData));

      setSuccess('Account created successfully! Redirecting to Sign In...');
      setTimeout(() => navigate('/signin'), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center text-sm mt-3">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
