import PropTypes from 'prop-types'

const InputField = ({ label, type, value, name, onChange, placeholder }) => {
  return (
    <div>
      {label}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}


export default InputField