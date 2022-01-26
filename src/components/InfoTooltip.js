import './styles/InfoTooltip.css';
import successImage from '../images/tooltip-success.jpg';
import failImage from '../images/tooltip-fail.jpg';

export default function InfoTooltip({success}) {

    //const success = true;

    const successMessage = 'Вы успешно зарегистрировались!';
    const failMessage = 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className="tooltip tooltip_opened">
            <div className="tooltip__container">
                <button 
                    className="tooltip__close"
                    type="button"
                />
                <img className="tooltip__image" src={success ? successImage : failImage} />
                <p className="tooltip__message">{success ? successMessage : failMessage}</p>
            </div>
        </div>
    );
}