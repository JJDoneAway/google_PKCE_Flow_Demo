// OAuth2 PKCE Flow Service für Google Identity Provider

export interface OAuthConfig {
  clientId: string
  redirectUri: string
  authorizationEndpoint: string
  tokenEndpoint: string
  scope: string
}

export interface TokenResponse {
  access_token: string
  id_token: string
  token_type: string
  expires_in: number
  scope: string
}

export interface DecodedToken {
  iss: string
  sub: string
  aud: string
  exp: number
  iat: number
  email?: string
  name?: string
  picture?: string
}

export interface UserInfo {
  sub: string
  name?: string
  given_name?: string
  family_name?: string
  picture?: string
  email?: string
  email_verified?: boolean
  locale?: string
}

class OAuthService {
  private config: OAuthConfig = {
    clientId: '', // Wird dynamisch gesetzt
    redirectUri:
      import.meta.env.VITE_REDIRECT_URI || window.location.origin + '/callback',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    scope: 'openid profile email'
  }

  // PKCE Helper Funktionen
  private generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let text = ''
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return await window.crypto.subtle.digest('SHA-256', data)
  }

  private base64urlencode(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let str = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      str += String.fromCharCode(bytes[i])
    }
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const hashed = await this.sha256(codeVerifier)
    return this.base64urlencode(hashed)
  }

  // Token im localStorage speichern
  private saveTokens(tokens: TokenResponse): void {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('id_token', tokens.id_token)
    localStorage.setItem('token_expires_at', String(Date.now() + tokens.expires_in * 1000))
  }

  // Token aus localStorage laden
  getTokens(): { accessToken: string | null; idToken: string | null } {
    return {
      accessToken: localStorage.getItem('access_token'),
      idToken: localStorage.getItem('id_token')
    }
  }

  // Prüfen ob Token noch gültig ist
  isAuthenticated(): boolean {
    const expiresAt = localStorage.getItem('token_expires_at')
    if (!expiresAt) return false
    return Date.now() < parseInt(expiresAt)
  }

  // JWT Token dekodieren
  decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  // OAuth2 Flow starten
  async startAuthFlow(clientId: string): Promise<void> {
    this.config.clientId = clientId

    console.log('🚀 Starte OAuth2 PKCE Flow...')
    console.log('Client-ID:', clientId)
    console.log('Redirect URI:', this.config.redirectUri)

    // PKCE Code Verifier und Challenge generieren
    const codeVerifier = this.generateRandomString(128)
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)

    console.log('✅ PKCE Code Verifier generiert (Länge:', codeVerifier.length, ')')
    console.log('✅ PKCE Code Challenge generiert:', codeChallenge.substring(0, 20) + '...')

    // State für CSRF-Schutz
    const state = this.generateRandomString(32)

    // Im SessionStorage speichern
    sessionStorage.setItem('code_verifier', codeVerifier)
    sessionStorage.setItem('oauth_state', state)

    console.log('✅ Code Verifier und State im SessionStorage gespeichert')

    // Authorization URL erstellen
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    })

    const authUrl = `${this.config.authorizationEndpoint}?${params.toString()}`
    console.log('🔗 Weiterleitung zu Google:', this.config.authorizationEndpoint)
    console.log('📋 Parameter:', {
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope,
      code_challenge_method: 'S256'
    })

    window.location.href = authUrl
  }

  // Authorization Code gegen Token tauschen
  async handleCallback(clientId: string): Promise<{ success: boolean; error?: string }> {
    this.config.clientId = clientId

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')
    const error = urlParams.get('error')
    const errorDescription = urlParams.get('error_description')

    // Prüfe ob Google einen Fehler zurückgegeben hat
    if (error) {
      const errorMsg = `Google OAuth Fehler: ${error}${errorDescription ? ' - ' + errorDescription : ''}`
      console.error(errorMsg)
      return { success: false, error: errorMsg }
    }

    // State validieren
    const savedState = sessionStorage.getItem('oauth_state')
    if (!state || state !== savedState) {
      const errorMsg = `CSRF-Schutz: State-Parameter ungültig (erwartet: ${savedState}, erhalten: ${state})`
      console.error(errorMsg)
      return { success: false, error: errorMsg }
    }

    if (!code) {
      const errorMsg = 'Kein Authorization Code von Google erhalten'
      console.error(errorMsg)
      return { success: false, error: errorMsg }
    }

    // Code Verifier aus SessionStorage holen
    const codeVerifier = sessionStorage.getItem('code_verifier')
    if (!codeVerifier) {
      const errorMsg = 'Code Verifier nicht gefunden - Session möglicherweise abgelaufen'
      console.error(errorMsg)
      return { success: false, error: errorMsg }
    }

    try {
      // Token Request
      const tokenParams: Record<string, string> = {
        client_id: this.config.clientId,
        code: code,
        redirect_uri: this.config.redirectUri,
        grant_type: 'authorization_code',
        code_verifier: codeVerifier
      }

      // Client-Secret hinzufügen, falls vorhanden (für Web Application Clients erforderlich)
      const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET
      if (clientSecret) {
        console.log('⚠️ Client-Secret wird verwendet (nur für Entwicklung/Tests!)')
        tokenParams.client_secret = clientSecret
      }

      const params = new URLSearchParams(tokenParams)

      console.log('Token Request:', {
        endpoint: this.config.tokenEndpoint,
        clientId: this.config.clientId,
        redirectUri: this.config.redirectUri,
        hasCode: !!code,
        hasCodeVerifier: !!codeVerifier
      })

      const response = await fetch(this.config.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })

      if (!response.ok) {
        let errorMsg = `Token Request fehlgeschlagen (HTTP ${response.status})`
        try {
          const errorData = await response.json()
          console.error('Token Error Response:', errorData)
          errorMsg = `${errorMsg}: ${errorData.error || 'Unbekannter Fehler'}`
          if (errorData.error_description) {
            errorMsg += ` - ${errorData.error_description}`
          }
        } catch (e) {
          const errorText = await response.text()
          console.error('Token Error Text:', errorText)
          errorMsg += `: ${errorText}`
        }
        return { success: false, error: errorMsg }
      }

      const tokens: TokenResponse = await response.json()
      console.log('Tokens erfolgreich erhalten:', {
        hasAccessToken: !!tokens.access_token,
        hasIdToken: !!tokens.id_token,
        expiresIn: tokens.expires_in
      })

      this.saveTokens(tokens)

      // SessionStorage aufräumen
      sessionStorage.removeItem('code_verifier')
      sessionStorage.removeItem('oauth_state')

      return { success: true }
    } catch (error) {
      const errorMsg = `Netzwerkfehler beim Token-Austausch: ${(error as Error).message}`
      console.error(errorMsg, error)
      return { success: false, error: errorMsg }
    }
  }

  // UserInfo von Google abrufen
  async getUserInfo(accessToken: string): Promise<UserInfo | null> {
    try {
      console.log('📡 Rufe UserInfo von Google ab...')
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        console.error('❌ UserInfo-Abruf fehlgeschlagen:', response.status, response.statusText)
        return null
      }

      const userInfo: UserInfo = await response.json()
      console.log('✅ UserInfo erfolgreich abgerufen:', userInfo)
      return userInfo
    } catch (error) {
      console.error('❌ Fehler beim UserInfo-Abruf:', error)
      return null
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('token_expires_at')
  }
}

export const oauthService = new OAuthService()

