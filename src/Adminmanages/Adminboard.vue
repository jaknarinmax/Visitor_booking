<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSalesNavbar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AdminSalesTopNav />
      <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">
        <h1 class="text-2xl font-bold">Welcome to Adminboard</h1>
        <p class="mt-2 text-gray-600">This is the main dashboard for Admin Sales.</p>
        <!-- Add more dashboard content here -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AdminSalesNavbar from './AdminNavbar.vue';
import AdminSalesTopNav from './AdminTopNav.vue';

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