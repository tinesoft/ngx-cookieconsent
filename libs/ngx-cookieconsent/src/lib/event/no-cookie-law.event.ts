/**
 * Event fired when there is no cookie law for a given country.
 */
export interface NgcNoCookieLawEvent {
    /**
     * The country code
     */
    countryCode: string;
    /**
     * The country
     */
    country: string;
  }
