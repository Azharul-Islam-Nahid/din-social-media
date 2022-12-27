import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const handleSignup = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        console.log("🚀 ~ file: Register.js:11 ~ handleSignup ~ name", name)
        const email = form.email.value;
        console.log("🚀 ~ file: Register.js:13 ~ handleSignup ~ email", email)
        const university = form.university.value;
        console.log("🚀 ~ file: Register.js:15 ~ handleSignup ~ university", university)
        const address = form.address.value;
        console.log("🚀 ~ file: Register.js:17 ~ handleSignup ~ address", address)
        const password = form.password.value;
        console.log("🚀 ~ file: Register.js:19 ~ handleSignup ~ password", password)


    }

    return (
        <div className="m-auto 
        mb-20 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                <p className="text-sm text-gray-600">Sign up to create an account</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name here" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email here" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="university" className="block mb-2 text-sm">University</label>
                        <input type="text" name="university" id="university" placeholder="Enter your university name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm">Address</label>
                        <input type="text" name="address" id="address" placeholder="Enter your address" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <Link rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</Link>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-sky-600 text-gray-50">Sign in</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Already have an account?
                        <Link to='/login' className="hover:underline text-sky-600">Sign in</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;