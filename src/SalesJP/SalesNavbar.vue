<template>
    <div class="flex h-screen" @click="handleClickOutside">
        <!-- Sidebar -->
        <div ref="sidebar"
            :class="['transition-all duration-300 ease-in-out', isSidebarExpanded ? 'w-52' : 'w-20', 'bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col']"
            @click.stop>
            <div class="flex items-center justify-center h-16 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                @click="toggleSidebar">
                <span class="font-bold text-3xl text-orange-400">
                    {{ isSidebarExpanded ? "MENU" : "☰" }}
                </span>
            </div>
            <!-- Navigation links -->
            <nav class="flex-grow">
                <a v-for="link in navLinks" :key="link.path" :href="link.path"
                    class="flex items-center px-4 py-4 text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-200"
                    :class="{ 'bg-orange-600 text-white': currentPath === link.path, 'justify-center': !isSidebarExpanded }">
                    <component :is="link.icon" class="h-6 w-6" />
                    <span
                        :class="['whitespace-nowrap overflow-hidden transition-all duration-300', isSidebarExpanded ? 'opacity-100 max-w-full ml-4' : 'opacity-0 max-w-0 ml-0']">
                        {{ link.text }}
                    </span>
                </a>
            </nav>
            <!-- Logout button -->
            <div class="mt-auto">
                <a @click.prevent="logout" href="#"
                    class="flex items-center px-4 py-4 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
                    :class="{ 'justify-center': !isSidebarExpanded }">
                    <LogOutIcon class="h-6 w-6" />
                    <span
                        :class="['whitespace-nowrap overflow-hidden transition-all duration-300', isSidebarExpanded ? 'opacity-100 max-w-full ml-4' : 'opacity-0 max-w-0 ml-0']">
                        Logout
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import {
    LayoutDashboard,
    UserRoundPen,
    UserCircle,
    Calendar,
    Ticket,
    Settings,
    LogOut as LogOutIcon
} from 'lucide-vue-next';

export default {
    setup() {
        const isSidebarExpanded = ref(true); // Start with expanded sidebar
        const currentPath = computed(() => window.location.pathname);
        const sidebar = ref(null);
        const navLinks = [
            { path: '/Salesjp', text: 'Dashboard', icon: LayoutDashboard },
            { path: '/salesjpprofile', text: 'Sales Profile', icon: UserCircle },
            { path: '/salesjpbooking', text: 'BookingSales', icon: Calendar },
            { path: '/salesjpticket', text: 'Ticket', icon: Ticket },
            { path: '/salesjpsetting', text: 'Settings', icon: Settings },
        ];

        const toggleSidebar = () => {
            isSidebarExpanded.value = !isSidebarExpanded.value;
        };

        const logout = () => {
            console.log('Logout clicked');
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
            currentPath,
            sidebar,
        };
    },
    components: {
        LayoutDashboard,
        UserRoundPen,
        UserCircle,
        Calendar,
        Ticket,
        Settings,
        LogOutIcon
    }
};
</script>