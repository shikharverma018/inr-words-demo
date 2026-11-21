import React, { useState, useMemo } from 'react';
import { toWords, formatINR } from 'inr-words-cli';

const PRESETS = [
  { label: '₹1.5 Lakh', value: '150000' },
  { label: '₹12.34 Lakh', value: '1234567.89' },
  { label: '₹1 Crore', value: '10000000' },
  { label: '₹5,432.50', value: '5432.50' },
  { label: '₹150 Crore', value: '1500000000' },
];

export default function App() {
  const [amount, setAmount] = useState('150250.75');
  const [copiedKey, setCopiedKey] = useState(null);

  const results = useMemo(() => {
    const trimmed = amount.trim();
    if (!trimmed) {
      return {
        formatted: '—',
        chequeWords: '—',
        plainWords: '—',
        error: null,
      };
    }

    try {
      const formatted = formatINR(trimmed);
      const chequeWords = toWords(trimmed, { currency: true });
      const plainWords = toWords(trimmed);
      return { formatted, chequeWords, plainWords, error: null };
    } catch {
      return {
        formatted: '—',
        chequeWords: '—',
        plainWords: '—',
        error: 'Please enter a valid numeric value or number with decimals.',
      };
    }
  }, [amount]);

  const copyToClipboard = (text, key) => {
    if (!text || text === '—') return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="badge-row">
          <a
            href="https://www.npmjs.com/package/inr-words-cli"
            target="_blank"
            rel="noreferrer"
            className="badge badge-npm"
          >
            <svg width="14" height="14" viewBox="0 0 780 250" fill="currentColor">
              <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
            </svg>
            npm inr-words-cli v1.0.0
          </a>
          <a
            href="https://github.com/shikharverma018/inr-words-cli"
            target="_blank"
            rel="noreferrer"
            className="badge badge-gh"
          >
            GitHub
          </a>
          <span className="badge badge-tag">Zero Dependencies</span>
        </div>
        <h1>Indian Cheque & Invoice Formatter</h1>
        <p>
          Live demonstration web app powered by the published npm package{' '}
          <code>inr-words-cli</code>.
        </p>
      </header>

      <main className="card">
        <label className="input-label" htmlFor="amount-input">
          Enter Amount (Numbers, Decimals, or Comma-separated)
        </label>
        <div className="input-wrapper">
          <span className="currency-symbol">₹</span>
          <input
            id="amount-input"
            type="text"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 150250.75"
          />
        </div>

        <div className="presets-row">
          <span className="presets-label">Sample Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={`preset-btn ${amount === p.value ? 'active' : ''}`}
              onClick={() => setAmount(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {results.error && (
          <div className="error-banner" style={{ marginTop: '1rem' }}>
            {results.error}
          </div>
        )}

        <div className="results-grid" style={{ marginTop: '1.5rem' }}>
          {/* Formatted INR */}
          <div className="result-box">
            <div className="result-header">
              <span className="result-title">Indian Comma Formatting (formatINR)</span>
              <button
                type="button"
                className={`copy-btn ${copiedKey === 'formatted' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(results.formatted, 'formatted')}
              >
                {copiedKey === 'formatted' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="result-value mono">{results.formatted}</div>
          </div>

          {/* Cheque / Invoice Wording */}
          <div className="result-box highlight">
            <div className="result-header">
              <span className="result-title">Cheque & Invoice Wording (toWords with currency: true)</span>
              <button
                type="button"
                className={`copy-btn ${copiedKey === 'cheque' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(results.chequeWords, 'cheque')}
              >
                {copiedKey === 'cheque' ? '✓ Copied' : 'Copy Cheque Wording'}
              </button>
            </div>
            <div className="result-value">{results.chequeWords}</div>
          </div>

          {/* Plain Words */}
          <div className="result-box">
            <div className="result-header">
              <span className="result-title">Standard Indian Number Words (toWords)</span>
              <button
                type="button"
                className={`copy-btn ${copiedKey === 'plain' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(results.plainWords, 'plain')}
              >
                {copiedKey === 'plain' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="result-value">{results.plainWords}</div>
          </div>
        </div>

        {/* Visual Cheque Preview */}
        {!results.error && results.chequeWords !== '—' && (
          <div className="cheque-card">
            <div className="cheque-row">
              <span><strong>STATE BANK OF INDIA</strong> &bull; New Delhi Main Branch</span>
              <span>Date: <strong>{new Date().toLocaleDateString('en-IN')}</strong></span>
            </div>
            <div className="cheque-row" style={{ marginTop: '0.5rem' }}>
              <div style={{ flex: 1, marginRight: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#854d0e' }}>PAY:</span>{' '}
                <span className="cheque-line" style={{ display: 'inline-block', width: '85%' }}>
                  Self / Cash
                </span>
              </div>
            </div>
            <div className="cheque-row" style={{ marginTop: '0.5rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, marginRight: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#854d0e' }}>RUPEES:</span>{' '}
                <span className="cheque-line" style={{ display: 'inline-block', width: '85%' }}>
                  {results.chequeWords}
                </span>
              </div>
              <div className="cheque-amount-box">{results.formatted}</div>
            </div>
            <div className="cheque-micr">
              ⑈ 112048 ⑈ 110002001 ⑈ 003412 ⑈ 10
            </div>
          </div>
        )}

        {/* Live Code Snippet */}
        <div className="code-card">
          <div className="code-title">Package Integration Snippet</div>
          <pre className="code-content">
            <code>
{`import { toWords, formatINR } from 'inr-words-cli';

// 1. Format Currency
formatINR('${amount}')
// => "${results.formatted}"

// 2. Cheque & Invoice Wording
toWords('${amount}', { currency: true })
// => "${results.chequeWords}"`}
            </code>
          </pre>
        </div>
      </main>

      <footer className="footer">
        <p>
          Built for college project demonstration &bull; Package:{' '}
          <a
            href="https://www.npmjs.com/package/inr-words-cli"
            target="_blank"
            rel="noreferrer"
          >
            inr-words-cli v1.0.0
          </a>{' '}
          &bull; Author:{' '}
          <a href="https://github.com/shikharverma018" target="_blank" rel="noreferrer">
            Shikhar Verma
          </a>
        </p>
      </footer>
    </div>
  );
}
