# 1️⃣ Build stage
FROM node:20-bullseye AS builder
 
WORKDIR /app
 
# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci
 
# Copy source code
COPY . .
 
# Build Next.js app
RUN npm run build
 
# 2️⃣ Run stage
FROM node:20-bullseye
 
WORKDIR /app
 
# Copy built app and node_modules
COPY --from=builder /app ./
 
# Expose port (default for Next.js)
EXPOSE 3000
 
# Start Next.js server
CMD ["npm", "start"]