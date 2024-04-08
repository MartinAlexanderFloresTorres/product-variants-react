import { createContext, useEffect, useState } from 'react';
import { Variant, VariantPrice } from '../interfaces';
import { VARIANTS } from '../constants/variants';
import generateId from '../utils';

interface VariantContextValues {
  variations: Variant[];
  variationsSelected: Variant[];
  variantPrices: VariantPrice[];
  showModalVariation: boolean;
  variationEdit: Variant | null;
  openModalVariation: () => void;
  closeModalVariation: () => void;
  saveVariations: (variantSelected: Variant) => void;
  updateVariations: (variantSelected: Variant) => void;
  removeVariant: (id: string) => void;
  updateVariantPrices: (variantPrices: VariantPrice[]) => void;
  updateVariationEdit: (variant: Variant) => void;
}

export const VariationContext = createContext<VariantContextValues>({} as VariantContextValues);

interface VariantProviderProps {
  children: React.ReactNode;
  store?: {
    variations?: Variant[];
    variationsSelected?: Variant[];
  };
}

export default function VariationProvider({ children, store = {} }: VariantProviderProps) {
  const [variations, setVariations] = useState<Variant[]>(store.variations || VARIANTS);
  const [variationsSelected, setVariationsSelected] = useState<Variant[]>(store.variationsSelected || []);
  const [showModalVariation, setShowModalVariation] = useState<boolean>(false);
  const [variationEdit, setVariation] = useState<Variant | null>(null);
  const [variantPrices, setVariantPrices] = useState<VariantPrice[]>([]);

  useEffect(() => {
    function generateCombinations(variationsSelected: Variant[]): Record<string, string>[] {
      // Construir un array que contenga las opciones de cada variante
      const optionsArray: string[][] = variationsSelected.map((variant) => variant.values.map((value) => value.title));

      // Calcular la cantidad de combinaciones posibles
      const combinationsCount = optionsArray.reduce((acc, options) => acc * options.length, 1);

      // Generar las combinaciones
      const combinations: Record<string, string>[] = [];
      for (let i = 0; i < combinationsCount; i++) {
        const combination: Record<string, string> = {};

        // Calcular el índice para cada variante en este punto de la iteración
        let index = i;
        variationsSelected.forEach((variant, j) => {
          const options = optionsArray[j];
          const optionIndex = index % options.length;
          combination[variant.name] = options[optionIndex];
          index = Math.floor(index / options.length);
        });

        combinations.push(combination);
      }

      return combinations;
    }

    if (variationsSelected.length) {
      // Generar todas las combinaciones posibles
      const combinations = generateCombinations(variationsSelected);

      const newVariantPrices = combinations.map((combination) => {
        return {
          id: generateId(),
          variant: {
            id: generateId(),
            options: Object.entries(combination).map(([name, title]) => ({ id: generateId(), name, title })),
            price: '',
            stock: '',
          },
        };
      });

      setVariantPrices(newVariantPrices);
    } else {
      setVariantPrices([]);
    }
  }, [variationsSelected]);

  const openModalVariation = () => {
    setShowModalVariation(true);
    setVariation(null);
  };

  const closeModalVariation = () => {
    setShowModalVariation(false);
    setVariation(null);
  };

  const saveVariations = (variantSelected: Variant) => {
    setVariations((prev) => prev.map((variant) => (variant.id === variantSelected.id ? { ...variantSelected, usage: true } : variant)));
    setVariationsSelected([...variationsSelected, variantSelected]);
    closeModalVariation();
  };

  const updateVariations = (variantSelected: Variant) => {
    if (variationEdit) {
      const updates = variationsSelected.map((variation) => (variation.id === variationEdit.id ? variantSelected : variation));
      setVariationsSelected(updates);

      // Reset usage to false if variant not equal to variantEdit
      const updatesVariants = variations.map((variant) => {
        if (variant.id === variantSelected.id) {
          return { ...variantSelected, usage: true };
        } else if (variant.id === variationEdit.id) {
          return { ...variant, usage: false };
        }
        return variant;
      });
      setVariations(updatesVariants);

      closeModalVariation();
    }
  };

  const removeVariant = (id: string) => {
    setVariationsSelected(variationsSelected.filter((variant) => variant.id !== id));
    setVariations((prev) => prev.map((variant) => (variant.id === id ? { ...variant, usage: false } : variant)));
  };

  const updateVariantPrices = (variantPrices: VariantPrice[]) => {
    setVariantPrices(variantPrices);
  };

  const updateVariationEdit = (variant: Variant) => {
    setVariation(variant);
  };

  return <VariationContext.Provider value={{ variations, variationsSelected, variantPrices, showModalVariation, variationEdit, openModalVariation, closeModalVariation, saveVariations, updateVariations, removeVariant, updateVariantPrices, updateVariationEdit }}>{children}</VariationContext.Provider>;
}
