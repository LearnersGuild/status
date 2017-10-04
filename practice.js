const request =  require('request-promise')

const getURL = (url) => {
  console.log(`GET: ${url}`);
  return request({ method: 'GET', url })
    .then(json => JSON.parse(json));
};

const getURLS = (urls) => {
  return Promise.all(urls.map(getURL))
}

const getPosts = (url) => {
  return getURL('https://jsonplaceholder.typicode.com/posts')
};

const getPost = (postId) => {
  return getURL(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

const getAllPostsWithDetails = () => {
  return getPosts().then(posts => {
    return Promise.all(
      posts.map((post) => getPost(post.id))
    ).then((postDetails) => {
      posts.forEach((post, index) => {
        post.details = postDetails[index]
      });
      return posts;
    });
  });
};

getAllPostsWithDetails().then(posts => {
  console.log(JSON.stringify(posts, null, 2))
});

const URLS = [
  'https://www.google.com',
  'https://www.yahoo.com',
  'https://www.bing.com',
  'https://www.cyberduck.com',
];

getURLS(URLS).then((info) => {
  console.log('---===info===---', info);
});
