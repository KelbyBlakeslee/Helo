import React from 'react';

export default function nav() {
    return (
        <div>
            <Link to="/dashboard"><button onClick="/dashboard">Home</button></Link>
            <button onClick="/post/:postid">New Post</button>
            <button onClick="/auth">Logout</button>
        </div>
        
    )
}