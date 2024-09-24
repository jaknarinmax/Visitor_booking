<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSalesNavbar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AdminSalesTopNav />
      <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">
        <h1 class="text-2xl font-bold">Welcome to Dashboard</h1>
        <p class="mt-2 text-gray-600">This is the main dashboard for Admin Sale.</p>
        <!-- Add more dashboard content here -->

        <div class="h-full w-full flex flex-col">
          <div class="flex flex-1">
            <!-- Box 1 -->
            <div class="bg-blue-100 flex-grow"></div>
            
            <!-- Box 2 -->
            <div class="bg-green-100 w-1/3"></div>
          </div>
          
          <div class="flex flex-1">
            <!-- Box 3 -->
            <div class="bg-yellow-100 w-1/4"></div>
            
            <!-- Box 4 -->
            <div class="bg-red-100 flex-grow"></div>
            
            <!-- Box 5 -->
            <div class="bg-purple-100 w-1/4"></div>
          </div>
        </div>







        
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AdminSalesNavbar from './AdminSalesNavbar.vue';
import AdminSalesTopNav from './AdminSalesTopNav.vue';

export default {
  name: 'AdminSalesDashboard',
  components: {
    AdminSalesNavbar,
    AdminSalesTopNav,
  },
  setup() {
    const isSidebarHidden = ref(false);

    const toggleSidebar = () => {
      isSidebarHidden.value = !isSidebarHidden.value;
    };

    const closetoggleSidebar = () => {
      if (isSidebarHidden.value) {
        isSidebarHidden.value = false;
      }
    };

    return {
      isSidebarHidden,
      toggleSidebar,
      closetoggleSidebar,
    };
  },
};
</script>