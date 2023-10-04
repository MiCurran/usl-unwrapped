echo -e "Store puppeteer executable in cache\n"

sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev

mkdir ./.cache

mv /app/.cache/puppeteer ./.cache