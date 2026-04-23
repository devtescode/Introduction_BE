import heroImage from "../assets/nikkah-hero.jpg";
import { useEffect, useMemo, useState } from "react";

import { getIntroductionImages, type IntroductionImage } from "../lib/introduction-storage";

const couple = [
  {
    role: "Groom",
    name: "Agboola Toheeb Akinyemi",
    initials: "AT",
    note: "A refined portrait space for the groom’s photograph, framed for a formal Introduction ceremony presentation.",
  },
  {
    role: "Bride",
    name: "Adewale Roqeebat Ololade",
    initials: "AR",
    note: "A graceful portrait space for the bride’s photograph, designed to keep her image elegant and prominent.",
  },
];

const eventDetails = [
  ["Event", "Introduction Ceremony"],
  ["Date", "10 May 2026"],
  ["Location", "Bintinlaye, Ajimosin, Ibadan"],
  ["Landmark", "Tobest Block Industry"],
];

const directionSteps = [
  "From anywhere, take a cab going to Academy–Olomi.",
  "From Academy Bridge top, take a bike or maruwa going to Olunde.",
  "After dropping at Olunde, take a bike going to Ajimosin.",
  "Drop at Tobest Block Industry in Bintinlaye.",
];

const gallery = ["Family arrival", "Bride portrait", "Groom portrait", "Traditional decor", "Blessing moment", "Guest celebration"];

export function IntroductionPage() {
  const [images, setImages] = useState<IntroductionImage[]>([]);

  useEffect(() => {
    const syncImages = () => setImages(getIntroductionImages());
    syncImages();
    window.addEventListener("storage", syncImages);
    window.addEventListener("introduction-images-updated", syncImages);

    return () => {
      window.removeEventListener("storage", syncImages);
      window.removeEventListener("introduction-images-updated", syncImages);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-ceremony text-foreground">
      <HeroSection />
      <CoupleSection images={images} />
      <EventSection />
      <GallerySection images={images} />
      <ResponseSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[92vh] px-5 py-5 sm:px-8 lg:px-12">
      <img
        src={heroImage}
        alt="Elegant emerald and gold Introduction ceremony decor"
        width={1600}
        height={960}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-veil" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-veil-foreground/20 pb-5 text-veil-foreground">
        <span className="font-display text-2xl font-semibold">T & R</span>
        <div className="hidden items-center gap-7 text-sm sm:flex">
          <a className="transition hover:text-gold" href="#couple">Couple</a>
          <a className="transition hover:text-gold" href="#event">Event</a>
          <a className="transition hover:text-gold" href="#location">Location</a>
          <a className="transition hover:text-gold" href="#gallery">Gallery</a>
          <a className="border border-veil-foreground/30 px-3 py-2 transition hover:border-gold hover:text-gold" href="/admin">Admin</a>
        </div>
      </nav>
      <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-7xl items-end pb-8 pt-20 text-veil-foreground">
        <div className="max-w-5xl">
          <p className="mb-4 inline-flex border border-veil-foreground/30 px-4 py-2 text-sm uppercase tracking-normal text-gold">
            10 May 2026 · Ibadan
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.94] sm:text-7xl lg:text-8xl">
            Introduction Ceremony
          </h1>
          <p className="mt-5 max-w-3xl font-display text-3xl leading-tight text-veil-foreground sm:text-5xl">
            Agboola Toheeb Akinyemi & Adewale Roqeebat Ololade
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-veil-foreground/86">
            A polished celebration page for family, guests, portraits, directions, and the memorable beginning of a beautiful union.
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-background/10 text-center font-display text-gold backdrop-blur-md animate-float-soft lg:flex">
        Intro<br />2026
      </div>
    </section>
  );
}

function CoupleSection({ images }: { images: IntroductionImage[] }) {
  const imageBySlot = useMemo(
    () => ({
      Groom: images.find((image) => image.slot === "groom"),
      Bride: images.find((image) => image.slot === "bride"),
    }),
    [images],
  );

  return (
    <section id="couple" className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">The couple</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold">Portrait-led profiles for the bride and groom.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {couple.map((person) => (
            <article key={person.role} className="grid overflow-hidden border border-border bg-card shadow-ceremony sm:grid-cols-[0.95fr_1.05fr]">
              <figure className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-primary via-surface to-gold p-5">
                <div className="absolute inset-5 border border-veil-foreground/35" />
                {imageBySlot[person.role as "Groom" | "Bride"] ? (
                  <img
                    src={imageBySlot[person.role as "Groom" | "Bride"]?.src}
                    alt={`${person.name} ${person.role.toLowerCase()} portrait`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex aspect-[3/4] w-full max-w-[250px] items-center justify-center border border-veil-foreground/50 bg-background/20 font-display text-7xl text-veil-foreground backdrop-blur-md">
                      {person.initials}
                    </div>
                  </div>
                )}
                <figcaption className="absolute bottom-8 left-8 bg-background/85 px-4 py-3 font-semibold text-foreground backdrop-blur-sm">
                  {person.role} photo
                </figcaption>
              </figure>
              <div className="flex flex-col justify-end p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase text-gold">{person.role}</p>
                <h3 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">{person.name}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{person.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventSection() {
  const destination = "Tobest Block Industry, Bintinlaye, Ajimosin, Ibadan, Nigeria";
  const encodedDestination = encodeURIComponent(destination);
  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=driving`;
  const fallbackMapUrl = `https://www.openstreetmap.org/search?query=${encodedDestination}`;

  function openDirections() {
    const mapWindow = window.open("about:blank", "_blank", "noopener,noreferrer");

    if (!navigator.geolocation) {
      if (mapWindow) mapWindow.location.href = navigationUrl;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const origin = `${coords.latitude},${coords.longitude}`;
        const liveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodedDestination}&travelmode=driving`;
        if (mapWindow) mapWindow.location.href = liveDirectionsUrl;
      },
      () => {
        if (mapWindow) mapWindow.location.href = navigationUrl;
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <section id="event" className="bg-surface px-5 py-20 text-surface-foreground sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Event details</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold">Introduction only, hosted in Ibadan.</h2>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {eventDetails.map(([label, value]) => (
              <div key={label} className="border border-border bg-card p-5">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div id="location" className="border border-border bg-card p-5 shadow-ceremony sm:p-7">
          <p className="text-sm font-semibold uppercase text-primary">Location guide</p>
          <ol className="mt-5 grid gap-4">
            {directionSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-xl text-primary-foreground">
                  {index + 1}
                </span>
                <span className="border-b border-border pb-4 leading-7 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={openDirections}
            className="mt-6 inline-flex w-full items-center justify-center bg-primary px-5 py-4 text-center font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Navigate from my current location
          </button>
          <a className="mt-3 inline-flex w-full items-center justify-center border border-border bg-background px-5 py-3 text-center font-semibold text-foreground transition hover:bg-secondary" href={fallbackMapUrl} target="_blank" rel="noreferrer">
            Open location without Google
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl overflow-hidden border border-border bg-card shadow-ceremony">
        <iframe
          title="OpenStreetMap location for Bintinlaye, Ajimosin, Ibadan"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=3.78%2C7.31%2C4.08%2C7.52&layer=mapnik&marker=7.415%2C3.93`}
          className="h-[420px] w-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function GallerySection({ images }: { images: IntroductionImage[] }) {
  const uploadedGallery = images.filter((image) => image.slot === "gallery");

  return (
    <section id="gallery" className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Gallery</p>
            <h2 className="mt-3 text-5xl font-semibold">Ceremony gallery</h2>
          </div>
          <p className="max-w-md text-muted-foreground">Bride, groom, family, and ceremony images can be placed here in a clean editorial grid.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploadedGallery.map((image, index) => (
            <figure key={image.id} className="group aspect-[4/3] overflow-hidden border border-border bg-card">
              <img src={image.src} alt={image.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="-mt-16 ml-5 inline-flex bg-background/85 px-4 py-3 font-semibold backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} · {image.label}
              </figcaption>
            </figure>
          ))}
          {gallery.slice(uploadedGallery.length).map((item, index) => (
            <figure key={item} className="group aspect-[4/3] overflow-hidden border border-border bg-card">
              <div className="flex h-full items-end bg-gradient-to-br from-primary via-surface to-gold p-5 transition duration-500 group-hover:scale-105">
                <figcaption className="bg-background/85 px-4 py-3 font-semibold backdrop-blur-sm">
                  {String(uploadedGallery.length + index + 1).padStart(2, "0")} · {item}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResponseSection() {
  return (
    <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-gold">Guest response</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold">A refined invitation response area for invited guests.</h2>
        </div>
        <form className="grid gap-4 border border-primary-foreground/20 bg-primary-foreground/8 p-5 backdrop-blur-sm sm:p-7" onSubmit={(event) => event.preventDefault()}>
          <input className="border border-primary-foreground/25 bg-background/95 px-4 py-3 text-foreground outline-none ring-ring transition focus:ring-2" placeholder="Guest name" />
          <input className="border border-primary-foreground/25 bg-background/95 px-4 py-3 text-foreground outline-none ring-ring transition focus:ring-2" placeholder="Phone number" />
          <button className="bg-gold px-5 py-4 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring" type="submit">
            Submit response preview
          </button>
        </form>
      </div>
    </section>
  );
}