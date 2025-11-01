<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-background-primary sticky top-0 z-[100]">
      <nav>
        <div class="max-w-container mx-auto px-5 flex justify-center items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <img
              src="/assets/logo.png"
              srcset="/assets/logo.png 1x, /assets/logo@2x.png 2x"
              alt="subcal"
              class="h-[30px] w-auto"
            >
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-background-primary text-text-primary text-center py-10 px-5 border-t border-border/50">
      <div class="container-custom">
        <p class="text-text-secondary">built for seamless calendar sharing</p>
        <p class="text-text-secondary mt-2">
          by <a href="https://artee.xyz" target="_blank" class="text-accent hover:text-accent-hover">artee.xyz</a>
        </p>
      </div>
    </footer>

    <!-- Toast Container -->
    <CommonToastContainer />
  </div>
</template>

<style>
/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden;
}
</style>

