import ritualImage from "@/assets/ritual-anoint.jpg";
import altarImage from "@/assets/altar-process.jpg";

const Philosophy = () => {
  return (
    <div className="min-h-screen bg-background pt-28 md:pt-32">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 text-center mb-20">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">The Philosophy</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-6">The Master<br /><span className="italic">Builder</span></h1>
        <div className="divider-gold" />
        <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mt-8">
          Every creation follows a blueprint older than industry itself — the sacred architecture of nature, frequency, and divine proportion.
        </p>
      </section>

      {/* The Altar */}
      <section className="section-padding bg-sand">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="aspect-square overflow-hidden">
            <img src={altarImage} alt="The sacred altar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Pillar I</p>
            <h2 className="font-display text-4xl font-light mb-6">The Altar</h2>
            <div className="font-body text-sm text-foreground/80 leading-[1.9] space-y-4">
              <p>
                The altar is not a workspace — it is a threshold. A consecrated space where the material and the sacred converge. Every bottle of Liquid Gold begins here, in the presence of crystals, candles, and prayer.
              </p>
              <p>
                This is where we set intention. Where we ask the botanicals to carry more than moisture — to carry frequency. The altar is the origin point, and its resonance permeates every vessel that leaves it.
              </p>
              <p>
                We do not believe in factory floors. We believe in sacred ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Frequency */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Pillar II</p>
            <h2 className="font-display text-4xl font-light mb-6">The Frequency</h2>
            <div className="font-body text-sm text-foreground/80 leading-[1.9] space-y-4">
              <p>
                Everything vibrates. Water responds to intention. Crystals hold and amplify energy. Essential oils carry their own measurable frequencies — frankincense among the highest.
              </p>
              <p>
                When we charge each bottle on a crystal grid surrounded by sacred geometry, we are not performing ritual for aesthetics. We are encoding the oil with a vibrational signature that speaks to the body's own electromagnetic field.
              </p>
              <p>
                This is the science beneath the sacred. And it is the reason Liquid Gold feels different — because it resonates at a frequency your body recognizes.
              </p>
            </div>
          </div>
          <div className="aspect-square overflow-hidden order-1 md:order-2">
            <img src={ritualImage} alt="Frequency and sacred geometry" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* The Golden Ratio */}
      <section className="section-padding bg-sand">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Pillar III</p>
          <h2 className="font-display text-4xl font-light mb-8">The Golden Ratio</h2>
          <div className="font-body text-sm text-foreground/80 leading-[1.9] space-y-4 text-left md:text-center">
            <p>
              Phi — 1.618 — is the mathematical signature of beauty itself. It governs the spiral of a nautilus shell, the proportions of the human face, and the unfurling of a rose. It is nature's blueprint for harmony.
            </p>
            <p>
              Our formulations are guided by this principle of divine proportion. The ratio of carrier oils to essential oils, the relationship between each botanical — all calibrated to create a synergy that mirrors the balance found in nature's most elegant designs.
            </p>
            <p>
              This is why our oil does not merely sit on the surface. It integrates. It harmonizes. Like Phi itself, it creates balance where there was discord, and beauty where there was simply skin.
            </p>
          </div>
          <div className="mt-12">
            <span className="font-display text-8xl md:text-9xl font-light text-primary/20">φ</span>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="section-padding text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-light italic mb-6">
            "What is sacred is never rushed.<br />What is true needs no explanation."
          </h2>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">— Sacred Creations</p>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
