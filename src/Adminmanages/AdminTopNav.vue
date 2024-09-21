<template>
    <nav class="bg-gray-800 shadow-md h-16 flex items-center">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-1 flex justify-between w-full">
        <div class="flex items-center flex-shrink-0">
          <h1 style="font-size: 32px; font-weight: 900; color: white;">ADMIN MANAGE</h1>
        </div>
        <div class="flex items-center flex-grow justify-center">
  
        </div>
        <div class="flex items-center">
          <button class="bg-stone-500 px-1 py-1 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <BellDotIcon class="h-7 w-7" stroke="white" />
          </button>
          <div class="ml-6 relative flex-shrink-0">
            <button class="bg-stone-500 px-1 py-1 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <UserRoundCogIcon class="h-7 w-7" stroke="white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  
  
  </template>
  
  
  <script>
  import {  BellDotIcon, UserRoundCogIcon } from 'lucide-vue-next';
  
  export default {
    name: 'AdminSalesTopNav',
    components: {
      
      BellDotIcon,
      UserRoundCogIcon
    }
  };
  </script>