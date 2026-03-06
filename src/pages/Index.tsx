import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-liquid-gold.jpg";
import altarImage from "@/assets/altar-process.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 10 });
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
    toast.success("Added to your vessel", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Liquid Gold botanical anointing oil" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto animate-fade-in">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-cream/70 mb-6">Sacred Creations</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[0.95] mb-8">
            Ancient Wisdom,<br />
            <span className="italic">Luminous</span> Skin
          </h1>
          <p className="font-body text-sm md:text-base text-cream/80 max-w-md mx-auto mb-10 leading-relaxed">
            A botanical anointing oil, birthed in prayer and charged on a sacred altar. Where skincare becomes ceremony.
          </p>
          <Link
            to="/shop"
            className="inline-block font-body text-xs tracking-[0.25em] uppercase border border-cream/50 text-cream px-10 py-4 hover:bg-cream/10 transition-all duration-300"
          >
            Discover the Elixir
          </Link>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">The Essence</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">Three Pillars of Resonance</h2>
          <div className="divider-gold mt-6" />
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              title: "Pure",
              desc: "Every ingredient is organic, unrefined, and chosen with reverence. No synthetics. No fillers. Only what the earth offers in its highest integrity.",
            },
            {
              title: "Sacred",
              desc: "Each bottle is birthed in prayer, charged on a sacred altar with crystals and sacred geometry. This is not a product — it is a vibrational remedy.",
            },
            {
              title: "Radiant",
              desc: "The result of ancient botanical wisdom meeting luminous intention. Skin that glows from a place deeper than the surface — a radiance that resonates.",
            },
          ].map((pillar) => (
            <div key={pillar.title} className="text-center">
              <h3 className="font-display text-3xl font-light italic text-primary mb-4">{pillar.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alchemist's Process */}
      <section className="section-padding bg-sand">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">The Process</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8">The Alchemist's<br /><span className="italic">Ritual</span></h2>
            <div className="space-y-6">
              {[
                "Each creation begins at the altar — a consecrated space where intention meets matter.",
                "Organic botanicals are hand-blended in sacred proportions, guided by the golden ratio and ancient formulation wisdom.",
                "The elixir rests upon a crystal grid, absorbing the resonance of rose quartz, amethyst, and clear quartz — amplified by sacred geometry patterns.",
                "Every bottle is sealed with prayer, creating a vessel that carries not just oil, but frequency.",
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-display text-2xl text-primary/40 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={altarImage} alt="Sacred altar with crystals and sacred geometry" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="section-padding">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">The Collection</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">Sacred Vessels</h2>
            <div className="divider-gold mt-6" />
          </div>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="font-body text-muted-foreground">No products found</p>
              </div>
            ) : (
              products.map((product) => {
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
              })
            )}
          </div>
        </section>
      )}

      {/* Social Proof Placeholder */}
      <section className="section-padding bg-sand">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Resonance</p>
          <h2 className="font-display text-4xl font-light italic mb-12">Voices of the Anointed</h2>
          <div className="space-y-10">
            <div className="border-t border-border pt-8">
              <p className="font-display text-xl font-light italic text-muted-foreground leading-relaxed">
                "Testimonials from those who have experienced the sacred resonance of Liquid Gold will appear here."
              </p>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mt-4">— Future Testimonial</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Begin Your<br /><span className="italic">Anointing</span></h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Step into the sacred. Discover an elixir that honors both your skin and your spirit.
          </p>
          <Link
            to="/shop"
            className="inline-block font-body text-xs tracking-[0.25em] uppercase bg-foreground text-background px-12 py-4 hover:bg-primary transition-colors duration-300"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
