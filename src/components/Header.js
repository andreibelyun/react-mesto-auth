import { Route, Switch } from 'react-router-dom';
import './styles/Header.css';

function Header() {
    return (
        <header className="header">
            <a className="header__logo" href="#" target="_blank"></a>
            <Switch>
                <Route path="/sign-in">
                    <a className="header__link" href="#" target="_blank">Регистрация</a>
                </Route>
                <Route path="/sign-up">
                    <a className="header__link" href="#" target="_blank">Войти</a>
                </Route>
                <Route path="/">
                    <div className='header__right-group'>
                        <p className='header__email'>abc@mail.ru</p>
                        <a className="header__link header__link_type_sign-out" href="#" target="_blank">Выйти</a>
                    </div>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;