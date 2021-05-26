/**
 * Event fired when Cookie Consent initializes.
 */
export interface NgcInitializeEvent {
  /**
   * The status of cookie consent
   */
  status: 'allow' | 'deny' | 'dismiss';
}
