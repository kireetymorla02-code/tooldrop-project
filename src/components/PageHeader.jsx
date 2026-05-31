export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <header className="page-header premium-header">
      <div>
        {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

export function SearchFilterBar({ search, onSearch, filters, activeFilter, onFilter }) {
  return (
    <div className="search-filter-bar">
      <input
        type="search"
        placeholder="Search…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="topbar-search"
        style={{ maxWidth: "100%" }}
      />
      {filters?.length > 0 && (
        <div className="filter-chips">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-chip ${activeFilter === f.id ? "active" : ""}`}
              onClick={() => onFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
