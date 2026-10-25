#!/usr/bin/env bash
set -euo pipefail

# Resolve paths from the repository root, even when called elsewhere.
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

shopt -s nullglob
site_directories=()

for index_file in frontend-introduction/lab[0-9]*/site/index.html; do
    lab_directory="${index_file%/site/index.html}"
    lab_name="${lab_directory##*/}"
    [[ "$lab_name" =~ ^lab[0-9]+$ ]] || continue
    site_directories+=("${index_file%/index.html}")
done

if (( ${#site_directories[@]} == 0 )); then
    echo "No frontend lab with site/index.html was found." >&2
    exit 1
fi

# Version sorting keeps lab10 newer than lab09 (and lab9).
latest_site="$(printf '%s\n' "${site_directories[@]}" | LC_ALL=C sort -V | tail -n 1)"

if [[ ! -s "$latest_site/index.html" ]]; then
    echo "The selected index.html is empty: $latest_site/index.html" >&2
    exit 1
fi

# _site is generated output; copy only the selected site's files.
rm -rf -- _site
mkdir _site
cp -R -- "$latest_site/." _site/

echo "Prepared GitHub Pages site from: $latest_site"
