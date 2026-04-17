import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend AI Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #6366f1;
                --bg: #0f172a;
                --card: rgba(30, 41, 59, 0.7);
                --text: #f8fafc;
                --accent: #22d3ee;
            }
            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                margin: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
                padding: 2rem;
            }
            .container {
                max-width: 800px;
                width: 100%;
                background: var(--card);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 3rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            h1 {
                font-weight: 600;
                margin-bottom: 0.5rem;
                background: linear-gradient(to right, var(--accent), var(--primary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 2.5rem;
            }
            .status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin: 2rem 0;
            }
            .status-card {
                background: rgba(255,255,255,0.05);
                padding: 1.5rem;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.05);
            }
            .status-card h3 { margin: 0; font-size: 0.9rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
            .status-card p { margin: 0.5rem 0 0; font-size: 1.2rem; font-weight: 600; color: #22d3ee; }
            .badge {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 600;
                background: rgba(34, 211, 238, 0.1);
                color: #22d3ee;
                border: 1px solid rgba(34, 211, 238, 0.2);
            }
            .endpoint-list { margin-top: 2rem; }
            .endpoint {
                padding: 1rem;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .endpoint:last-child { border-bottom: none; }
            .method { color: #f472b6; font-weight: 600; margin-right: 1rem; }
            .url { color: #94a3b8; }
            .description { font-size: 0.9rem; color: #64748b; margin-top: 0.5rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Backend AI Dashboard</h1>
            <p>The core engine for the Real-Time AI Chat application is running smoothly.</p>
            
            <div class="status-grid">
                <div class="status-card">
                    <h3>Server Status</h3>
                    <p>ONLINE <span class="badge">Healthy</span></p>
                </div>
                <div class="status-card">
                    <h3>Environment</h3>
                    <p>DEVELOPMENT</p>
                </div>
                <div class="status-card">
                    <h3>Auth Provider</h3>
                    <p>FIREBASE <span class="badge">Active</span></p>
                </div>
            </div>

            <div class="endpoint-list">
                <h2>🛰️ Endpoints</h2>
                <div class="endpoint">
                    <span class="method">GET</span> <span class="url">/</span>
                    <div class="description">Dashboard (This page)</div>
                </div>
                <div class="endpoint">
                    <span class="method">POST</span> <span class="url">/chat/message</span>
                    <div class="description">Secure AI Gateway. Requires Firebase ID Token.</div>
                </div>
            </div>

            <div style="margin-top: 3rem; padding: 1.5rem; background: rgba(0,0,0,0.2); border-radius: 12px; font-size: 0.9rem; color: #94a3b8;">
                <strong>Developer Note:</strong> Full request/response telemetry is now being streamed to the console for maximum visibility. Check the local terminal to see the AI conversation payloads in real-time.
            </div>
        </div>
    </body>
    </html>
    `;
    }
}
