# 🔐 Google OAuth2 PKCE Test-Applikation

Eine Vue.js 3 Single Page Application (SPA), die den OAuth2 Authorization Code Flow mit PKCE (Proof Key for Code Exchange) demonstriert.

## ✅ Aktuelle Konfiguration

Diese Applikation ist bereits mit folgenden Google OAuth2-Credentials konfiguriert:

- **Projekt**: magic-inside
- **Client-ID**: `267637620951-3tn8pgadbgo145oj9ol5ldojkvkvu38h.apps.googleusercontent.com`
- **Redirect URI**: `http://localhost:5173/callback`
- **JavaScript Origins**: `http://localhost:5173`

Die Client-ID ist bereits in der Applikation vorausgefüllt - Sie können sich direkt anmelden!

## 🔧 Google Cloud Console Einrichtung (bereits erledigt ✓)

Die folgenden Schritte wurden bereits durchgeführt:

### Schritt 1: Google Cloud Projekt erstellen ✓
- Projekt "magic-inside" wurde erstellt

### Schritt 2: OAuth-Zustimmungsbildschirm konfigurieren ✓
- OAuth-Zustimmungsbildschirm wurde konfiguriert
- Testnutzer wurden hinzugefügt

### Schritt 3: OAuth2-Client-ID erstellen ✓
- Client-ID wurde erstellt
- Autorisierte JavaScript-Quellen: `http://localhost:5173`
- Autorisierte Weiterleitungs-URIs: `http://localhost:5173/callback`

## 📦 Installation und Verwendung

```sh
npm install
npm run dev
```

Die App läuft auf http://localhost:5173

## 🚀 Anmeldung

1. Die Google Client-ID ist bereits vorausgefüllt
2. Klicken Sie einfach auf **"Mit Google anmelden"**
3. Melden Sie sich mit Ihrem Google-Account an
4. Nach erfolgreicher Anmeldung werden die Tokens angezeigt:
   - **Access Token (JWT)** - Für API-Aufrufe
   - **ID Token (OpenID)** - Mit Benutzerinformationen
   - **Dekodierte Token-Payload** - Zeigt alle Claims

## ✨ Features

- ✅ **OAuth2 PKCE Flow** - Sicherer Authorization Code Flow mit Proof Key for Code Exchange
- ✅ **Google Identity Provider** - Integration mit Google OAuth2
- ✅ **JWT Access Token** - Für API-Aufrufe verwendbar
- ✅ **OpenID ID Token** - Mit Benutzerinformationen (email, name, picture)
- ✅ **Token-Dekodierung** - Zeigt alle Claims im ID Token
- ✅ **Umgebungsvariablen** - Konfiguration über .env Datei
- ✅ **TypeScript** - Vollständig typsicher
- ✅ **Responsive Design** - Funktioniert auf allen Geräten

## 🔐 Wie funktioniert PKCE?

PKCE (Proof Key for Code Exchange) ist eine Sicherheitserweiterung für OAuth2:

1. **Code Verifier generieren**: Zufälliger String (128 Zeichen)
2. **Code Challenge erstellen**: SHA-256 Hash des Code Verifiers, Base64-URL-kodiert
3. **Authorization Request**: Sende Code Challenge an Google
4. **Authorization Code erhalten**: Nach erfolgreicher Anmeldung
5. **Token Request**: Tausche Code + Code Verifier gegen Tokens
6. **Google validiert**: Prüft ob SHA-256(Code Verifier) == Code Challenge
7. **Tokens erhalten**: Access Token und ID Token

### Vorteile:
- ✅ Schutz vor Authorization Code Interception Attacks
- ✅ Keine Client Secrets erforderlich (sicher für SPAs)
- ✅ Empfohlen für alle OAuth2 Public Clients
- ✅ CSRF-Schutz durch State-Parameter

## 🔒 Sicherheitshinweise

⚠️ **Wichtig für Produktionsumgebungen:**
- Verwenden Sie HTTPS statt HTTP
- Speichern Sie Tokens in HttpOnly Cookies statt LocalStorage
- Implementieren Sie Token-Refresh-Mechanismus
- Validieren Sie ID Tokens serverseitig
- Fügen Sie Rate Limiting hinzu

## 📁 Projekt-Struktur

```
oauth-test-app/
├── .env                         # Umgebungsvariablen (nicht in Git!)
├── .env.example                 # Beispiel-Konfiguration
├── src/
│   ├── components/
│   │   ├── LoginButton.vue      # Login-Interface
│   │   └── TokenDisplay.vue     # Token-Anzeige
│   ├── services/
│   │   └── oauth.ts             # OAuth2 PKCE Service
│   ├── stores/
│   │   └── auth.ts              # Pinia Auth Store
│   ├── views/
│   │   ├── HomeView.vue         # Hauptansicht
│   │   └── CallbackView.vue     # OAuth Callback Handler
│   └── router/
│       └── index.ts             # Vue Router
└── README.md
```

## 🛠 Technologie-Stack

- **Vue.js 3** - Progressive JavaScript Framework
- **TypeScript** - Typsicheres JavaScript
- **Vite** - Schneller Build-Tool und Dev-Server
- **Pinia** - State Management
- **Vue Router** - Client-Side Routing
- **Web Crypto API** - Für PKCE Code Challenge Generierung

