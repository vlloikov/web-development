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

После каждого push в `main`, включая слияние PR, workflow проверяет код и при успешном результате публикует личный сайт по постоянному адресу:

<https://vlloikov.github.io/web-development/>

Скрипт выбирает папку с наибольшим номером среди `frontend-introduction/labNN/site/`, в которой есть `index.html`, и копирует её содержимое в `_site/`. Например, после добавления `lab04/site/index.html` в `main` будет опубликована версия из `lab04`. HTML, CSS и изображения сохраняют относительные пути.


При первой настройке выбери **Settings → Pages → Build and deployment → Source → GitHub Actions**. Дополнительный токен и ветка `gh-pages` не требуются.

Для проверки результата сборки локально:

```bash
bash scripts/build-pages.sh
python3 -m http.server 8001 --directory _site
```


## Проверки кода и Git hooks

Для инструментов разработки нужны **Node.js 24.8+ и npm**. Сам сайт остаётся статическим: Node.js используется только для проверок.

После клонирования или получения файлов настройки выполни из корня репозитория:

```bash
npm ci
```

Команда устанавливает версии из `package-lock.json` и подключает Husky. Перед каждым коммитом `lint-staged` запускает Prettier для HTML и CSS, добавленных в индекс через `git add`. Отформатированная версия автоматически попадает в коммит, затем выполняются проверки HTML-Validate и Stylelint. При ошибке коммит останавливается. Хук работает и при коммите через WebStorm, если IDE использует Git hooks и видит Node.js.

| Инструмент | Что проверяет |
| --- | --- |
| Prettier | Единое форматирование HTML и CSS: отступы, переносы строк и пробелы |
| HTML-Validate | Структуру HTML, допустимость элементов и атрибутов, базовые требования доступности |
| Stylelint | Неизвестные свойства и единицы, ошибочные значения, дубли свойств и другие ошибки CSS |

Форматирование задают `.prettierrc.json` и `.editorconfig`. Если в файле есть и подготовленные, и неподготовленные изменения, lint-staged временно скрывает неподготовленную часть и восстанавливает её после проверки.

При первом подключении форматтера один раз приведи существующие HTML и CSS к общему стилю:

```bash
npm run format
npm run check
```

После этого форматирование выполняется автоматически перед коммитом. Команда `npm run check` запускает все проверки без исправлений: форматирование, валидацию HTML и линтер CSS. Отдельные команды: `npm run format:check`, `npm run lint:html`, `npm run lint:css`. Повторить обработку подготовленных к коммиту файлов можно командой `npm run lint:staged`.

В GitHub Actions задача **Code Quality** проверяет форматирование и код всех лабораторных в PR и после push в `main`. Затем **W3C Validation** запускает Nu Html Checker для всех HTML и CSS в `frontend-introduction/` и `it-and-programming/`. После успешной валидации выполняется **Build site**, затем **Deploy site**. В PR деплой пропускается по условию: опубликованный сайт обновляется после слияния изменений в `main`. Отчёты, изображения, JavaScript и каталог `_site/` не входят в область проверки. CI не исправляет и не коммитит файлы.

HTML-Validate обеспечивает быструю локальную проверку. Дополнительная проверка в Actions использует [Nu Html Checker](https://validator.github.io/validator/) — движок, доступный также на [validator.w3.org/nu/](https://validator.w3.org/nu/). Он запускается на runner и проверяет файлы без отправки страниц в публичный веб-сервис. Workflow устанавливает Java 21 и загружает production-релиз `latest` из официального репозитория валидатора; версия печатается в логе. Файл `vnu.jar` хранится во временной папке runner и не добавляется в репозиторий. Для локального хука Java не требуется.

Ошибки Nu Html Checker останавливают сборку и деплой. Предупреждения и информационные сообщения видны в логе задачи **W3C Validation** и сами по себе не блокируют публикацию.


## Работа с изменениями

Новую задачу стоит начинать с актуальной `main` при чистой рабочей копии:

```bash
git switch main
git pull --ff-only
git switch -c feature/frontend-lab04
```


## Автор и лицензия

[Владислав Лоиков](https://github.com/vlloikov) · СКФУ · Программная инженерия

Код распространяется под [Apache License 2.0](LICENSE). Условия использования сторонних материалов указаны рядом с ними, если применимо.
