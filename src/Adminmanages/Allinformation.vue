<template>
    <div class="flex h-screen bg-gray-100">
      <AdminSalesNavbar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <AdminSalesTopNav />
        <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">


            <div class="flex justify-center">
                <table class="divide-y divide-gray-600 overflow-x-auto" style="width: 85%">
                    <thead class="bg-gray-300">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> Name/Last Name/Email </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> Department/position </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> Country/Gender </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> Status </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> approve </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider text-center"> Actions </th>
                        </tr>
                    </thead>

                    <tbody v-for="user in users" :key="user._id" class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <svg class="w-8 h-10 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900"> {{ user.firstname }} {{ user.lastname }} </div>
                                        <div class="text-sm text-gray-500">
                                            {{ user.email }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ user.department }}</div>
                                <div class="text-sm text-gray-500">{{ user.position }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ user.country }}</div>
                                <div class="text-sm text-gray-500">{{ user.gender }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{'bg-green-100 text-green-800': user.isonline, 'bg-red-100 text-red-800': !user.isonline}">
                                    {{ user.isonline ? 'online' : 'offline' }}
                                </span>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-blue-800">
                                    {{ formatTimestamp(user.approvalDate) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button @click="editUser(user._id)" className="rounded-4xl border-2 border-dashed border-green-500 bg-white px-4 py-1 font-semibold uppercase transition-all duration-300 hover:bg-red-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_green] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    <span class="text-sm">Edit</span>
                                </button>
                                &nbsp;
                                <button @click="deleteUser(user._id)" className="rounded-4xl border-2 border-dashed border-red-500 bg-white px-2 py-1 font-semibold uppercase transition-all duration-300 hover:bg-red-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_red] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                    <span class="text-sm">Delete</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td colspan="6" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div v-if="selectedUserId" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div class="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
                    <button @click="selectedUserId = null" class="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-200 focus:outline-none">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <h2 class="text-2xl font-bold pb-5">Edit User</h2>
                    <form @submit.prevent="updateUser">
                        <div class="flex flex-wrap -mx-2">
                            <div class="mb-4 px-2 w-1/2">
                                <label for="firstname" class="block mb-2 text-sm font-medium">First Name</label>
                                <input id="firstname" v-model="user.firstname"
                                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                                    placeholder="First Name" />
                            </div>
                            <div class="mb-4 px-2 w-1/2">
                                <label for="lastname" class="block mb-2 text-sm font-medium">Last Name</label>
                                <input id="lastname" v-model="user.lastname"
                                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                                    placeholder="Last Name" />
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="email" class="block mb-2 text-sm font-medium">Email</label>
                            <input id="email" v-model="user.email"
                                class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                                placeholder="Email" />
                        </div>

                        <div class="flex flex-wrap -mx-2">
                            <div class="mb-4 px-2 w-1/2">
                                <label for="gender" class="block mb-2 text-sm font-medium">Gender</label>
                                <input id="gender" v-model="user.gender" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                                    placeholder="Gender" />
                            </div>
                            <div class="mb-4 px-2 w-1/2">
                                <label for="country" class="block mb-2 text-sm font-medium">Country</label>
                                <input id="country" v-model="user.country" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                                    placeholder="Country" />
                            </div>
                        </div>


                        <div class="flex items-center justify-between mb-4">
                            <button type="submit"
                                class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <section v-if="showModalDeletesales" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
                    <svg class="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <div>
                        <h4 class="text-slate-600 font-bold text-base text-center">
                            Are you sure?
                        </h4>
                        <p class="text-slate-600 text-xs mt-2 md:mt-1 text-center">
                            Are you sure you want to delete this account? Once this is done,
                            the account cannot be recovered.
                        </p>
                    </div>
                    <div class="flex">
                        <button @click="confirmDelete"
                            class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-red-600 hover:border-2">
                            <span class="text-slate-600 relative z-10"><b>OK</b></span>
                        </button>

                        <button @click="cancelDelete"
                            class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
                            <span class="text-slate-600 relative z-10"><b>Cencle</b></span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
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
            selectedUserId: false,
            user: {
                firstname: "",
                lastname: "",
                email: "",
                gender: "",
                country: "",
                department: "",
                position: "",
                isonline: "",
            },
            showModalDeletesales: false,
        };
    },

    created() {
        this.fetchUsers();
    },
    methods: {

        fetchUsers() {
            axios
                .get("http://LOCALHOST:9992/salesapprovejp/all")
                .then((response) => {
                    this.users = response.data.map(user => {
                        // Convert isonline from string "1" or "0" to boolean true or false
                        user.isonline = user.isonline === "1";
                        return user;
                    });
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        },

        editUser(id) {
            this.selectedUserId = id;
            // เก็บข้อมูลเดิมของแต่ละช่องไว้ก่อนการแก้ไข
            this.originalFirstname = this.user.firstname;
            this.originalLastname = this.user.lastname;
            this.originalEmail = this.user.email;
            this.originalGender = this.user.gender;
            this.originalCountry = this.user.country;
            this.originalDepartment = this.user.department;
            this.originalPosition = this.user.position;
            this.originalisonline = this.user.isonline;
            axios
                .get(`http://LOCALHOST:9992/salesapprovejp/${id}`)
                .then((response) => {
                    this.user = { ...response.data };
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    // ถ้ามีข้อผิดพลาดในการดึงข้อมูล ให้กลับค่าเดิม
                    this.user.firstname = this.originalFirstname;
                    this.user.lastname = this.originalLastname;
                    this.user.email = this.originalEmail;
                    this.user.gender = this.originalGender;
                    this.user.country = this.originalCountry;
                    this.user.department = this.originalDepartment;
                    this.user.position = this.originalPosition;
                    this.user.isonline = this.originalisonline;

                    
                });
        },

        updateUser() {
            const updatedData = {};
            if (this.user.firstname !== this.originalFirstname) {
                updatedData.firstname = this.user.firstname;
            }
            if (this.user.lastname !== this.originalLastname) {
                updatedData.lastname = this.user.lastname;
            }
            if (this.user.email !== this.originalEmail) {
                updatedData.email = this.user.email;
            }
            if (this.user.gender !== this.originalGender) {
                updatedData.gender = this.user.gender;
            }
            if (this.user.country !== this.originalCountry) {
                updatedData.country = this.user.country;
            }
            if (this.user.department !== this.originalDepartment) {
                updatedData.department = this.user.department;
            }
            if (this.user.position !== this.originalPosition) {
                updatedData.position = this.user.position;
            }

            axios
                .put(
                    `http://LOCALHOST:9992/salesjp/edit/${this.selectedUserId}`,
                    updatedData
                )
                .then(() => {
                    this.fetchUsers();
                    this.selectedUserId = null;
                    // Set user data to original
                    this.user = {
                        firstname: "",
                        lastname: "",
                        email: "",
                        gender: "",
                        country: "",
                        department: "",
                        position: "",
                    };
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                });
        },

        deleteUser(id) {
            // Show the delete confirmation modal directly
            this.showModalDeletesales = true;
            // Set the id to be deleted
            this.userToDeleteId = id;
        },

        confirmDelete() {
            // Perform deletion operation
            axios
                .delete(`http://LOCALHOST:9992/salesjp/delete/${this.userToDeleteId}`)
                .then(() => {
                    // Refresh user list after deletion
                    this.fetchUsers();
                    // Hide the delete confirmation modal
                    this.showModalDeletesales = false;
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        },

        cancelDelete() {
            // Reset userToDeleteId and hide the delete confirmation modal
            this.userToDeleteId = null;
            this.showModalDeletesales = false;
        },

        formatTimestamp(approvalDate) {
            // แปลง timestamp ให้เป็นรูปแบบ "YYYY-MM-DD HH:mm:ss"
            const dateObj = new Date(approvalDate);
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

<style scoped></style>