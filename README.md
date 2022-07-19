# Mesto Russia React с авторизацией и регистрацией

## Описание

Продолжение проекта [mesto-react](https://github.com/andreibelyun/mesto-react).

В проект добавлена возможность регистрации и авторизации пользователей:
- доступны формы для регистрации и входа
- вся функциональность приложения доступна только авторизованным пользователям по роуту `/`.
- если неавторизованный пользователь приходит на сайт, он попадает на страницу входа, на какой бы роут он ни пришёл.
- при повторном визите пользователи не должны вновь авторизовываться
- предусмотрено модальное окно, которое информирует пользователя об успешной (или неудачной) регистрации.

Все запросы на авторизацию, регистрацию и проверку токена по заданию работают через сервис https://auth.nomoreparties.co.
Остальные запросы работают с бэкендом из предыдущих работ.

## Запуск проекта

Чтобы протестировать проект склонируйте его и выполните следующие команды:

1. `npm i` - установить зависимости проекта
2. `npm run start` - запустить проект

Проект станет доступен в браузере по адресу http://localhost:3000/.
