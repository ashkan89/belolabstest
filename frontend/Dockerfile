# Stage 1: Build the React application
FROM node:22-alpine AS builder-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# This step is done separately to leverage Docker layer caching.
# If only source code changes, this layer won't be rebuilt.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
# This command assumes your package.json has a "build" script
# that outputs to a "dist" folder (default for Vite).
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS production-stage

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
# This configuration will serve the React app and handle client-side routing.
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built React app from the builder-stage to the Nginx public directory
# The `dist` folder is the default output for Vite builds.
COPY --from=builder-stage /app/dist /usr/share/nginx/html

# Expose port 80 so the container can receive incoming requests
EXPOSE 80

# Command to run Nginx (this is the default command for nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]
