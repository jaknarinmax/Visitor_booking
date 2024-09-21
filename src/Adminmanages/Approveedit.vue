<template>
    <div class="flex h-screen bg-gray-100">
      <AdminSalesNavbar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <AdminSalesTopNav />
        <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">




          <div @click="closetoggleSidebar" class="p-4">
            <section class="container px-4 mx-auto" style="width: 75%">
                <!-- Navigation buttons -->
                <div class="sm:flex sm:justify-end sm:items-left">
                    <div class="flex items-center mt-4 gap-x-3">
                        <!-- Button to show Approved table -->
                        <a @click.prevent="showApprovedTable" href="#" :class="{'bg-sky-300': showApproved,'bg-transparent': !showApproved,}" class="relative px-2 py-2 font-bold text-black group">
                            <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-1 -translate-y-1 bg-sky-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                            <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
                            <span class="relative">Approved</span>
                        </a>
                        <!-- Button to show Requesting table -->
                        <a @click.prevent="showRequestingTable" href="#" :class="{'bg-violet-500': showRequesting,'bg-transparent': !showRequesting,}" class="relative px-2 py-2 font-bold text-black group">
                            <span
                                class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-1 -translate-y-1 bg-violet-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                            <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
                            <span class="relative">Requesting</span>
                        </a>
                    </div>
                </div>

                <!-- Table of requests for approval -->
                <div v-if="showApproved" class="flex flex-col mt-6">
                    <div class="grid place-items-center">
                        <div class="mt-2 bg-gradient-to-r from-blue-400 to-sky-200 border border-blue-300 text-sm text-blue-800 p-2 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500" style="max-width: 500px">
                            <span class="font-bold text-lg text-black">Table of requests for approval of data corrections.</span>
                        </div>
                    </div>
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" style="margin-top: 5px">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div
                                class="overflow-hidden border border-gray-400 shadow-lg dark:border-gray-700 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr class="bg-gradient-to-r from-blue-500 to-sky-300">
                                            <th scope="col"
                                                class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                No.
                                            </th>
                                            <th scope="col"
                                                class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Details before requesting
                                            </th>
                                            <th scope="col"
                                                class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Request Details
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Submission Date
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Time Requested
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(record, index) in filteredApprovedSales" :key="record._id"
                                        class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td>
                                                <span class="ml-2">{{ index + 1 }}</span>
                                            </td>

                                            <td
                                                class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <ul v-if="record.originalData && record.originalData.firstname">
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Firstname:
                                                            {{ record.originalData.firstname }}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Lastname:
                                                            {{ record.originalData.lastname }}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">E-mail: {{ record.originalData.email
                                                            }}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Department:{{ record.originalData.department}}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Position:
                                                            {{ record.originalData.position }}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Country:
                                                            {{ record.originalData.country }}</span>
                                                    </li>
                                                    <li class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-purple-600 w-2 h-1 rounded-full bg-blue-600"></span>
                                                        <span class="ml-2">Gender: {{ record.originalData.gender
                                                            }}</span>
                                                    </li>
                                                </ul>
                                            </td>

                                            <td
                                                class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <ul>
                                                    <li v-for="(value, key) in record.updatedata" :key="key"
                                                        class="text-left flex items-center gap-x-2">
                                                        <span
                                                            class="text-blue-600 w-2 h-1 rounded-full bg-blue-500"></span>
                                                        <span class="ml-2">{{ key }}: {{ value }}</span>
                                                    </li>
                                                </ul>
                                            </td>

                                            <!-- ตัวอย่าง HTML -->
                                            <td
                                                class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <span class="ml-2">{{formatDate(record.createdAt, "date")}}</span>
                                            </td>

                                            <td
                                                class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <span class="ml-2">{{formatDate(record.createdAt, "time")}}</span>
                                            </td>

                                            <td
                                                class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <a href="#" @click="showApprovalDialog(record._id)"
                                                    class="relative inline-flex items-center justify-start px-2 py-2 overflow-hidden font-medium transition-all bg-sky-500 rounded group">
                                                    <span
                                                        class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-sky-800 rounded group-hover:-mr-4 group-hover:-mt-4">
                                                        <span
                                                            class="absolute top-0 right-0 w-6 h-6 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                                    </span>
                                                    <span
                                                        class="absolute bottom-0 left-0 w-full h-24 transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-sky-300 rounded-4xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                                    <span
                                                        class="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Approve</span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Requesting table -->
                <div v-if="showRequesting" class="flex flex-col mt-6">
                    <div class="grid place-items-center">
                        <div class="mt-2 bg-gradient-to-r from-violet-400 to-violet-200 border border-blue-300 text-sm text-blue-800 p-2 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500"
                            style="max-width: 600px">
                            <span class="font-bold text-lg text-black">Table of data corrections that have already
                                been
                                approved.</span>
                        </div>
                    </div>

                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" style="margin-top: 5px">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div
                                class="overflow-hidden border border-gray-400 shadow-lg dark:border-gray-700 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        <tr class="bg-gradient-to-r from-violet-500 to-violet-200">
                                            <th scope="col"
                                                class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                No.
                                            </th>
                                            <th scope="col"
                                                class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Request Details
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Submission Date
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Time Requested
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Approved date
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Time Approved
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="(record, index) in filteredRequestingSales" :key="record._id"
                                        class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <!-- Replace with dynamic data using v-for if applicable -->
                                        <tr>
                                            <td class="text-center px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <span class="ml-2">{{ index + 1 }}</span>
                                            </td>
                                            <td
                                                class="text-center px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <ul>
                                                    <li v-for="(value, key) in record.updatedata" :key="key"
                                                        class="text-left flex items-center gap-x-2">
                                                        <span class="text-blue-600 w-2 h-1 rounded-full bg-purple-500"></span>
                                                        <span class="ml-2">{{ key }} : {{ value }}</span>
                                                    </li>
                                                </ul>
                                            </td>
                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <span class="ml-2">{{formatDate(record.createdAt, "date")}}</span>
                                            </td>

                                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <span class="ml-2">{{formatDatecreatedAt(record.createdAt, "time")}}</span>
                                            </td>
                                            <td class="text-center px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <span class="ml-2">{{formatDate(record.approvedAt, "date")}}</span>
                                            </td>

                                            <td class="text-center px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <span class="ml-2">{{
                                                    formatDatecreatedAt(record.approvedAt, "time")
                                                    }}</span>
                                            </td>
                                            <td
                                                class="text-center px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                                <button
                                                    className="rounded px-2 py-2 overflow-hidden group bg-purple-600 relative hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-purple-400 transition-all ease-out duration-300">
                                                    <span
                                                        className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span>
                                                    <span className="relative">DELETE</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <section v-if="showApprovededit"
                    class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
                        <svg class="h-12 w-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon
                                points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div>
                            <h4 class="text-slate-600 font-bold text-base text-center">
                                Are you sure?
                            </h4>
                            <p class="text-slate-600 text-xs mt-2 md:mt-1 text-center">
                                Are you sure you want to approve data edits?
                            </p>
                        </div>
                        <div class="flex">
                            <button @click.prevent="approveEdit(selectedRecordId)"
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
            </section>
        </div>
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
            isSubMenuVisible: false,
            showApproved: true,
            showRequesting: false,
            activitySales: [],
            loading: false,
            showApprovededit: false,
            selectedRecordId: null,
        };
    },

    created() {
        this.fetchActivitySales();
    },

    computed: {
        filteredApprovedSales() {
            return this.activitySales.filter((record) => !record.approved);
        },
        filteredRequestingSales() {
            return this.activitySales.filter((record) => record.approved);
        },
    },

    methods: {
       


        async fetchActivitySales() {
            this.loading = true;
            try {
                const response = await fetch(
                    "http://LOCALHOST:9992/salesjp/activitysales"
                );
                const data = await response.json();
                this.activitySales = data;
            } catch (error) {
                console.error("Error fetching activity sales:", error);
            } finally {
                this.loading = false;
            }
        },

        showApprovalDialog(recordId) {
            this.selectedRecordId = recordId;
            this.showApprovededit = true; // Show the approval dialog
        },

        async approveEdit(editId) {
            try {
                if (typeof editId === "string") {
                    const response = await axios.post(
                        "http://LOCALHOST:9992/activity/approve-edit",
                        { editId }
                    );
                    if (response.data.status) {
                        console.log("Request approved successfully");
                        const record = this.activitySales.find(
                            (record) => record._id === editId
                        );
                        if (record) {
                            record.approved = true;
                            record.approvedAt = response.data.approvedAt;
                        } else {
                            console.error("Record not found in activitySales");
                        }
                        // Refresh the data
                        await this.fetchActivitySales();
                    } else {
                        console.error("Failed to approve request:", response.data.message);
                    }
                } else {
                    console.error("Invalid editId format");
                }
            } catch (error) {
                console.error("Error approving request:", error.message);
            } finally {
                this.showApprovededit = false; // Hide the approval dialog
                this.selectedRecordId = null;
            }
        },

        cancelDelete() {
            this.showApprovededit = false; // Hide the approval dialog
            this.selectedRecordId = null;
        },

        formatDatecreatedAt(date, format) {
            const dateObj = new Date(date);
            // Subtract 7 hours
            dateObj.setHours(dateObj.getHours() + 10);

            const optionsTime = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };
            if (format === "time") {
                return dateObj.toLocaleTimeString([], optionsTime);
            }
            // Add more formats as needed
            return dateObj.toLocaleString();
        },

        formatDate(datetime, type) {
            const dateObj = new Date(datetime);
            dateObj.setHours(dateObj.getHours() - 7); // ลบ 7 ชั่วโมง เพื่อปรับเวลาให้ตรงกับเขตเวลาท้องถิ่น

            const optionsDate = {
                year: "numeric",
                month: "short",
                day: "numeric",
            };

            const optionsTime = {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            };

            if (type === "date") {
                return dateObj.toLocaleDateString("en-US", optionsDate);
            } else if (type === "time") {
                return dateObj.toLocaleTimeString("en-US", optionsTime);
            } else {
                return "";
            }
        },

        showApprovedTable() {
            this.showApproved = true;
            this.showRequesting = false;
        },

        showRequestingTable() {
            this.showApproved = false;
            this.showRequesting = true;
        },
    },
};
  </script>