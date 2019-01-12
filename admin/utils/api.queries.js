import React from 'react';
import moment from 'moment';
import axios from 'axios';

const callingCountries = require('country-data').callingCountries; 

export const sortCountryCodes = () => {
    return callingCountries.all.map(country => { 

        delete country.alpha3;
        delete country.currencies;
        delete country.ioc;
        delete country.languages;
        delete country.name;
        delete country.status; 
        delete country.emoji; 

        country.code = country.alpha2;  
        country.dial_code = country.countryCallingCodes[0];
       
        return country;
    })
    .concat([{code: 'UK', dial_code: '+44'}])
    .sort((a,b) => (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0))
    .map(country => {       
        return <option key={country.code} value={country.dial_code}>{country.code} {country.dial_code}</option>
    })
}

export const sortPending = (arr) => {
    return arr.reduce((acc, report) => {
        if(report.status === 'Pending') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0) ? arr.reduce((acc, report) => {
        if(report.status === 'Pending') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0).toFixed(2) : 0;
}

export const sortConfirmed = (arr) => {
    return arr.reduce((acc, report) => {
        if(report.status === 'Confirmed') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0) ? arr.reduce((acc, report) => {
        if(report.status === 'Confirmed') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0).toFixed(2) : 0;
}

export const sortRequested = (arr) => {
    return arr.reduce((acc, report) => {
        if(report.status === 'Requested') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0) ? arr.reduce((acc, report) => {
        if(report.status === 'Requested') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0).toFixed(2) : 0;
}


export const sortPaid = (arr) => {
    return arr.reduce((acc, report) => {
        if(report.status === 'Paid') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0) ? arr.reduce((acc, report) => {
        if(report.status === 'Paid') {
            acc += report.account.cashback;
            return acc;
        }
        else return acc;
    }, 0).toFixed(2) : 0;
}

export const filterAccountIds = (arr) => {
    return arr.reduce((acc, item) => {
        acc.push(item.account.accountId)
        return acc;
    },[]);
}

export const formatAccountIdsAsOptions = (arr) => {
    return arr.reduce((acc, item) => {                    
        let dropdown = <option key={item._id} className="dropdown-item">
        {item.account.accountId}
        </option>
        acc.push(dropdown)
        return acc;
    },[])
}

export const formatInDescDate = (arr) => {
    return arr.sort((a, b) => {
        a = new Date(moment(a.periodId.slice(0, 10).split('/').join('-')).format())
        b = new Date(moment(b.periodId.slice(0, 10).split('/').join('-')).format())
        return b - a;
    })
}

export const formatTimestampInDesc = (arr) => {
    return arr.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    })
}

export const formatBrandName = (str) => {
    if (str === 'ecopayz') {
        return 'ecoPayz';
    }
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}








