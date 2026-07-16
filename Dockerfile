FROM registry.rut.digital/highspeedrailway/node:22.14.0 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN CI=false npm run build

RUN cp nginx.conf dist/nginx.conf && \
cp dist/index.html dist/404.html

FROM registry.rut.digital/highspeedrailway/nginx:1.29.1-bookworm-perl AS production

COPY --from=builder /app/dist /usr/share/nginx/html
RUN mv /usr/share/nginx/html/nginx.conf /etc/nginx/nginx.conf

