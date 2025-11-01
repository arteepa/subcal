<script setup lang="ts">
const features = [
  {
    title: 'Highly Compatible',
    description: 'Powered by the open .ICS format used by Google, Apple, and Outlook'
  },
  {
    title: 'Let Your Audience Subscribe',
    description: 'Changes to your calendar automatically sync to all subscribers. No manual updates needed.'
  },
  {
    title: 'Manage From Your Calendar',
    description: 'Update events in Google, Apple, or Outlook — changes sync automatically'
  }
]
</script>

<template>
  <section id="features" class="py-2 px-5 bg-background-secondary">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="text-center py-10 px-5 rounded-xl"
        >
          <h3 class="text-xl mb-4 text-text-primary">{{ feature.title }}</h3>
          <p class="text-text-secondary leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

