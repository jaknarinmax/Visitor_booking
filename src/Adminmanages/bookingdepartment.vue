<template>
    <div class="flex h-screen bg-gray-100" style="margin-top: -20px;">
        <!-- sidebar -->
        <div class="md:flex flex-col w-26 h-full bg-gray-800">
            <div v-show="!isSidebarHidden" class="flex items-center justify-center h-14 bg-gray-900">
                <span class="text-white font-bold uppercase" style="font-size: 1.7em;">{{ isSidebarHidden ? '☰' : 'Menu'
                    }}</span>
            </div>
            <div class="flex flex-col flex-1 overflow-y-auto">
                <nav class="flex-1 px-2 py-4 bg-gray-800">





                    <router-link to="/adminboard" class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/dashbordsales' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 " fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-width="2"
                                d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Dashboard</span>
                    </router-link>

                    <router-link to="/profilesales"
                        class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/profilesales' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Sales Profile</span>
                    </router-link>

                    <a href="#" @click.prevent="toggleSubMenu"
                        class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
                        </svg>
                        <span v-show="!isSidebarHidden">&emsp;Booking</span>
                    </a>

                    <div class="ml-6 mt-2">

                        <router-link to="/bookingsales"
                            class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                            :class="{ 'bg-orange-300': $route.path === '/bookingsales' }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                    d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg>
                            <span v-show="!isSidebarHidden"> &emsp;Sales</span>
                        </router-link>


                        <router-link to="/bookingdepartment"
                            class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                            :class="{ 'bg-orange-300': $route.path === '/bookingdepartment' }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-black" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                            </svg>
                            <span v-show="!isSidebarHidden" class="text-black"> &emsp;Department</span>
                        </router-link>

                    </div>

                    <router-link to="/ticket" class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/ticket' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Ticket</span>
                    </router-link>
                    <router-link to="/allinformation"
                        class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/allinformation' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 " fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;All information</span>
                    </router-link>

                    <router-link to="/approveid" class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/approveid' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Approve ID</span>
                    </router-link>

                    <router-link to="/approveedit" class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/approveedit' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Approve Edit</span>
                    </router-link>

                    <router-link to="/setting" class="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-400"
                        :class="{ 'bg-orange-300': $route.path === '/setting' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span v-show="!isSidebarHidden"> &emsp;Settings</span>
                    </router-link>
                </nav>
            </div>
            <!-- Logout button -->
            <div class="flex-shrink-0 px-2 py-4 bg-gray-800">
                <a href="#" class="flex items-center px-4 py-2 text-red-500 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v1m0 10v1m1 4H6a2 2 0 01-2-2V6a2 2 0 012-2h7a2 2 0 012 2v1" />
                    </svg>
                    <span v-show="!isSidebarHidden">&emsp;Logout</span>
                </a>
            </div>
        </div>

        <div class="flex flex-col flex-1 overflow-y-auto">
            <div class="flex items-center px-4"></div>
            <div class="flex items-center px-4 py-4">
                <button @click="toggleSidebar" class="text-gray-500 focus:outline-none focus:text-gray-700">
                    <svg v-if="isSidebarHidden" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <!-- Main content area -->
            <div @click="closetoggleSidebar" class="p-4">
                <h1 class="text-2xl font-bold">Welcome to bookingDepartment</h1>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>

                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
                <p class="mt-2 text-gray-600">Raising tomorrow's leaders.</p>
            </div>
        </div>
    </div>
    <div>
        <hr style=" margin-top: 0px; border: 1.5px solid #CD5A00" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSidebarHidden: false,
            isSubMenuVisible: false,
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarHidden = !this.isSidebarHidden;
        },
        toggleSubMenu() {
            this.isSubMenuVisible = !this.isSubMenuVisible;
        },
        closetoggleSidebar() {
            this.isSidebarHidden = true; // ปิดบาร์
        },

    },
};
</script>

<style scoped></style>