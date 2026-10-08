'use client';
import {useMemo, useState, useSyncExternalStore} from 'react';
import {ArrowUpRight, Search, X} from 'lucide-react';
import Link from './site-link';
import {directoryBrands, brandCategories, type DirectoryBrand} from '@/lib/brand-directory';
import {BrandBackdrop, brandStyle} from './brand-theme';

export function BrandMark({brand, eager = false}: {brand: DirectoryBrand; eager?: boolean}) {
  const [failedSource, setFailedSource] = useState<string>();
  return brand.logo && failedSource !== brand.logo
    // Local wordmarks preserve their supplied geometry across both rendering runtimes.
    // eslint-disable-next-line @next/next/no-img-element
    ? <img className={'directory-logo ' + (brand.logoOpaque ? 'opaque-logo' : '')} src={brand.logo} alt={brand.name} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedSource(brand.logo)} />
    : <span className={'directory-wordmark ' + (brand.serif ? 'serif' : '')}>{brand.name}</span>;
}

export function BrandRibbon({mn}: {mn: boolean}) {
  const count = directoryBrands.length;
  return <aside className="brand-ribbon" aria-label={mn ? 'Брэндийн лавлах' : 'Brand directory'}>
    <Link href="/brands" className="ribbon-label"><span>THE BRAND EDIT</span><small>{count} {mn ? 'брэнд · Лавлах' : 'brands · Directory'}</small><ArrowUpRight size={15} /></Link>
    <div className="ribbon-window"><div className="ribbon-track">{[0, 1].map(copy => <div className="ribbon-group" key={copy} aria-hidden={copy === 1}>
      {directoryBrands.map(brand => <Link key={brand.id} href={'/brands/' + brand.id} tabIndex={copy === 1 ? -1 : 0} aria-label={brand.name} title={brand.name}><BrandMark brand={brand} /></Link>)}
    </div>)}</div></div>
  </aside>;
}

function subscribeCategory(listener: () => void) {
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
}
function categorySnapshot() { return new URLSearchParams(window.location.search).get('category') || 'all'; }

export default function BrandDirectory({mn}: {mn: boolean}) {
  const sourceCategory = useSyncExternalStore(subscribeCategory, categorySnapshot, () => 'all');
  const [selection, setCategory] = useState<string | null>(null);
  const category = selection ?? (brandCategories.some(value => value.id === sourceCategory) ? sourceCategory : 'all');
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('all');
  const [limit, setLimit] = useState(30);
  const t = (mnText: string, enText: string) => mn ? mnText : enText;
  const filtered = useMemo(() => directoryBrands.filter(brand =>
    (category === 'all' || brand.categories.some(value => value === category)) &&
    brand.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()) &&
    (letter === 'all' || brand.name.charAt(0).toUpperCase() === letter)
  ), [category, query, letter]);
  function reset() { setCategory('all'); setQuery(''); setLetter('all'); setLimit(30); }
  return <section className="brand-directory">
    <div className="directory-heading"><div><span className="eyebrow">THE WORLD OF BEAUTY / 01—{directoryBrands.length}</span>
      <h1>{t('Гоо сайхны\nертөнц.', 'A universe\nof beauty.')}</h1>
      <p>{t('Брэнд бүр өөрийн өнгө, өөрийн ертөнцтэй. Таны гоо сайхны дараагийн сонголт эндээс эхэлнэ.', 'Every brand has a colour. Every colour, a world. Discover your next beauty ritual.')}</p>
    </div><div className="directory-emblem"><span>BEAUTY</span><i>{directoryBrands.length}</i><span>HOUSES / ONE EDIT</span></div></div>
    <div className="directory-toolbar"><div className="directory-categories" aria-label={t('Брэндийн ангилал', 'Brand categories')}>
      <button className={category === 'all' ? 'active' : ''} aria-pressed={category === 'all'} onClick={() => {setCategory('all'); setLimit(30);}}>{t('Бүгд', 'All brands')}<small>{directoryBrands.length}</small></button>
      {brandCategories.map(value => <button key={value.id} className={category === value.id ? 'active' : ''} aria-pressed={category === value.id} onClick={() => {setCategory(value.id); setLimit(30);}}>{mn ? value.mn : value.en}<small>{directoryBrands.filter(brand => brand.categories.includes(value.id)).length}</small></button>)}
    </div><label className="directory-search"><Search size={17} /><input value={query} onChange={event => {setQuery(event.target.value); setLimit(30);}} placeholder={t('Брэнд хайх…', 'Search brands…')} aria-label={t('Брэнд хайх', 'Search brands')} />{query && <button onClick={() => setQuery('')} aria-label={t('Хайлтыг цэвэрлэх', 'Clear search')}><X size={16} /></button>}</label></div>
    <div className="directory-alphabet"><button className={letter === 'all' ? 'active' : ''} onClick={() => {setLetter('all'); setLimit(30);}} aria-pressed={letter === 'all'}>ALL</button>
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(value => <button key={value} disabled={!directoryBrands.some(brand => brand.name.charAt(0).toUpperCase() === value)} aria-pressed={letter === value} className={letter === value ? 'active' : ''} onClick={() => {setLetter(value); setLimit(30);}}>{value}</button>)}
    </div>
    <div className="directory-results" aria-live="polite"><span>{String(filtered.length).padStart(2, '0')} {t('БРЭНД', 'BRANDS')}</span><span>{t('ӨӨРИЙН ӨНГӨ · ӨӨРИЙН ЕРТӨНЦ', 'INDIVIDUAL COLOURS · INDIVIDUAL WORLDS')}</span></div>
    <div className="directory-grid">{filtered.slice(0, limit).map(brand => <Link href={'/brands/' + brand.id} key={brand.id} className="directory-card" style={brandStyle(brand)} aria-label={t(brand.name + ' брэндтэй танилцах', 'Explore ' + brand.name)}>
      <BrandBackdrop brand={brand} compact />
      <div className="directory-card-top"><span>{String(directoryBrands.indexOf(brand) + 1).padStart(2, '0')} / THE EDIT</span><ArrowUpRight size={18} /></div>
      <div className="directory-card-mark"><BrandMark brand={brand} /></div>
      <div className="directory-card-bottom"><div><strong>{brand.name}</strong><span>{brand.categories.map(id => {const category = brandCategories.find(value => value.id === id)!; return mn ? category.mn : category.en;}).join(' / ')}</span></div><span className="directory-card-discover">{t('ТАНИЛЦАХ', 'DISCOVER')}</span></div>
    </Link>)}</div>
    {filtered.length === 0 && <div className="directory-empty"><h2>{t('Брэнд олдсонгүй.', 'No brands found.')}</h2><button className="button outline" onClick={reset}>{t('Шүүлтүүр цэвэрлэх', 'Reset filters')}</button></div>}
    {filtered.length > limit && <button className="directory-more" onClick={() => setLimit(value => value + 30)}>{t('Дараагийн брэндүүд', 'Discover more brands')}<span>{Math.min(30, filtered.length - limit)} ↓</span></button>}
    <p className="directory-disclosure">{t('Брэндүүдийн албан ёсны сайтаас санаа авсан бие даасан танилцуулга. Албан ёсны түншлэл, худалдааны эрхийг илэрхийлэхгүй.', 'An independent directory inspired by the brands’ official websites. Inclusion does not imply an official partnership or commerce authorization.')}</p>
  </section>;
}
