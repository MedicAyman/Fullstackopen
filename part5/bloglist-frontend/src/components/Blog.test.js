/*
TODO:
    - 5.15: Blog list tests, step3
    - 5.16: Blog list tests, step4
*/

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import axiosMock from 'axios'



const b = {
  title: 'LUNA chain is effed',
  author: 'Do Kwon',
  url: 'www.terra.usd',
  likes: 2040,
  user: {
    username: 'stablekwon',
    name: 'dokwon',
    id: 'b3215efc47bc828ea9085d05'
  },
  id: 'd0fc45eac585b3e7bc829521'
}

describe('<Blog />', () => {
  test('at start the only author and title are displayed', () => {
    let container = render(
      <Blog blog={b} />
    ).container
    const div = container.querySelector('.minimalBlog')
    expect(div).not.toHaveStyle('display: none')
  })
  test('blogs url and number of likes are shown when the show button is clicked', async () => {

    let container = render(
      <Blog blog={b} />
    ).container
    const user = userEvent.setup()
    const button  = screen.getByText('View Blog')
    await user.click(button)
    let div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('ensures that if the like button works', async () => {
    let container = render(
      <Blog blog={b} />
    ).container

    const mockHandler = jest.fn()
    const user = userEvent.setup()
    const button = container.querySelector('.likeButton')
    await user.click(button)
    expect(mockHandler.mock.calls.length).toHaveLength(2)
  })

})