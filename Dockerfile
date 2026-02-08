# Multi-stage Dockerfile for Railway deployment
# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup Node.js backend and serve frontend
FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy built frontend from stage 1
COPY --from=frontend-build /app/frontend/build ./public

# Expose port (Railway will use PORT environment variable)
EXPOSE 5000

# Start the backend server (which will also serve the frontend static files)
CMD ["node", "index.js"]
