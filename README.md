# frontend-main-standalone

Автономная сборка хост-приложения `frontend-main` без Module Federation, без `@vsm/vsm-common` и без обращений к бэкенду.

## Запуск

```bash
cd frontend-main-standalone
npm install
npm run dev
```

После входа открывается страница **«Статус реализации проекта ВСМ-1»** (`/dashboards/status`) — полная копия `MainSection` из `frontend-dashboards` с мок-данными.

## Моки

Статические данные: `src/mocks/dashboards/mainPageData.js`

- Контрольные точки КСГ
- Ресурсы (график ECharts, этапы)
- Экспертиза
- Строительство
- Земельные участки

Сторы и API в `src/features/dashboards/model/` и `src/features/dashboards/api/` подменены локальными реализациями.

## Навигация

Верхнее меню и пункты бокового меню дашбордов отображаются, но переходы на другие разделы отключены.

## Демо-вход

Любой e-mail и пароль.
