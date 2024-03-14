export const storeOnLocalStorage = (Data) => {
    localStorage.setItem('token', Data.token);
    localStorage.setItem('user', JSON.stringify( Data.user))
}