const routes = require('next-routes');
module.exports = routes()                        
.add('forgot-password','','forgotPassword')   
.add('change-password','/change-password/:token','changePassword')
.add('manage-admin','','manage_admin_accounts')
.add('update-admin','/update-admin/:id','manage_admin_accounts')
.add('view-admin','/view-admin/:id','view_admin_accounts')
.add('user-accounts','','user_accounts')
.add('manage-user','','manage_user_accounts')
.add('update-user','/update-user/:id','manage_admin_accounts')
.add('view-user','/view-user/:id','view_user_accounts')
 
 
                       
 