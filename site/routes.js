const routes = require('next-routes');
module.exports = routes()
    .add('cashback-bonuses', '/cashback-bonuses', 'cashback-bonuses')
    .add('cashback-bonuses/:subcat', '/cashback-bonuses/:subcat', 'cashback-bonuses')
    .add('revenue-share-cashback', '/revenue-share-cashback', 'revenue-share-cashback')
    .add('revenue-share-cashback/:subcat', '/revenue-share-cashback/:subcat', 'revenue-share-cashback')
    .add('free-arbs', '/free-arbs', 'free-arbs')
    .add('signin', '/signin', 'signin')
    .add('signup', '/signup', 'signup')
    .add('change-password', '/change-password/:token', 'change-password')
    .add('reminder', '/reminder/:offerId', 'reminder')
    .add('skrill-cashback', '/skrill-cashback', 'skrill-cashback')
    .add('sbobet-cashback', '/sbobet-cashback', 'sbobet-cashback')
    .add('neteller-cashback', '/neteller-cashback', 'neteller-cashback')
    .add('asian-connect-cashback', '/asian-connect-cashback', 'asian-connect-cashback')
    .add('ecopayz-cashback', '/ecopayz-cashback', 'ecopayz-cashback')
    .add('my-account', '/my-account', 'my-account')
    .add('earnings', '/earnings', 'earnings')
    .add('revenue-share-earnings', '/revenue-share-earnings', 'revenue-share-earnings')
    .add('turnover/skrill', '/turnover/skrill', 'turnover-skrill')
    .add('turnover/sbobet', '/turnover/sbobet', 'turnover-sbobet')
    .add('turnover/neteller', '/turnover/neteller', 'turnover-neteller')
    .add('turnover/asianconnect', '/turnover/asianconnect', 'turnover-asian-connect')
    .add('turnover/ecopayz', '/turnover/ecopayz', 'turnover-ecopayz')
    .add('payout', '/payout', 'payout')
    .add('revenueshare-payout', '/revenueshare-payout', 'revenue-share-payout')
    .add('turnover-payout/skrill', '/turnover-payout/skrill', 'turnover-payout-skrill')
    .add('turnover-payout/sbobet', '/turnover-payout/sbobet', 'turnover-payout-sbobet')
    .add('turnover-payout/neteller', '/turnover-payout/neteller', 'turnover-payout-neteller')
    .add('turnover-payout/asianconnect', '/turnover-payout/asianconnect', 'turnover-payout-asian-connect')
    .add('turnover-payout/ecopayz', '/turnover-payout/ecopayz', 'turnover-payout-ecopayz')
    .add('payment-details', '/payment-details', 'payment-details')
    .add('profile', '/profile', 'profile')
    .add('my-plan', '/my-plan', 'my-plan')
    .add('activity', '/activity', 'activity')
    .add('cashback-details/:url_key', '/:url_key', 'cashback-details')
