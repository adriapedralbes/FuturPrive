# Traefik v3 Configuration for HTTPS

This directory contains the configuration files for Traefik v3, which is used as a reverse proxy for the NextJS application.

## Directory Structure

```
traefik/
├── acme/                  # Directory for Let's Encrypt certificates
│   └── acme.json          # Certificate storage (created by init-acme.sh)
├── dynamic/               # Dynamic configuration files
│   ├── middlewares.yml    # Middleware configurations
│   └── tls.yml            # TLS options
├── init-acme.sh           # Script to initialize acme.json
├── README.md              # This file
└── traefik.yml            # Main Traefik configuration
```

## Setup Instructions

1. Before starting Traefik, run the initialization script to create the acme.json file with proper permissions:

```bash
./traefik/init-acme.sh
```

2. Update the email address in `traefik/traefik.yml` for Let's Encrypt notifications:

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@example.com
```

3. If you want to customize the dashboard authentication, update the credentials in `traefik/dynamic/middlewares.yml`:

```yaml
dashboard-auth:
  basicAuth:
    users:
      # Generated with: docker run --rm httpd:2.4-alpine htpasswd -nb admin FuturPrive2024!
      # Credentials: admin / FuturPrive2024!
      - "admin:$apr1$qug.ckNS$8HIQIfXX.9ZYJUQbooBc31"
```

## Configuration Details

### Main Configuration (traefik.yml)

- **Global Settings**: Defines global behavior of Traefik
- **API and Dashboard**: Configuration for the Traefik dashboard
- **Entrypoints**: Defines HTTP (80) and HTTPS (443) endpoints
- **Providers**: Configures Docker and File providers
- **Certificate Resolvers**: Sets up Let's Encrypt for automatic SSL certificates

### Dynamic Configuration

#### Middlewares (middlewares.yml)

- **Security Headers**: Adds security-related HTTP headers
- **Compression**: Enables gzip compression
- **Rate Limiting**: Protects against abuse
- **Dashboard Authentication**: Basic auth for the Traefik dashboard

#### TLS Options (tls.yml)

- **TLS Versions**: Minimum TLS version 1.2
- **Cipher Suites**: Modern, secure cipher suites
- **Curve Preferences**: Secure elliptic curves
- **SNI Strict**: Enforces SNI matching

## HTTPS Certificates

Traefik automatically obtains and renews SSL certificates from Let's Encrypt using the TLS challenge. The certificates are stored in the `acme.json` file, which must have permissions set to 600 (readable and writable only by the owner).

## Troubleshooting

If you encounter issues with certificates:

1. Check that your domain is correctly pointing to your server
2. Verify that ports 80 and 443 are open on your server
3. Check Traefik logs: `docker logs traefik`
4. Ensure acme.json has the correct permissions (600)
5. If needed, delete acme.json and restart Traefik to request new certificates
