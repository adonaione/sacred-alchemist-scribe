import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ritualImage from "@/assets/ritual-anoint.jpg";

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: { id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> } }> };
  options: Array<{ name: string; values: string[] }>;
}

const ritualSteps = [
  { title: "Warm", desc: "Place 3–5 drops in your palms. Rub hands together gently to awaken the oil with your body's warmth." },
  { title: "Activate", desc: "Press your palms to your face and hold. Let the botanical resonance meet your skin." },
  { title: "Inhale", desc: "Breathe deeply. Let the frankincense anchor you into presence — grounding body and spirit." },
  { title: "Anoint", desc: "Gently press the oil into your face, neck, and décolletage. Move with intention, not haste." },
  { title: "Affirm", desc: "Speak your truth. Set your intention. You are anointed. You are luminous. You are sacred." },
];

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your vessel", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <p className="font-body text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const images = product.images.edges;
  const price = product.priceRange.minVariantPrice;
  const variant = product.variants.edges[0]?.node;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden bg-sand mb-4">
              {images[selectedImage]?.node && (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Sacred Creations</p>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-4">{product.title}</h1>
            <p className="font-display text-2xl text-primary mb-8">${parseFloat(price.amount).toFixed(2)}</p>

            {/* Three-part description */}
            <div className="space-y-6 mb-10">
              <div>
                <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">For the Skin</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Nourishment over noise. This elixir delivers deep hydration, luminous clarity, and a radiance that emerges from botanical integrity — not synthetic intervention.
                </p>
              </div>
              <div>
                <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">For the Spirit</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Ground into presence. Each application becomes a moment of ritual — a pause to reconnect with your own sacred frequency. Frankincense has been the bridge between the earthly and the divine for millennia.
                </p>
              </div>
              <div>
                <h3 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">The Botanicals</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Organic Jojoba Oil · Organic Castor Oil · Frankincense Essential Oil · Raw Frankincense Resin
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading || !variant?.availableForSale}
              className="w-full font-body text-xs tracking-[0.25em] uppercase bg-foreground text-background py-4 hover:bg-primary transition-colors duration-300 disabled:opacity-50 mb-4"
            >
              {isCartLoading ? "Adding..." : !variant?.availableForSale ? "Sold Out" : "Add to Vessel — $" + parseFloat(price.amount).toFixed(2)}
            </button>
            <p className="font-body text-xs text-muted-foreground text-center">1 oz · Handcrafted · Altar-Charged</p>
          </div>
        </div>

        {/* Ritual Section */}
        <section className="py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">The Ritual</p>
              <h2 className="font-display text-4xl font-light mb-10">How to <span className="italic">Anoint</span></h2>
              <div className="space-y-8">
                {ritualSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="font-display text-2xl text-primary/40 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-xl font-light italic mb-1">{step.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square overflow-hidden order-1 md:order-2">
              <img src={ritualImage} alt="The sacred anointing ritual" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
