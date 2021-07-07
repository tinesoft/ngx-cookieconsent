/**
 * Content Options.
 *
 * Text strings used for cookie consent window elements.
 */
export class NgcContentOptions {

  header ? = 'Cookies used on the website!';

  message ? = 'This website uses cookies to ensure you get the best experience on our website.';

  dismiss ? = 'Got it!';

  allow ? = 'Allow cookies';

  deny ? = 'Decline';

  link ? = 'Learn more';

  href ? = 'https://cookiesandyou.com';

  close ? = '&#x274c;';

  policy ? = 'Cookie Policy';

  target ? = '_blank';

  [key: string]: string | undefined;
}
