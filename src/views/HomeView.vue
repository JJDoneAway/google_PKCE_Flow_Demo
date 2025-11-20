<script setup lang="ts">
import LoginButton from '@/components/LoginButton.vue'
import TokenDisplay from '@/components/TokenDisplay.vue'
</script>

<template>
  <div class="container">
    <div class="home-header">
      <h2 class="home-title">Google OAuth2 PKCE Test-Applikation</h2>
      <p class="home-description">
        Diese Applikation demonstriert den OAuth2 Authorization Code Flow mit PKCE
        (Proof Key for Code Exchange) unter Verwendung von Google als Identity Provider.
      </p>
    </div>

    <LoginButton />
    <TokenDisplay />
  </div>
</template>

<style scoped>
.home-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.home-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.home-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .home-title {
    font-size: var(--font-size-xl);
  }

  .home-description {
    font-size: var(--font-size-sm);
  }
}
</style>
