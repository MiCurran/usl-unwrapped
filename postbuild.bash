echo -e "Store puppeteer executable in cache\n"

apt apt-get install libatk1.0-0

mkdir ./.cache

mv /app/.cache/puppeteer ./.cache