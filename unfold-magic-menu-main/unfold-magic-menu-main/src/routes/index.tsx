import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, BookOpen, BriefcaseBusiness, Check, ChevronDown, Compass, GraduationCap, Headphones, Menu, Plus, Search, School, X, Zap, HeartPulse, BarChart3, Scale, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/yolumu-hero.png.asset.json";

type IconType = typeof Compass;
const quizUrl = "https://claude.ai/artifact/9sEaRvdK8kX22k7qu4uFdL";
const links = [
  { label: "Ana səhifə", href: "#home" },
  { label: "İxtisaslar", href: "#guides" },
  { label: "Universitetlər", href: "#universities" },
  { label: "Necə işləyir?", href: "#how" },
  { label: "Abunəliklər", href: "#pricing" },
];
const benefits: { icon: IconType; title: string; description: string }[] = [
  { icon: Compass, title: "Özünü kəşf et", description: "Maraqlarını və güclü tərəflərini tanı, sənə uyğun istiqaməti tap." },
  { icon: GraduationCap, title: "İxtisasını seç", description: "Universitet və ixtisasları daha aydın müqayisə et." },
  { icon: BriefcaseBusiness, title: "Gələcəyini qur", description: "Seçdiyin sahənin imkanları ilə yaxından tanış ol." },
  { icon: Headphones, title: "Dəstək al", description: "Qərar verərkən tək olmadığını bil." },
];
const careers: { icon: IconType; title: string; description: string; tag: string }[] = [
  { icon: BookOpen, title: "Texnologiya və Data", description: "Kod yazmaqdan süni intellektə qədər rəqəmsal dünyanı quran ixtisaslar.", tag: "Sürətlə böyüyür" },
  { icon: Zap, title: "Mühəndislik və Enerji", description: "Böyük sistemləri layihələndirən və quran güclü bir sahə.", tag: "Yaşıl enerji" },
  { icon: HeartPulse, title: "Sağlamlıq", description: "İnsan həyatına birbaşa təsir edən, hər zaman aktual sahə.", tag: "Daim aktual" },
  { icon: BarChart3, title: "Biznes və Maliyyə", description: "Layihə qurmaq, böyütmək və rəqəmlərlə düşünmək istəyənlər üçün.", tag: "Yüksək tələbat" },
  { icon: Scale, title: "Hüquq və Media", description: "Sözlə inandıran, ədaləti və məlumatı müdafiə edən ixtisaslar.", tag: "Geniş imkanlar" },
  { icon: Palette, title: "Yaradıcılıq və Dizayn", description: "Estetika ilə funksionallığı birləşdirən yaradıcı istiqamət.", tag: "Artan sahə" },
];
type University = { name: string; city: string; majors: string[] };
const initialUniversities: University[] = [
  { name: "Bakı Dövlət Universiteti", city: "Bakı", majors: ["Hüquq", "İqtisadiyyat", "Kompüter elmləri", "Jurnalistika"] },
  { name: "Azərbaycan Dövlət Neft və Sənaye Universiteti", city: "Bakı", majors: ["Neft-qaz mühəndisliyi", "Energetika", "İnformasiya texnologiyaları"] },
  { name: "Azərbaycan Tibb Universiteti", city: "Bakı", majors: ["Müalicə işi", "Stomatologiya", "Əczaçılıq"] },
  { name: "Azərbaycan Dövlət İqtisad Universiteti", city: "Bakı", majors: ["Maliyyə", "Marketinq", "Biznesin idarə edilməsi"] },
  { name: "Azərbaycan Memarlıq və İnşaat Universiteti", city: "Bakı", majors: ["Memarlıq", "İnşaat mühəndisliyi", "Dizayn"] },
  { name: "Gəncə Dövlət Universiteti", city: "Gəncə", majors: ["Pedaqogika", "Filologiya", "Riyaziyyat"] },
];
const steps = [
  { number: "01", title: "Maraqlarını tanı", description: "Güclü tərəflərin və maraqların haqqında düşün." },
  { number: "02", title: "Sahələri araşdır", description: "İxtisasları və gələcək imkanlarını müqayisə et." },
  { number: "03", title: "Yolunu müəyyən et", description: "Sənə uyğun istiqamətə daha əmin addımla yönəl." },
];
function Logo() {
  return <a className="brand" href="#home" aria-label="Yolumu tap — Ana səhifə">
    <span className="brand-mark"><Compass size={27} strokeWidth={2.2} /></span>
    <span className="brand-text"><strong>Yolumu tap<span className="brand-dot">.</span></strong><small>Gələcəyin üçün doğru istiqamət</small></span>
  </a>;
}
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUni, setNewUni] = useState({ name: "", city: "", majors: "" });
  const q = query.trim().toLowerCase();
  const filtered = universities.filter(u => !q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.majors.some(m => m.toLowerCase().includes(q)));
  const addUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUni.name.trim()) return;
    setUniversities(list => [...list, { name: newUni.name.trim(), city: newUni.city.trim() || "Bakı", majors: newUni.majors.split(",").map(m => m.trim()).filter(Boolean) }]);
    setNewUni({ name: "", city: "", majors: "" });
    setShowForm(false);
  };
  return <main id="home">
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Əsas menyu">
          <a href="#home" className="nav-current">Ana səhifə</a>
          <div className="nav-dropdown">
            <a href="#guides" aria-label="İxtisaslar bölməsinə keç">İxtisaslar <ChevronDown size={16} /></a>
            <div className="dropdown-panel">
              <p>İSTİQAMƏTİNİ SEÇ</p>
              <a href="#guides"><GraduationCap size={19} /><span><strong>Sahələri kəşf et</strong><small>6 karyera istiqamətini tanı</small></span><ArrowRight size={16} /></a>
              <a href="#how"><Compass size={19} /><span><strong>Necə işləyir?</strong><small>Yol xəritənə nəzər sal</small></span><ArrowRight size={16} /></a>
              <a href="#pricing"><Zap size={19} /><span><strong>Özünü kəşf et</strong><small>Abunəlik seçimlərinə bax</small></span><ArrowRight size={16} /></a>
            </div>
          </div>
          <a href="#universities">Universitetlər</a>
          <a href="#how">Haqqımızda</a>
          <a href="#pricing">Abunəliklər</a>
        </nav>
        <div className="header-actions">
          <Button variant="outline" size="sm" asChild className="header-cta"><a href="#pricing">Özünü kəşf et <ArrowRight size={16} /></a></Button>
          <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobil menyu">{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowRight size={17} /></a>)}</nav>}
    </header>

    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> KARYERA YOLUN BURADAN BAŞLAYIR</span>
          <h1 id="hero-heading">Yolumu <em>tap.</em></h1>
          <p>Öz bacarıqlarını kəşf et, sənə uyğun ixtisası seç və gələcəyinə inamla addım at.</p>
          <Button asChild size="lg" className="hero-button"><a href="#pricing">Özünü kəşf et <ArrowRight size={19} /></a></Button>
          <div className="hero-note"><span className="hero-note-icon"><Check size={14} /></span> İlk addım hər zaman pulsuzdur</div>
        </div>
        <div className="hero-image"><img src={heroAsset.url} alt="Təhsil, karyera və uğura aparan yola baxan gənc" /></div>
      </div>
      <a className="hero-scroll" href="#benefits" aria-label="Aşağıdakı hissəyə keç"><ArrowDown size={17} /> KƏŞF ETMƏYƏ DAVAM ET</a>
    </section>

    <section id="benefits" className="benefits section-space"><div className="container">
      <div className="section-intro"><span className="section-kicker">SƏNİN ÜÇÜN</span><h2>Hər böyük yol bir addımla başlayır.</h2></div>
      <div className="benefit-grid">{benefits.map(({icon: Icon,title,description}, i) => <div className="benefit" key={title}><span className="benefit-count">0{i+1}</span><span className="benefit-icon"><Icon size={24} strokeWidth={1.8}/></span><h3>{title}</h3><p>{description}</p></div>)}</div>
    </div></section>

    <section id="guides" className="guides-section section-space"><div className="container">
      <div className="section-head"><div><span className="section-kicker">İXTİSAS BƏLƏDÇİSİ</span><h2>Hansı yol sənə uyğundur?</h2></div><p>Qərar verməzdən əvvəl sahələri tanı. Hər istiqamətin öz imkanlarını kəşf et.</p></div>
      <div className="career-grid">{careers.map(({icon: Icon,title,description,tag}) => <article className="career" key={title}><span className="career-icon"><Icon size={25} strokeWidth={1.8}/></span><span className="career-tag">{tag}</span><h3>{title}</h3><p>{description}</p><a href="#pricing" aria-label={`${title} üçün abunəliklərə bax`}>Daha ətraflı <ArrowRight size={17}/></a></article>)}</div>
    </div></section>

    <section id="universities" className="universities-section section-space"><div className="container">
      <div className="section-head"><div><span className="section-kicker">KOLLEC VƏ UNİVERSİTETLƏR</span><h2>Universitetini və ixtisasını tap.</h2></div><p>Axtarışa universitet, şəhər və ya ixtisas adı yaz — sənə uyğun variantları dərhal gör.</p></div>
      <div className="uni-toolbar">
        <label className="uni-search"><Search size={18} /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Universitet və ya ixtisas axtar…" aria-label="Universitet və ixtisas axtarışı" /></label>
        <Button variant="outline" onClick={() => setShowForm(v => !v)}><Plus size={17} /> Universitet əlavə et</Button>
      </div>
      {showForm && <form className="uni-form" onSubmit={addUniversity}>
        <input required value={newUni.name} onChange={e => setNewUni(v => ({ ...v, name: e.target.value }))} placeholder="Universitet və ya kollec adı" aria-label="Universitet adı" />
        <input value={newUni.city} onChange={e => setNewUni(v => ({ ...v, city: e.target.value }))} placeholder="Şəhər" aria-label="Şəhər" />
        <input value={newUni.majors} onChange={e => setNewUni(v => ({ ...v, majors: e.target.value }))} placeholder="İxtisaslar (vergüllə ayır)" aria-label="İxtisaslar" />
        <Button type="submit">Əlavə et</Button>
      </form>}
      <div className="uni-grid">{filtered.map(u => <article className="uni-card" key={u.name}><span className="uni-icon"><School size={22} strokeWidth={1.8} /></span><h3>{u.name}</h3><p className="uni-city">{u.city}</p><div className="uni-majors">{u.majors.map(m => <span key={m}>{m}</span>)}</div></article>)}</div>
      {filtered.length === 0 && <p className="uni-empty">Heç nə tapılmadı — başqa açar söz yoxla və ya öz universitetini əlavə et.</p>}
    </div></section>

    <section id="how" className="how-section section-space"><div className="container">
      <div className="section-intro"><span className="section-kicker">SADƏ BİR YOL XƏRİTƏSİ</span><h2>Gələcəyinə daha aydın bax.</h2><p>Özünü tanımaqdan doğru istiqaməti seçməyə qədər.</p></div>
      <div className="steps">{steps.map(step => <div className="step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div>
    </div></section>

    <section id="pricing" className="pricing-section section-space"><div className="container">
      <div className="section-intro"><span className="section-kicker">ABUNƏLİKLƏR</span><h2>Öz yolunu seç.</h2><p>Pulsuz başla, ehtiyac duyduqca daha dərinə get.</p></div>
      <div className="plans">
        <article className="plan"><div className="plan-top"><span className="plan-name">PULSUZ</span><h3>İlk addım</h3><p>Yolunu ilk dəfə tapmaq üçün.</p><div className="plan-price">0 AZN</div></div><ul><li><Check size={18}/>1 tam test və nəticə</li><li><Check size={18}/>Sənə uyğun 1 əsas ixtisas</li><li><Check size={18}/>Gələcək potensialı və bazar qeydi</li></ul><Button asChild variant="outline" size="lg"><a href={quizUrl} target="_blank" rel="noopener noreferrer">Pulsuz başla <ArrowRight size={17}/></a></Button></article>
        <article className="plan featured"><span className="popular-label">ƏN ÇOX SEÇİLƏN</span><div className="plan-top"><span className="plan-name">PREMİUM</span><h3>Daha dərin baxış</h3><p>Qərarını əminliklə vermək üçün.</p><div className="plan-price">9.99 AZN <small>/ ay</small></div></div><ul><li><Check size={18}/>Limitsiz test və yenidən qiymətləndirmə</li><li><Check size={18}/>14 ixtisas üzrə uyğunluq faizləri</li><li><Check size={18}/>Universitet və bal aralığı uyğunlaşdırması</li><li><Check size={18}/>Nəticəni PDF olaraq yüklə</li><li><Check size={18}/>Karyera bələdçisi dəstəyi</li></ul><Button asChild size="lg"><a href={quizUrl} target="_blank" rel="noopener noreferrer">Premium-a başla <ArrowRight size={17}/></a></Button></article>
      </div>
    </div></section>

    <footer className="footer"><div className="container footer-inner"><Logo/><span>© 2026 Yolumu Tap — Universitet və karyera bələdçisi</span><a href="#home">Yuxarı qayıt ↑</a></div></footer>
  </main>;
}
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Yolumu Tap — Universitet və Karyera Bələdçisi" },
    { name: "description", content: "Öz bacarıqlarını kəşf et, ixtisasları tanı və gələcəyin üçün doğru istiqaməti seç." },
    { property: "og:title", content: "Yolumu Tap — Universitet və Karyera Bələdçisi" },
    { property: "og:description", content: "Öz bacarıqlarını kəşf et, ixtisasları tanı və gələcəyin üçün doğru istiqaməti seç." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});
