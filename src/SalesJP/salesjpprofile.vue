<template>
    <div class="flex h-screen bg-gray-100">
      <AdminSalesNavbar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <AdminSalesTopNav />
        <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">



        <div class="px-4 flex justify-center" style="margin-top: 20px;">
            <div class="border-2 w-full px-8 pb-2 mt-2 sm:max-w-xl sm:rounded-lg" style="box-shadow: 0 4px 8px rgba(139, 69, 19, 1.3)">
                <div style="display: flex; justify-content: center; margin-top: 20px">
                    <h2 class="shadow-xl bg-purple-100 border-purple-600 rounded-md border-4 border-double font-bold sm:text-xl" style="width: 30%">
                        Profile
                    </h2>
                </div>
                <div class="grid max-w-2xl mx-auto mt-8">
                    <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0" style="margin-top: -10px">
                        <img class="object-cover w-26 h-24 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"  src="@/assets/images/img15.png" alt="Bordered avatar" />
                        <div class="flex flex-col space-y-5 sm:ml-8">
                            <button type="button" class="py-1 px-1 text-base font-medium text-indigo-100 focus:outline-none bg-[#AFB1E8] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">
                                Change picture
                            </button>
                            <button type="button" class="py-1 px-1 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200">
                                Delete picture
                            </button>
                        </div>
                    </div>

                    <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div class="w-full">
                                <label for="first_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your firstname</label>
                                <input type="text" id="first_name" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your first name" v-model="form.firstname" :disabled="!editing"
                                    required />
                            </div>

                            <div class="w-full">
                                <label for="last_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your lastname</label>
                                <input type="text" id="last_name" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your last name" v-model="form.lastname" :disabled="!editing"
                                    required />
                            </div>
                        </div>

                        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div class="w-full">
                                <label for="email" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your E-mail</label>
                                <input type="text" id="email" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your email" v-model="form.email" :disabled="!editing" />
                            </div>

                            <div class="w-full">
                                <label for="userType" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your Roles</label>
                                <input type="text" id="userType" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your userType" v-model="form.userType" disabled />
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div class="w-full">
                                <label for="Department" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your Department</label>
                                <input type="text" id="Department" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your Department" v-model="form.Department" disabled />
                            </div>
                        
                            <div class="w-full">
                                <label for="Position" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your Position</label>
                                <input type="text" id="Position" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your Position" v-model="form.Position" disabled />
                            </div>
                        </div>

                        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div class="w-full">
                                <label for="country" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your Country</label>
                                <input type="text" id="country" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your country" v-model="form.country" :disabled="!editing" />
                            </div>

                            <div class="w-full">
                                <label for="gender" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your Gender</label>
                                <input type="text" id="gender" class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="Your gender" v-model="form.gender" :disabled="!editing" />
                            </div>
                        </div>

                        <!-- Submit button -->
                        <div class="flex justify-end py-4">
                            <button v-if="!editing" class="group relative px-5 py-1.5 text-black" @click="editProfile">
                                <span class="absolute inset-0 h-full w-full -translate-x-1 -translate-y-1 transform bg-blue-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span class="absolute z-[1] h-full w-full -translate-x-4 -translate-y-2 border-b-2 border-e-2 border-white group-hover:border-none"></span>
                                <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-s-2 border-t-2 border-white bg-blue-300 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span class="absolute inset-0 z-[1] h-full w-full border-2 border-black"></span>
                                <span class="relative">Edit</span>
                            </button>
                            <button v-else class="group relative px-5 py-1.5 text-black" @click="saveProfile">
                                <span class="absolute inset-0 h-full w-full -translate-x-1 -translate-y-1 transform bg-green-400 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span class="absolute z-[1] h-full w-full -translate-x-4 -translate-y-2 border-b-2 border-e-2 border-white group-hover:border-none"></span>
                                <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-s-2 border-t-2 border-white bg-green-400 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span class="absolute inset-0 z-[1] h-full w-full border-2 border-black"></span>
                                <span class="relative">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
    </div>



    <div v-if="showModaledit">
        <div x-cloak x-show="showModal" x-transition.opacity class="fixed inset-0 z-10 bg-secondary-700/50"></div>
        <div x-cloak x-show="showModal" x-transition class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div class="mx-auto overflow-hidden rounded-lg bg-white shadow-2xl sm:w-full sm:max-w-lg">
                <div class="relative p-6">
                    <div class="flex gap-4">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 shadow-lg" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="6 21 21 6 18 3 3 18 6 21" />
                                <line x1="15" y1="6" x2="18" y2="9" />
                                <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                                <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-secondary-900">Waiting for approval</h3>
                            <div class="mt-2 text-sm text-secondary-500">Please wait for approval of the amendment
                                within 24 hours.
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end gap-3">
                        <button @click="confirmEdit" class=" bg-sky-200   rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-black shadow-2xl transition-all hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:bg-primary-300">Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div v-if="showmodalapprovalpending">
        <div x-cloak x-show="showModal" x-transition.opacity class="fixed inset-0 z-10 bg-secondary-700/50"></div>
        <div x-cloak x-show="showModal" x-transition class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div class="mx-auto overflow-hidden rounded-lg bg-white shadow-2xl sm:w-full sm:max-w-lg">
                <div class="relative p-6">
                    <div class="flex gap-4">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 shadow-lg" style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M12 9v2m0 4v.01" />
                                <path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-secondary-900">Please wait...</h3>
                            <div class="mt-2 text-sm text-secondary-500">pending approval Editing previous data is still
                                possible.
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end gap-3">
                        <button type="button" @click="showmodalapprovalpending = false" class=" bg-red-200 rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-black shadow-2xl transition-all hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:bg-primary-300">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <TransitionChild v-if="showModalexpire" as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div class="h-80">
            <div x-data="{ showModal: true }" x-on:keydown.window.escape="showModal = false">
                <div class="flex justify-center">
                    <button x-on:click="showModal = !showModal" class="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
                        Toggle Modal
                    </button>
                </div>
                <div x-cloak x-show="showModal" x-transition.opacity class="fixed inset-0 z-10 bg-secondary-700/50">
                </div>
                <div x-cloak x-show="showModal" x-transition class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div class="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
                        <div class="relative p-5">
                            <div class="text-center">
                                <div class="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                        <line x1="12" y1="9" x2="12" y2="13" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-medium text-secondary-900">
                                        Time's up.
                                    </h3>
                                    <div class="mt-2 text-sm text-secondary-500">
                                        Access time has expired. Please log in again.
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 flex justify-end gap-3">
                                <button type="button" @click="logout" class="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TransitionChild>




</template>
    
<script>
import axios from "axios";
import { ref } from 'vue';
import AdminSalesNavbar from './SalesNavbar.vue';
import AdminSalesTopNav from './SalesTopNav.vue';

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
            user: null,
            loading: true,
            message: "",
            form: {
                firstname: '',
                lastname: '',
                email: '',
                gender: '',
                country: '',
                userType: '',
                Department: '',
                Position: ''
            },
            originalData: {
                firstname: '',
                lastname: '',
                email: '',
                gender: '',
                country: '',
                userType: '',
                Department: '',
                Position: ''
            },
            editing: false,
            showModalexpire: false,
            error: null,
            success: null,
            showModaledit: false,
            showmodalapprovalpending: false,
            pendingApprovalMessage: '',
        };
    },

    mounted() {
        this.fetchUserAccount();
    },

    methods: {
        async logout() {
            const token = sessionStorage.getItem("token");
            if (!token) {
                this.message = "You are not logged in";
                return;
            }

            try {
                const response = await axios.post(
                    "http://LOCALHOST:9992/salesjp/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("tokenactivity");
                    this.message = "Logged out successfully";
                    this.$router.push("/"); // Navigate back to login after logout
                } else {
                    this.message = response.data.message;
                }
            } catch (error) {
                this.message = "An error occurred during logout";
                console.error(error);
            }
        },

        async checkTokenActivity() {
            const tokenActivity = sessionStorage.getItem("tokenactivity");
            if (!tokenActivity) {
                this.message = "No token activity found in sessionStorage";
                return;
            }

            try {
                const response = await axios.post(
                    "http://LOCALHOST:9992/check-token-activity",
                    {
                        tokenactivity: tokenActivity,
                    }
                );
                if (response.data.message === "The token is still usable.") {
                    this.message = "Token activity ";
                } else {
                    this.message = "Token activity has expired";
                    this.showModalexpire = true;
                }
            } catch (error) {
                this.message = "An error occurred during token activity check";
                this.showModalexpire = true;
                console.error(error);
            }
        },

        async fetchUserAccount() {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.get("http://LOCALHOST:9992/user/account", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status) {
                    this.user = response.data.user;
                    this.form = {
                        ...this.user,
                        userType: this.user.roles.userType,
                        Department: this.user.roles.department,
                        Position: this.user.roles.position
                    };
                    this.originalData = { ...this.form };
                } else {
                    this.message = response.data.message;
                }
            } catch (error) {
                this.message = "An error occurred while fetching user account information";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        editProfile() {
            this.editing = true;
            this.pendingApprovalMessage = ''; // Clear the pending approval message when starting a new edit
        },

        saveProfile() {
            this.error = null;
            this.success = null;

            const updatedData = {};
            for (const key in this.form) {
                if (this.form[key] !== this.originalData[key]) {
                    updatedData[key] = this.form[key];
                }
            }

            if (Object.keys(updatedData).length === 0) {
                this.error = "No changes made";
                this.editing = false;
                return;
            }

            this.updatedData = updatedData;
            this.showModaledit = true;
        },

        async confirmEdit() {
            this.showModaledit = false;
            const token = sessionStorage.getItem("token");

            try {
                const response = await axios.put(
                    "http://LOCALHOST:9992/salesjp/Editsales",
                    this.updatedData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status) {
                    if (response.data.approved) {
                        this.success = "Changes approved and updated successfully.";
                        this.originalData = { ...this.form };
                        this.editing = false;
                    } else {
                        this.success = "Changes submitted for approval. Displaying old data until approved.";
                        this.form = { ...this.originalData }; // Reset form to original data
                        this.editing = false;
                        this.showPendingApprovalMessage();
                    }
                } else {
                    if (response.data.message === "There is already an unapproved edit request with the same data") {
                        this.error = "Duplicate unapproved edit request found. Please wait for approval.";
                        this.showmodalapprovalpending = true;
                        this.form = { ...this.originalData }; // Reset form to original data
                    } else {
                        this.error = response.data.message;
                    }
                }
            } catch (error) {
                console.error("Request failed:", error.response);
                if (error.response && error.response.status === 400) {
                    this.showmodalapprovalpending = true;
                    this.form = { ...this.originalData }; // Reset form to original data
                } else {
                    this.error = "An error occurred during user data update";
                }
            }
        },

        showPendingApprovalMessage() {
            this.pendingApprovalMessage = "Your changes are pending approval. The current display shows your original data.";
        },
    },

    created() {
        this.fetchUserAccount();
        this.checkTokenActivity();
    },
};
</script>