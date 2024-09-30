<template>
    <div class="flex flex-col md:flex-row w-full h-[calc(100vh-210px)] overflow-y-auto md:overflow-y-hidden rounded-[20px] bg-[#F9F7F7] p-6 md:p-10 mt-4 border border-[#DDE0E3] custom-scrollbar">
      <div class="md:w-1/3 md:sticky md:top-0 md:border-r-2 md:border-[#DDE0E3] md:pr-6">
        <div class="relative w-full h-[250px] shimmer rounded-[20px]"></div>
      </div>
  
      <div class="mt-5 md:mt-0 w-full md:w-2/3 px-0 md:px-8 md:overflow-y-auto h-[calc(100vh-290px)] custom-scrollbar">
        <div class="w-full h-[30px] shimmer rounded-lg mb-4"></div>
  
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 shimmer rounded-full"></div>
            <div class="flex flex-col">
              <div class="w-[100px] h-[15px] shimmer rounded"></div>
              <div class="w-[80px] h-[12px] shimmer rounded mt-2"></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 shimmer rounded-full"></div>
            <div class="w-[100px] h-[15px] shimmer rounded"></div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 shimmer rounded-full"></div>
            <div class="w-[100px] h-[15px] shimmer rounded"></div>
          </div>
        </div>
  
        <div class="w-full h-[150px] shimmer rounded-lg mb-4"></div>
  
        <div class="w-full h-[300px] shimmer rounded-lg"></div>
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
</style>
  