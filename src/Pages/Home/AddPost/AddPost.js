import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AddPost = () => {


    const { userData } = useContext(AuthContext);
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const postedTime = new Date().toLocaleTimeString();

    const handlePostSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const userName = form.name.value;
        const address = form.address.value;
        const userImage = form.image.value;
        const post = form.post.value;
        const postedImage = form.posted_img.files[0];
        const image = postedImage;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())

            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {


                    axios.post(`http://localhost:5000/userpost`, {
                        userName: userName,
                        address: address,
                        userImage: userImage,
                        image: imgData?.data.url,
                        post: post,
                        posted: postedTime
                    })
                        .then(function (response) {
                            console.log(response);
                            toast.success(`posted successfully`);
                            form.reset();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                }
            })

    }

    return (
        <div className='mb-16'>

            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Add new Post</div>

            {
                userData.map(user => <form
                    key={user?._id}
                    onSubmit={handlePostSubmit}>
                    <div className='hidden lg:hidden md:hidden'>
                        <input defaultValue={user?.name} id="name" name='name' type='text'></input>
                        <input defaultValue={user?.address} id="address" name='address' type='text'></input>
                        <input defaultValue={user?.profileImage} id="image" name='image' type='text'></input>
                    </div>
                    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                        <textarea type="text" name="post" id="post" className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Whats on your mind?" required></textarea>
                        <div className="icons flex text-gray-500 m-2">
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <input id="posted_img" name='posted_img' type='file' />
                            <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                        </div>

                        <div className="buttons flex justify-end">
                            <button type='submit' className="btn border border-emerald-800 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-emerald-500">Post</button>
                        </div>
                    </div>
                </form>)
            }
        </div>

    );
};

export default AddPost;