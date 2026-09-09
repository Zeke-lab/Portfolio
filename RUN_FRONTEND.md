# Run Frontend

From the project root, run:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Then open the app in the browser or on your phone using:

- Local: http://localhost:5173/
- Network: http://192.168.1.51:5173/

If you want to use the backend for the portfolio data, also run:

```bash
cd backend
npm install
npm run dev
```

Then the frontend will call the API at:

- http://192.168.1.51:4000
