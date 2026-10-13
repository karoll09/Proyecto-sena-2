-- Ejecutar en Supabase > SQL Editor
create table eventos (
  id bigint generated always as identity primary key,
  orden int not null default 0,
  mes text not null,
  fecha text not null,
  evento text not null,
  tipo text not null
);

create table estudiantes (
  id uuid primary key references auth.users on delete cascade,
  nombres text, apellidos text, grado text,
  codigo text, fecha_nacimiento text, documento text, ano_ingreso text,
  acudiente text, telefono_acudiente text,
  sede text, jornada text, ano_lectivo text, director_grupo text, articulacion text,
  asistencia text, puesto text
);

create table notas (
  id bigint generated always as identity primary key,
  estudiante_id uuid not null references estudiantes on delete cascade,
  asignatura text not null,
  p1 numeric(3,2), p2 numeric(3,2), p3 numeric(3,2), p4 numeric(3,2)
);

alter table eventos enable row level security;
alter table estudiantes enable row level security;
alter table notas enable row level security;

create policy "eventos publicos" on eventos for select using (true);
create policy "ver mi perfil" on estudiantes for select using (auth.uid() = id);
create policy "ver mis notas" on notas for select using (auth.uid() = estudiante_id);

insert into eventos (orden, mes, fecha, evento, tipo) values
(1,'Enero','15 Ene','Inicio del año escolar 2025','Inicio'),
(2,'Febrero','14 Feb','Día del Amor y la Amistad – Actividades institucionales','Evento'),
(3,'Marzo','21 Mar','Entrega de informes académicos – Período 1','Notas'),
(4,'Abril','14-18 Abr','Semana Santa – Vacaciones','Vacaciones'),
(5,'Mayo','15 May','Día del Maestro – No hay clases','Evento'),
(6,'Junio','20 Jun','Clausura Primer Semestre','Clausura'),
(7,'Julio','01-25 Jul','Vacaciones de mitad de año','Vacaciones'),
(8,'Agosto','28 Jul','Inicio Segundo Semestre','Inicio'),
(9,'Octubre','10 Oct','Entrega de informes – Período 3','Notas'),
(10,'Noviembre','07 Nov','Pruebas Saber 5° y 9°','Evaluación'),
(11,'Noviembre','28 Nov','Grado de Bachilleres 2025','Clausura'),
(12,'Diciembre','05 Dic','Cierre del año escolar 2025','Cierre');
