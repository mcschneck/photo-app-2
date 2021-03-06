const story2Html = story => {
    return `
        <div>
            <img src="${ story.user.thumb_url }" class="pic" alt="profile pic for ${ story.user.username }" />
            <p>${ story.user.username }</p>
        </div>
    `;
};

// fetch data from your API endpoint:
const displayStories = () => {
    fetch('/api/stories')
        .then(response => response.json())
        .then(stories => {
            const html = stories.map(story2Html).join('\n');
            document.querySelector('.stories').innerHTML = html;
        })
};


/*
<section class="card">
        Already done
       
        <div class="caption">
            <p>
                <strong>{{ post.get('user').get('username') }}</strong> 
                {{ post.title }}.. <button class="link">more</button>
            </p>
        </div>
        <div class="comments">
            {% if post.get('comments')|length > 1 %}
                <p><button class="link">View all {{ post.get('comments')|length }} comments</button></p>
            {% endif %}
            {% for comment in post.get('comments')[:1] %}
                <p>
                    <strong>{{ comment.get('user').get('username') }}</strong> 
                    {{ comment.get('text') }}
                </p>
            {% endfor %}
            <p class="timestamp">{{ post.get('display_time') }}</p>
        </div>
    </div>
    <div class="add-comment">
        <div class="input-holder">
            <input type="text" aria-label="Add a comment" placeholder="Add a comment...">
        </div>
        <button class="link">Post</button>
    </div>
</section>

*/

const likeUnlike = ev => {
    console.log('like / unlike button clicked');
};

const post2Html = post => {
    return `
        <section class="card">
            <div class="header">
                <h3>${ post.user.username }</h3>
                <i class="fa fa-dots"></i>
            </div>
            <img src="${ post.image_url }" alt="Image posted by ${ post.user.username }" width="300" height="300">
            <div class="info">
                <div class="buttons">
                    <div>
                        <button onclick="likeUnlike(event)">
                            <i class="fa${ post.current_user_like_id ? 's' : 'r' } fa-heart"></i>
                        </button>
                        <i class="far fa-comment"></i>
                        <i class="far fa-paper-plane"></i>
                    </div>
                    <div>
                        <i class="fa${ post.current_user_bookmark_id ? 's' : 'r' } fa-bookmark"></i>
                    </div>
                </div>
                <p class="likes"><strong>${ post.likes.length } like${post.likes.length != 1 ? 's' : ''}</strong></p>

                <div class="caption">
                <p>
                    <strong>${ post.user.username }</strong> 
                    ${ post.caption }
                </p>
            </div>
            </div>
            TODO: comments, add a comment
        </section>
    `;
};

// fetch data from your API endpoint:
const displayPosts = () => {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            const html = posts.map(post2Html).join('\n');
            document.querySelector('#posts').innerHTML = html;
        })
};


// 1. Get the post data from the API endpoint (/api/posts?limit=10)
// 2. When that data arrives, we're going to build a bunch of HTML cards (i.e. a big string).
// 3. Update the container and put the html on the inside of it.

const initPage = () => {
    displayStories();
    displayPosts();
};

// invoke init page to display stories:
initPage();