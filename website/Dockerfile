# ======== BASE ========
FROM node:lts AS base

WORKDIR /opt/docusaurus

COPY package.json .
COPY package-lock.json .

RUN npm ci

# ======== BUILD ========
FROM base AS build

COPY . /opt/docusaurus/
RUN npm run build

# ======== SERVE ========
FROM build AS serve

EXPOSE 3000

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open", "--port", "3000"]
