echo -e "Store puppeteer executable in cache\n"

echo -e "installing libatk1.0-0"

apt apt install libatk1.0-0

mkdir ./.cache

mv /app/.cache/puppeteer ./.cache