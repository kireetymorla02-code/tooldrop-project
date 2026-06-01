export default function VisualStrip({ title, images, compact = false }) {
  if (!images?.length) return null;

  return (
    <section className={`visual-strip ${compact ? "visual-strip-compact" : ""}`}>
      {title && <h3 className="visual-strip-title">{title}</h3>}
      <div className="visual-strip-grid">
        {images.map((item) => (
          <div key={item.src + item.label} className="visual-strip-item">
            <img src={item.src} alt={item.label || ""} loading="lazy" />
            {item.label && <span>{item.label}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function PageBanner({ src, alt = "" }) {
  if (!src) return null;
  return (
    <div className="page-banner">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
