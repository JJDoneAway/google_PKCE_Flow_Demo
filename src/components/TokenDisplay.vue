<template>
  <div v-if="authStore.isAuthenticated" class="token-container">
    <h2 class="section-title">Token Informationen</h2>

    <!-- Access Token -->
    <div class="card token-card">
      <div class="token-header">
        <div class="token-icon-wrapper">
          <svg class="token-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="token-title-group">
          <h3 class="token-title">Access Token</h3>
          <p class="token-subtitle">JWT für API-Aufrufe</p>
        </div>
      </div>
      <div class="token-content">
        <pre class="token-value">{{ authStore.accessToken }}</pre>
      </div>
      <div class="token-footer">
        <button @click="copyToClipboard(authStore.accessToken)" class="btn btn-secondary btn-sm">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Kopieren
        </button>
      </div>
    </div>

    <!-- ID Token -->
    <div class="card token-card">
      <div class="token-header">
        <div class="token-icon-wrapper">
          <svg class="token-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="token-title-group">
          <h3 class="token-title">ID Token</h3>
          <p class="token-subtitle">OpenID Connect Token</p>
        </div>
      </div>
      <div class="token-content">
        <pre class="token-value">{{ authStore.idToken }}</pre>
      </div>
      <div class="token-footer">
        <button @click="copyToClipboard(authStore.idToken)" class="btn btn-secondary btn-sm">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Kopieren
        </button>
      </div>
    </div>

    <!-- Decoded Payload -->
    <div v-if="authStore.userInfo" class="card token-card">
      <div class="token-header">
        <div class="token-icon-wrapper">
          <svg class="token-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="token-title-group">
          <h3 class="token-title">Dekodierte Payload</h3>
          <p class="token-subtitle">ID Token Inhalt (JSON)</p>
        </div>
      </div>
      <div class="token-content">
        <pre class="token-value json-value">{{ JSON.stringify(authStore.userInfo, null, 2) }}</pre>
      </div>
    </div>

    <!-- Info Box -->
    <div class="info-banner">
      <svg class="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="info-content">
        <p class="info-title">Hinweis zur Token-Verwendung</p>
        <p class="info-text">
          Diese Tokens können Sie verwenden, um auf Google APIs zuzugreifen. Der <strong>Access Token</strong>
          ist für API-Aufrufe gedacht, während der <strong>ID Token</strong> Benutzerinformationen enthält.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

function copyToClipboard(text: string | null) {
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Token in die Zwischenablage kopiert!')
    })
  }
}
</script>

<style scoped>
.token-container {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 2em;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

/* Token Card */
.token-card {
  margin-bottom: var(--spacing-lg);
  overflow: hidden;
}

.token-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
}

.token-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.token-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.token-title-group {
  flex: 1;
}

.token-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.token-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.token-content {
  padding: var(--spacing-lg);
  background: var(--color-background-tertiary);
  max-height: 200px;
  overflow-y: auto;
}

.token-value {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: var(--font-size-xs);
  line-height: 1.6;
  color: var(--color-text-primary);
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.json-value {
  font-size: var(--font-size-sm);
}

.token-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

/* Info Banner */
.info-banner {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-primary-light);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-xl);
}

.info-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.info-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Scrollbar Styling */
.token-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.token-content::-webkit-scrollbar-track {
  background: var(--color-background-secondary);
}

.token-content::-webkit-scrollbar-thumb {
  background: var(--color-border-hover);
  border-radius: var(--radius-sm);
}

.token-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-xl);
  }

  .token-header {
    padding: var(--spacing-md);
  }

  .token-content {
    padding: var(--spacing-md);
  }

  .token-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .token-icon {
    width: 20px;
    height: 20px;
  }

  .token-title {
    font-size: var(--font-size-base);
  }

  .info-banner {
    padding: var(--spacing-md);
  }
}
</style>

