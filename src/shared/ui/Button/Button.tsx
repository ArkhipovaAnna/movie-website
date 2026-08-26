import styles from './Button.module.scss';

interface ButtonProps {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {

    return (
        <button
            className={`${styles.button} ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )

}

export default Button