// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeBlogPosts();
});

function initializeTheme() {
    const themeToggleButton = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
    });
}

function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.getElementById('theme-toggle').textContent = theme === 'light' ? 'Dark Theme' : 'Light Theme';
    localStorage.setItem('theme', theme);
}

function initializeBlogPosts() {
    document.querySelectorAll('.blog-post').forEach(post => {
        const blogId = post.getAttribute('data-blog-id');
        setLikeAndCommentListeners(post, blogId);
        loadLikes(blogId);
        loadComments(blogId);
    });
}

function setLikeAndCommentListeners(post, blogId) {
    post.querySelector('.like-button').addEventListener('click', () => incrementLike(blogId));
    post.querySelector('.comment-button').addEventListener('click', () => addComment(blogId));
}

function incrementLike(blogId) {
    const key = `likes-${blogId}`;
    const likesCount = parseInt(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, likesCount);
    updateLikesDisplay(blogId, likesCount);
}

function addComment(blogId) {
    const commentInput = document.querySelector(`.comment-input[data-blog-id="${blogId}"]`);
    const commentText = commentInput.value.trim();
    if (commentText) {
        const key = `comments-${blogId}`;
        const comments = JSON.parse(localStorage.getItem(key) || '[]');
        comments.push(commentText);
        localStorage.setItem(key, JSON.stringify(comments));
        commentInput.value = '';
        updateCommentsDisplay(blogId, comments);
    }
}

function loadLikes(blogId) {
    const likesCount = localStorage.getItem(`likes-${blogId}`) || 0;
    updateLikesDisplay(blogId, likesCount);
}

function loadComments(blogId) {
    const comments = JSON.parse(localStorage.getItem(`comments-${blogId}`) || '[]');
    updateCommentsDisplay(blogId, comments);
}

function updateLikesDisplay(blogId, likesCount) {
    const likeCountElement = document.querySelector(`.blog-post[data-blog-id="${blogId}"] .like-count`);
    likeCountElement.textContent = likesCount;
}

function updateCommentsDisplay(blogId, comments) {
    const commentsList = document.querySelector(`.blog-post[data-blog-id="${blogId}"] .comment-list`);
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
    });
}
