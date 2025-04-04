# Production Deployment with Traefik v3

This guide explains how to deploy the NextJS application in production using Docker and Traefik v3 as a reverse proxy with automatic HTTPS.

## Prerequisites

- A server with Docker and Docker Compose installed
- A domain name (futurprive.com) pointing to your server's IP address
- Basic knowledge of Docker and networking

## Setup Instructions

### 1. Prepare the Environment

Before starting the deployment, make sure to:

1. Update the email address in `traefik/traefik.yml` for Let's Encrypt notifications:

   ```yaml
   certificatesResolvers:
     letsencrypt:
       acme:
         email: your-email@example.com
   ```

2. Initialize the acme.json file for storing SSL certificates:

   ```bash
   chmod +x traefik/init-acme.sh
   ./traefik/init-acme.sh
   ```

3. Optionally, update the dashboard credentials in `traefik/dynamic/middlewares.yml`:
   ```yaml
   dashboard-auth:
     basicAuth:
       users:
         # Current credentials: admin / FuturPrive2024!
         - "admin:$apr1$qug.ckNS$8HIQIfXX.9ZYJUQbooBc31"
   ```

### 2. Build and Start the Services

```bash
# Construir las imágenes y iniciar los servicios
docker-compose -f docker-compose.prod.yml up -d --build
```

Esto construirá la imagen de NextJS usando el Dockerfile y luego iniciará Traefik y la aplicación NextJS en modo desconectado.

### 3. Verify the Deployment

- Frontend should be accessible at: https://futurprive.com
- Traefik dashboard (if configured): https://traefik.futurprive.com

## Configuration Details

### Domains

- **Frontend**: futurprive.com
- **Traefik Dashboard**: traefik.futurprive.com (protected by authentication)

### Security Features

The configuration includes:

- Automatic HTTP to HTTPS redirection
- Modern TLS configuration
- Security headers (XSS protection, HSTS, etc.)
- Compression for better performance

### Customization

To customize the configuration:

1. **Environment Variables**: Edit the environment section in `docker-compose.prod.yml`
2. **Traefik Configuration**: Modify the configuration files in the `traefik` directory:
   - Main configuration: `traefik/traefik.yml`
   - Middlewares: `traefik/dynamic/middlewares.yml`
   - TLS options: `traefik/dynamic/tls.yml`
3. **Labels**: Adjust the labels in `docker-compose.prod.yml` for specific routing rules

## Troubleshooting

### Certificate Issues

If you encounter certificate issues:

1. Check that your domain is correctly pointing to your server
2. Verify that ports 80 and 443 are open on your server
3. Check Traefik logs: `docker logs traefik`
4. Ensure `traefik/acme/acme.json` has the correct permissions (600)
5. If needed, delete the acme.json file and restart Traefik to request new certificates

### NextJS Application Issues

If the NextJS application is not working:

1. Check the container logs: `docker logs nextjs`
2. Verify that the build process completed successfully
3. Ensure the application is listening on port 3000 inside the container
4. Verificar que pnpm se instaló correctamente: `docker exec nextjs pnpm --version`
5. Si hay problemas con la construcción, puedes modificar el Dockerfile para ajustar el proceso de construcción

## Maintenance

### Updating Traefik

To update Traefik to a newer version:

```bash
docker-compose -f docker-compose.prod.yml down
# Update the version in docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

### Renewing Certificates

Certificates are automatically renewed by Let's Encrypt when they're close to expiration.

### Backing Up Certificates

Regularly back up the `traefik/acme/acme.json` file to preserve your certificates. This file contains your SSL certificates and is crucial for maintaining HTTPS without interruption.
