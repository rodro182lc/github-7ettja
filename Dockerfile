#COPY nginx.config /etc/nginx/conf.d/default.conf

FROM node:alpine AS build
ARG INFRAGISTICS_PAT
ARG INFRAGISTICS_NPM_REGISTRY_URL
# https://packages.infragistics.com/npm/js-licensed/

ARG INFRAGISTICS_NPM_JS_LICENSED_URL
#//packages.infragistics.com/npm/js-licensed/

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm config set @infragistics:registry ${INFRAGISTICS_NPM_REGISTRY_URL}
RUN npm config set ${INFRAGISTICS_NPM_JS_LICENSED_URL}:_auth=${INFRAGISTICS_PAT}
RUN npm config set ${INFRAGISTICS_NPM_JS_LICENSED_URL}:always-auth=true

RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

# Copy environments folder which need to use to apply ConfigMap
COPY --from=build /usr/src/app/K8s /usr/share/nginx/environmentFiles

COPY --from=build /usr/src/app/dist/charger-fleet-web /usr/share/nginx/html
