import classes from './index.module.css';

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
}

export const MyButton = ({ children, onClick }: Props) => {
    return (
        <button className={classes.button}>{children}</button>
    )
}
