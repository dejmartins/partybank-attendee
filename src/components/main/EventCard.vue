<template>
  <router-link :to="{ name: 'event-details', params: { eventReference: eventId } }">
    <div class="event-container">
      <div class="text-sm text-lg w-full">
        <div class="flex justify-between items-start">
          <div class="event-details">
            <p class="event-time">{{ startTime }}</p>
            <p class="event-name">{{ eventName }}</p>
            <p class="event-creator">By {{ creator }}</p>
            <p class="event-location">{{ location }}</p>
          </div>

          <div
            class="event-image"
            :style="{
              backgroundImage: 'url(' + (imageUrl || '@/assets/images/defaultImage.jpeg') + ')'
            }"
          ></div>
        </div>
        <p class="event-status">{{ status }}</p>
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
  creator: string
  location: string
  status?: string
}>()
</script>

<style scoped>
.event-container {
  max-width: 500px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid rgba(199, 199, 199, 0.7);
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.event-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.event-details {
  flex-grow: 1;
  margin-right: 6px;
}

.event-time {
  color: #666;
  margin-bottom: 5px;
}

.event-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.event-creator,
.event-location {
  color: #666;
}

.event-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
  min-width: 90px;
  height: 90px;
  margin-left: 20px;
}

.event-status {
  padding: 4px 10px;
  background-color: #084300;
  color: white;
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
  }

  .event-details {
    margin-bottom: 10px;
  }

  .event-image {
    margin-left: 0;
    margin-bottom: 10px;
  }
}
</style>
