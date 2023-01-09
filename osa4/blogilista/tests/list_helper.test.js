const listHelper = require("../utils/list_helpers");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("Total likes", () => {
  test("of empty list is 0", () => {
    const resultOfEmptyList = listHelper.totalLikes([]);
    expect(resultOfEmptyList).toBe(0);
  });
  test("when list has only one blog equals the likes of that blog", () => {
    const blog = blogs[0];
    const resultOfOneBlog = listHelper.totalLikes([blog]);
    expect(resultOfOneBlog).toBe(blog.likes);
  });
  test("of a bigger list is calculated right", () => {
    const resultOfBigList = listHelper.totalLikes(blogs);
    expect(resultOfBigList).toBe(36);
  });
});
describe("Favorite blog", () => {
  test("of empty list is", () => {
    const resultOfEmptyBlogList = listHelper.favoriteBlog([]);
    expect(resultOfEmptyBlogList).toEqual({});
  });
  test("when list has only one blog equals that blog ", () => {
    const blog = blogs[0];
    const mostLikes = listHelper.favoriteBlog([blog]);
    const favoriteBlog = blogs.find((blog) => blog.likes === mostLikes);
    expect(favoriteBlog).toEqual(blog);
  });
  test("of a bigger list is calculated right", () => {
    const mostLikes = listHelper.favoriteBlog(blogs);
    const favoriteBlog = blogs.find((blog) => blog.likes === mostLikes);
    expect(favoriteBlog).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});
describe("most blogs", () => {
    test("when list has no blogs equals 0", ()=> {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(0)
    })
    test('when list has one blog equals that blog', ()=> {
        const blog = blogs[0]
        const mostBlogs = listHelper.mostBlogs([blog])
        expect(mostBlogs).toEqual({
            author: blog.author,
            blogs: 1
        })
    })
    test('of a bigger list is calculated right', ()=> {
        const mostBlogs = listHelper.mostBlogs(blogs)
        expect(mostBlogs).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})
describe("most likes", () => {
    test("empty list equals 0", () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(0)
    })
    test("list with one blogs equals that blog", ()=> {
        const blog = blogs[0]
        const result = listHelper.mostLikes([blog])
        expect(result).toEqual({
            author: blog.author,
            likes: blog.likes
        })
    })
    test("list with many blogs equals Edsger W. Dijkstra", ()=> {
        const result = listHelper.mostLikes(blogs)
        console.log(result)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})
