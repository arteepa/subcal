<script setup lang="ts">
interface Props {
  error: {
    statusCode?: number
    message?: string
  }
}

defineProps<Props>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen flex items-center justify-center px-5">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-accent mb-4">
          {{ error?.statusCode || '500' }}
        </h1>
        <h2 class="text-3xl font-bold text-text-primary mb-4">
          Oops! Something went wrong
        </h2>
        <p class="text-text-secondary text-lg mb-8">
          {{ error?.message || 'An unexpected error occurred.' }}
        </p>
        <button class="btn-primary" @click="handleError">
          Go back home
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

