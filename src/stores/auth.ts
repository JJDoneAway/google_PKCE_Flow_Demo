import { defineStore } from 'pinia'
import { ref } from 'vue'
import { oauthService, type DecodedToken } from '@/services/oauth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const idToken = ref<string | null>(null)
  const userInfo = ref<DecodedToken | null>(null)
  const isAuthenticated = ref<boolean>(false)

  function loadTokens() {
    const tokens = oauthService.getTokens()
    accessToken.value = tokens.accessToken
    idToken.value = tokens.idToken
    isAuthenticated.value = oauthService.isAuthenticated()

    if (idToken.value) {
      userInfo.value = oauthService.decodeToken(idToken.value)
    }
  }

  async function login(clientId: string) {
    await oauthService.startAuthFlow(clientId)
  }

  async function handleCallback(
    clientId: string
  ): Promise<{ success: boolean; error?: string }> {
    const result = await oauthService.handleCallback(clientId)
    if (result.success) {
      loadTokens()
      isAuthenticated.value = true
    }
    return result
  }

  function logout() {
    oauthService.logout()
    accessToken.value = null
    idToken.value = null
    userInfo.value = null
    isAuthenticated.value = false
  }

  // Tokens beim Store-Init laden
  loadTokens()

  return {
    accessToken,
    idToken,
    userInfo,
    isAuthenticated,
    login,
    handleCallback,
    logout,
    loadTokens
  }
})

