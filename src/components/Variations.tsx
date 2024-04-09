import VariantPricesEditor from './VariantPricesEditor';
import ModalVariation from './ModalVariation';
import { useVariants } from '../hooks/useVariants';
import Variation from './Variation';

export const Modal = () => {
  const { showModalVariation, variationEdit } = useVariants();

  return (showModalVariation || variationEdit) && <ModalVariation />;
};

export const Selecteds = () => {
  const { variationsSelected } = useVariants();
  return (
    variationsSelected.length > 0 && (
      <div className="flex flex-col gap-6 w-full">
        {variationsSelected.map((variant) => (
          <Variation key={variant.id} variant={variant} />
        ))}
      </div>
    )
  );
};

interface VariationsProps {
  defaultPrice: number;
  defaultStock: number;
}

export default function Variations({ defaultPrice = 0, defaultStock = 0 }: VariationsProps) {
  const { openModalVariation } = useVariants();

  return (
    <div className="flex flex-col gap-4 w-full">
      <button type="button" className="flex items-center gap-2 p-1 text-sky-700 hover:underline hover:text-sky-600 transition-all text-sm w-fit" onClick={openModalVariation}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <span>Agregar variaciones</span>
      </button>

      <Variations.Modal />
      <Variations.Selecteds />
      <Variations.Editor defaultPrice={defaultPrice} defaultStock={defaultStock} />
    </div>
  );
}

Variations.Modal = Modal;
Variations.Selecteds = Selecteds;
Variations.Editor = VariantPricesEditor;
