<template>
  <router-link :to="{ name: 'event-details', params: { eventReference: eventId } }">
    <div class="event-container">
      <div class="event-image" :style="{ backgroundImage: 'url(' + (imageUrl || '@/assets/images/defaultImage.jpeg') + ')' }">
        <slot></slot>
      </div>
      <div class="mt-4 mx-3">
        <div class="w-full flex items-center justify-between">
          <p class="text-[15px] font-bold">{{ eventName }}</p>
        </div>
        <p class="text-gray-600 text-sm my-1">{{ startTime }}</p>
        <div class="pb-3 w-full flex justify-between items-center">
          <a href="https://maps.app.goo.gl/3fRgCyAeWZ6TxqWJ8" target="_blank" class="location text-gray-500 text-[12px]">
            <fa-icon class="mr-1" :icon="['fas', 'location-dot']" style="color: #b0b0b0;" />
            {{ location }}
          </a>
          <p class="text-gray-600 text-sm my-1">{{ creator }}</p>
        </div>
        <p class="event-status absolute top-0 left-3 border-2 border-[#4CAF50]" v-if="status">{{ status }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  eventId: string
  imageUrl?: string
  startTime: string
  eventName: string
  location: string
  creator: string
  status?: string
}>()
</script>

<style scoped>
.event-container {
  width: 350px;
  min-height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.event-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(130, 130, 130, 0.2);
}

.event-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  flex: 1;
}

.mt-4 {
  margin-top: 1rem;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.pb-3 {
  padding-bottom: 0.75rem;
}

.text-gray-600 {
  color: #666;
}

.text-gray-500 {
  color: #b0b0b0;
}

.font-bold {
  font-weight: bold;
}

.event-status {
  padding: 3px 10px;
  background-color: #ddf7da;
  color: #084300;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  margin-top: 10px;
  width: fit-content;
  align-self: center;
  font-size: 12px;
}

@media (max-width: 765px) {
  .event-container {
    flex-direction: column;
    width: 300px;
  }

  .event-image {
    height: 200px;
  }

  .location:hover {
    color: rgb(0, 66, 0);
  }
}
</style>
