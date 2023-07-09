const { iteratee } = require("lodash");
const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumlator, current_value) =>
    accumlator + current_value.likes;
  if (blogs.length === 0) return 0;
  //reduce requires more than one ele to invoke callback(reducer)
  if (blogs.length === 1) return blogs[0].likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const reducer = (blog_most_likes, current_blog) =>
    current_blog.likes > blog_most_likes.likes ? current_blog : blog_most_likes;
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const giteratee = (blog) => blog.author;
  const mapper = (value, key) => {
    return { author: key, blogs: value };
  };
  const reducer = (m, c) => (c.blogs > m.blogs ? c : m);

  const countedBlogs = _.countBy(blogs, giteratee);
  const mblog = _.map(countedBlogs, mapper);
  const blog_most = mblog.reduce(reducer);

  return blog_most;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  if (blogs.length === 1)
    return { author: blogs[0].author, likes: blogs[0].likes };

  const vred = (a, c) => a + c.likes;
  const reducer = (a, c) => (c.likes > a.likes ? c : a);
  const mapper = (value, key) => {
    return { author: key, likes: value.reduce(vred, 0) };
  };
  const grouped = _.groupBy(blogs, (blog) => blog.author);

  const mapped = _.map(grouped, mapper);

  return mapped.reduce(reducer);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
