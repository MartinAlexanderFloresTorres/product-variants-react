import { Variant } from '../interfaces';
import generateId from '../utils';

export const VARIANTS: Variant[] = [
  {
    id: generateId(),
    name: 'size',
    title: 'Tamaño',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'color',
    title: 'Color',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'material',
    title: 'Material',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'style',
    title: 'Estilo',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'pattern',
    title: 'Patrón',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'length',
    title: 'Longitud',
    usage: false,
    values: [],
  },
  {
    id: generateId(),
    name: 'width',
    title: 'Ancho',
    usage: false,
    values: [],
  },
];
