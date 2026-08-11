import styles from './Button.module.scss';

interface ButtonProps {
    children: string;
}

const Button = ({ children }: ButtonProps) => {

    return (
        <button className={styles.button}>{children}</button>
    )

}

export default Button