# Pokédex App — Docker + HTTPS

## Requirements
- Docker & Docker Compose installed hona chahiye
- openssl installed hona chahiye

## Setup

### Step 1: SSL Certificate banao
mkdir certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/key.pem -out certs/cert.pem -subj "/CN=localhost"

### Step 2: Build aur Run karo
docker compose up --build

### Step 3: Browser mein kholo
https://localhost

> Note: Browser "Not Secure" warning dikhayega — self-signed cert hai, normal hai.
> "Advanced" → "Proceed to localhost" click karo.

## Project Structure
pokedex-app/
├── src/           → React source code
├── Dockerfile     → Multi-stage build
├── nginx.conf     → Reverse proxy config
├── docker-compose.yml
├── certs/         → SSL certs (git ignore karo!)
└── README.md# pokedex-app
