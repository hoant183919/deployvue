const API_BASE_URL = 'http://localhost:8080';

class Constant{
    static get apiBaseUrl(){
        return API_BASE_URL;
    };
    static get authHeader() {
        let user = JSON.parse(localStorage.getItem('authenticated'));
        if (user && user.accessToken) {
            return {
                Authorization: 'Bearer ' + user.accessToken
            }
        } else {
            return {}
        }
    }
};