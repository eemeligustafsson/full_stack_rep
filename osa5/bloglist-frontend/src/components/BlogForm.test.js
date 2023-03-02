import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('<BlogForm />', ()=> {

    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
        const createBlog = jest.fn();
        const user = userEvent.setup();

        const { container } = render(<BlogForm createBlog={createBlog} />);

        const titleInput = container.querySelector("input[name='title']");
        const authorInput = container.querySelector("input[name='author']");
        const urlInput = container.querySelector("input[name='url']");
        const sendButton = screen.getByText("create");

        await user.type(titleInput, "title");
        await user.type(authorInput, "author");
        await user.type(urlInput, "url");
        await user.click(sendButton);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0]).toStrictEqual({"author": "author", "title": "title", "url": "url"});
      })

})