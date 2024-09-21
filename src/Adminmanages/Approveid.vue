<template>
    <div class="flex h-screen bg-gray-100">
      <AdminSalesNavbar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <AdminSalesTopNav />
        <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">




          <div class="flex justify-center min-h-screen" style="margin-top: 40px">
            <div class="col-span-12">
                <div class="overflow-auto lg:overflow-visible">
                    <table class="table text-gray-400 border-separate space-y- text-sm">
                        <thead class="bg-gray-800 text-gray-200">
                            <tr>
                                <th class="p-3 text-center px-10">ID</th>
                                <th class="p-3 text-center">Name-Surname</th>
                                <th class="p-3 text-center px-10">E-mail</th>
                                <th class="p-3 text-center">Date/time</th>
                                <th class="p-3 text-center px-6">View/Delete</th>
                                <th class="p-3 text-center px-12">Approve</th>
                            </tr>
                        </thead>
                        <tbody v-for="(user, index) in users" :key="user._id"
                            style="transform: translateY(-5px)">
                            <tr class="bg-gray-800" style="transform: translateY(-5px)">
                                <td class="p-3 font-bold">{{ index + 1 }}</td>
                                <td class="p-3">
                                    <div class="flex align-items-center">
                                        <svg class="w-10 h-10 text-gray-800 text-white" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <div class="ml-4 py-3">
                                            <div class="text-gray-300 text-center">
                                                {{ user.firstname }} {{ user.lastname }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-gray-300 p-4">{{ user.email }}</td>
                                <td class="p-4">
                                    <span class="bg-green-400 text-gray-50 rounded-md px-4 text-black">
                                        {{formatTimestamp(user.timestamps) }}</span>
                                </td>
                                <td class="p-4 px-4">
                                    <a href="#" @click.prevent="toggleDetails(user._id)"
                                        class="text-gray-400 hover:text-gray-100 mr-2"
                                        style="display: inline-block">
                                        <i class="material-icons-outlined text-base">
                                            <svg class="w-6 h-6 text-blue-500 dark:text-white"
                                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                <path stroke="currentColor" stroke-width="2"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </i>
                                    </a>
                                    <a href="#" @click.prevent="rejectUser(user._id)"
                                        class="text-gray-400 hover:text-gray-100 ml-2"
                                        style="display: inline-block">
                                        <i class="material-icons-round text-base">
                                            <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </i>
                                    </a>
                                </td>
                                <td class="p-4 px-4">
                                    <a href="#" @click.prevent="showApprovalModal(user._id)"
                                        class="relative inline-flex items-center justify-start px-2 py-2 overflow-hidden font-medium transition-all bg-lime-600 rounded group">
                                        <span
                                            class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-lime-900 rounded group-hover:-mr-4 group-hover:-mt-4">
                                            <span
                                                class="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                        </span>
                                        <span
                                            class="absolute bottom-0 left-0 w-full h-24 transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-lime-500 rounded-4xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                        <span
                                            class="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Approve</span>
                                    </a>
                                </td>
                            </tr>
                            <tr v-if="user.showDetails" class="bg-gray-700" style="transform: translateY(-5px)">
                                <td class="p-3 text-center">
                                    <div class="text-gray-300"><b>Country</b></div>
                                    <div class="text-gray-300">{{ user.country }}</div>
                                </td>
                                <td class="p-3 text-center">
                                    <div class="text-gray-300"><b>Gender</b></div>
                                    <div class="text-gray-300">{{ user.gender }}</div>
                                </td>
                                <td colspan="2" class="p-3 text-center">
                                    <div class="text-gray-300"><b>Department</b></div>
                                    <div class="text-gray-300">{{ user.department }}</div>
                                </td>
                                <td colspan="2" class="p-3 text-center">
                                    <div class="text-gray-300"><b>Position</b></div>
                                    <div class="text-gray-300">{{ user.position }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Approval Confirmation Modal -->
        <div v-if="showModal"
            class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="max-w-xs w-full overflow-hidden rounded-lg bg-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mt-8 h-16 w-16 text-green-400"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                </svg>
                <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">
                    Are you sure?
                </h1>
                <p class="my-4 text-center text-sm text-gray-500">
                    Do you want to approve this account?
                </p>
                <div class="space-x-4 bg-gray-100 py-4 text-center">
                    <button @click="confirmApprove"
                        class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">
                        Confirm
                    </button>
                    <button @click="cancelApprove"
                        class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <!-- Approval Confirmation Modal -->

        <!-- Approval Remove Modal -->
        <div v-if="showModalRemove"
            class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="max-w-xs w-full overflow-hidden rounded-lg bg-white shadow-md">
                <svg class="h-14 w-14 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="margin: auto; display: block; transform: translateY(20%)">
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">
                    Are you sure?
                </h1>
                <p class="my-4 text-center text-sm text-gray-500">
                    Do you want to delete this account?
                </p>
                <div class="space-x-4 bg-gray-100 py-4 text-center">
                    <button @click="confirmRemove"
                        class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">
                        Confirm
                    </button>
                    <button @click="cancelRemove"
                        class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <!-- Approval Remove Modal -->
    </div>
</div>
</div>
<!-- area เนื่้อหา -->

<div>
<hr style="margin-top: 0px; border: 1.5px solid #cd5a00" />
</div>


  </template>
  
  <script>
  import axios from "axios";
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

    data() {
        return {


            users: [],
            loading: false,
            message: "",
            showModal: false,
            userToApprove: null,
            showModalRemove: false,
        };
    },

    created() {
        this.fetchUsers();
    },

    methods: {

        async fetchUsers() {
            this.loading = true;
            try {
                const response = await axios.get("http://LOCALHOST:9992/salesjp/all");
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                this.loading = false;
            }
        },
        async approveUser(userId) {
            try {
                const response = await axios.put(
                    `http://LOCALHOST:9992/salesjp/approve/${userId}`
                );
                if (response.data.success) {
                    this.message = "User approved successfully.";
                    this.fetchUsers(); // Refresh the list after approval
                } else {
                    this.message = "Failed to approve user.";
                }
            } catch (error) {
                console.error("Error approving user:", error);
                this.message = "An error occurred during user approval.";
            }
        },

        async removeUser(userId) {
            try {
                await axios.delete(`http://LOCALHOST:9992/salesjp/reject/${userId}`);
                // Remove the deleted user from the users array
                this.users = this.users.filter((user) => user._id !== userId);
            } catch (error) {
                console.error("Error rejecting user:", error);
            }
        },
        rejectUser(userId) {
            this.userToReject = userId;
            this.showModalRemove = true; // Show the removal modal
        },
        confirmRemove() {
            if (this.userToReject) {
                this.removeUser(this.userToReject); // Call the method to remove the user
                this.userToReject = null;
            }
            this.showModalRemove = false; // Hide the removal modal
        },
        cancelRemove() {
            this.showModalRemove = false; // Hide the removal modal
            this.userToReject = null;
        },

        toggleDetails(userId) {
            // Toggle the showDetails property of the corresponding user
            const user = this.users.find((user) => user._id === userId);
            if (user) {
                user.showDetails = !user.showDetails;
            }
        },
        showApprovalModal(userId) {
            this.userToApprove = userId;
            this.showModal = true;
        },
        async confirmApprove() {
            if (this.userToApprove) {
                await this.approveUser(this.userToApprove);
            }
            this.showModal = false;
            this.userToApprove = null;
        },
        cancelApprove() {
            this.showModal = false;
            this.userToApprove = null;
        },

        formatTimestamp(timestamp) {
            // แปลง timestamp ให้เป็นรูปแบบ "YYYY-MM-DD HH:mm:ss"
            const dateObj = new Date(timestamp);
            dateObj.setHours(dateObj.getHours() - 7); // ลบ 7 ชั่วโมง
            const year = dateObj.getFullYear();
            const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
            const date = ("0" + dateObj.getDate()).slice(-2);
            const hours = ("0" + dateObj.getHours()).slice(-2);
            const minutes = ("0" + dateObj.getMinutes()).slice(-2);
            const seconds = ("0" + dateObj.getSeconds()).slice(-2);
            return `${year}-${month}-${date} ${hours}:${minutes}.${seconds}`;
        },
    },
};
</script>

<style scoped>
.table {
    border-spacing: 0 15px;
}

i {
    font-size: 1rem !important;
}

.table tr {
    border-radius: 20px;
}

.loading {
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
}
</style>