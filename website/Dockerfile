# ======== BUILD ========
FROM node:lts AS build

WORKDIR /opt/docusaurus
COPY . /opt/docusaurus/
RUN npm ci
RUN npm run build

# ======== SERVE ========
FROM build AS serve

EXPOSE 80
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--no-open", "--port", "80"]
