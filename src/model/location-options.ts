/* tslint:disable:max-line-length */
/**
 * Location Options
 *
 * The location services are disabled by default. You are encouraged to implement a handler to your own service, rather than using the free ones provided.
 * To enable the basic location services, set 'location' to 'true'. To add you own services or configure the order or execution, pass an object with configuration properties.
 */
export class NgcLocationOptions {

  /**
   * We can't react to errors from script tag resources, so we set a timeout. If we don't have the answer after 5000ms, try the next service.
   * Default: 5000 (milliseconds)
   */
  timeout = 5000;
  /**
   * This array defines the services that you want to use. We attempt to get the country code from the first service, and only if the service fails do we move onto the next service.
   * If all services fail, the popup is opened without modification.
   * If a service succeeds, then the two letter country code is passed to the 'Law' module, with changes your popup options depending on the cookie laws in the country code.
   * Default: ['freegeoip', 'ipinfo', 'maxmind']
   */
  services = ['freegeoip', 'ipinfo', 'maxmind'];

  /**
   * This can be used to define new services via a key, but new services they can also go straight into the 'services' array in an ad-hoc fashion.
   *  It is recommended that you define services in 'serviceDefinitions' and use 'services' to configure priority between services
   */
  serviceDefinitions: any;

}
