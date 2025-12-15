const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = [
  {
    title: 'Desarrollo de Software',
    description: 'Desarrollo de aplicaciones web y móviles personalizadas con tecnologías modernas como React, Node.js, Python y más.',
    price: 'Desde 50€/hora',
    features: [
      'Aplicaciones web full-stack',
      'APIs REST y GraphQL',
      'Apps móviles multiplataforma',
      'Integración de sistemas',
      'Arquitectura escalable'
    ],
    icon: 'Code2'
  },
  {
    title: 'Asistentes con IA',
    description: 'Creación de chatbots inteligentes y asistentes virtuales con capacidades de procesamiento de lenguaje natural.',
    price: 'Desde 60€/hora',
    features: [
      'Chatbots conversacionales',
      'Asistentes de atención al cliente',
      'Integración con GPT-4 y modelos avanzados',
      'Análisis de sentimientos',
      'Personalización y entrenamiento'
    ],
    icon: 'Brain'
  },
  {
    title: 'Automatizaciones',
    description: 'Automatización de procesos empresariales para aumentar la eficiencia y reducir costos operativos.',
    price: 'Desde 55€/hora',
    features: [
      'RPA (Robotic Process Automation)',
      'Integración Zapier/Make',
      'Workflows personalizados',
      'Scraping de datos',
      'Sincronización de sistemas'
    ],
    icon: 'Zap'
  }
];

const projects = [
  {
    title: 'Sistema de Gestión Empresarial',
    description: 'Plataforma web completa para gestión de inventario, ventas y clientes con dashboard analítico.',
    category: 'Desarrollo Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
    link: '#'
  },
  {
    title: 'Chatbot de Atención al Cliente',
    description: 'Asistente virtual inteligente con IA que responde consultas 24/7 y escala tickets complejos.',
    category: 'Inteligencia Artificial',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    technologies: ['OpenAI GPT-4', 'Python', 'FastAPI', 'WebSocket'],
    link: '#'
  },
  {
    title: 'Automatización de Facturación',
    description: 'Sistema que automatiza la generación, envío y seguimiento de facturas reduciendo tiempo en 80%.',
    category: 'Automatización',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    technologies: ['Python', 'Zapier', 'API REST', 'Email Automation'],
    link: '#'
  },
  {
    title: 'App de Análisis Predictivo',
    description: 'Aplicación que utiliza machine learning para predecir tendencias de ventas y optimizar inventario.',
    category: 'Inteligencia Artificial',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    link: '#'
  }
];

const blogPosts = [
  {
    title: 'El Futuro de la IA en el Desarrollo de Software',
    excerpt: 'Cómo los asistentes de IA están revolucionando la manera en que desarrollamos aplicaciones en 2025.',
    date: new Date('2025-01-15'),
    author: 'Jordan',
    category: 'Inteligencia Artificial',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: '5 min'
  },
  {
    title: 'Automatización: Cómo Ahorrar 20 Horas Semanales',
    excerpt: 'Las mejores prácticas para automatizar procesos repetitivos en tu negocio y aumentar la productividad.',
    date: new Date('2025-01-10'),
    author: 'Jordan',
    category: 'Automatización',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    readTime: '7 min'
  },
  {
    title: 'React 19: Nuevas Características que Debes Conocer',
    excerpt: 'Un análisis profundo de las últimas actualizaciones de React y cómo implementarlas en tus proyectos.',
    date: new Date('2025-01-05'),
    author: 'Jordan',
    category: 'Desarrollo Web',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    readTime: '6 min'
  }
];

const testimonials = [
  {
    name: 'María González',
    role: 'CEO, TechStart',
    content: 'Jordan transformó completamente nuestra operación con una automatización que nos ahorró miles de euros mensuales. Profesional, rápido y muy creativo.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Director de IT, InnovateCorp',
    content: 'El chatbot que desarrolló superó todas nuestras expectativas. Nuestros clientes están encantados con la atención 24/7 y nosotros con la reducción de costos.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Laura Martínez',
    role: 'Fundadora, EcoShop',
    content: 'Trabajar con Jordan fue increíble. Entendió perfectamente nuestras necesidades y entregó una aplicación web espectacular en tiempo récord.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=9'
  }
];

const about = {
  name: 'Jordan',
  title: 'Desarrollador Freelance & Especialista en IA',
  bio: 'Soy un desarrollador tecnológico apasionado por crear soluciones innovadoras que transforman negocios. Con más de 5 años de experiencia en desarrollo de software, especializado en inteligencia artificial y automatización de procesos. Mi objetivo es ayudar a empresas y emprendedores a escalar sus operaciones mediante tecnología de vanguardia.',
  experience: '5+ años',
  projects: '50+ proyectos',
  clients: '30+ clientes',
  skills: [
    'React & Next.js',
    'Node.js & Python',
    'FastAPI & Django',
    'MongoDB & PostgreSQL',
    'OpenAI & LangChain',
    'TensorFlow & PyTorch',
    'Docker & Kubernetes',
    'AWS & Google Cloud',
    'Zapier & Make',
    'Git & CI/CD'
  ]
};

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.contact.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.about.deleteMany();

  // Seed services
  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  console.log('✅ Services seeded');

  // Seed projects
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('✅ Projects seeded');

  // Seed blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('✅ Blog posts seeded');

  // Seed testimonials
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Testimonials seeded');

  // Seed about
  await prisma.about.create({ data: about });
  console.log('✅ About seeded');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
