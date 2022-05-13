import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

})