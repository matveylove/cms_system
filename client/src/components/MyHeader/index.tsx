// css
import classes from './index.module.css';
// components
import { Link } from 'react-router-dom';
import { PATHS } from '../../paths';
// function


export const MyHeader = () => {
    return (
        <header className={classes.header}>
            <Link to={PATHS.home}>CRMSystem</Link>
            <div className={classes.right}>
                <Link to={PATHS.register}>Зарегистрироваться</Link>
                <Link to={PATHS.login}>Войти</Link>
            </div>
        </header>
    )
}
