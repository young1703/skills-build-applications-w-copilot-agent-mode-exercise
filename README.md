# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey young1703!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/young1703/skills-build-applications-w-copilot-agent-mode-exercise/issues/1)

## OctoFit Tracker frontend

The frontend reads the optional `VITE_CODESPACE_NAME` variable from Vite. In
`octofit-tracker/frontend/.env.local`, set it to your Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When set, the frontend calls
`https://<your-codespace-name>-8000.app.github.dev/api/`. When it is unset,
the API base URL falls back to `http://localhost:8000`. Restart the Vite
development server after changing `.env.local`.
