import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class TopicSelect extends Component {
    state = {
        selectedTopic: 'coding'
    }
    render() {
        return (
            <div>
                <form>
                    <select className="topic_select" defaultValue="coding" onChange={this.setTopic}>
                        <option value="coding">Coding</option>
                        <option value="cooking">Cooking</option>
                        <option value="football">Football</option>
                    </select>
                    <button className="article_add_button"><Link to={`topics/${this.state.selectedTopic}/articles/new`}>Post New Article</Link></button>
                </form>
            </div >
        )
    }

    setTopic = (event) => {
        return this.setState({
            selectedTopic: event.target.value
        })
    }

}




