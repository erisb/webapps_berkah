export const setLoggedIn = (loginData) => {
    let payload = loginData;
    return {
        type : 'LOGIN',
        payload : payload,
    }
}
export const Logout = () => {
    return {
        type : 'LOGOUT',
    }
}