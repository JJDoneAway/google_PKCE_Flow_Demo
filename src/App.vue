<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="logo-text">OAuth2 PKCE Demo</h1>
          </div>
          <p class="header-subtitle">Google Identity Provider Integration</p>
        </div>
      </div>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer-text">
          Erstellt mit Vue.js 3 + TypeScript • OAuth2 PKCE Flow • Google Identity Provider
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
}

/* Header */
.header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  box-shadow: var(--shadow-sm);
}

.header-content {
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
}

.logo-text {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.header-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Main */
.main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
  background: var(--color-background-secondary);
}

/* Footer */
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}

.footer-text {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .logo-text {
    font-size: var(--font-size-2xl);
  }

  .header-subtitle {
    font-size: var(--font-size-xs);
  }

  .main {
    padding: var(--spacing-lg) 0;
  }
}
</style>
