type Props = {progress: number; mn: boolean};

// Original vector silhouettes keep the first screen independent of image downloads.
const silhouettes = [
  <g key="lipstick"><path d="M20 34h24v28H20zM24 22h16v12H24zM25 22V11l14-5v16"/><path d="M20 49h24"/></g>,
  <g key="serum"><rect x="18" y="25" width="28" height="37" rx="7"/><path d="M25 25V15h14v10M28 15V7h8v8M24 43h16M27 49h10"/></g>,
  <g key="compact"><circle cx="32" cy="32" r="23"/><circle cx="32" cy="32" r="17"/><path d="M25 55h14M21 20l8-4"/></g>,
  <g key="brush"><path d="M28 29h8v30a4 4 0 0 1-8 0zM25 24h14v5H25zM25 24c-8-9-8-17-3-20 3-2 5 0 6 1 2-5 6-5 8 0 4-4 9-2 10 3 1 5-3 11-7 16"/></g>,
  <g key="cream"><rect x="13" y="32" width="38" height="25" rx="7"/><rect x="12" y="25" width="40" height="7" rx="2"/><path d="M25 43h14M28 49h8"/></g>,
  <g key="perfume"><rect x="15" y="26" width="34" height="34" rx="6"/><path d="M25 26V17h14v9M23 17V7h18v10M25 40h14v11H25z"/></g>,
];

export default function CosmeticLoader({progress, mn}: Props) {
  const value = Math.max(0, Math.min(100, Math.round(progress)));
  return <div className="cosmetic-loader" role="progressbar" aria-label={mn ? 'Ачаалж байна' : 'Loading'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
    <div className="cosmetic-loader-content">
      <div className="cosmetic-loader-icons" aria-hidden="true">{silhouettes.map((shape, index) => <svg key={index} viewBox="0 0 64 68" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{animationDelay: `${index * .13}s`}}>{shape}</svg>)}</div>
      <span className="cosmetic-loader-percent">{value}<small>%</small></span>
      <div className="cosmetic-loader-track" aria-hidden="true"><span style={{transform: `scaleX(${value / 100})`}}/></div>
    </div>
  </div>;
}
