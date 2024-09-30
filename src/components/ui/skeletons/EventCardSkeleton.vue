<template>
    <div class="skeleton-card border flex items-start md:items-center p-3 rounded-[10px] gap-3 bg-[#FAF9F9]">
      <div class="skeleton-img min-w-[100px] min-h-[100px] rounded-[10px] bg-[#E0E0E0]"></div>
      <div class="skeleton-content flex-1">
        <div class="skeleton-title w-3/4 h-[20px] md:h-[24px] bg-[#E0E0E0] rounded-md mb-4"></div>
        <div class="skeleton-location w-1/2 h-[16px] bg-[#E0E0E0] rounded-md mb-2"></div>
        <div class="skeleton-info flex flex-wrap gap-2 md:gap-4">
          <div class="skeleton-icon w-8 h-8 bg-[#E0E0E0] rounded-full"></div>
          <div class="skeleton-text w-1/3 h-[16px] bg-[#E0E0E0] rounded-md"></div>
        </div>
      </div>
    </div>
</template>

<style scoped>
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
