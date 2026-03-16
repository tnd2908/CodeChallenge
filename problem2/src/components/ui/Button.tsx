interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    const buttonStyles = `
    bg-yellow-500 w-full py-3 rounded-lg cursor-pointer transition-all uppercase font-semibold duration-300 border p-2 border-slate-900 flex items-center justify-center
    ${props.className}
    `;
    return (
        <button 
            type={props.type || 'button'} 
            className={buttonStyles} {...props}
            disabled={isLoading || props.disabled}
        >
            {isLoading ? "Loading..." : children}
        </button>
    )
}

export default Button