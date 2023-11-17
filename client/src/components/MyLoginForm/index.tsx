// css
import classes from './index.module.css';
// paths
import { PATHS } from '../../paths';
// components
import { Link } from 'react-router-dom';

export const MyLoginForm = () => {
    return (
        <form action="" className={classes.form}>
            <h4 className={classes.title}>Авторизация</h4>
            <input type="email" className={classes.email} placeholder='Введите Email' />
            <input type="password" className={classes.password} placeholder='Введите Password' />
            <button className={classes.button} type='submit'>Войти</button>
            <span className={classes.note}>Не зарегестрированы? <Link to={PATHS.register} className={classes.link}>Зарегестрироваться</Link></span>
        </form>
    )
}
