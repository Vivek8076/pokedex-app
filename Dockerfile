# ==========================================
# Stage 1: BUILDER — React app build karo
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# pehle package files copy karo (faster cache)
COPY package.json package-lock.json ./
RUN npm install

# baaki saara code copy karo aur build karo
COPY . .
RUN npm run build
# Ab /app/dist mein ready-to-serve files hain

# ==========================================
# Stage 2: RUNNER — Sirf nginx + built files
# ==========================================
FROM nginx:alpine AS runner

# builder se built files copy karo nginx ke folder mein
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80 expose karo (internal)
EXPOSE 80

# nginx start karo
CMD ["nginx", "-g", "daemon off;"]