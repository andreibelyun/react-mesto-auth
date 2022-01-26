import './styles/Register.css';

export default function Register() {


    return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form">
                <input className="register__input" type="email" placeholder="Email"/>
                <input className="register__input" type="password" placeholder="Пароль"/>
                <button 
                    className="register__sign-up"
                    type="button"
                    aria-label="Зарегистрироваться"
                >
                    Зарегистрироваться
                </button>
            </form>
            <div className="register__sign-in">
                <p className="register__sign-in_text">Уже зарегистрированы? 
                <a className="register__sign-in_link">Войти</a>
                </p>
            </div>
        </div>
    );
}