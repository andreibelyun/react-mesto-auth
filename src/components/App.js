import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
function App() {

    const [currentUser, setCurrentUser] = useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    const [cards, setCards] = useState([]);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleUpdateUser = ({name, about}) => {
        api.setUserInformation(name, about)
        .then(newUser => {
            setCurrentUser(newUser);
            closeAllPopups();
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleUpdateAvatar = (data) => {
        api.changeAvatar(data)
        .then(newUser => {
            setCurrentUser(newUser);
            closeAllPopups();
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleAddPlaceSubmit = ({name, link}) => {
        api.addNewCard(name, link)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => {
            console.error(err);
        });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleDeleteClick(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards(cards.filter(i => i._id !== card._id));
        })
        .catch(err => {
            console.error(err);
        });
    }

    React.useEffect(() => {
        api.getUserInformation()
        .then(data => {
            setCurrentUser(data);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
        .then(cardsList => {
            setCards(cardsList);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);
    
    return (
        <div className="page__container">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <InfoTooltip success={true}/>
                        
                    </Route>
                    <Route path="/sign-up">
                        <Register />
                    </Route>
                    <Route path="/sign-in">
                        <Login />
                    </Route>
                    <Route path="*">
                        <InfoTooltip success={false}/>
                    </Route>
                </Switch>
                {/* <Register /> */}
                {/* <InfoTooltip /> */}
                {/* <Login /> */}
                {/* <Main
                    onEditAvatar = {handleEditAvatarClick}
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onCardClick = {handleCardClick}
                    cards = {cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                />
                <Footer />

                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup 
                    card={selectedCard} 
                    onClose={closeAllPopups}
                />

                <ConfirmDeletePopup /> */}

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;