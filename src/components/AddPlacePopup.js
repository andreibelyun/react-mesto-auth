import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

    const nameInput = useRef();
    const linkInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onAddPlace({
            name : nameInput.current.value,
            link: linkInput.current.value
        });

        nameInput.current.value = "";
        linkInput.current.value = "";
    };

    return (
        <PopupWithForm 
            title="Новое место" 
            name="create-place" 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Создать"
        >
            <div className="popup__section">
                <input 
                    ref={nameInput} 
                    id="place-name-input" 
                    name="name" 
                    className="popup__input popup__input_type_name" 
                    type="text" 
                    placeholder="Название" 
                    required minLength="2" 
                    maxLength="30" 
                />
                <span className="popup__input-error place-name-input-error" />
            </div>

            <div className="popup__section">
                <input 
                    ref={linkInput} 
                    id="link-input" 
                    name="link" 
                    className="popup__input popup__input_type_description" 
                    type="url" 
                    placeholder="Ссылка на картинку" 
                    required 
                />
                <span className="popup__input-error link-input-error" />
            </div>
        </PopupWithForm>
    );
}