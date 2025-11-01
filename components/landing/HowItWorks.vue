<script setup lang="ts">
const steps = [
  {
    number: 1,
    title: 'Connect your Calendar',
    description: 'Paste your .ICS link from Google, Apple, Outlook, or your own hosting'
  },
  {
    number: 2,
    title: 'Verify it works',
    description: 'Preview your events and make sure everything syncs right.'
  },
  {
    number: 3,
    title: 'Go Live for $10/Year',
    description: 'Publish your calendar as a public page your audience can subscribe to.'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-10 px-5 bg-background-primary">
    <div class="container-custom">
      <h2 class="text-center text-xl text-text-primary mb-10">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div
          v-for="step in steps"
          :key="step.number"
          class="text-center py-10 px-5"
        >
          <div
            class="w-12 h-12 bg-accent text-background-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5"
          >
            {{ step.number }}
          </div>
          <h3 class="text-xl mb-4 text-text-primary">{{ step.title }}</h3>
          <p class="text-text-secondary leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

