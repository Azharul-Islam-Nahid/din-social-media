import React from 'react';
import AddPost from './AddPost/AddPost';
import SortedPosts from './SortedPosts/SortedPosts';

const Home = () => {
    return (
        <div>
            <AddPost />
            <SortedPosts />
        </div>
    );
};

export default Home;