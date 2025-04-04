FROM node:22.1.0
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY . .
# COPY .env .env
RUN npm install
RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; else echo "Skipping prisma generate"; fi
RUN npm run build
EXPOSE 3000
# CMD ["npm", "start"]
CMD ["node", "dist/index.js"]