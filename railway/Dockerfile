FROM node:22-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY railway/package*.json ./railway/
RUN cd railway && npm ci
COPY . .
WORKDIR /app/railway
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
EXPOSE 3000
CMD ["sh","-c","npm run db:migrate && npm start"]
