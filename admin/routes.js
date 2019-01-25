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
.add('user_tracking_history','/user_tracking_history/:id','user_tracking_history')
.add('turnover_registration','/turnover_registration','turnover_registration')
.add('email_temp_manager','/email_temp_manager/:id','email_temp_manager')
.add('update-menu','/update-menu/:id','manage_menu')
.add('update_cat','/update_cat/:id','manage_cashback_categories')
.add('update_site','/update_site/:id','manage_cashback_sites')
 
                       
 