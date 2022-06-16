import './button.styles.scss'

const BUTTON_TYOES_CLASSES = {
  giigke: 'google-sign-in', 
  interted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <div className={`button-container ${BUTTON_TYOES_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </div>
  )
}

export default Button;