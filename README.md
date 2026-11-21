# inr-words-demo

Interactive web application demonstrating the published [`inr-words-cli`](https://www.npmjs.com/package/inr-words-cli) npm package.

## Live Demo
> **Live URL:** [Deploying to Vercel...]

## Features

- **Live INR Currency Formatting**: Demonstrates `formatINR()` with Indian comma separation.
- **Cheque & Invoice Wording**: Demonstrates `toWords(num, { currency: true })` producing RBI/bank standard words.
- **Cheque Visualizer**: Renders an interactive Indian cheque with real-time updates.
- **Sample Presets**: Quick buttons for Lakhs, Crores, and Thousands with Paise.
- **One-click Copy**: Easily copy cheque wording or formatted amounts.

## Tech Stack

- **React 19**
- **Vite**
- **inr-words-cli** (v1.0.0 from npm)

## Local Development

```bash
# Clone the repository
git clone https://github.com/shikharverma018/inr-words-demo.git

# Navigate into project
cd inr-words-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

## Production Build

```bash
npm run build
```
