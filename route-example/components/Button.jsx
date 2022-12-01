const Button = ({content = 'sample', onClick=null}) => {
    return (
        <button onClick={onClick && onClick}>{content}</button>
    )
}

export default Button;