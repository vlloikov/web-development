# Web Development

[![GitHub Pages](https://github.com/vlloikov/web-development/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/vlloikov/web-development/actions/workflows/pages.yml)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)

Лабораторные работы по дисциплинам **«Введение во frontend-разработку»** и **«Информационные технологии и программирование»** в СКФУ.


**[Открыть личный сайт →](https://vlloikov.github.io/web-development/)**

## Лабораторные работы

### Введение во frontend-разработку

| Работа | Содержание | Код |
| --- | --- | --- |
| 01 | Структура личного сайта, заголовки, текст и списки | [lab01](frontend-introduction/lab01/site/) |
| 02 | Семантическая разметка, навигация, ссылки и изображения | [lab02](frontend-introduction/lab02/site/) |
| 03 | Основы CSS, селекторы и стилизация текста | [lab03](frontend-introduction/lab03/site/) |

### Информационные технологии и программирование

| Работа | Содержание | Код |
| --- | --- | --- |
| 03 | Обложка альбома «СКФУ — Звук победы» | [lab03](it-and-programming/lab03/) |

## Структура

- `frontend-introduction/labNN/site/` — версия личного сайта для соответствующей лабораторной; изображения находятся в `site/images/`.
- `it-and-programming/labNN/` — работы по информационным технологиям и программированию.
- `.github/workflows/pages.yml` — проверка сборки в PR и публикация через GitHub Pages.
- `scripts/build-pages.sh` — подготовка последней версии личного сайта к публикации.


## Локальный просмотр


Также можно запустить сервер из корня репозитория, если установлен Python 3:

```bash
python3 -m http.server 8000
```


## Публикация в GitHub Pages

После каждого push в `main`, включая слияние PR, workflow публикует личный сайт по постоянному адресу:

<https://vlloikov.github.io/web-development/>

Скрипт выбирает папку с наибольшим номером среди `frontend-introduction/labNN/site/`, в которой есть `index.html`, и копирует её содержимое в `_site/`. Например, после добавления `lab04/site/index.html` в `main` будет опубликована версия из `lab04`. HTML, CSS и изображения сохраняют относительные пути.


При первой настройке выбери **Settings → Pages → Build and deployment → Source → GitHub Actions**. Дополнительный токен и ветка `gh-pages` не требуются.

Для проверки результата сборки локально:

```bash
bash scripts/build-pages.sh
python3 -m http.server 8001 --directory _site
```

Открой <http://localhost:8001/>. Папка `_site/` генерируется заново при каждой сборке и не коммитится.

## Работа с изменениями

Новую задачу начинай с актуальной `main` при чистой рабочей копии:

```bash
git switch main
git pull --ff-only
git switch -c feature/frontend-lab04
```

Добавляй в коммит файлы конкретной задачи, проверяй `git diff --cached`, затем открывай PR в `main`. Изменения разных лабораторных оформляй отдельными PR.

## Автор и лицензия

[Владислав Лоиков](https://github.com/vlloikov) · СКФУ · Программная инженерия

Код распространяется под [Apache License 2.0](LICENSE). Условия использования сторонних материалов указаны рядом с ними, если применимо.
