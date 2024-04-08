import { useContext } from 'react';
import { VariationContext } from '../provider/VariationProvider';

export function useVariants() {
  return useContext(VariationContext);
}
