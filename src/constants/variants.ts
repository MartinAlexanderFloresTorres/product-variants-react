import { VariantOptions } from '../interfaces';
import generateId from '../utils';

export const VARIANTS: VariantOptions[] = [
  {
    id: generateId(),
    name: 'size',
    title: 'Tamaño',
    usage: false,
  },
  {
    id: generateId(),
    name: 'color',
    title: 'Color',
    usage: false,
  },
  {
    id: generateId(),
    name: 'material',
    title: 'Material',
    usage: false,
  },
  {
    id: generateId(),
    name: 'style',
    title: 'Estilo',
    usage: false,
  },
  {
    id: generateId(),
    name: 'pattern',
    title: 'Patrón',
    usage: false,
  },
  {
    id: generateId(),
    name: 'length',
    title: 'Longitud',
    usage: false,
  },
  {
    id: generateId(),
    name: 'width',
    title: 'Ancho',
    usage: false,
  },
];
