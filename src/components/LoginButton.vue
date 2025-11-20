<template>
  <div class="login-container">
    <!-- Login Card -->
    <div v-if="!authStore.isAuthenticated" class="card login-card">
      <div class="card-header">
        <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <h3 class="card-title">Google OAuth2 PKCE Login</h3>
        <p class="card-description">Melden Sie sich mit Ihrem Google-Konto an</p>
      </div>

      <div class="card-body">
        <div class="form-group">
          <label for="clientId" class="form-label">Google Client ID</label>
          <input
            id="clientId"
            v-model="clientId"
            type="text"
            placeholder="Ihre Google Client ID"
            class="input"
          />
        </div>

        <button
          @click="handleLogin"
          :disabled="!clientId"
          class="btn btn-primary btn-block"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Mit Google anmelden
        </button>
      </div>
    </div>

    <!-- User Info Card -->
    <div v-else class="card user-card">
      <div class="card-header">
        <div class="success-badge">
          <svg class="success-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="card-title">Erfolgreich angemeldet</h3>
      </div>

      <div v-if="authStore.userInfo" class="card-body">
        <div class="user-profile">
          <!-- Profilbild oder Placeholder -->
          <div class="profile-picture-container">
            <template v-if="authStore.userInfo.picture && !imageError">
              <img
                :src="authStore.userInfo.picture"
                :alt="authStore.userInfo.name || 'Profile'"
                class="profile-picture"
                referrerpolicy="no-referrer"
                @error="handleImageError"
                @load="handleImageLoad"
              />
            </template>
            <div v-else class="profile-placeholder">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="user-info-grid">
            <div class="info-item">
              <span class="info-label">Name</span>
              <span class="info-value">{{ authStore.userInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{{ authStore.userInfo.email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Subject ID</span>
              <span class="info-value info-value-mono">{{ authStore.userInfo.sub }}</span>
            </div>
          </div>
        </div>

        <button @click="handleLogout" class="btn btn-secondary btn-block">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Abmelden
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Google Client-ID aus Umgebungsvariablen (.env)
const clientId = ref(import.meta.env.VITE_GOOGLE_CLIENT_ID || '')

// Bild-Fehler-Status
const imageError = ref(false)

// Client ID aus localStorage laden (falls vorhanden) oder aus .env speichern
onMounted(() => {
  const savedClientId = localStorage.getItem('google_client_id')
  if (savedClientId) {
    clientId.value = savedClientId
  } else if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    // Speichere die Client-ID aus .env im localStorage
    clientId.value = import.meta.env.VITE_GOOGLE_CLIENT_ID
    localStorage.setItem('google_client_id', clientId.value)
  }

})

async function handleLogin() {
  if (clientId.value) {
    // Client ID speichern
    localStorage.setItem('google_client_id', clientId.value)
    await authStore.login(clientId.value)
  }
}

function handleLogout() {
  authStore.logout()
  imageError.value = false // Reset image error state
  // Client-ID NICHT löschen, damit der Benutzer sich direkt wieder anmelden kann
}

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  console.log('✅ Profilbild erfolgreich geladen:', img.src)
  imageError.value = false
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  console.error('❌ Profilbild konnte nicht geladen werden:', img.src)
  console.error('Fehlerdetails:', event)
  imageError.value = true
}
</script>

<style scoped>
.login-container {
  max-width: 540px;
  margin: 0 auto;
}

/* Card Styles */
.login-card,
.user-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.card-header {
  text-align: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-secondary);
}

.google-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-md);
}

.success-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--color-success-light);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-md);
}

.success-icon {
  width: 32px;
  height: 32px;
  color: var(--color-success);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.card-body {
  padding: var(--spacing-xl);
}

/* Form Styles */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

/* Button Styles */
.btn-block {
  width: 100%;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* User Profile */
.user-profile {
  margin-bottom: var(--spacing-xl);
}

.profile-picture-container {
  width: 96px;
  height: 96px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  border: 3px solid var(--color-border);
  object-fit: cover;
  background: var(--color-background-secondary);
  box-shadow: var(--shadow-sm);
  display: block;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-background-secondary);
  border: 3px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-placeholder svg {
  width: 48px;
  height: 48px;
  color: var(--color-text-tertiary);
}

.user-info-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.info-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  word-break: break-word;
}

.info-value-mono {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: var(--font-size-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .card-header {
    padding: var(--spacing-lg);
  }

  .card-body {
    padding: var(--spacing-lg);
  }

  .google-icon {
    width: 40px;
    height: 40px;
  }

  .card-title {
    font-size: var(--font-size-lg);
  }
}
</style>

