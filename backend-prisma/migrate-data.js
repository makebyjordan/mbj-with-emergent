const { PrismaClient } = require('@prisma/client');

// Cliente para BD local
const localPrisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://mac@localhost:5432/makebyjordan?schema=public' }
  }
});

// Cliente para Supabase
const supabasePrisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://postgres:hg7nIkaknfvAIlCZ@db.egwmfecatvolylqqpylk.supabase.co:5432/postgres' }
  }
});

async function migrate() {
  console.log('🚀 Iniciando migración...');

  // Services
  const services = await localPrisma.service.findMany();
  console.log(`📦 Migrando ${services.length} servicios...`);
  for (const s of services) {
    try {
      await supabasePrisma.service.upsert({ where: { id: s.id }, create: s, update: s });
    } catch (e) { console.log('  - servicio ya existe:', s.title); }
  }

  // Projects
  const projects = await localPrisma.project.findMany();
  console.log(`📦 Migrando ${projects.length} proyectos...`);
  for (const p of projects) {
    try {
      await supabasePrisma.project.upsert({ where: { id: p.id }, create: p, update: p });
    } catch (e) { console.log('  - proyecto ya existe:', p.title); }
  }

  // BlogPosts con phases y videos
  const posts = await localPrisma.blogPost.findMany({
    include: { phases: true, videos: true }
  });
  console.log(`📦 Migrando ${posts.length} posts...`);
  for (const post of posts) {
    const { phases, videos, ...postData } = post;
    try {
      // Primero intentar crear el post
      const existing = await supabasePrisma.blogPost.findUnique({ where: { id: post.id } });
      if (!existing) {
        await supabasePrisma.blogPost.create({
          data: {
            ...postData,
            phases: { create: phases.map(({ id, blogPostId, ...p }) => p) },
            videos: { create: videos.map(({ id, blogPostId, ...v }) => v) }
          }
        });
      } else {
        console.log('  - post ya existe:', post.title);
      }
    } catch (e) { console.log('  - error en post:', post.title, e.message); }
  }

  // Testimonials
  const testimonials = await localPrisma.testimonial.findMany();
  console.log(`📦 Migrando ${testimonials.length} testimonios...`);
  for (const t of testimonials) {
    try {
      await supabasePrisma.testimonial.upsert({ where: { id: t.id }, create: t, update: t });
    } catch (e) { console.log('  - testimonio ya existe:', t.name); }
  }

  // About
  const about = await localPrisma.about.findFirst();
  if (about) {
    console.log('📦 Migrando about...');
    try {
      await supabasePrisma.about.upsert({ where: { id: about.id }, create: about, update: about });
    } catch (e) { console.log('  - about ya existe'); }
  }

  // Contacts
  const contacts = await localPrisma.contact.findMany();
  console.log(`📦 Migrando ${contacts.length} contactos...`);
  for (const c of contacts) {
    try {
      await supabasePrisma.contact.upsert({ where: { id: c.id }, create: c, update: c });
    } catch (e) { console.log('  - contacto ya existe'); }
  }

  console.log('✅ Migración completada!');
}

migrate()
  .catch(console.error)
  .finally(async () => {
    await localPrisma.$disconnect();
    await supabasePrisma.$disconnect();
  });
