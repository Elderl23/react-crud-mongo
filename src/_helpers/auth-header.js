export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(sessionStorage.getItem('token'));

    if (token) {
        return {
            'Authorization': 'Token ' + token
        };
    } else {
        return {};
    }
}