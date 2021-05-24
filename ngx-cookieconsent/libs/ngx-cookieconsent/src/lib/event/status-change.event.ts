/**
 * Event fired when cookie status changes.
 */
export interface NgcStatusChangeEvent {
  /**
   * The new status of cookie consent
   */
  status: 'allow' | 'deny' | 'dismiss';
  /**
   * Flag indicating if the new status was chosen before
   */
  chosenBefore: boolean;
}
