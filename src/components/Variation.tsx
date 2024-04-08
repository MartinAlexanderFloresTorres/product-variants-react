import { Variant } from '../interfaces';

interface VariationProps {
  variant: Variant;
  removeVariant: (id: string) => void;
  updateVariationEdit: (variant: Variant) => void;
}

export default function Variation({ variant, removeVariant, updateVariationEdit }: VariationProps) {
  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">{variant.title}</h2>
        <div className="flex items-center gap-2">
          <button type="button" className="text-red-400 hover:text-red-300 transition-all" onClick={() => removeVariant(variant.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-300 transition-all" onClick={() => updateVariationEdit(variant)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {variant.values.map((value) => (
          <p key={value.id} className="flex gap-3 items-center justify-center bg-gray-100 px-5 py-1 text-sm font-normal rounded-lg text-gray-400">
            {value.title}
          </p>
        ))}
      </div>
    </div>
  );
}
