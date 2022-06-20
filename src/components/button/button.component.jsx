import './button.styles.scss'

const BUTTON_TYPES_CLASSES = {
  google: 'google-sign-in', 
  interted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <div className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </div>
  )
}

export default Button;