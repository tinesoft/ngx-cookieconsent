/**
 * Cookie Options.
 *
 * It is recommended to set these values to correspond with your server.
 * You MUST set the ‘domain’ option, otherwise your cookies may not work.
 */
export class NgcCookieOptions {

  // Name of the cookie that keeps track of users choice
  // Default: 'cookieconsent_status'
  name ? = 'cookieconsent_status';

  // URL path that the cookie 'name' belongs to. The cookie can only be read at this location
  // Default: '/'
  path ? = '/';

  // The domain that the cookie 'name' belongs to. The cookie can only be read on this domain. Guide to cookie domains
  // Default: <empty string>
  domain?= '';

  // The cookies expire date, specified in days (specify -1 for no expiry)
  // Default: 365
  expiryDays ? = 365;

  // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
  secure ? = false;
}
