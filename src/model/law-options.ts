/**
 * Law Optons.
 */
export class NgcLawOptions {
  // Rather than getting the country code from the location services, you can hard code a particular country into the tool.
  countryCode: string;

  // If false, then we only enable the popup if the country has the cookie law. We ignore all other country specific rules.
  // Default: true
  regionalLaw ?= true;
}
