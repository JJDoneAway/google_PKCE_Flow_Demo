<template>
  <div class="container">
    <div class="callback-container">
      <!-- Loading State -->
      <div v-if="loading" class="card status-card">
        <div class="status-icon-wrapper loading-wrapper">
          <div class="spinner"></div>
        </div>
        <h2 class="status-title">Authentifizierung läuft...</h2>
        <p class="status-text">Bitte warten Sie, während wir Ihre Anmeldung verarbeiten.</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card status-card error-card">
        <div class="status-icon-wrapper error-wrapper">
          <svg class="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="status-title error-title">Authentifizierung fehlgeschlagen</h2>

        <div class="error-details">
          <pre class="error-message">{{ error }}</pre>
        </div>

        <div class="help-box">
          <svg class="help-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="help-content">
            <p class="help-title">Mögliche Lösungen:</p>
            <ul class="help-list">
              <li>Überprüfen Sie die Browser-Konsole für weitere Details</li>
              <li>Stellen Sie sicher, dass die Redirect URI korrekt konfiguriert ist</li>
              <li>Versuchen Sie, sich erneut anzumelden</li>
            </ul>
          </div>
        </div>

        <button @click="goHome" class="btn btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Zurück zur Startseite
        </button>
      </div>

      <!-- Success State -->
      <div v-else class="card status-card success-card">
        <div class="status-icon-wrapper success-wrapper">
          <svg class="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="status-title success-title">Erfolgreich angemeldet!</h2>
        <p class="status-text">Sie werden zur Startseite weitergeleitet...</p>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    // Prüfe ob ein Fehler von Google zurückgegeben wurde
    const urlParams = new URLSearchParams(window.location.search)
    const oauthError = urlParams.get('error')
    const errorDescription = urlParams.get('error_description')

    if (oauthError) {
      error.value = `Google OAuth Fehler: ${oauthError}`
      if (errorDescription) {
        error.value += `\n\nDetails: ${errorDescription}`
      }
      loading.value = false
      console.error('OAuth Error:', { error: oauthError, description: errorDescription })
      return
    }

    // Client ID aus localStorage holen
    const clientId = localStorage.getItem('google_client_id')
    if (!clientId) {
      error.value = 'Keine Client ID gefunden. Bitte melden Sie sich erneut an.'
      loading.value = false
      return
    }

    console.log('Verarbeite OAuth Callback...')

    // Callback verarbeiten
    const result = await authStore.handleCallback(clientId)

    if (result.success) {
      console.log('✅ Authentifizierung erfolgreich!')
      // Erfolgreich - zur Startseite weiterleiten
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      console.error('❌ Authentifizierung fehlgeschlagen:', result.error)
      error.value = result.error || 'Token-Austausch fehlgeschlagen. Bitte versuchen Sie es erneut.'
      loading.value = false
    }
  } catch (err) {
    const errorMsg = 'Ein unerwarteter Fehler ist aufgetreten: ' + (err as Error).message
    console.error('❌ Unerwarteter Fehler:', err)
    error.value = errorMsg
    loading.value = false
  }
})

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: var(--spacing-xl) 0;
}

/* Status Card */
.status-card {
  max-width: 540px;
  text-align: center;
  padding: var(--spacing-2xl);
}

.status-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-lg);
}

.status-icon {
  width: 48px;
  height: 48px;
}

/* Loading State */
.loading-wrapper {
  background: var(--color-primary-light);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success State */
.success-wrapper {
  background: var(--color-success-light);
}

.success-wrapper .status-icon {
  color: var(--color-success);
}

.success-title {
  color: var(--color-success);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-top: var(--spacing-lg);
}

.progress-fill {
  height: 100%;
  background: var(--color-success);
  border-radius: var(--radius-full);
  animation: progress 1.5s ease-in-out;
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

/* Error State */
.error-wrapper {
  background: var(--color-error-light);
}

.error-wrapper .status-icon {
  color: var(--color-error);
}

.error-title {
  color: var(--color-error);
}

.error-details {
  background: var(--color-error-light);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  text-align: left;
}

.error-message {
  margin: 0;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: var(--font-size-sm);
  color: var(--color-error);
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
}

/* Help Box */
.help-box {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-primary-light);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  margin: var(--spacing-lg) 0;
  text-align: left;
}

.help-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.help-content {
  flex: 1;
}

.help-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.help-list {
  margin: 0;
  padding-left: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.help-list li {
  margin: var(--spacing-xs) 0;
}

/* Typography */
.status-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.status-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Button */
.btn {
  margin-top: var(--spacing-xl);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .status-card {
    padding: var(--spacing-xl);
  }

  .status-icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .status-icon {
    width: 36px;
    height: 36px;
  }

  .spinner {
    width: 36px;
    height: 36px;
  }

  .status-title {
    font-size: var(--font-size-xl);
  }

  .help-box {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>

