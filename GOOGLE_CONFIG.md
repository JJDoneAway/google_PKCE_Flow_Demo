# Google OAuth2 Konfiguration

## Aktuelle Konfiguration

Diese Datei dokumentiert die Google OAuth2-Konfiguration für diese Applikation.

### Projekt-Details

- **Projekt-ID**: `magic-inside`
- **Projekt-Name**: Magic Inside

### OAuth2 Client-Credentials

- **Client-ID**: `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`
- **Client-Secret**: `YOUR_GOOGLE_CLIENT_SECRET`

  ⚠️ **Hinweis**: Google verlangt ein Client-Secret auch für PKCE-Flows. Für lokale Tests ist dies akzeptabel, für Produktion sollte ein Backend-Proxy verwendet werden.

### Autorisierte URIs

**JavaScript Origins:**
- `http://localhost:5173`

**Redirect URIs:**
- `http://localhost:5173/callback`

### OAuth2 Endpoints

- **Authorization Endpoint**: `https://accounts.google.com/o/oauth2/auth`
- **Token Endpoint**: `https://oauth2.googleapis.com/token`
- **Certificate URL**: `https://www.googleapis.com/oauth2/v1/certs`

### Scopes

Die Applikation fordert folgende Berechtigungen an:
- `openid` - OpenID Connect Authentifizierung
- `profile` - Zugriff auf Profilinformationen (Name, Bild)
- `email` - Zugriff auf E-Mail-Adresse

## Verwendung in der Applikation

Die Konfiguration wird über die `.env` Datei geladen:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
VITE_GOOGLE_PROJECT_ID=your-project-id
VITE_REDIRECT_URI=http://localhost:5173/callback
```

## Sicherheitshinweise

1. **Client-Secret**: Wird für PKCE nicht benötigt und sollte NICHT im Frontend-Code verwendet werden
2. **PKCE Flow**: Verwendet Code Verifier/Challenge statt Client-Secret
3. **State Parameter**: Schützt vor CSRF-Angriffen
4. **Redirect URI**: Muss exakt mit der in Google Cloud Console konfigurierten URI übereinstimmen

## Für Produktionsumgebung

Wenn Sie diese App in Produktion deployen möchten:

1. Erstellen Sie einen neuen OAuth2-Client in der Google Cloud Console
2. Fügen Sie Ihre Produktions-Domain zu den autorisierten URIs hinzu
3. Aktualisieren Sie die `.env` Datei mit den neuen Werten
4. Verwenden Sie HTTPS statt HTTP
5. Konfigurieren Sie den OAuth-Zustimmungsbildschirm für "Veröffentlicht" statt "Testing"

## Testnutzer

Während sich die App im Testing-Modus befindet, können nur explizit hinzugefügte Testnutzer sich anmelden. Fügen Sie Testnutzer in der Google Cloud Console hinzu:

1. Gehen Sie zu "APIs & Dienste" → "OAuth-Zustimmungsbildschirm"
2. Scrollen Sie zu "Testnutzer"
3. Klicken Sie auf "Nutzer hinzufügen"
4. Geben Sie die E-Mail-Adressen ein

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Überprüfen Sie, dass die Redirect URI in der Google Cloud Console exakt `http://localhost:5173/callback` ist
- Stellen Sie sicher, dass kein Trailing Slash vorhanden ist

### "Error 403: access_denied"
- Stellen Sie sicher, dass Ihre E-Mail-Adresse als Testnutzer hinzugefügt wurde
- Überprüfen Sie, dass der OAuth-Zustimmungsbildschirm konfiguriert ist

### "Error 401: invalid_client"
- Überprüfen Sie, dass die Client-ID korrekt ist
- Stellen Sie sicher, dass der OAuth2-Client in der Google Cloud Console aktiviert ist

