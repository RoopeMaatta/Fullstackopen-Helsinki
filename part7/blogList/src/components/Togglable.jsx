import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.displayName = 'Togglable'

  return (
    <>
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        {props.buttonLabel}
      </button>
      <button onClick={toggleVisibility} style={showWhenVisible}>
        Hide
      </button>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
