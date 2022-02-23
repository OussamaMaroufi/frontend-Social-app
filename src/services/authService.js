import { post, getApiUrl } from './config';

const login = (credentials) =>{
    post({
        // url: getApiUrl(`api/users/login/`),
        url: "http://127.0.0.1:8000/api/users/login/",
        payload: credentials,
    });
}
    

const register = (inputs) => {

    // console.log(getApiUrl(`api/users/register/`));
   post({
        // url: getApiUrl(`api/users/register/`),
        url: "http://127.0.0.1:8000/api/users/register/",
        payload: inputs,
    });

}

const refreshToken = (refresh) =>
    post({
        url: getApiUrl('api/users/refresh_token/'),
        payload: {
            refresh,
        },
    });

const deleteAccount = () =>
    post({
        url: getApiUrl('api/users/delete-profile/'),
    });

const AuthService = {
    login,
    register,
    refreshToken,
    deleteAccount,
};

export default AuthService;