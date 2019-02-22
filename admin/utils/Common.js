var md5 = require('md5');
export const site_name = 'Couponarbitrage';
export const apiUrl = 'http://localhost:3001/';
export const ADMINMODULES = [
    {
        'value': 'admin_accounts',
        'text': 'Administrators',
        'icon': 'fas fa-user',
        'id': 1,
        'isChecked': false,
        'submodules': [
            { 'name': 'My Account', 'url': '/myaccount', 'as': '/myaccount', 'id': 'my-account' },
            { 'name': 'Admin Account List', 'url': '/admin_accounts', 'as': '/admin_accounts', 'id': 'admin_accounts' }
        ]
    },
    {
        'value': 'user_accounts',
        'text': 'User Accounts',
        'icon': 'fas fa-users',
        'id': 2,
        'isChecked': false,
        'submodules': [
            { 'name': 'Add New User', 'url': '/manage_user_accounts', 'as': '/manage-user', 'id': 'manage_user_accounts' },
            { 'name': 'User Accounts List', 'url': '/user_accounts ', 'as': '/user-accounts', 'id': 'user_accounts' },
            { 'name': 'User Accounts Track List', 'url': '/user_tracking', 'as': '/user_tracking', 'id': 'user_tracking' },
            { 'name': 'Turnover Registration Request', 'url': '/turnover_registration', 'as': 'turnover_registration', 'id': 'turnover_registration' },
            { 'name': 'User Intrested', 'url': '/user_interested', 'as': '/user_interested', 'id': 'user_interested' }
        ]
    },
    {
        'value': 'cashback_offer',
        'text': 'Cashback Offers',
        'icon': 'fab fa-sellcast',
        'id': 3,
        'isChecked': false,
        'submodules': [
            { 'name': 'Cashback Categories', 'url': '/cashback_categories', 'as': '/cashback_categories', 'id': 'cashback_categories' },
            { 'name': 'Cashback Stores', 'url': '/cashback_stores', 'as': '/cashback_stores', 'id': 'cashback_stores' },
            { 'name': 'Cashback Offers', 'url': '/cashback_offers', 'as': '/cashback_offers', 'id': 'cashback_offers' },
            { 'name': 'Cashback Vouchers Codes', 'url': '/cashback_vouchers', 'as': '/cashback_vouchers', 'id': 'cashback_vouchers' },
            { 'name': 'Cashback Sites', 'url': '/cashback_sites', 'as': 'cashback_sites', 'id': 'cashback_sites' }
        ]
    },
    {
        'value': 'cashback_claims',
        'text': 'Cashback & Bonuses',
        'icon': 'fas fa-money-bill-alt',
        'id': 4,
        'isChecked': false,
        'submodules': [
            { 'name': 'Unconfirmed Claims', 'url': '/cashback_claims?status=unconfirmed', 'as': '/cashback_claims/unconfirmed', 'id': 'cashback_claims/unconfirmed' },
            { 'name': 'Unapproved Claims', 'url': '/cashback_claims?status=unapproved', 'as': '/cashback_claims/unapproved', 'id': 'cashback_claims/unapproved' },
            { 'name': 'Finished Claims', 'url': '/cashback_claims?status=finished', 'as': '/cashback_claims/finished', 'id': 'cashback_claims/finished' },
            { 'name': 'Payable Claims', 'url': '/cashback_claims?status=payable', 'as': '/cashback_claims/payable', 'id': 'cashback_claims/payable' },
            { 'name': 'Paid Claims', 'url': '/cashback_claims?status=paid', 'as': '/cashback_claims/paid', 'id': 'cashback_claims/paid' },
            { 'name': 'More information requested', 'url': '/cashback_claims?status=more_info', 'as': '/cashback_claims/more_info', 'id': 'cashback_claims/more_info' },
            { 'name': 'Cancelled Claims', 'url': '/cashback_claims?status=cancelled', 'as': '/cashback_claims/cancelled', 'id': 'cashback_claims/cancelled' },
            //  { 'name': 'Total Liability', 'url': '/menus', 'id': 'admin-accounts7' },


        ]
    },
    {
        'value': 'revenue_cashback_claims',
        'text': 'Revenue Share cashback',
        'icon': 'fas fa-chart-line',
        'id': 5,
        'isChecked': false,
        'submodules': [
            { 'name': 'Unconfirmed Claims', 'url': '/revenue_cashback_claims?status=unconfirmed', 'as': '/revenue_cashback_claims/unconfirmed', 'id': 'cashback_claims/unconfirmed' },
            { 'name': 'Unapproved Claims', 'url': '/revenue_cashback_claims?status=unapproved', 'as': '/revenue_cashback_claims/unapproved', 'id': 'cashback_claims/unapproved' },
            { 'name': 'Finished Claims', 'url': '/revenue_cashback_claims?status=finished', 'as': '/revenue_cashback_claims/finished', 'id': 'cashback_claims/finished' },
            { 'name': 'Payable Claims', 'url': '/revenue_cashback_claims?status=payable', 'as': '/revenue_cashback_claims/payable', 'id': 'cashback_claims/payable' },
            { 'name': 'Paid Claims', 'url': '/revenue_cashback_claims?status=paid', 'as': '/revenue_cashback_claims/paid', 'id': 'cashback_claims/paid' },
            { 'name': 'More information requested', 'url': '/revenue_cashback_claims?status=more_info', 'as': '/revenue_cashback_claims/more_info', 'id': 'cashback_claims/more_info' },
            { 'name': 'Cancelled Claims', 'url': '/revenue_cashback_claims?status=cancelled', 'as': '/revenue_cashback_claims/cancelled', 'id': 'cashback_claims/cancelled' },
            { 'name': 'Cashback Credits', 'url': '/cashback_credits', 'as': '/cashback_credits', 'id': 'cashback_credits' },


        ]
    },
    {
        'value': 'turnover_cashback',
        'text': 'Turnover Cashback',
        'icon': 'fas fa-lira-sign',
        'id': 6,
        'isChecked': false,
        'submodules': [
            { 'name': 'Skrill Cashback', 'url': '/skrill_cashback', 'as': '/skrill_cashback', 'id': 'skrill_cashback' },
            { 'name': 'SBObet Cashback', 'url': '/sbobet_cashback', 'as': '/sbobet_cashback', 'id': 'sbobet_cashback' },
            { 'name': 'Neteller Cashback', 'url': '/neteller_cashback', 'as': '/neteller_cashback', 'id': 'neteller_cashback' },
            { 'name': 'Asian Connect Cashback', 'url': '/asianconnect_cashback', 'as': '/asianconnect_cashback', 'id': 'asian_cashback' },
            { 'name': 'Ecopayz Cashback', 'url': '/ecopay_cashback', 'as': '/ecopay_cashback', 'id': 'ecopay_cashback' }

        ]
    },
    {
        'value': 'cashback_payouts',
        'text': ' Payouts',
        'icon': 'far fa-credit-card',
        'id': 7,
        'isChecked': false,
        'submodules': [
            { 'name': 'Unconfirmed Claims', 'url': '/menu-manager', 'id': 'admin-accounts7' },
            { 'name': 'Unapproved Claims', 'url': '/menus', 'id': 'admin-accounts7' },


        ]
    },

    {
        'value': 'betting_settings',
        'text': 'Betting Settings',
        'icon': 'fa fa-thumbs-up',
        'id': 8,
        'isChecked': false,
        'submodules': [
            { 'name': 'Unconfirmed Claims', 'url': '/menu-manager', 'id': 'admin-accounts7' },
            { 'name': 'Unapproved Claims', 'url': '/menus', 'id': 'admin-accounts7' },


        ]
    },

    {
        'value': 'article',
        'text': 'Article Manager',
        'icon': 'fas fa-newspaper',
        'id': 9,
        'isChecked': false,
        'submodules': [
            { 'name': 'Unconfirmed Claims', 'url': '/menu-manager', 'id': 'admin-accounts7' },
            { 'name': 'Unapproved Claims', 'url': '/article', 'id': 'admin-accounts7' },


        ]
    },

    {
        'value': 'menus',
        'text': 'Menu Manager',
        'icon': 'fa fa-list-ol',
        'id': 10,
        'isChecked': false,
        'submodules': [
            { 'name': 'Add New Menu', 'url': '/manage_menu', 'id': 'admin-accounts7' },
            { 'name': 'Menu List', 'url': '/menus', 'id': 'admin-accounts7' },


        ]
    },



    {
        'value': 'master_data',
        'text': 'Master Data',
        'icon': 'fa fa-folder-open',
        'id': 11,
        'isChecked': false,
        'submodules': [
            { 'name': 'Mail Templates', 'url': '/email_templates', 'as': '/email_templates', 'id': 'admin-accounts7' },
            // { 'name': 'Store Reviews', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'Banners List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'Affiliate Banners List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'FAQ List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'Subscribers List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'Newsletters List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            // { 'name': 'Page List', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            { 'name': 'Affiliate Networks', 'url': '/affiliate_networks', 'as': '/affiliate_networks', 'id': 'admin-accounts7' },
            // { 'name': 'Turnover Static Text', 'url': '/masterdata/email-templates', 'id': 'admin-accounts7' },
            { 'name': 'Tags', 'url': '/tags', 'as': '/tags', 'id': 'admin-accounts7' },

        ]
    },


];



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

export const getCountries = () => {
    const countries = [
        { "name": "Afghanistan", "code": "AF" },
        { "name": "land Islands", "code": "AX" },
        { "name": "Albania", "code": "AL" },
        { "name": "Algeria", "code": "DZ" },
        { "name": "American Samoa", "code": "AS" },
        { "name": "AndorrA", "code": "AD" },
        { "name": "Angola", "code": "AO" },
        { "name": "Anguilla", "code": "AI" },
        { "name": "Antarctica", "code": "AQ" },
        { "name": "Antigua and Barbuda", "code": "AG" },
        { "name": "Argentina", "code": "AR" },
        { "name": "Armenia", "code": "AM" },
        { "name": "Aruba", "code": "AW" },
        { "name": "Australia", "code": "AU" },
        { "name": "Austria", "code": "AT" },
        { "name": "Azerbaijan", "code": "AZ" },
        { "name": "Bahamas", "code": "BS" },
        { "name": "Bahrain", "code": "BH" },
        { "name": "Bangladesh", "code": "BD" },
        { "name": "Barbados", "code": "BB" },
        { "name": "Belarus", "code": "BY" },
        { "name": "Belgium", "code": "BE" },
        { "name": "Belize", "code": "BZ" },
        { "name": "Benin", "code": "BJ" },
        { "name": "Bermuda", "code": "BM" },
        { "name": "Bhutan", "code": "BT" },
        { "name": "Bolivia", "code": "BO" },
        { "name": "Bosnia and Herzegovina", "code": "BA" },
        { "name": "Botswana", "code": "BW" },
        { "name": "Bouvet Island", "code": "BV" },
        { "name": "Brazil", "code": "BR" },
        { "name": "British Indian Ocean Territory", "code": "IO" },
        { "name": "Brunei Darussalam", "code": "BN" },
        { "name": "Bulgaria", "code": "BG" },
        { "name": "Burkina Faso", "code": "BF" },
        { "name": "Burundi", "code": "BI" },
        { "name": "Cambodia", "code": "KH" },
        { "name": "Cameroon", "code": "CM" },
        { "name": "Canada", "code": "CA" },
        { "name": "Cape Verde", "code": "CV" },
        { "name": "Cayman Islands", "code": "KY" },
        { "name": "Central African Republic", "code": "CF" },
        { "name": "Chad", "code": "TD" },
        { "name": "Chile", "code": "CL" },
        { "name": "China", "code": "CN" },
        { "name": "Christmas Island", "code": "CX" },
        { "name": "Cocos (Keeling) Islands", "code": "CC" },
        { "name": "Colombia", "code": "CO" },
        { "name": "Comoros", "code": "KM" },
        { "name": "Congo", "code": "CG" },
        { "name": "Congo, The Democratic Republic of the", "code": "CD" },
        { "name": "Cook Islands", "code": "CK" },
        { "name": "Costa Rica", "code": "CR" },
        { "name": "Cote D'Ivoire", "code": "CI" },
        { "name": "Croatia", "code": "HR" },
        { "name": "Cuba", "code": "CU" },
        { "name": "Cyprus", "code": "CY" },
        { "name": "Czech Republic", "code": "CZ" },
        { "name": "Denmark", "code": "DK" },
        { "name": "Djibouti", "code": "DJ" },
        { "name": "Dominica", "code": "DM" },
        { "name": "Dominican Republic", "code": "DO" },
        { "name": "Ecuador", "code": "EC" },
        { "name": "Egypt", "code": "EG" },
        { "name": "El Salvador", "code": "SV" },
        { "name": "Equatorial Guinea", "code": "GQ" },
        { "name": "Eritrea", "code": "ER" },
        { "name": "Estonia", "code": "EE" },
        { "name": "Ethiopia", "code": "ET" },
        { "name": "Falkland Islands (Malvinas)", "code": "FK" },
        { "name": "Faroe Islands", "code": "FO" },
        { "name": "Fiji", "code": "FJ" },
        { "name": "Finland", "code": "FI" },
        { "name": "France", "code": "FR" },
        { "name": "French Guiana", "code": "GF" },
        { "name": "French Polynesia", "code": "PF" },
        { "name": "French Southern Territories", "code": "TF" },
        { "name": "Gabon", "code": "GA" },
        { "name": "Gambia", "code": "GM" },
        { "name": "Georgia", "code": "GE" },
        { "name": "Germany", "code": "DE" },
        { "name": "Ghana", "code": "GH" },
        { "name": "Gibraltar", "code": "GI" },
        { "name": "Greece", "code": "GR" },
        { "name": "Greenland", "code": "GL" },
        { "name": "Grenada", "code": "GD" },
        { "name": "Guadeloupe", "code": "GP" },
        { "name": "Guam", "code": "GU" },
        { "name": "Guatemala", "code": "GT" },
        { "name": "Guernsey", "code": "GG" },
        { "name": "Guinea", "code": "GN" },
        { "name": "Guinea-Bissau", "code": "GW" },
        { "name": "Guyana", "code": "GY" },
        { "name": "Haiti", "code": "HT" },
        { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
        { "name": "Holy See (Vatican City State)", "code": "VA" },
        { "name": "Honduras", "code": "HN" },
        { "name": "Hong Kong", "code": "HK" },
        { "name": "Hungary", "code": "HU" },
        { "name": "Iceland", "code": "IS" },
        { "name": "India", "code": "IN" },
        { "name": "Indonesia", "code": "ID" },
        { "name": "Iran, Islamic Republic Of", "code": "IR" },
        { "name": "Iraq", "code": "IQ" },
        { "name": "Ireland", "code": "IE" },
        { "name": "Isle of Man", "code": "IM" },
        { "name": "Israel", "code": "IL" },
        { "name": "Italy", "code": "IT" },
        { "name": "Jamaica", "code": "JM" },
        { "name": "Japan", "code": "JP" },
        { "name": "Jersey", "code": "JE" },
        { "name": "Jordan", "code": "JO" },
        { "name": "Kazakhstan", "code": "KZ" },
        { "name": "Kenya", "code": "KE" },
        { "name": "Kiribati", "code": "KI" },
        { "name": "Korea, Democratic People'S Republic of", "code": "KP" },
        { "name": "Korea, Republic of", "code": "KR" },
        { "name": "Kuwait", "code": "KW" },
        { "name": "Kyrgyzstan", "code": "KG" },
        { "name": "Lao People'S Democratic Republic", "code": "LA" },
        { "name": "Latvia", "code": "LV" },
        { "name": "Lebanon", "code": "LB" },
        { "name": "Lesotho", "code": "LS" },
        { "name": "Liberia", "code": "LR" },
        { "name": "Libyan Arab Jamahiriya", "code": "LY" },
        { "name": "Liechtenstein", "code": "LI" },
        { "name": "Lithuania", "code": "LT" },
        { "name": "Luxembourg", "code": "LU" },
        { "name": "Macao", "code": "MO" },
        { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
        { "name": "Madagascar", "code": "MG" },
        { "name": "Malawi", "code": "MW" },
        { "name": "Malaysia", "code": "MY" },
        { "name": "Maldives", "code": "MV" },
        { "name": "Mali", "code": "ML" },
        { "name": "Malta", "code": "MT" },
        { "name": "Marshall Islands", "code": "MH" },
        { "name": "Martinique", "code": "MQ" },
        { "name": "Mauritania", "code": "MR" },
        { "name": "Mauritius", "code": "MU" },
        { "name": "Mayotte", "code": "YT" },
        { "name": "Mexico", "code": "MX" },
        { "name": "Micronesia, Federated States of", "code": "FM" },
        { "name": "Moldova, Republic of", "code": "MD" },
        { "name": "Monaco", "code": "MC" },
        { "name": "Mongolia", "code": "MN" },
        { "name": "Montenegro", "code": "ME" },
        { "name": "Montserrat", "code": "MS" },
        { "name": "Morocco", "code": "MA" },
        { "name": "Mozambique", "code": "MZ" },
        { "name": "Myanmar", "code": "MM" },
        { "name": "Namibia", "code": "NA" },
        { "name": "Nauru", "code": "NR" },
        { "name": "Nepal", "code": "NP" },
        { "name": "Netherlands", "code": "NL" },
        { "name": "Netherlands Antilles", "code": "AN" },
        { "name": "New Caledonia", "code": "NC" },
        { "name": "New Zealand", "code": "NZ" },
        { "name": "Nicaragua", "code": "NI" },
        { "name": "Niger", "code": "NE" },
        { "name": "Nigeria", "code": "NG" },
        { "name": "Niue", "code": "NU" },
        { "name": "Norfolk Island", "code": "NF" },
        { "name": "Northern Mariana Islands", "code": "MP" },
        { "name": "Norway", "code": "NO" },
        { "name": "Oman", "code": "OM" },
        { "name": "Pakistan", "code": "PK" },
        { "name": "Palau", "code": "PW" },
        { "name": "Palestinian Territory, Occupied", "code": "PS" },
        { "name": "Panama", "code": "PA" },
        { "name": "Papua New Guinea", "code": "PG" },
        { "name": "Paraguay", "code": "PY" },
        { "name": "Peru", "code": "PE" },
        { "name": "Philippines", "code": "PH" },
        { "name": "Pitcairn", "code": "PN" },
        { "name": "Poland", "code": "PL" },
        { "name": "Portugal", "code": "PT" },
        { "name": "Puerto Rico", "code": "PR" },
        { "name": "Qatar", "code": "QA" },
        { "name": "Reunion", "code": "RE" },
        { "name": "Romania", "code": "RO" },
        { "name": "Russian Federation", "code": "RU" },
        { "name": "RWANDA", "code": "RW" },
        { "name": "Saint Helena", "code": "SH" },
        { "name": "Saint Kitts and Nevis", "code": "KN" },
        { "name": "Saint Lucia", "code": "LC" },
        { "name": "Saint Pierre and Miquelon", "code": "PM" },
        { "name": "Saint Vincent and the Grenadines", "code": "VC" },
        { "name": "Samoa", "code": "WS" },
        { "name": "San Marino", "code": "SM" },
        { "name": "Sao Tome and Principe", "code": "ST" },
        { "name": "Saudi Arabia", "code": "SA" },
        { "name": "Senegal", "code": "SN" },
        { "name": "Serbia", "code": "RS" },
        { "name": "Seychelles", "code": "SC" },
        { "name": "Sierra Leone", "code": "SL" },
        { "name": "Singapore", "code": "SG" },
        { "name": "Slovakia", "code": "SK" },
        { "name": "Slovenia", "code": "SI" },
        { "name": "Solomon Islands", "code": "SB" },
        { "name": "Somalia", "code": "SO" },
        { "name": "South Africa", "code": "ZA" },
        { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
        { "name": "Spain", "code": "ES" },
        { "name": "Sri Lanka", "code": "LK" },
        { "name": "Sudan", "code": "SD" },
        { "name": "Suriname", "code": "SR" },
        { "name": "Svalbard and Jan Mayen", "code": "SJ" },
        { "name": "Swaziland", "code": "SZ" },
        { "name": "Sweden", "code": "SE" },
        { "name": "Switzerland", "code": "CH" },
        { "name": "Syrian Arab Republic", "code": "SY" },
        { "name": "Taiwan, Province of China", "code": "TW" },
        { "name": "Tajikistan", "code": "TJ" },
        { "name": "Tanzania, United Republic of", "code": "TZ" },
        { "name": "Thailand", "code": "TH" },
        { "name": "Timor-Leste", "code": "TL" },
        { "name": "Togo", "code": "TG" },
        { "name": "Tokelau", "code": "TK" },
        { "name": "Tonga", "code": "TO" },
        { "name": "Trinidad and Tobago", "code": "TT" },
        { "name": "Tunisia", "code": "TN" },
        { "name": "Turkey", "code": "TR" },
        { "name": "Turkmenistan", "code": "TM" },
        { "name": "Turks and Caicos Islands", "code": "TC" },
        { "name": "Tuvalu", "code": "TV" },
        { "name": "Uganda", "code": "UG" },
        { "name": "Ukraine", "code": "UA" },
        { "name": "United Arab Emirates", "code": "AE" },
        { "name": "United Kingdom", "code": "GB" },
        { "name": "United States", "code": "US" },
        { "name": "United States Minor Outlying Islands", "code": "UM" },
        { "name": "Uruguay", "code": "UY" },
        { "name": "Uzbekistan", "code": "UZ" },
        { "name": "Vanuatu", "code": "VU" },
        { "name": "Venezuela", "code": "VE" },
        { "name": "Viet Nam", "code": "VN" },
        { "name": "Virgin Islands, British", "code": "VG" },
        { "name": "Virgin Islands, U.S.", "code": "VI" },
        { "name": "Wallis and Futuna", "code": "WF" },
        { "name": "Western Sahara", "code": "EH" },
        { "name": "Yemen", "code": "YE" },
        { "name": "Zambia", "code": "ZM" },
        { "name": "Zimbabwe", "code": "ZW" }
    ];

    return countries;
}


export const hearAboutUs = () => {
    const hearAboutUs = [
        { "name": "Tell a Friend Email", "code": "32638" },
        { "name": "Search Engine", "code": "32648" },
        { "name": "Word of Mouth", "code": "32639" },
        { "name": "TV Advert", "code": "32645" },
        { "name": "Other TV Programme", "code": "32646" },
        { "name": "Tube Advertising", "code": "41457" },
        { "name": "Billboard", "code": "32642" },
        { "name": "Radio", "code": "32644" },
        { "name": "Online Forum", "code": "41455" },
        { "name": "Facebook", "code": "41453" },
        { "name": "Twitter", "code": "41456" },
        { "name": "Newspaper/Magazine Article", "code": "41454" },
        { "name": "Flyer", "code": "32643" },
        { "name": "Other", "code": "32649" },


    ];

    return hearAboutUs;
}