'use client';
import {ArrowUpRight, ArrowLeft, ArrowRight, LockKeyhole} from 'lucide-react';
import Link from './site-link';
import {BrandMark} from './brand-directory';
import {BrandBackdrop, brandStyle} from './brand-theme';
import {brandCategories, directoryBrands, type DirectoryBrand} from '@/lib/brand-directory';

export default function BrandProfile({brand, mn}: {brand: DirectoryBrand; mn: boolean}) {
  const t = (mnText: string, enText: string) => mn ? mnText : enText;
  const index = directoryBrands.findIndex(value => value.id === brand.id);
  const next = directoryBrands[(index + 1) % directoryBrands.length];
  return <section className="brand-profile" style={brandStyle(brand)}>
    <BrandBackdrop brand={brand} />
    <div className="brand-profile-top"><Link href="/brands"><ArrowLeft size={16} />{t('Бүх брэнд', 'All brands')}</Link><span>THE BRAND EDIT / {String(index + 1).padStart(2, '0')}</span></div>
    <div className="brand-profile-heading">
      <span className="eyebrow">{brand.name.toUpperCase()} / BEAUTY HOUSE</span>
      <h1><BrandMark brand={brand} eager /></h1>
      <p className="brand-profile-mood">{mn ? brand.theme.labelMn : brand.theme.labelEn}<span>.</span></p>
      <div className="brand-profile-tags">{brand.categories.map(id => {const category = brandCategories.find(value => value.id === id)!; return <Link key={id} href={'/brands?category=' + id}>{mn ? category.mn : category.en}<ArrowUpRight size={12} /></Link>;})}</div>
      <a className="brand-official-link" href={brand.theme.website} target="_blank" rel="noopener noreferrer">{t('Албан ёсны сайт', 'Visit official website')}<ArrowUpRight size={14} /></a>
    </div>
    <div className="brand-profile-release">
      <span className="eyebrow">THE NEXT CHAPTER</span>
      <h2>{t('Дараагийн\nонцгой мөч.', 'A new moment,\nin the making.')}</h2>
      <div><LockKeyhole size={15} /><span>{t('Шинэ дроп хараахан нээгдээгүй', 'No approved drop is currently published')}</span></div>
      <p>{t('Баталгаажсан бүтээгдэхүүн, үнэ, нээлтийн хугацаа энд харагдана.', 'Authorized products, pricing and release dates will appear here.')}</p>
      <Link className="brand-profile-action" href="/upcoming">{t('Нээлтийн хуанли', 'The release calendar')}<ArrowUpRight size={17} /></Link>
    </div>
    <div className="brand-profile-bottom"><span>{t('БИЕ ДААСАН ТАНИЛЦУУЛГА · ТҮНШЛЭЛ БАТЛАГДААГҮЙ', 'INDEPENDENT BRAND DIRECTORY · PARTNERSHIP NOT CONFIRMED')}</span><Link href={'/brands/' + next.id}>{t('Дараагийн брэнд', 'Next house')}<strong>{next.name}</strong><ArrowRight size={16} /></Link></div>
  </section>;
}
