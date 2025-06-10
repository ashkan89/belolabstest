# ---- Base Stage ----
# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
# ---- Dependencies Stage ----
# Install all dependencies
FROM base AS dependencies
RUN npm ci

# ---- Production Stage ----
# This is the final, lean image for a plain JS app (no build step).
FROM node:22-alpine AS production
WORKDIR /usr/src/app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /usr/src/app

# Copy package files and install *only* production dependencies
COPY --from=dependencies /usr/src/app/package*.json ./
RUN npm ci --omit=dev

# Copy the application source code from the 'dependencies' stage
# since there is no 'build' stage
COPY --from=dependencies /usr/src/app .

# Switch to the non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app.
# The entry point is now server.js.
CMD [ "npm", "start" ]