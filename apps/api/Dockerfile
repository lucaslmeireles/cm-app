# Build stage
FROM node:18-alpine AS builder

WORKDIR /app


# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i


# Copy source code
COPY . .

RUN npx prisma generate
# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Production stage
FROM node:18-alpine AS production


# Set node environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Create .env file from environment variables
RUN echo "DATABASE_URL=\${DATABASE_URL}" >> .env
RUN echo "JWT_SECRET=\${JWT_SECRET}" >> .env

# Expose port (default to 3000 if not set)
ENV PORT=8088
EXPOSE ${PORT}

# Create start script that includes database migration
RUN echo '#!/bin/sh' > /app/start.sh
RUN echo 'npx prisma migrate deploy' >> /app/start.sh
RUN echo 'npx prisma generate' >> /app/start.sh
RUN echo 'node dist/main' >> /app/start.sh
RUN chmod +x /app/start.sh

# Start the application with migrations
CMD ["/app/start.sh"]