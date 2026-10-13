import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Page = "home" | "mision" | "historia" | "ubicacion" | "sedes" | "formacion" | "calendario" | "websian";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1400&h=700&fit=crop&auto=format",
  classroom: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=800&h=500&fit=crop&auto=format",
  graduation: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=500&fit=crop&auto=format",
  campus1: "https://images.unsplash.com/photo-1786013522160-00ac876da3ab?w=600&h=400&fit=crop&auto=format",
  campus2: "https://images.unsplash.com/photo-1777500394253-b620e09dfe2b?w=600&h=400&fit=crop&auto=format",
  campus3: "https://images.unsplash.com/photo-1780928929878-c5247e94e6a9?w=600&h=400&fit=crop&auto=format",
  studying: "https://images.unsplash.com/photo-1574130303188-31a915382726?w=800&h=500&fit=crop&auto=format",
  grad2: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800&h=500&fit=crop&auto=format",
};

const GRADES = [
  { subject: "Matemáticas", q1: 4.2, q2: 4.5, q3: 4.1, q4: 4.8, final: 4.4 },
  { subject: "Lengua Castellana", q1: 4.7, q2: 4.6, q3: 4.9, q4: 4.8, final: 4.75 },
  { subject: "Ciencias Naturales", q1: 3.8, q2: 4.0, q3: 4.2, q4: 4.3, final: 4.08 },
  { subject: "Ciencias Sociales", q1: 4.4, q2: 4.3, q3: 4.5, q4: 4.6, final: 4.45 },
  { subject: "Inglés", q1: 3.5, q2: 3.8, q3: 4.0, q4: 4.2, final: 3.88 },
  { subject: "Educación Física", q1: 4.9, q2: 4.8, q3: 5.0, q4: 4.9, final: 4.9 },
  { subject: "Artes", q1: 4.6, q2: 4.7, q3: 4.8, q4: 4.9, final: 4.75 },
  { subject: "Ética y Valores", q1: 4.8, q2: 4.9, q3: 5.0, q4: 5.0, final: 4.93 },
];

function gradeColor(g: number) {
  if (g >= 4.5) return "text-emerald-600 font-bold";
  if (g >= 4.0) return "text-blue-600 font-semibold";
  if (g >= 3.5) return "text-amber-600 font-semibold";
  return "text-red-500 font-semibold";
}

function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { label: string; id: Page }[] = [
    { label: "Misión y Visión", id: "mision" },
    { label: "Historia", id: "historia" },
    { label: "Ubicación", id: "ubicacion" },
    { label: "Sedes", id: "sedes" },
    { label: "Formación", id: "formacion" },
    { label: "Calendario", id: "calendario" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1a3a6b] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f59e0b] flex items-center justify-center shadow">
            <span className="text-[#1a3a6b] font-black text-lg leading-none">IE</span>
          </div>
          <div className="text-left">
            <div className="text-white font-black text-base leading-tight tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              INSTITUCIÓN EDUCATIVA
            </div>
            <div className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase">San Agustín</div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                page === l.id
                  ? "bg-[#f59e0b] text-[#1a3a6b]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("websian")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
              page === "websian"
                ? "bg-white text-[#1a3a6b]"
                : "bg-[#ea580c] hover:bg-orange-500 text-white"
            }`}
          >
            Portal Websian
          </button>
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0f2447] border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                page === l.id ? "bg-[#f59e0b] text-[#1a3a6b]" : "text-white/80 hover:bg-white/10"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const cards = [
    { id: "mision" as Page, icon: "🎯", title: "Misión y Visión", desc: "Nuestro propósito y horizonte institucional" },
    { id: "historia" as Page, icon: "📜", title: "Historia", desc: "Más de 50 años formando generaciones" },
    { id: "ubicacion" as Page, icon: "📍", title: "Ubicación", desc: "Encuéntranos en el corazón de la ciudad" },
    { id: "sedes" as Page, icon: "🏫", title: "Sedes", desc: "Tres campus modernos al servicio educativo" },
    { id: "formacion" as Page, icon: "📚", title: "Formación", desc: "Programas académicos de excelencia" },
    { id: "calendario" as Page, icon: "📅", title: "Calendario Académico", desc: "Fechas, eventos y actividades del año" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[88vh] min-h-[500px] overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Estudiantes en clase"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a6b]/90 via-[#1a3a6b]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#f59e0b] text-[#1a3a6b] text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full w-fit mb-5">
            ✦ Excelencia Educativa
          </div>
          <h1
            className="text-white text-5xl md:text-6xl font-black leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Formando el
            <span className="text-[#f59e0b]"> Futuro</span>
            <br />de Colombia
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-xl">
            Institución Educativa San Agustín — comprometida con la formación integral de niños y jóvenes desde 1972.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("websian")}
              className="px-6 py-3 bg-[#ea580c] hover:bg-orange-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Acceder a Websian →
            </button>
            <button
              onClick={() => setPage("mision")}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl border border-white/30 backdrop-blur transition-all duration-200"
            >
              Conocer más
            </button>
          </div>
        </div>
        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1a3a6b]/95 backdrop-blur py-4 px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { n: "+2.800", l: "Estudiantes" },
              { n: "120+", l: "Docentes" },
              { n: "3", l: "Sedes" },
              { n: "52", l: "Años de historia" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-[#f59e0b] font-black text-2xl">{s.n}</div>
                <div className="text-white/70 text-sm font-semibold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1a3a6b] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Nuestra Institución
          </h2>
          <p className="text-slate-500 font-semibold">Explora todo lo que tenemos para ti</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setPage(c.id)}
              className="group text-left p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="text-[#1a3a6b] font-black text-lg mb-1 group-hover:text-[#ea580c] transition-colors">
                {c.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium">{c.desc}</p>
              <div className="mt-4 text-[#ea580c] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Ver más →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Portal Websian CTA */}
      <div className="bg-gradient-to-br from-[#ea580c] to-[#c2410c] py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white">
            <div className="text-[#fed7aa] text-sm font-black uppercase tracking-widest mb-2">Portal Estudiantil</div>
            <h2 className="text-4xl font-black mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Websian
            </h2>
            <p className="text-white/85 text-lg font-medium leading-relaxed">
              Accede a tu perfil, consulta tus calificaciones y mantente al día con tu rendimiento académico en tiempo real.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={() => setPage("websian")}
              className="px-8 py-4 bg-white text-[#ea580c] font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              Ingresar al Portal →
            </button>
            <p className="text-white/60 text-xs text-center font-semibold">Plataforma académica institucional</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f2447] text-white/60 py-8 px-6 text-center text-sm font-semibold">
        <p>© 2024 Institución Educativa San Agustín · Todos los derechos reservados</p>
        <p className="mt-1 text-white/40">Formando líderes desde 1972</p>
      </footer>
    </div>
  );
}

function PageWrapper({ title, subtitle, color = "blue", children }: {
  title: string;
  subtitle?: string;
  color?: "blue" | "orange" | "yellow";
  children: React.ReactNode;
}) {
  const bg = color === "orange" ? "from-[#ea580c] to-[#9a3412]"
    : color === "yellow" ? "from-[#f59e0b] to-[#d97706]"
    : "from-[#1a3a6b] to-[#1e40af]";

  return (
    <div>
      <div className={`bg-gradient-to-r ${bg} py-14 px-6`}>
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>
          {subtitle && <p className="text-white/75 text-lg font-medium">{subtitle}</p>}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">{children}</div>
      <footer className="bg-[#0f2447] text-white/60 py-6 px-6 text-center text-sm font-semibold">
        <p>© 2024 Institución Educativa San Agustín · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

function MisionPage() {
  return (
    <PageWrapper title="Misión y Visión" subtitle="Nuestro propósito y horizonte institucional">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#dbeafe] rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a3a6b] flex items-center justify-center text-2xl">🎯</div>
            <h2 className="text-2xl font-black text-[#1a3a6b]" style={{ fontFamily: "'Playfair Display', serif" }}>Misión</h2>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            La Institución Educativa San Agustín forma personas íntegras, críticas y propositivas, mediante una educación de calidad que articula el conocimiento científico, los valores humanos y la identidad cultural, preparando a sus estudiantes para contribuir al desarrollo sostenible de la sociedad colombiana y del mundo.
          </p>
        </div>
        <div className="bg-[#fed7aa] rounded-2xl p-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center text-2xl">🌟</div>
            <h2 className="text-2xl font-black text-[#9a3412]" style={{ fontFamily: "'Playfair Display', serif" }}>Visión</h2>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            Para el año 2030, la Institución Educativa San Agustín será reconocida a nivel regional como un modelo de excelencia académica e innovación pedagógica, con egresados que lideran transformaciones positivas en sus comunidades, con vocación de servicio y compromiso con el bien común.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "💡", title: "Innovación", desc: "Adoptamos metodologías pedagógicas actualizadas y uso de tecnología educativa." },
          { icon: "🤝", title: "Inclusión", desc: "Garantizamos el acceso y permanencia de todos los estudiantes en igualdad de condiciones." },
          { icon: "🌱", title: "Sostenibilidad", desc: "Formamos conciencia ambiental y responsabilidad con el entorno natural." },
        ].map((v) => (
          <div key={v.title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="text-[#1a3a6b] font-black text-lg mb-2">{v.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img src={IMAGES.grad2} alt="Ceremonia de graduación" className="w-full h-64 object-cover" />
      </div>
    </PageWrapper>
  );
}

function HistoriaPage() {
  const events = [
    { year: "1972", title: "Fundación", desc: "La institución es fundada por la comunidad agustiniana con 120 estudiantes en una sola sede." },
    { year: "1985", title: "Primera Promoción Bachillerato", desc: "Se gradúa la primera generación de bachilleres, marcando un hito histórico." },
    { year: "1993", title: "Expansión", desc: "Se inaugura la sede Norte para atender la creciente demanda educativa del sector." },
    { year: "2002", title: "Reconocimiento Nacional", desc: "Distinción como institución de excelencia educativa por el Ministerio de Educación." },
    { year: "2010", title: "Sede Técnica", desc: "Apertura de la sede de formación técnica con laboratorios de tecnología e informática." },
    { year: "2018", title: "Transformación Digital", desc: "Implementación del portal académico Websian para estudiantes y familias." },
    { year: "2024", title: "Hoy", desc: "Más de 2.800 estudiantes, 120 docentes y tres sedes integradas en un solo proyecto educativo." },
  ];

  return (
    <PageWrapper title="Historia" subtitle="Más de cinco décadas construyendo futuro" color="yellow">
      <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
        <img src={IMAGES.graduation} alt="Graduación histórica" className="w-full h-72 object-cover" />
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f59e0b] to-[#1a3a6b]" />
        <div className="space-y-8 pl-16">
          {events.map((e, i) => (
            <div key={e.year} className="relative">
              <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg ${i % 2 === 0 ? "bg-[#1a3a6b]" : "bg-[#ea580c]"}`}>
                {i + 1}
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`text-sm font-black mb-1 ${i % 2 === 0 ? "text-[#2563eb]" : "text-[#ea580c]"}`}>{e.year}</div>
                <h3 className="text-[#1a3a6b] font-black text-lg mb-1">{e.title}</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

function UbicacionPage() {
  return (
    <PageWrapper title="Ubicación" subtitle="Encuéntranos en el corazón de la ciudad" color="orange">
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-black text-[#1a3a6b] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Información de Contacto
          </h2>
          <div className="space-y-4">
            {[
              { icon: "📍", label: "Dirección Principal", val: "Calle 45 # 23-67, Barrio Centro, Bogotá D.C." },
              { icon: "📞", label: "Teléfono", val: "(601) 456-7890 · (601) 456-7891" },
              { icon: "✉️", label: "Correo Electrónico", val: "contacto@iesanagustin.edu.co" },
              { icon: "🌐", label: "Sitio Web", val: "www.iesanagustin.edu.co" },
              { icon: "🕐", label: "Horario de Atención", val: "Lunes a Viernes: 7:00 am – 5:00 pm" },
            ].map((d) => (
              <div key={d.label} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <span className="text-2xl">{d.icon}</span>
                <div>
                  <div className="text-xs font-black text-[#ea580c] uppercase tracking-wide mb-0.5">{d.label}</div>
                  <div className="text-slate-700 font-semibold text-sm">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-[#dbeafe] h-72 flex items-center justify-center">
            <div className="text-center text-[#1a3a6b]">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="font-bold text-lg">Mapa Interactivo</p>
              <p className="text-sm text-[#1a3a6b]/60 font-semibold">Calle 45 # 23-67, Bogotá</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { icon: "🚌", txt: "Bus: Rutas 22, 35, 48" },
              { icon: "🚇", txt: "Metro: Estación Centro" },
              { icon: "🚗", txt: "Parqueadero disponible" },
              { icon: "🚶", txt: "5 min a pie del parque" },
            ].map((t) => (
              <div key={t.txt} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-100 text-sm font-semibold text-slate-600">
                <span>{t.icon}</span> {t.txt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function SedesPage() {
  const sedes = [
    {
      nombre: "Sede Principal",
      dir: "Calle 45 # 23-67, Centro",
      niveles: "Preescolar, Primaria y Secundaria",
      est: "1.500 estudiantes",
      img: IMAGES.campus1,
      color: "border-[#1a3a6b]",
      badge: "bg-[#1a3a6b]",
    },
    {
      nombre: "Sede Norte",
      dir: "Carrera 78 # 90-12, Zona Norte",
      niveles: "Preescolar y Primaria",
      est: "780 estudiantes",
      img: IMAGES.campus2,
      color: "border-[#ea580c]",
      badge: "bg-[#ea580c]",
    },
    {
      nombre: "Sede Técnica",
      dir: "Av. Industrial # 15-40",
      niveles: "Media Técnica (Grados 10-11)",
      est: "520 estudiantes",
      img: IMAGES.campus3,
      color: "border-[#f59e0b]",
      badge: "bg-[#f59e0b]",
    },
  ];

  return (
    <PageWrapper title="Sedes" subtitle="Tres campus modernos al servicio de la comunidad educativa">
      <div className="grid md:grid-cols-3 gap-6">
        {sedes.map((s) => (
          <div key={s.nombre} className={`bg-white rounded-2xl border-t-4 ${s.color} shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
            <div className="relative h-48">
              <img src={s.img} alt={s.nombre} className="w-full h-full object-cover" />
              <div className={`absolute top-3 left-3 ${s.badge} text-white text-xs font-black px-3 py-1 rounded-full`}>
                {s.nombre}
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Dirección", val: s.dir },
                  { label: "Niveles", val: s.niveles },
                  { label: "Capacidad", val: s.est },
                ].map((d) => (
                  <div key={d.label}>
                    <span className="text-[#ea580c] font-black uppercase text-xs">{d.label}: </span>
                    <span className="text-slate-700 font-semibold">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-[#fef3c7] rounded-2xl p-8 border border-amber-100">
        <h3 className="text-xl font-black text-[#1a3a6b] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Infraestructura Compartida
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "💻", txt: "Laboratorios de Informática" },
            { icon: "⚽", txt: "Canchas Deportivas" },
            { icon: "📖", txt: "Biblioteca Digital" },
            { icon: "🍽️", txt: "Comedor Estudiantil" },
          ].map((f) => (
            <div key={f.txt} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm text-sm font-bold text-slate-700">
              <span className="text-2xl">{f.icon}</span> {f.txt}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

function FormacionPage() {
  const programs = [
    {
      nivel: "Preescolar",
      grados: "Pre-jardín, Jardín, Transición",
      edad: "3 – 5 años",
      icon: "🌱",
      color: "bg-[#dbeafe] border-[#2563eb]",
    },
    {
      nivel: "Básica Primaria",
      grados: "1° a 5°",
      edad: "6 – 11 años",
      icon: "📗",
      color: "bg-[#fef3c7] border-[#f59e0b]",
    },
    {
      nivel: "Básica Secundaria",
      grados: "6° a 9°",
      edad: "12 – 15 años",
      icon: "📘",
      color: "bg-[#fed7aa] border-[#ea580c]",
    },
    {
      nivel: "Media Técnica",
      grados: "10° y 11°",
      edad: "16 – 17 años",
      icon: "🎓",
      color: "bg-[#d1fae5] border-emerald-500",
    },
  ];

  return (
    <PageWrapper title="Formación Académica" subtitle="Programas de excelencia para todos los niveles">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {programs.map((p) => (
          <div key={p.nivel} className={`rounded-2xl p-6 border-l-4 ${p.color}`}>
            <div className="text-4xl mb-3">{p.icon}</div>
            <h3 className="text-[#1a3a6b] font-black text-lg mb-1">{p.nivel}</h3>
            <p className="text-slate-600 text-sm font-semibold">{p.grados}</p>
            <p className="text-slate-400 text-xs font-bold mt-1">{p.edad}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-black text-[#1a3a6b] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Áreas del Conocimiento
          </h2>
          <div className="space-y-2">
            {[
              "Matemáticas y Estadística",
              "Lengua Castellana y Literatura",
              "Ciencias Naturales y Química",
              "Ciencias Sociales e Historia",
              "Inglés e Idiomas",
              "Educación Artística",
              "Educación Física y Deporte",
              "Ética, Religión y Valores",
              "Tecnología e Informática",
            ].map((a) => (
              <div key={a} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 text-sm font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#ea580c] flex-shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
            <img src={IMAGES.classroom} alt="Salón de clases" className="w-full h-56 object-cover" />
          </div>
          <div className="bg-[#1a3a6b] rounded-2xl p-6 text-white">
            <h3 className="text-xl font-black mb-3">Técnica en Informática</h3>
            <p className="text-white/80 text-sm font-medium leading-relaxed">
              Articulado con el SENA, nuestra media técnica otorga certificación de competencias laborales en Sistemas, permitiendo a los egresados ingresar al mundo laboral o continuar estudios superiores.
            </p>
            <div className="mt-3 text-[#f59e0b] font-bold text-sm">Articulado SENA ✓</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const TIPO_COLOR: Record<string, string> = {
  Inicio: "bg-[#dbeafe] text-[#1a3a6b]",
  Clausura: "bg-[#dbeafe] text-[#1a3a6b]",
  Evento: "bg-[#fed7aa] text-[#9a3412]",
  Notas: "bg-[#fef3c7] text-[#92400e]",
  Vacaciones: "bg-[#d1fae5] text-emerald-700",
  Evaluación: "bg-purple-100 text-purple-700",
  Cierre: "bg-rose-100 text-rose-700",
};

function CalendarioPage() {
  const [dbEvents, setDbEvents] = useState<{ mes: string; fecha: string; evento: string; tipo: string }[] | null>(null);
  useEffect(() => {
    supabase?.from("eventos").select("mes,fecha,evento,tipo").order("orden").then(({ data }) => {
      if (data?.length) setDbEvents(data);
    });
  }, []);
  const staticEvents = [
    { mes: "Enero", fecha: "15 Ene", evento: "Inicio del año escolar 2025", tipo: "Inicio", color: "bg-[#dbeafe] text-[#1a3a6b]" },
    { mes: "Febrero", fecha: "14 Feb", evento: "Día del Amor y la Amistad – Actividades institucionales", tipo: "Evento", color: "bg-[#fed7aa] text-[#9a3412]" },
    { mes: "Marzo", fecha: "21 Mar", evento: "Entrega de informes académicos – Período 1", tipo: "Notas", color: "bg-[#fef3c7] text-[#92400e]" },
    { mes: "Abril", fecha: "14-18 Abr", evento: "Semana Santa – Vacaciones", tipo: "Vacaciones", color: "bg-[#d1fae5] text-emerald-700" },
    { mes: "Mayo", fecha: "15 May", evento: "Día del Maestro – No hay clases", tipo: "Evento", color: "bg-[#fed7aa] text-[#9a3412]" },
    { mes: "Junio", fecha: "20 Jun", evento: "Clausura Primer Semestre", tipo: "Clausura", color: "bg-[#dbeafe] text-[#1a3a6b]" },
    { mes: "Julio", fecha: "01-25 Jul", evento: "Vacaciones de mitad de año", tipo: "Vacaciones", color: "bg-[#d1fae5] text-emerald-700" },
    { mes: "Agosto", fecha: "28 Jul", evento: "Inicio Segundo Semestre", tipo: "Inicio", color: "bg-[#dbeafe] text-[#1a3a6b]" },
    { mes: "Octubre", fecha: "10 Oct", evento: "Entrega de informes – Período 3", tipo: "Notas", color: "bg-[#fef3c7] text-[#92400e]" },
    { mes: "Noviembre", fecha: "07 Nov", evento: "Pruebas Saber 5° y 9°", tipo: "Evaluación", color: "bg-purple-100 text-purple-700" },
    { mes: "Noviembre", fecha: "28 Nov", evento: "Grado de Bachilleres 2025", tipo: "Clausura", color: "bg-[#dbeafe] text-[#1a3a6b]" },
    { mes: "Diciembre", fecha: "05 Dic", evento: "Cierre del año escolar 2025", tipo: "Cierre", color: "bg-rose-100 text-rose-700" },
  ];
  const events = (dbEvents ?? staticEvents).map((e) => ({
    ...e,
    color: TIPO_COLOR[e.tipo] ?? "bg-slate-100 text-slate-700",
  }));

  return (
    <PageWrapper title="Calendario Académico" subtitle="Fechas importantes del año escolar 2025" color="blue">
      <div className="grid lg:grid-cols-2 gap-4">
        {events.map((e) => (
          <div key={e.fecha + e.evento} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 text-center w-16">
              <div className="text-xs font-black text-slate-400 uppercase">{e.mes}</div>
              <div className="text-[#1a3a6b] font-black text-sm leading-tight">{e.fecha.replace(e.mes + " ", "")}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-block text-xs font-black px-2 py-0.5 rounded-full mb-1 ${e.color}`}>
                {e.tipo}
              </div>
              <p className="text-slate-700 font-semibold text-sm leading-snug">{e.evento}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1a3a6b] rounded-2xl p-6 text-white">
        <h3 className="font-black text-lg mb-3">Períodos Académicos 2025</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { p: "Período 1", d: "Ene 15 – Mar 21" },
            { p: "Período 2", d: "Mar 24 – Jun 20" },
            { p: "Período 3", d: "Jul 28 – Oct 10" },
            { p: "Período 4", d: "Oct 13 – Nov 28" },
          ].map((p) => (
            <div key={p.p} className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-[#f59e0b] font-black text-sm">{p.p}</div>
              <div className="text-white/70 text-xs font-semibold mt-1">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

type Est = Record<string, string>;
const DEMO_EST: Est = {
  nombres: "María Alejandra", apellidos: "Rodríguez Gómez", grado: "Grado 9° – Grupo B",
  codigo: "2024-0934-B", fecha_nacimiento: "12 de marzo de 2010", documento: "1.234.567.890 (T.I.)",
  ano_ingreso: "2019 (Grado 4°)", acudiente: "Carmen Gómez Ruiz", telefono_acudiente: "310 456-7890",
  sede: "Sede Principal", jornada: "Mañana (6:30am – 12:30pm)", ano_lectivo: "2025",
  director_grupo: "Prof. Carlos Martínez", articulacion: "Sistemas de Información",
  asistencia: "96%", puesto: "3°",
};

function WebsianGate({ setPage }: { setPage: (p: Page) => void }) {
  const [session, setSession] = useState<boolean | null>(supabase ? null : true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [est, setEst] = useState<Est>(DEMO_EST);
  const [grades, setGrades] = useState(GRADES);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session) return;
    supabase.from("estudiantes").select("*").maybeSingle().then(({ data }) => data && setEst(data as Est));
    supabase.from("notas").select("*").order("id").then(({ data }) => {
      if (!data) return;
      setGrades(data.map((n) => {
        const q = [n.p1, n.p2, n.p3, n.p4].map((v) => (v == null ? null : Number(v)));
        const vals = q.filter((v): v is number => v !== null);
        return { subject: n.asignatura, q1: q[0] ?? 0, q2: q[1] ?? 0, q3: q[2] ?? 0, q4: q[3] ?? 0,
          final: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0 };
      }));
    });
  }, [session]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pass });
    setErr(error ? "Correo o contraseña incorrectos" : "");
  }

  if (session === null) return <div className="p-10 text-center text-slate-500">Cargando…</div>;
  if (!session)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <form onSubmit={login} className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 w-full max-w-sm space-y-4">
          <h2 className="font-black text-2xl text-[#ea580c]">Portal Websian</h2>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" className="w-full border rounded-lg px-3 py-2" />
          <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" className="w-full border rounded-lg px-3 py-2" />
          {err && <p className="text-red-500 text-sm font-semibold">{err}</p>}
          <button className="w-full bg-[#ea580c] text-white font-bold py-2 rounded-lg">Ingresar</button>
          <button type="button" onClick={() => setPage("home")} className="w-full text-slate-500 text-sm">← Volver al sitio</button>
        </form>
      </div>
    );
  return (
    <>
      {supabase && (
        <button onClick={() => supabase!.auth.signOut()} className="fixed bottom-4 right-4 z-50 bg-[#1a3a6b] text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
          Cerrar sesión
        </button>
      )}
      <WebsianPage setPage={setPage} est={est} grades={grades} />
    </>
  );
}

function WebsianPage({ setPage, est, grades }: { setPage: (p: Page) => void; est: Est; grades: typeof GRADES }) {
  const [activeTab, setActiveTab] = useState<"perfil" | "notas" | "horario">("perfil");

  const avg = (grades.reduce((s, g) => s + g.final, 0) / grades.length).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Websian Header */}
      <div className="bg-gradient-to-r from-[#ea580c] to-[#9a3412] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-lg">W</div>
            <div>
              <div className="font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Websian</div>
              <div className="text-white/70 text-xs font-bold">Portal Académico Estudiantil</div>
            </div>
          </div>
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold transition-colors"
          >
            ← Volver al sitio
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6 pb-0 flex gap-1">
          {(["perfil", "notas", "horario"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 font-bold text-sm rounded-t-xl transition-all capitalize ${
                activeTab === t ? "bg-slate-50 text-[#ea580c]" : "text-white/70 hover:text-white"
              }`}
            >
              {t === "perfil" ? "Mi Perfil" : t === "notas" ? "Mis Notas" : "Horario"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "perfil" && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] h-24 relative">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#f59e0b] border-4 border-white flex items-center justify-center text-3xl font-black text-[#1a3a6b] shadow-lg">
                    {(est.nombres?.[0] ?? "") + (est.apellidos?.[0] ?? "")}
                  </div>
                </div>
                <div className="pt-14 pb-6 px-6 text-center">
                  <h2 className="text-[#1a3a6b] font-black text-xl">{est.nombres}</h2>
                  <h2 className="text-[#1a3a6b] font-black text-xl">{est.apellidos}</h2>
                  <div className="mt-2 inline-block bg-[#dbeafe] text-[#1a3a6b] text-xs font-black px-3 py-1 rounded-full">
                    {est.grado}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Promedio", val: avg, color: "text-emerald-600" },
                  { label: "Asignaturas", val: grades.length.toString(), color: "text-[#1a3a6b]" },
                  { label: "Asistencia", val: est.asistencia, color: "text-[#ea580c]" },
                  { label: "Puesto", val: est.puesto, color: "text-[#f59e0b]" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-4 text-center border border-slate-100 shadow-sm">
                    <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                    <div className="text-slate-400 text-xs font-bold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-black text-[#1a3a6b] text-lg mb-4">Información Personal</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Código Estudiantil", val: est.codigo },
                    { label: "Fecha de Nacimiento", val: est.fecha_nacimiento },
                    { label: "Documento de Identidad", val: est.documento },
                    { label: "Año de Ingreso", val: est.ano_ingreso },
                    { label: "Acudiente", val: est.acudiente },
                    { label: "Teléfono Acudiente", val: est.telefono_acudiente },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="text-xs font-black text-[#ea580c] uppercase tracking-wide mb-0.5">{d.label}</div>
                      <div className="text-slate-700 font-semibold text-sm">{d.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-black text-[#1a3a6b] text-lg mb-4">Información Académica</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Institución", val: "I.E. San Agustín" },
                    { label: "Sede", val: est.sede },
                    { label: "Jornada", val: est.jornada },
                    { label: "Año Lectivo", val: est.ano_lectivo },
                    { label: "Director de Grupo", val: est.director_grupo },
                    { label: "Articulación SENA", val: est.articulacion },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="text-xs font-black text-[#1a3a6b] uppercase tracking-wide mb-0.5">{d.label}</div>
                      <div className="text-slate-700 font-semibold text-sm">{d.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notas" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#1a3a6b]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Informe de Calificaciones
                </h2>
                <p className="text-slate-500 font-semibold text-sm">Año Lectivo 2025 · Grado 9° Grupo B</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-center">
                  <div className="text-emerald-700 font-black text-xl">{avg}</div>
                  <div className="text-emerald-600 text-xs font-black">PROMEDIO GENERAL</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a3a6b] text-white">
                      <th className="text-left px-5 py-3 font-black">Asignatura</th>
                      <th className="text-center px-4 py-3 font-black">P1</th>
                      <th className="text-center px-4 py-3 font-black">P2</th>
                      <th className="text-center px-4 py-3 font-black">P3</th>
                      <th className="text-center px-4 py-3 font-black">P4</th>
                      <th className="text-center px-4 py-3 font-black">Final</th>
                      <th className="text-center px-4 py-3 font-black">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, i) => (
                      <tr key={g.subject} className={`border-t border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                        <td className="px-5 py-3.5 font-bold text-slate-700">{g.subject}</td>
                        <td className={`text-center px-4 py-3.5 ${gradeColor(g.q1)}`}>{g.q1.toFixed(1)}</td>
                        <td className={`text-center px-4 py-3.5 ${gradeColor(g.q2)}`}>{g.q2.toFixed(1)}</td>
                        <td className={`text-center px-4 py-3.5 ${gradeColor(g.q3)}`}>{g.q3.toFixed(1)}</td>
                        <td className={`text-center px-4 py-3.5 ${gradeColor(g.q4)}`}>{g.q4.toFixed(1)}</td>
                        <td className={`text-center px-4 py-3.5 text-base ${gradeColor(g.final)}`}>{g.final.toFixed(2)}</td>
                        <td className="text-center px-4 py-3.5">
                          <span className={`text-xs font-black px-2 py-0.5 rounded-full ${g.final >= 3.0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                            {g.final >= 3.0 ? "Aprobado" : "Reprobado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#fef3c7] border-t-2 border-[#f59e0b]">
                      <td className="px-5 py-3 font-black text-[#1a3a6b]">PROMEDIO GENERAL</td>
                      <td className="text-center px-4 py-3 font-black text-[#1a3a6b]">
                        {(grades.reduce((s, g) => s + g.q1, 0) / grades.length).toFixed(2)}
                      </td>
                      <td className="text-center px-4 py-3 font-black text-[#1a3a6b]">
                        {(grades.reduce((s, g) => s + g.q2, 0) / grades.length).toFixed(2)}
                      </td>
                      <td className="text-center px-4 py-3 font-black text-[#1a3a6b]">
                        {(grades.reduce((s, g) => s + g.q3, 0) / grades.length).toFixed(2)}
                      </td>
                      <td className="text-center px-4 py-3 font-black text-[#1a3a6b]">
                        {(grades.reduce((s, g) => s + g.q4, 0) / grades.length).toFixed(2)}
                      </td>
                      <td className="text-center px-4 py-3 font-black text-emerald-700 text-base">{avg}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> 4.5 – 5.0: Excelente</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> 4.0 – 4.4: Sobresaliente</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> 3.5 – 3.9: Aceptable</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Menos de 3.5: Bajo</span>
            </div>
          </div>
        )}

        {activeTab === "horario" && (
          <div>
            <h2 className="text-2xl font-black text-[#1a3a6b] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Horario de Clases
            </h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a3a6b] text-white">
                      <th className="text-left px-4 py-3 font-black">Hora</th>
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((d) => (
                        <th key={d} className="text-center px-3 py-3 font-black">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { hora: "6:30 – 7:30", clases: ["Matemáticas", "Inglés", "Ciencias Nat.", "Sociales", "Matemáticas"] },
                      { hora: "7:30 – 8:30", clases: ["Lengua Cast.", "Matemáticas", "Inglés", "Matemáticas", "Lengua Cast."] },
                      { hora: "8:30 – 9:30", clases: ["Inglés", "Ciencias Nat.", "Ed. Física", "Lengua Cast.", "Ciencias Nat."] },
                      { hora: "9:30 – 9:50", clases: ["Descanso", "Descanso", "Descanso", "Descanso", "Descanso"] },
                      { hora: "9:50 – 10:50", clases: ["Sociales", "Ed. Física", "Matemáticas", "Artes", "Sociales"] },
                      { hora: "10:50 – 11:50", clases: ["Artes", "Sociales", "Lengua Cast.", "Inglés", "Tecnología"] },
                      { hora: "11:50 – 12:30", clases: ["Ética", "Ética", "Tecnología", "Ed. Física", "Artes"] },
                    ].map((row, i) => (
                      <tr key={row.hora} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                        <td className="px-4 py-3 font-black text-[#1a3a6b] text-xs whitespace-nowrap">{row.hora}</td>
                        {row.clases.map((c, j) => (
                          <td key={j} className="text-center px-3 py-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                              c === "Descanso" ? "bg-[#fef3c7] text-amber-700" :
                              j % 3 === 0 ? "bg-[#dbeafe] text-[#1a3a6b]" :
                              j % 3 === 1 ? "bg-[#fed7aa] text-[#9a3412]" :
                              "bg-[#d1fae5] text-emerald-700"
                            }`}>{c}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen">
      <NavBar page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "mision" && <MisionPage />}
      {page === "historia" && <HistoriaPage />}
      {page === "ubicacion" && <UbicacionPage />}
      {page === "sedes" && <SedesPage />}
      {page === "formacion" && <FormacionPage />}
      {page === "calendario" && <CalendarioPage />}
      {page === "websian" && <WebsianGate setPage={setPage} />}
    </div>
  );
}
