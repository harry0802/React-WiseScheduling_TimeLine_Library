FROM node:20-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 設定環境變數
ENV NODE_ENV=production
ARG REACT_APP_API_HOST
ARG REACT_APP_API_PORT
ENV VITE_API_HOST=${REACT_APP_API_HOST}
ENV VITE_API_PORT=${REACT_APP_API_PORT}
ENV VITE_EXPOSE_PORT=${VITE_EXPOSE_PORT}
ENV REACT_APP_API_HOST=${REACT_APP_API_HOST}
ENV REACT_APP_API_PORT=${REACT_APP_API_PORT}

# 複製 package 檔案
COPY package.json package-lock.json ./

# 清理並安裝依賴
RUN npm cache clean --force || true
RUN rm -rf node_modules || true
RUN npm ci --omit=dev --ignore-scripts

# 複製專案檔案
COPY . .

# 建置專案
RUN npm run build

# 生產階段
FROM nginx:1.24-alpine AS production

ENV NODE_ENV=production

# 清理預設檔案
RUN rm -rf /usr/share/nginx/html/*

# 複製建置檔案
COPY --from=builder /app/build /usr/share/nginx/html

# 複製 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]