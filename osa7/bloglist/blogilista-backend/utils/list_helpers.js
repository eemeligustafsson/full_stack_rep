const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
    return blogs.reduce(
      (mostLikes, blog) => (blog.likes > mostLikes ? blog.likes : mostLikes),
      blogs[0].likes
    );
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    const authorCount = lodash.countBy(blogs, "author");
    const mostBlogs = Object.keys(authorCount).reduce((a, b) => {
      return authorCount[a] > authorCount[b] ? a : b;
    });
    return {
      author: mostBlogs,
      blogs: authorCount[mostBlogs],
    };
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const likesCount = lodash(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: lodash.sumBy(objs, "likes"),
    }))
    .value();

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
 
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
