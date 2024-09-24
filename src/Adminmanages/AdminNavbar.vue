<template>
    <div class="flex h-screen" @click="handleClickOutside">
      <!-- Sidebar -->
      <div ref="sidebar" :class="['transition-all duration-300 ease-in-out', isSidebarExpanded ? 'w-52' : 'w-20', 'bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col' ]" @click.stop>
        <div class="flex items-center justify-center h-16 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors duration-200" @click="toggleSidebar">
          <span class="font-bold text-3xl text-orange-400">
            {{ isSidebarExpanded ? "MENU" : "☰" }}
          </span>
        </div>
        <!-- Navigation links -->
        <nav class="flex-grow">
          <a v-for="link in navLinks" :key="link.path" :href="link.path" class="flex items-center px-4 py-4 text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-200" :class="{ 'bg-orange-600 text-white': currentPath === link.path, 'justify-center': !isSidebarExpanded }">
            <component :is="link.icon" class="h-6 w-6" />
            <span :class="['whitespace-nowrap overflow-hidden transition-all duration-300', isSidebarExpanded ? 'opacity-100 max-w-full ml-4' : 'opacity-0 max-w-0 ml-0']">
              {{ link.text }}
            </span>
          </a>
        </nav>
        <!-- Logout button -->
        <div class="mt-auto">
          <a @click.prevent="showLogoutModal = true" href="#" class="flex items-center px-4 py-4 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200" :class="{ 'justify-center': !isSidebarExpanded }">
            <LogOutIcon class="h-6 w-6" />
            <span :class="['whitespace-nowrap overflow-hidden transition-all duration-300', isSidebarExpanded ? 'opacity-100 max-w-full ml-4' : 'opacity-0 max-w-0 ml-0']">
              Logout
            </span>
          </a>
        </div>
      </div>
    </div>




    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]">
      <div class="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-md">
        <div class="relative p-4">
          <div class="flex gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
              <LogOutIcon class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-medium text-secondary-900">Confirm Logout</h3>
              <div class="mt-2 text-sm text-secondary-500">Are you sure you want to logout? This action will end your current session.</div>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="showLogoutModal = false" type="button" class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400">Cancel</button>
            <button @click="confirmLogout" type="button" class="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300">Logout</button>
          </div>
        </div>
      </div>
    </div>
    



  </template>
  
  
  <script>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { 
    LayoutDashboard, 
    UserCog, 
    CalendarCheck, 
    Ticket, 
    FileText, 
    UserCheck, 
    Edit, 
    Settings, 
    LogOut as LogOutIcon
  } from 'lucide-vue-next';
  import axios from 'axios';
  
  export default {
    setup() {
      const isSidebarExpanded = ref(true);
      const currentPath = computed(() => window.location.pathname);
      const sidebar = ref(null);
      const showLogoutModal = ref(false);
  
      const navLinks = [
        { path: '/Adminboard', text: 'Adminboard', icon: LayoutDashboard },
        { path: '/Adminprofile', text: 'Admin Profile', icon: UserCog },
        { path: '/Managebookings', text: 'Manage bookings', icon: CalendarCheck },
        { path: '/Ticket', text: 'Ticket', icon: Ticket },
        { path: '/Allinformation', text: 'All Information', icon: FileText },
        { path: '/Approveid', text: 'Approve ID', icon: UserCheck },
        { path: '/Approveedit', text: 'Approve Edit', icon: Edit },
        { path: '/setting', text: 'Settings', icon: Settings },
      ];
  
      const toggleSidebar = () => {
        isSidebarExpanded.value = !isSidebarExpanded.value;
      };
  
      const logout = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            console.error('No token found in session storage');
            return;
          }
  
          const response = await axios.post('http://localhost:9992/salesjp/logout', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.data.success) {
            sessionStorage.clear();
            window.location.href = '/';
          } else {
            console.error('Logout failed:', response.data.message);
            // Handle failed logout (show error message to user, etc.)
          }
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle error (show error message to user, etc.)
        }
      };
  
      const confirmLogout = () => {
        showLogoutModal.value = false;
        logout();
      };
  
      const handleClickOutside = (event) => {
        if (sidebar.value && !sidebar.value.contains(event.target) && isSidebarExpanded.value) {
          isSidebarExpanded.value = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
      });
  
      onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
      });
  
      return {
        isSidebarExpanded,
        navLinks,
        toggleSidebar,
        logout,
        confirmLogout,
        showLogoutModal,
        currentPath,
        sidebar,
      };
    },
    components: {
      LayoutDashboard,
      UserCog,
      CalendarCheck,
      Ticket,
      FileText,
      UserCheck,
      Edit,
      Settings,
      LogOutIcon
    }
  };
  </script>