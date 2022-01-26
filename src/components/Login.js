import './styles/Login.css';

export default function Login() {

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form">
                <input className="login__input" type="email" placeholder="Email"/>
                <input className="login__input" type="password" placeholder="Пароль"/>
                <button 
                    className="login__sign-in"
                    type="button"
                    aria-label="Зарегистрироваться"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}