var md5 = require('md5');
export const site_name = 'Couponarbitrage.com';
export const apiUrl = 'http://localhost:3001/';
export const siteUrl = 'http://localhost:3002/';
export const genRandomPassword = (length) => {
    var makepass = "";
    var salt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length; i++)
        makepass += salt.charAt(Math.floor(Math.random() * salt.length));
    return makepass;
}

export const getCryptedPassword = (password, salt) => {
    return (salt) ? md5(password + salt) : md5(password);
}

export const checkDate = (toDate) => {
    var date = new Date();
    var mydate = new Date(toDate);
    return date < mydate ? true : false;
}

export const paymentMethod = { '1': 'PayPal', '2': 'Skrill', '3': 'Bank Transfer', '4': 'Neteller' };
export const ARR_CASHBACK_CLAIMS_STATUS = {
    'N': '<span class="tag is-warning">Not tracked</span>',
    'P': '<span class="tag is-danger">Pending</span>',
    'C': '<span class="tag is-success">Confirmed</span>',
    'X': '<span class="tag is-danger">Cancelled</span>'
}

