import { useEffect, useState } from 'react';
import { Variant, VariantValue } from '../interfaces';
import generateId from '../utils';
import Alert from './Alert';
import { useVariants } from '../hooks/useVariants';

export default function ModalVariation() {
  const [values, setValues] = useState<VariantValue[]>([]);
  const [variantSelected, setVariantSelected] = useState<Variant | null>(null);
  const [alert, setAlert] = useState<string>('');

  const { saveVariations, updateVariations, variations, variationEdit, closeModalVariation } = useVariants();

  useEffect(() => {
    if (variationEdit) {
      setVariantSelected(variationEdit);
      setValues(variationEdit.values);
    }
  }, [variationEdit]);

  const addValue = () => {
    setValues([...values, { id: generateId(), title: '' }]);
  };

  const removeValue = (id: string) => {
    setValues(values.filter((value) => value.id !== id));
  };

  const handleChangeValue = (id: string, title: string) => {
    setValues(values.map((value) => (value.id === id ? { ...value, title } : value)));
  };

  const selectVariant = (value: string) => {
    const newVariant = variations.find((variant) => variant.id === value);
    if (newVariant) {
      setVariantSelected((prev) => ({
        ...newVariant,
        values: prev ? prev.values : [],
      }));
      if (values.length === 0) addValue();
    }
  };

  const save = () => {
    if (!variantSelected) return setAlert('Selecciona una variación');
    if (values.length === 0) return setAlert('Agrega valores a la variación');
    if (values.some((value) => value.title.trim() === '')) return setAlert('Completa todos los valores');
    if (values.some((value) => values.filter((v) => v.title.trim().toLowerCase() === value.title.trim().toLowerCase()).length > 1)) return setAlert('Los valores deben ser únicos');

    const newVariant = { ...variantSelected, usage: true, values };

    if (!!variationEdit) {
      updateVariations(newVariant);
    } else {
      saveVariations(newVariant);
    }

    closeModalVariation();
    setVariantSelected(null);
    setValues([]);
    setAlert('');
  };

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModalVariation();
      }}
    >
      <section className="w-full max-w-[500px] bg-white rounded-lg max-h-full overflow-auto">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-1">{variationEdit ? `Editar variación (${variationEdit.title})` : 'Agregar variación'}</h2>
          <p className="text-sm text-gray-500 text-center">{variationEdit ? 'Edita la variación seleccionada.' : 'Agrega una nueva variación para tu producto.'}</p>
        </div>

        <div className="flex flex-col gap-4 w-full min-h-[160px] p-4">
          {alert && <Alert message={alert} />}

          <select
            className="w-full p-2 border border-gray-200 rounded-lg outline-none text-sm font-medium"
            value={variantSelected ? variantSelected.id : ''}
            onChange={({ target: { value } }) => {
              selectVariant(value);
            }}
          >
            <option value="" disabled>
              Selecciona una variación
            </option>
            {variations.map((variant) => (
              <option key={variant.id} value={variant.id} disabled={variant.usage} className="font-medium text-sm text-black disabled:text-gray-300">
                {variant.title}
              </option>
            ))}
          </select>

          {values.map((value, index) => (
            <div key={value.id} className="flex gap-2 animate-fade-in">
              <input type="text" title="Valor" name={`value-${index}`} value={value.title} onChange={(e) => handleChangeValue(value.id, e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none" placeholder="Valor" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
              <button type="button" className="text-red-400 hover:text-red-300 transition-all" onClick={() => removeValue(value.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          ))}

          <button type="button" className="flex items-center gap-2 p-1 text-sky-700 hover:underline hover:text-sky-600 transition-all text-sm w-fit" onClick={addValue}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <span>Agregar valores a la variación</span>
          </button>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button type="button" onClick={closeModalVariation} className="rounded-full border border-gray-200 px-6 py-2 text-gray-500 hover:text-gray-600 transition-all">
            Cancelar
          </button>
          <button type="button" onClick={save} className="rounded-full bg-black text-white px-6 py-2 hover:bg-gray-900 transition-all">
            Guardar
          </button>
        </div>
      </section>
    </section>
  );
}
