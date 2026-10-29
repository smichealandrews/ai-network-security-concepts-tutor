# NetWise AI — AI & Network Security Concepts Tutor

A responsive, beginner-friendly learning app for essential network security and AI concepts. Built with HTML, CSS, and vanilla JavaScript, so it runs in a browser without a backend or API key.

## Features

- **Concept library:** Learn about firewalls, encryption, phishing, IDS/IPS, VPNs, malware, AI in security, and Zero Trust.
- **Search:** Filter concepts by topic or keyword.
- **Tutor chat demo:** Ask questions and get answers from a built-in topic knowledge base.
- **Knowledge quiz:** Five multiple-choice questions with instant feedback and score tracking.
- **Progress tracking:** Mark concepts as learned; progress is saved in browser local storage.
- **Dark mode:** Toggle between light and dark themes.
- **Responsive design:** Works on desktop and mobile screens.
- **Privacy-conscious demo:** No account, server, or API key required.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For a local development server, you can also run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new GitHub repository, for example `netwise-ai-security-tutor`.
2. Upload `index.html`, `style.css`, `app.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. The URL appears in the Pages settings.

## Project structure

```text
ai-network-security-concepts-tutor/
├── index.html
├── style.css
├── app.js
├── README.md
└── LICENSE
```

## How the tutor works

This version is a **rule-based demo**, not a connected large language model. It matches the question to built-in security topics and returns a prepared explanation. This keeps the project free to run and easy to publish. You can later add an AI backend, but never put a private API key directly in frontend JavaScript or commit it to GitHub.

## Learning goals

- Understand foundational network defense concepts.
- Practice identifying common security risks.
- Learn how AI can assist security analysts and why human validation remains important.
- Build a small interactive web project and publish it using GitHub Pages.

## Responsible-use note

This project is for education and defensive awareness. Use security knowledge only on systems you own or are explicitly authorized to test.

## Future improvements

- Add a secure backend for a real AI model.
- Add more topics and quizzes.
- Add a learning dashboard and downloadable completion certificate.
- Add references to reputable security learning resources.
- Add accessibility tests and automated checks.

## License

Released under the MIT License. See `LICENSE`.
