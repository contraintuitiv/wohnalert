# Base stage
FROM node:18-alpine AS base

ARG DATABASE_URL
ARG CD_API
ARG CD_API_KEY
ARG NTFY_HOST

# Install dependencies only when needed
FROM base AS deps
# Installing dependencies and additional packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npx prisma migrate deploy && npx prisma generate
RUN npm run build

# Final production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Creating group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

# Copying necessary files
COPY --from=builder /app/public ./public
RUN mkdir -p prisma && chown nextjs:nodejs prisma

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Optional: Entrypoint script to fix volume ownership dynamically
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

USER nextjs

EXPOSE 4541

ENV PORT=4541

# Start the application using entrypoint (if needed) or directly with CMD
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "server.js"]
