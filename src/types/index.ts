export interface SvgoConfig {
  removeDimensions: boolean;
  pretty: boolean;
  removeAttributes: string[]; // id, class, data-name vb.
  addAttributes: { [key: string]: string }; // fill: currentColor vb.
  prefixIds: boolean;
}

export const defaultSvgoConfig: SvgoConfig = {
  removeDimensions: true,
  pretty: true,
  removeAttributes: ['class', 'id'],
  addAttributes: { fill: 'currentColor', stroke: 'currentColor' },
  prefixIds: true,
};