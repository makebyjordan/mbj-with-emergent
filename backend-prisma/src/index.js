const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware - Allow all origins
app.use(cors());
app.use(express.json());

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API is running with Prisma + PostgreSQL' });
});

// ==================== SERVICES ====================
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const service = await prisma.service.create({
      data: req.body
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PROJECTS ====================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== BLOG POSTS ====================
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
      include: { phases: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } } }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blog/published', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      include: { phases: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } } }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blog/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
      include: { phases: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } } }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blog/slug/:slug', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
      include: { phases: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } } }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blog', async (req, res) => {
  try {
    const { phases, videos, ...postData } = req.body;
    const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const post = await prisma.blogPost.create({
      data: {
        ...postData,
        slug,
        phases: phases ? { create: phases.map((p, i) => ({ ...p, order: i })) } : undefined,
        videos: videos ? { create: videos.map((v, i) => ({ ...v, order: i })) } : undefined
      },
      include: { phases: true, videos: true }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  try {
    const { phases, videos, ...postData } = req.body;
    
    // Delete existing phases and videos
    await prisma.phase.deleteMany({ where: { blogPostId: req.params.id } });
    await prisma.video.deleteMany({ where: { blogPostId: req.params.id } });
    
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        ...postData,
        phases: phases ? { create: phases.map((p, i) => ({ title: p.title, description: p.description, order: i })) } : undefined,
        videos: videos ? { create: videos.map((v, i) => ({ title: v.title, url: v.url, type: v.type || 'youtube', order: i })) } : undefined
      },
      include: { phases: true, videos: true }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== TESTIMONIALS ====================
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: req.body
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await prisma.testimonial.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ABOUT ====================
app.get('/api/about', async (req, res) => {
  try {
    const about = await prisma.about.findFirst();
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/about', async (req, res) => {
  try {
    // Delete existing and create new (singleton pattern)
    await prisma.about.deleteMany();
    const about = await prisma.about.create({
      data: req.body
    });
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/about/:id', async (req, res) => {
  try {
    const about = await prisma.about.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== CONTACT ====================
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await prisma.contact.create({
      data: req.body
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await prisma.contact.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
