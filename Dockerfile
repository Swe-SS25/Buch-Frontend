# 1. Build-Stage
FROM node:23-alpine AS build

WORKDIR /app

# Nur package.json und package-lock.json zuerst kopieren, um Layer-Caching zu nutzen
COPY package*.json ./
RUN npm ci

# Restliche Dateien kopieren und bauen
COPY . .
RUN npm run build

# 2. Production-Stage (nur statische Dateien)
FROM nginx:alpine AS production

# Zertifikate und nginx.conf kopieren
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert/cert.pem /etc/ssl/certs/cert.pem
COPY cert/key.pem /etc/ssl/private/key.pem

# Baue das Frontend in den nginx-Ordner
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: eigene nginx.conf kopieren, falls benötigt
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]