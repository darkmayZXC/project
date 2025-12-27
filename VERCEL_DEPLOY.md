# Деплой на Vercel

Короткая инструкция по публикации проекта на Vercel (Next.js).

1. Перейдите на https://vercel.com и войдите через GitHub (используйте аккаунт `darkmayZXC`).
2. Нажмите «New Project» → «Import Git Repository» и выберите `darkmayZXC/project`.
3. В настройках проекта:
   - Framework Preset: Next.js (должно определиться автоматически).
   - Root Directory: оставьте пустым (корень репозитория).
   - Build Command: `npm run build` (по умолчанию Vercel поймёт Next.js).
   - Output Directory: оставить пустым.
4. В разделе Environment Variables добавьте необходимые переменные (например, Firebase):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, и т.д.
5. Нажмите Deploy — Vercel автоматически запустит сборку и опубликует сайт.

Дополнительно:
- Файл `vercel.json` уже добавлен в репозиторий — Vercel будет использовать `@vercel/next` для сборки.
- Автоматические деплои настроятся для ветки `main` при подключении репозитория.
