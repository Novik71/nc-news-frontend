const axios = require('axios');
const API_URL = 'https://northcoders-news-71.herokuapp.com/api'

const fetchArticles = (topic) => {
    if (topic === undefined) {
        return axios.get(`${API_URL}/articles`)
            .then(({ data }) => {
                return data.articles;
            })
            .catch(console.log)
    } else {
        return axios.get(`${API_URL}/topics/${topic}/articles`)
            .then(({ data }) => {
                return data.articles.sort((a, b) => { return a.votes - b.votes })
            })
            .catch(console.log)
    }
}

const fetchSingleArticleAndComments = (article_id) => {
    return Promise.all([fetchArticle(article_id), fetchComments(article_id)])
        .then(([article, comments]) => {
            comments.sort((a, b) => { return a.created_at - b.created_at })
            return [article, comments];
        })
        .catch(console.log)
}

const voteArticle = (vote, article_id) => {
    return axios.patch(`${API_URL}/articles/${article_id}?vote=${vote}`)
        .then(({ data }) => {
            return data.article.votes;
        })
        .catch(console.log)
}

const voteComment = (vote, comment_id) => {
    return axios.patch(`${API_URL}/comments/${comment_id}?vote=${vote}`)
        .then(({ data }) => {
            return data.comment.votes;
        })
        .catch(console.log)
}

const fetchArticle = (article_id) => {
    return axios.get(`${API_URL}/articles/${article_id}`)
        .then(({ data }) => {
            return data.article;
        })
}

const fetchComments = (article_id) => {
    return axios.get(`${API_URL}/articles/${article_id}/comments`)
        .then(({ data }) => {
            return data.comments;
        })
}

export {
    fetchSingleArticleAndComments, fetchArticles, voteArticle, voteComment
}