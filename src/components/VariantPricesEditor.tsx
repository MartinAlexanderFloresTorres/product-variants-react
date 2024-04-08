import { useVariants } from '../hooks/useVariants';
import { VariantPrice } from '../interfaces';

interface VariantPricesEditorProps {
  defaultPrice: number;
  defaultStock: number;
}

export default function VariantPricesEditor({ defaultPrice = 0, defaultStock = 0 }: VariantPricesEditorProps) {
  const { variantPrices, updateVariantPrices } = useVariants();

  const handlePriceChange = ({ variantId, price, stock }: { variantId: string; price: string | number; stock: string | number }) => {
    const newVariantPrices: VariantPrice[] = variantPrices.map((variantPrice) => {
      if (variantPrice.id === variantId) {
        return {
          ...variantPrice,
          variant: {
            ...variantPrice.variant,
            price,
            stock,
          },
        };
      }
      return variantPrice;
    });

    updateVariantPrices(newVariantPrices);
  };

  const variantPricesAreEqual = () => {
    const newVariantPrices = variantPrices.map((variantPrice) => {
      return {
        ...variantPrice,
        variant: {
          ...variantPrice.variant,
          price: defaultPrice,
        },
      };
    });

    updateVariantPrices(newVariantPrices);
  };

  const variantStockAreEqual = () => {
    const newVariantPrices = variantPrices.map((variantPrice) => {
      return {
        ...variantPrice,
        variant: {
          ...variantPrice.variant,
          stock: defaultStock,
        },
      };
    });

    updateVariantPrices(newVariantPrices);
  };

  if (!variantPrices.length) return null;

  return (
    <div className="w-full bg-gray-50 bg-opacity-80 px-5 py-3 rounded-lg border border-gray-100 mt-4">
      <h3 className="text-[16px] font-bold text-gray-600">Precios y stock</h3>

      <section className="flex flex-col">
        {(defaultPrice > 0 || defaultStock > 0) && (
          <div className="flex items-center justify-end gap-3 border-b border-gray-200 py-2">
            {defaultPrice && (
              <button type="button" className="flex items-center gap-2 p-1 text-sky-700 hover:underline hover:text-sky-600 transition-all text-sm w-fit" onClick={variantPricesAreEqual}>
                Establecer los mismos precios
              </button>
            )}

            {defaultStock > 1 && (
              <button type="button" onClick={variantStockAreEqual} className="flex items-center gap-2 p-1 text-sky-700 hover:underline hover:text-sky-600 transition-all text-sm w-fit">
                Establecer los mismos stocks
              </button>
            )}
          </div>
        )}

        {variantPrices.map((variantPrice, index) => (
          <div key={variantPrice.id} className="flex items-center gap-3 border-b border-gray-200 border-opacity-80 py-2 animate-fade-in">
            <div className="flex items-center justify-center text-center bg-black text-white rounded-md w-[30px] h-[30px] text-sm">{index + 1}</div>
            <div className="flex items-center justify-between gap-2 w-full">
              <p className="block md:text-sm text-xs text-gray-400">{variantPrice.variant.options.map((o) => o.title).join(' • ')}</p>
              <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                <input type="number" title="Precio" name="price" value={variantPrice.variant.price} onChange={(e) => handlePriceChange({ variantId: variantPrice.id, price: e.target.value, stock: variantPrice.variant.stock })} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" placeholder="Precio" />
                <input type="number" title="Stock" name="stock" value={variantPrice.variant.stock} onChange={(e) => handlePriceChange({ variantId: variantPrice.id, price: variantPrice.variant.price, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" placeholder="Stock" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
