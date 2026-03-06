import altarImage from "@/assets/altar-process.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-28 md:pt-32">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 text-center mb-20">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Story</p>
        <h1 className="font-display text-5xl md:text-6xl font-light mb-6">A Return to<br /><span className="italic">the Essential</span></h1>
        <div className="divider-gold" />
      </section>

      {/* Narrative */}
      <section className="max-w-2xl mx-auto px-6 md:px-12 mb-20">
        <div className="space-y-8 font-body text-sm text-foreground/80 leading-[1.9]">
          <p>
            There was a time when the oils we placed upon our skin were considered sacred. They were pressed by hand, blessed with intention, and applied as an act of reverence — not routine. Somewhere along the way, beauty became an industry of excess: synthetic fragrances, endless ingredient lists, and promises built on noise rather than nourishment.
          </p>
          <p>
            Sacred Creations was born from a desire to return. To strip away the unnecessary and remember what the ancients knew: that the most potent remedies are the simplest ones, and that true radiance is not manufactured — it is cultivated through integrity.
          </p>
          <p>
            Every creation that leaves our altar is a testament to this philosophy. We do not formulate for trends. We formulate for resonance. Our botanicals are organic, unrefined, and chosen with the same care one would use in selecting stones for a sacred temple.
          </p>
          <p>
            We believe that what you place upon your skin should honor your body, your spirit, and the earth from which it came. This is the foundation of Sacred Creations — and it is the frequency embedded in every drop of Liquid Gold.
          </p>
        </div>
      </section>

      {/* Image Break */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-20">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={altarImage} alt="The sacred altar where each creation begins" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Sacred Creations LLC */}
      <section className="max-w-2xl mx-auto px-6 md:px-12 pb-20 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">The Vessel</p>
        <h2 className="font-display text-3xl font-light mb-6">Sacred Creations LLC</h2>
        <p className="font-body text-sm text-foreground/80 leading-[1.9] max-w-lg mx-auto">
          Sacred Creations LLC is the parent vessel through which these botanical elixirs are brought into the world. It exists not as a corporation, but as a container for sacred work — a bridge between the alchemist's altar and those who are called to receive.
        </p>
      </section>
    </div>
  );
};

export default About;
