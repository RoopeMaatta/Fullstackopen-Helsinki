
import Togglable from '../components/Togglable'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'



describe('<Togglable />', () => {
  let container
  let testTitle = 'Test title, togglable and outside'


  beforeEach(() => {
    container = render(
      <div>
        <div> {testTitle} </div>
        <Togglable buttonLabel="TEST-ButtonLabel show content...">
          <div className="testDiv" >
            {testTitle}
          </div>
        </Togglable>
      </div>
    ).container
  })

  test('renders its children', () => {
    const content = screen.getAllByText(/Test title, togglable and outside/i)
    expect(content[0]).toBeVisible()
    expect(content[1]).not.toBeVisible()
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(/TEST-ButtonLabel/i)
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText(/TEST-ButtonLabel/i)
    await user.click(button)

    const closeButton = screen.getByText(/hide/i)
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})