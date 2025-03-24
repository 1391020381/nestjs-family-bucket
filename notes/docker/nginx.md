```




docker run --name nginx \
  -v D:/software/docker/nginx/html:/usr/share/nginx/html:ro \
  -p 8089:80 \  # 宿主机 8080 → 容器 80
  -d nginx



docker run --name nginx `
  -v D:/software/docker/nginx/html:/usr/share/nginx/html:ro `
  -p 8080:80 `
  -d nginx
```
