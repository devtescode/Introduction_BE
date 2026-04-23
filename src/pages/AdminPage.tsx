import { Link } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";

import {
  fileToDataUrl,
  getIntroductionImages,
  saveIntroductionImages,
  type IntroductionImage,
  type IntroductionImageSlot,
} from "../lib/introduction-storage";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="min-h-screen bg-ceremony px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between border-b border-border pb-5">
          <Link to="/" className="font-display text-2xl font-semibold text-primary">
            T & R Introduction
          </Link>
          <Link to="/" className="bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            View landing page
          </Link>
        </nav>
        {isLoggedIn ? <Dashboard onLogout={() => setIsLoggedIn(false)} /> : <LoginPanel onLogin={() => setIsLoggedIn(true)} />}
      </div>
    </main>
  );
}

function LoginPanel({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim().toLowerCase() !== "intro2026") {
      setError("Use the preview password: intro2026");
      return;
    }
    setError("");
    onLogin();
  }

  return (
    <section className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Admin login</p>
        <h1 className="mt-3 max-w-3xl text-balance text-6xl font-semibold leading-none sm:text-7xl">
          Control the Introduction visuals from one elegant desk.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Upload bride, groom, and gallery photographs, then return to the landing page to see them displayed instantly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="border border-border bg-card p-6 shadow-ceremony sm:p-8">
        <label className="text-sm font-semibold uppercase text-primary" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-3 w-full border border-input bg-background px-4 py-4 text-foreground outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter admin password"
          type="password"
        />
        {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
        <button className="mt-5 w-full bg-gold px-5 py-4 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:bg-accent" type="submit">
          Open dashboard
        </button>
      </form>
    </section>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [images, setImages] = useState<IntroductionImage[]>([]);

  useEffect(() => {
    setImages(getIntroductionImages());
  }, []);

  function updateImages(nextImages: IntroductionImage[]) {
    setImages(nextImages);
    saveIntroductionImages(nextImages);
  }

  async function handleUpload(slot: IntroductionImageSlot, fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    const src = await fileToDataUrl(file);
    const image: IntroductionImage = {
      id: crypto.randomUUID(),
      slot,
      label: slot === "groom" ? "Groom portrait" : slot === "bride" ? "Bride portrait" : file.name.replace(/\.[^/.]+$/, ""),
      src,
      createdAt: new Date().toISOString(),
    };
    const withoutExistingPortrait = slot === "gallery" ? images : images.filter((item) => item.slot !== slot);
    updateImages([image, ...withoutExistingPortrait]);
  }

  function removeImage(id: string) {
    updateImages(images.filter((image) => image.id !== id));
  }

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Dashboard</p>
          <h1 className="mt-3 text-balance text-6xl font-semibold leading-none">Introduction media control room.</h1>
        </div>
        <button onClick={onLogout} className="border border-border bg-card px-5 py-3 font-semibold transition hover:bg-secondary" type="button">
          Log out
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <UploadPanel title="Groom portrait" slot="groom" onUpload={handleUpload} />
        <UploadPanel title="Bride portrait" slot="bride" onUpload={handleUpload} />
        <UploadPanel title="Gallery image" slot="gallery" onUpload={handleUpload} />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <figure key={image.id} className="overflow-hidden border border-border bg-card shadow-ceremony">
            <img src={image.src} alt={image.label} className="aspect-[4/3] w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-3 p-4">
              <span className="text-sm font-semibold capitalize">{image.label}</span>
              <button onClick={() => removeImage(image.id)} className="text-sm font-semibold text-destructive" type="button">
                Remove
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function UploadPanel({ title, slot, onUpload }: { title: string; slot: IntroductionImageSlot; onUpload: (slot: IntroductionImageSlot, fileList: FileList | null) => void }) {
  return (
    <label className="group cursor-pointer border border-border bg-card p-6 shadow-ceremony transition hover:-translate-y-1 hover:bg-secondary">
      <span className="block text-sm font-semibold uppercase text-primary">Upload</span>
      <span className="mt-2 block font-display text-4xl font-semibold">{title}</span>
      <span className="mt-5 block border border-dashed border-primary/45 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
        Choose image file
      </span>
      <input className="sr-only" type="file" accept="image/*" onChange={(event) => onUpload(slot, event.target.files)} />
    </label>
  );
}