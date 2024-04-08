# Product Variants React

Agrega variantes a un producto en React.

![1](https://github.com/MartinAlexanderFloresTorres/product-variants-react/assets/91045865/3a5c5123-5466-4461-9720-e101468102cb)

![image](https://github.com/MartinAlexanderFloresTorres/product-variants-react/assets/91045865/72bb5eab-021e-45ef-86b4-fee78069d2cc)


## Instalación

Para instalar `product-variants-react`, puedes utilizar npm o yarn:

```bash
npm install product-variants-react
```
# o
```bash
yarn add product-variants-react
```

# Uso
## Componente VariationProvider
El componente VariationProvider es un contexto que proporciona variantes de producto y funcionalidades relacionadas a los componentes hijos

#  Ejemplo usando el componente ya estilizado:
```jsx
import 'product-variants-react/dist/bundle.css';
import { Variations, VariationProvider } from 'product-variants-react';

// Dentro de tu aplicación
export default function App() {
  return (
    <VariationProvider
      /* Opcional: Establecer un estado inicial para el proveedor de variantes
        store={{
          variations: [],
          variationsSelected: []
        }}
     */
    >
      <div className="container p-4 mx-auto">
        <Variations defaultPrice={100} defaultStock={10} />
      </div>
    </VariationProvider>
  );
}
```

# Ejemplo estilizando el boton de agregar una nueva variacion:
```jsx
import 'product-variants-react/dist/bundle.css';
import { Variations, VariationProvider, useVariants } from 'product-variants-react';

function ButtonNewVariation() {
  const { openModalVariation } = useVariants();
  return (
    <button type="button" className="flex items-center gap-2 p-1 text-sky-700 hover:underline hover:text-sky-600 transition-all text-sm w-fit" onClick={openModalVariation}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
      <span>Agregar variaciones</span>
    </button>
  );
}

export default function App() {
  return (
    <VariationProvider
       /* Opcional: Establecer un estado inicial para el proveedor de variantes 
        store={{
          variations: [],
          variationsSelected: [],
        }}
      */
    >
      <div className="container p-4 mx-auto">
        <ButtonNewVariation />
        <Variations.Modal />
        <Variations.Selecteds />
        <Variations.Editor defaultPrice={0} defaultStock={0} />
      </div>
    </VariationProvider>
  );
}

```

## Hook useVariants
Puede utilizar el hook useVariants para acceder a las propiedades proporcionadas por VariationContext. Por ejemplo:

```jsx
import { useContext } from 'react';
import { VariationContext } from '../provider/VariationProvider';

export function useVariants() {
  return useContext(VariationContext);
}
```

Este hook le permite acceder a las propiedades como variations, variationsSelected, variantPrices, etc., y utilizarlas para crear su propia lógica.


```jsx
const { variations, variationsSelected, variantPrices, ... } = useVariants();
// Utilice estas propiedades para su lógica
```


## Props de Variations
defaultPrice: El precio predeterminado del producto.
defaultStock: La cantidad predeterminada de stock disponible del producto.

```jsx
<Variations defaultPrice={100} defaultStock={10} />
```
```jsx
<Variations.Editor defaultPrice={100} defaultStock={10} />
```


## Estructura de datos
Las interfaces Variant, VariantValue, VariantPrice, VariantOptionsAndPrices y VariantOption se utilizan para definir la estructura de datos relacionada con las variantes de producto.


```typescript
export interface Variant {
  id: string;
  name: string;
  title: string;
  usage: boolean;
  values: VariantValue[];
}

export interface VariantValue {
  id: string;
  title: string;
}

export interface VariantPrice {
  id: string;
  variant: VariantOptionsAndPrices;
}

export interface VariantOptionsAndPrices {
  options: VariantOption[];
  price: number | string;
  stock: number | string;
}

export interface VariantOption {
  id: string;
  name: string;
  title: string;
}
```
## Opciones de Variantes

Las opciones de variantes definen las características disponibles para un producto. Estas opciones se pueden personalizar según las necesidades del usuario. A continuación, se muestra un ejemplo de cómo se pueden definir las opciones de variantes en el archivo `variants.ts`:

```typescript
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
```

En este ejemplo, se definen varias opciones de variantes como 'Tamaño', 'Color', 'Material', etc. Cada opción tiene un nombre único, un título descriptivo y una lista de valores que se pueden asignar a esa opción.

Las opciones de variantes se pueden utilizar para personalizar los productos y permitir a los usuarios seleccionar las características específicas que desean.

## Personalización de las Opciones de Variantes y Selecciones Predeterminadas

Además de personalizar las opciones de variantes, también es posible especificar las selecciones predeterminadas para cada variante. Esto se puede lograr utilizando el prop `store` en el componente `VariationProvider`, donde se puede incluir una lista de variantes seleccionadas inicialmente.

A continuación, se muestra un ejemplo de cómo se puede personalizar el `store` para especificar tanto las variantes deseadas como las selecciones predeterminadas:

```jsx
import 'product-variants-react/dist/bundle.css';
import { Variations, VariationProvider } from 'product-variants-react';

export default function App() {
  return (
    <VariationProvider
      /* optional */
      store={{
        variations: [
          {
            id: 'customSizeId',
            name: 'size',
            title: 'Tamaño Personalizado',
            usage: true,
            values: [
              { id: 'small', title: 'Pequeño' },
              { id: 'medium', title: 'Mediano' },
              { id: 'large', title: 'Grande' },
            ],
          },
          {
            id: 'customColorId',
            name: 'color',
            title: 'Color Personalizado',
            usage: true,
            values: [
              { id: 'red', title: 'Rojo' },
              { id: 'blue', title: 'Azul' },
              { id: 'green', title: 'Verde' },
            ],
          },
        ],
        variationsSelected: [
          {
            id: 'customSizeId',
            name: 'size',
            title: 'Tamaño Personalizado',
            usage: true,
            values: [
              { id: 'medium', title: 'Mediano' }, // Selección predeterminada para tamaño: Mediano
            ],
          },
          {
            id: 'customColorId',
            name: 'color',
            title: 'Color Personalizado',
            usage: true,
            values: [
              { id: 'blue', title: 'Azul' }, // Selección predeterminada para color: Azul
            ],
          },
        ],
      }}
    >
      <div className="container p-4 mx-auto">
        <Variations.Editor defaultPrice={100} defaultStock={10} />
      </div>
    </VariationProvider>
  );
}
```
En este ejemplo, además de especificar las opciones de variantes personalizadas, también se proporcionan selecciones predeterminadas para cada variante dentro del prop store. Esto permite que las opciones seleccionadas se muestren automáticamente cuando se carga la aplicación, brindando una experiencia más completa al usuario.

# Contribución
Si encuentras algún problema o tienes alguna sugerencia para mejorar este paquete, ¡no dudes en abrir un issue o enviar un pull request!
