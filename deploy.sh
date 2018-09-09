cd /app/17disney-web
git pull
docker build -t 17disney-web .

docker stop 17disney-web
docker rm 17disney-web

docker run -d \
  --name 17disney-web \
  -e TZ="Asia/Shanghai" \
  -p 27110:80 \
  --mount type=bind,source=/app/17disney-web,target=/app/dist \
  --restart always \
  17disney-web
