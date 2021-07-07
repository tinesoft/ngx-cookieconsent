/**
 * Event fired when Cookie Consent initializes.
 */
export interface NgcInitializingEvent {
  /**
   * The status of cookie consent
   */
  status: 'allow' | 'deny' | 'dismiss';
}
