import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const About = () => {

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { user, userData, refetch } = useContext(AuthContext);
    const [modal, setModal] = useState(false);


    const handleUserUpdate = e => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const email = user?.email;
        const postedImage = form.photo.files[0];
        const image = postedImage;


        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        const university = form.university.value;
        const address = form.address.value;




        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())

            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    fetch(`https://din-social-media-server.vercel.app/user?email=${user?.email}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            university: university,
                            address: address,
                            image: imgData?.data.url

                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                refetch()
                                toast.success('user updated successfully')
                                setModal(false)
                            }

                        })
                }
            });

    }


    return (
        <div className="m-auto 
        mb-20 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">User Information</h1>
            </div>
            {
                userData.map(userInfo => <form
                    key={userInfo?._id}
                    className="space-y-12 ng-untouched ng-pristine ng-valid">


                    <div className="space-y-4">
                        <div>
                            <label readOnly className="block mb-2 text-center text-sm">Profile Picture</label>
                            <img style={{
                                margin: 'auto',
                                height: '180px',
                                width: '180px'
                            }} alt={userInfo?.name} src={userInfo?.image} />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                            <input readOnly defaultValue={userInfo?.name} type="text" name="name" id="name" placeholder="Enter your name here" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Email address</label>
                            <input type="email" defaultValue={userInfo?.email} readOnly placeholder="Enter your email here" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                        </div>
                        <div>
                            <label readOnly htmlFor="university" className="block mb-2 text-sm">University</label>
                            <input defaultValue={userInfo?.university} type="text" name="university" id="university" placeholder="Enter your university name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                        </div>
                        <div>
                            <label readOnly htmlFor="address" className="block mb-2 text-sm">Address</label>
                            <input defaultValue={userInfo?.address} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-black">Update user information</p>
                        <div>
                            <button onClick={() => setModal(true)} type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-sky-600 text-gray-50">update</button>
                        </div>
                    </div>
                </form>
                )}
            {modal ? (

                <>
                    <form onSubmit={handleUserUpdate} className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mx-auto my-auto flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-slate-800">
                        <button onClick={() => setModal(false)} className="btn btn-sm btn-circle absolute right-6 top-4">✕</button>
                        <h3 className="text-sm text-white font-bold">Your Name</h3>
                        <input defaultValue={user?.displayName} name="name" type="text" className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Your Email</h3>
                        <input readOnly defaultValue={user?.email} name="email" type="email" className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Profile photo</h3>
                        <input name="photo" type="file" className="input w-full input-bordered font-semibold" />
                        <h3 className="text-sm text-white font-bold">Your University</h3>
                        <input name="university" type="text" placeholder='Your University Name' className="input w-full input-bordered text-white font-bold" required />
                        <h3 className="text-sm text-white font-semibold">Your Address</h3>
                        <input name="address" type="text" placeholder='Your Address' className="input w-full input-bordered text-white font-semibold" required />
                        <input className='btn btn-primary w-full font-bold ' type="submit" value="Update Information" />
                    </form>
                </>
            ) : null}
        </div>
    );
};

export default About;