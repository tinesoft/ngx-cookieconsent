import { NgcPalette } from './common-interfaces';
/**
 * Palette Options
 *
 * Colours can be defined in additional stylesheets or using attributes.
 */
export class NgcPaletteOptions {
  popup?: NgcPalette = { background: '#000000', text: '#fff', link: '#fff' };

  button?: NgcPalette = { background: 'transparent', border: '#f8e71c', text: '#f8e71c' };

  highlight?: NgcPalette = { background: '#f8e71c', border: '#f8e71c', text: '#000000' };

}
