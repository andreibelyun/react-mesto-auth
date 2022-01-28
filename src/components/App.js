import React, { useEffect, useState } from 'react';
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
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { register, login, checkToken } from '../utils/auth';

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

    const handleUpdateUser = ({ name, about }) => {
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

    const handleAddPlaceSubmit = ({ name, link }) => {
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

    //Регистрация, вход, проверка токена, выход
    const [tooltip, setTooltip] = useState({
        status: "",
        isOpen: false
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();

    const [email, setEmail] = useState("");

    const onRegister = (username, password) => {
        register(username, password)
            .then(() => {
                history.push("/sign-in")
                setTooltip({
                    status: "success",
                    isOpen: true
                })
            })
            .catch(() => {
                setTooltip({
                    status: "fail",
                    isOpen: true
                })
            });
    };

    const onLogin = (username, password) => {
        login(username, password)
            .then((res) => {
                setEmail(username);
                localStorage.setItem("jwt", res.token);
                setLoggedIn(true);
                history.push("/");
            })
            .catch(() => {
                setTooltip({
                    status: "fail",
                    isOpen: true
                })
            });
    };

    const onTooltipClose = () => {
        setTooltip({
            status: "",
            isOpen: "false"
        });
    };

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push("/sign-in");
    };

    const handleTokenCheck = () => {
        if (localStorage.getItem("jwt")) {
            const jwt = localStorage.getItem("jwt");

            checkToken(jwt)
                .then(() => {
                    setLoggedIn(true);
                    history.push("/");
                });
        }
    };

    useEffect(() => {
        handleTokenCheck();
    }, []);


    return (
        <div className="page__container">
            <CurrentUserContext.Provider value={currentUser}>
                <Header onSignOut={handleSignOut} email={email} />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={onRegister} />
                        <InfoTooltip status={tooltip.status} isOpen={tooltip.isOpen} onClose={onTooltipClose} />
                    </Route>

                    <Route path="/sign-in">
                        <Login onLogin={onLogin} />
                        <InfoTooltip status={tooltip.status} isOpen={tooltip.isOpen} onClose={onTooltipClose} />
                    </Route>

                    <Route exact path="/">
                        <ProtectedRoute
                            exact path="/"
                            loggedIn={loggedIn}
                        >
                            <Main
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                cards={cards}
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
                            <ConfirmDeletePopup />
                        </ProtectedRoute>

                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;