<template>
    <div class="skeleton-card border flex items-start md:items-center p-3 rounded-[10px] gap-3 bg-[#FAF9F9]">
      <div class="skeleton-img shimmer min-w-[100px] min-h-[100px] rounded-[10px]"></div>
      <div class="skeleton-content flex-1">
        <div class="skeleton-title shimmer w-3/4 h-[20px] md:h-[24px] rounded-md mb-4"></div>
        <div class="skeleton-location shimmer w-1/2 h-[16px] rounded-md mb-2"></div>
        <div class="skeleton-info flex flex-wrap gap-2 md:gap-4">
          <div class="skeleton-icon shimmer w-8 h-8 rounded-full"></div>
          <div class="skeleton-text shimmer w-1/3 h-[16px] rounded-md"></div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.shimmer {
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f0f0f0 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-card {
    display: flex;
    align-items: center;
}

.skeleton-img {
    width: 100px;
    height: 100px;
}

.skeleton-content {
    flex-grow: 1;
    margin-left: 15px;
}

.skeleton-title,
.skeleton-location,
.skeleton-info .skeleton-text,
.skeleton-icon {
    background-color: #e0e0e0;
    border-radius: 4px;
}

.skeleton-title {
    width: 70%;
    height: 20px;
    margin-bottom: 10px;
}

.skeleton-location {
    width: 50%;
    height: 16px;
    margin-bottom: 10px;
}

.skeleton-info {
    display: flex;
    gap: 10px;
}
</style>
