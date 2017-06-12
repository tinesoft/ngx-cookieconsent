/**
 * Palette Options
 *
 * Colours can be defined in additional stylesheets or using attributes.
 */

export interface Palette {
  background?:string;
  border?:string;
  link?:string;
  text?:string;
}

export class PaletteOptions {
  popup?:Palette = { background: '#000000', text: '#fff', link: '#fff' };

  button?:Palette = { background: 'transparent', border: '#f8e71c', text: '#f8e71c' };

  highlight?:Palette = { background: '#f8e71c', border: '#f8e71c', text: '#000000' };

}
