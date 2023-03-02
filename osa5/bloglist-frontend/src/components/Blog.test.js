import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => { 
    let container
    const likesMockHandler = jest.fn()

    const blog = {
        title: 'blog_title',
        author: 'blog_author',
        url: 'www.blog',
        likes: 3,
        user: {
            username: 'test',
            name: 'test'
        }
    }

    beforeEach(()=> {
        container = render(
            <Blog blog={blog} updateLikes={likesMockHandler}/>
        ).container           
    })

    test('blog title and author is rendered but not url', () => {
        const testblog = container.querySelector('.blog')
        expect(testblog).toHaveTextContent(blog.title)

        expect(testblog).toHaveTextContent(blog.author)

        expect(testblog).not.toHaveTextContent(blog.url)

        expect(testblog).not.toHaveTextContent('likes:')
    })
    test('view all details by pressing view button', ()=> {
        const viewButton = screen.getByText('view')
        fireEvent.click(viewButton)

        const blogDetails = container.querySelector('.all-details')
        expect(blogDetails).toBeInTheDocument()
    })
    test('likebutton event handler is called twice when button clicked twice', ()=> {
        const viewButton = screen.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = screen.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likesMockHandler.mock.calls).toHaveLength(2)
    })

    


 })