# Deploy Backend - MakeByJordan API

## Servidor: 217.154.183.32
## Dominio: makebyjordan.es

---

## PASO 1: Instalar Node.js y PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

## PASO 2: Crear carpeta del proyecto

```bash
mkdir -p /var/www/makebyjordan-api
cd /var/www/makebyjordan-api
```

## PASO 3: Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git .
```

O si ya está clonado, ir a la carpeta backend-prisma:
```bash
cd backend-prisma
```

## PASO 4: Crear archivo .env de producción

```bash
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:hg7nIkaknfvAIlCZ@db.egwmfecatvolylqqpylk.supabase.co:5432/postgres"
PORT=8000
CORS_ORIGINS="https://makebyjordan.es,https://www.makebyjordan.es,http://makebyjordan.es"
EOF
```

## PASO 5: Instalar dependencias

```bash
npm install
npx prisma generate
```

## PASO 6: Iniciar con PM2

```bash
pm2 start src/index.js --name makebyjordan-api
pm2 save
pm2 startup
```

## PASO 7: Configurar Nginx (proxy inverso)

```bash
sudo apt install nginx -y

sudo cat > /etc/nginx/sites-available/makebyjordan-api << 'EOF'
server {
    listen 80;
    server_name api.makebyjordan.es;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/makebyjordan-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## PASO 8: SSL con Certbot (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.makebyjordan.es
```

---

## Comandos útiles PM2

- Ver logs: `pm2 logs makebyjordan-api`
- Reiniciar: `pm2 restart makebyjordan-api`
- Parar: `pm2 stop makebyjordan-api`
- Estado: `pm2 status`

---

## URL Final de la API

Una vez completado, la API estará en:
- `https://api.makebyjordan.es/api`

El frontend debe apuntar a esta URL en producción.
