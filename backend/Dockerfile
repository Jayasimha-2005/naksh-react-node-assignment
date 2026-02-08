# Backend Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
