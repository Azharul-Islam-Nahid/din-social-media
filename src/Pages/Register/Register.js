import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Register = () => {

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSignup = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;
        const password = form.password.value;
        const postedImage = form.image.files[0];
        const image = postedImage;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User registered Successfully');
                const userInfo = {
                    displayName: name
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(name, email, university, address);
                    })

                navigate('/')

            })
            .catch(err => {
                console.error(err.message)
            })
            .catch(error => {
                console.log(error)
            });


        const saveUser = (name, email, university, address) => {

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())

                .then(imgData => {
                    console.log(imgData);
                    if (imgData.success) {
                        axios.post(`https://din-social-media-server.vercel.app/users`, {
                            name: name,
                            email: email,
                            profileImage: imgData?.data.url,
                            university: university,
                            address: address
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

                });


        }

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
                        <label htmlFor="image" className="block mb-2 text-sm">Profile Picture</label>
                        <input type="file" name="image" id="image" placeholder="Upload your profile image" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
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