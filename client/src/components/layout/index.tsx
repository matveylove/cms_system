// css
import classes from './index.module.css';
// components
import { MyHeader } from '../MyHeader';

type Props = {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    return (
        <>
            <MyHeader />
            <div className={classes.main}>
                {children}
            </div>
        </>

    )
}
