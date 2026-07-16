#!/bin/bash
set -euo pipefail

for string in $(cat change_list); do
    url=$(echo "$string" | cut -d '|' -f 1)
    var=$(echo "$string" | cut -d '|' -f 2)

    if [[ -z "${!var-}" ]]; then
        echo "Error: variable '$var' is not set"
        exit 1
    fi

    replacement="${!var}"

    echo "Replacing '$url' with '$replacement'"
# Находим все файлы в директории и меняем переменные из списка
    find /usr/share/nginx/html/ -type f | while read -r file; do
        tmpfile="/tmp/$(basename "$file").tmp"
        sed "s|${url}|${replacement}|g" "$file" > "$tmpfile" && cp "$tmpfile" "$file" && rm "$tmpfile"
    done
done

# Дефолтный энтрипоинт
/docker-entrypoint.sh nginx -g 'daemon off;'

