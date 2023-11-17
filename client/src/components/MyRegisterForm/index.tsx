// css
import classes from './index.module.css';
// paths
import { PATHS } from '../../paths';
// components
import { Link } from 'react-router-dom';

export const MyRegisterForm = () => {
    return (
        <form action="" className={classes.form}>
            <h4 className={classes.title}>Регистрация</h4>
            <input type="text" className={classes.email} placeholder='Введите Имя' />
            <input type="email" className={classes.email} placeholder='Введите Email' />
            <input type="password" className={classes.password} placeholder='Пароль' />
            <input type="password" className={classes.password} placeholder='Пароль еще раз' />
            <button className={classes.button} type='submit'>Войти</button>
            <span className={classes.note}>Уже зарегестрированы? <Link to={PATHS.login} className={classes.link}>Войти</Link></span>
        </form>
    )
}
