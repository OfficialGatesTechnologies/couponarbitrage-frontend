// const ID_TOKEN = 'jwtToken';

export function getIdToken() {   
    return localStorage.getItem(ID_TOKEN);
}
  
export function isLoggedIn(idToken) {    
    return idToken === null ? false : true;
}
  
 