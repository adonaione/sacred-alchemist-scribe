import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 20 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your vessel", { description: product.node.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Sacred Creations</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">The Collection</h1>
          <div className="divider-gold mt-6" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              return (
                <div key={product.node.id} className="group">
                  <Link to={`/product/${product.node.handle}`} className="block">
                    <div className="aspect-square overflow-hidden bg-sand mb-4">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <h3 className="font-display text-xl font-light mb-1">{product.node.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">${parseFloat(price.amount).toFixed(2)}</p>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isCartLoading}
                    className="mt-3 w-full font-body text-xs tracking-[0.2em] uppercase border border-border text-foreground py-3 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
                  >
                    {isCartLoading ? "Adding..." : "Add to Vessel"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
