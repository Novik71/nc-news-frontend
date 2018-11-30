import React from 'react'
import { Link } from 'react-router-dom'

const TopicNav = () => {
    return (
        <div>
            <nav>
                <Link className="nav_link" to='/topics/technology'>Technology</Link>
                {"  |   "}
                <Link className="nav_link" to='/topics/football'>Football</Link>
                {"  |  "}
                <Link className="nav_link" to='/topics/music'>Music</Link>
            </nav>
        </div>
    )
}


export default TopicNav


