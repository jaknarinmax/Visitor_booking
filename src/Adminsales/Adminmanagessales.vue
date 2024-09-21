<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSalesNavbar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AdminSalesTopNav />
      <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-semibold text-center text-teal-600 mb-8">
              BOOKING REJECTED BY SALES
            </h1>
            <div v-if="loading" class="text-center">
              <p>Loading...</p>
            </div>
            <div v-else-if="error" class="text-center text-red-500">
              <p>{{ error }}</p>
            </div>
            <div v-else-if="bookingRejects.length === 0" class="text-center">
              <p>No booking rejections found.</p>
            </div>
            <template v-for="bookingReject in bookingRejects" :key="bookingReject._id">
              <div class="mb-12">
                <div class="overflow-x-auto">
                  <table class="w-full border-2 border-teal-300">
                    <thead class="bg-teal-100">
                      <tr>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 10%"> Reference Code </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 7%"> Visit Date </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 7%"> Start Time </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 7%"> End Time </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 7%"> Number of People </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider" style="width: 25%"> Purpose </th>
                        <th class="px-2 py-2 text-center align-middle text-sm font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 10%"> Status </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-teal-200">
                      <tr class="hover:bg-teal-50 transition duration-150 ease-in-out">
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm font-medium text-black">
                          {{ bookingReject.referenceCode }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm text-black">
                          {{ formatDate(bookingReject.visitdate) }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm text-black">
                          {{ bookingReject.starttime }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm text-black">
                          {{ bookingReject.endtime }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm text-black">
                          {{ bookingReject.numberofpeople }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle  text-sm text-black">
                          {{ bookingReject.Purposeofvisit }}
                        </td>
                        <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm">
                          <span
                            class="px-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Rejected
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="px-2 py-2">
                          <h3 class="text-[14px] font-semibold text-teal-700 mb-2">
                            PARTICIPANT INFORMATION
                          </h3>
                          <div class="overflow-x-auto">
                            <table class="w-full">
                              <thead class="bg-teal-100">
                                <tr>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Full Name </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> ID Card/Passport Number </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Email </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Phone Number </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Age </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Country </th>
                                  <th class="px-1 py-1 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 15%"> Company </th>
                                  <th class="px-1 py-2 text-center text-[13px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 8%"> Participant Status </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="participant in bookingReject.participants" :key="participant._id" class="hover:bg-teal-50 transition duration-150 ease-in-out">
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.name }} {{ participant.surname }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.thaiid || participant.passportno }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.email }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.telephonenumber }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.age }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ participant.country }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle text-[12px] text-black">
                                    {{ participant.companyname ? participant.companyname : 'Come individually' }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-sm">
                                    <span class="px-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                                      {{ participant.selectstatus }}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="7" class="px-1 py-1">
                          <h3 class="text-[14px] font-semibold text-teal-700 mb-2">
                            REJECTION INFORMATION
                          </h3>
                          <div class="overflow-x-auto">
                            <table class="w-full">
                              <thead class="bg-teal-100">
                                <tr>
                                  <th class="px-1 py-1 text-center text-[14px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 10%"> BOOKING DATE </th>
                                  <th  class="px-1 py-1 text-center text-[14px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 10%"> REJECTED AT </th>
                                  <th class="px-1 py-1 text-center text-[14px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 10%"> REJECTED BY </th>
                                  <th class="px-1 py-1 text-center text-[14px] font-medium text-black uppercase tracking-wider whitespace-nowrap" style="width: 25%"> REJECTION REASON </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="hover:bg-teal-50 transition duration-150 ease-in-out">
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ new Date(bookingReject.bookedAt).toLocaleString('th-TH', { hour12: false }) }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ new Date(bookingReject.rejectedAt).toLocaleString('th-TH', { hour12: false }) }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ bookingReject.rejectedBy && bookingReject.rejectedBy.firstname && bookingReject.rejectedBy.lastname ? `${bookingReject.rejectedBy.firstname}
                                    ${bookingReject.rejectedBy.lastname}` : 'N/A' }}
                                  </td>
                                  <td class="px-1 py-1 text-center align-middle whitespace-nowrap text-[12px] text-black">
                                    {{ bookingReject.rejectionReason }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-4 py-2 text-[12px] text-black text-right" colspan="7">
                          <a href="#_" @click.prevent="toggleSendToSales(bookingReject._id)" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                            <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-emerald-500 to-teal-400"></span>
                            <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-emerald-500 to-teal-400"></span>
                            <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-emerald-500 to-teal-400"></span>
                            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-emerald-500 from-teal-400"></span>
                            <span class="relative" style="font-size: 15px"><b>Send</b></span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </div>


          <section v-if="showSendToSalesModal" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="w-[420px] px-6 py-7 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col gap-5 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.25)] border-2 border-indigo-300">
              <legend class="text-xl font-bold mb-2 text-indigo-700 select-none text-center">Select new Sales</legend>
              <div v-for="(users, department) in groupedUsers" :key="department">
                <h3 class="text-xl font-bold text-indigo-600 " style="margin-top: -10px;">Sales in {{ department }} Department</h3>
                <label v-for="user in users" :key="user._id" :for="user._id" class="font-medium h-18 relative hover:bg-white/50 transition-all duration-300 flex flex-col justify-center p-4 rounded-lg has-[:checked]:text-pink-600 has-[:checked]:bg-pink-100 has-[:checked]:ring-pink-500 has-[:checked]:ring-4 select-none shadow-lg hover:shadow-xl border-2 border-gray-300 overflow-hidden group mb-3" style="margin-top: 10px;">
                  <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div class="flex items-center gap-4">
                    <div class="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-1.5 transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
                      <svg class="h-full w-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span class="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">{{ user.firstname }} {{ user.lastname }}</span>
                    <input type="radio" name="status" class="w-5 h-5 absolute accent-pink-600 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      :id="user._id" :value="user._id" v-model="selectedUser" />
                    <span class="text-sm text-gray-600 absolute left-14 bottom-2 text-emerald-500 transform translate-y-2 font-semibold">
                      ✓  Sales
                    </span>
                  </div>
                </label>
              </div>
              <div class="flex gap-4 justify-center mt-2">
                <button @click="showConfirmationModal"  class="animate-bounce transition-all duration-300 inline-flex text-md font-medium bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 mt-3 px-6 py-2.5 rounded-lg text-white shadow-xl hover:shadow-2xl border-2 border-orange-400">
                  <span class="mr-2">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
                
                <button @click="cancelSendToSales" class="animate-bounce transition-all duration-300 inline-flex text-md font-medium bg-gradient-to-r from-indigo-700 to-indigo-900 hover:from-indigo-800 hover:to-indigo-950 mt-3 px-6 py-2.5 rounded-lg text-white shadow-xl hover:shadow-2xl border-2 border-indigo-500">
                  <span class="mr-2">Cancel</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </section>


          <section v-if="showModalSendToSalesl" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="bg-white rounded-lg shadow-xl border-2 border-green-200">
              <div class="w-96 border-t-8 border-green-600 rounded-t-lg flex">
                  <div class="w-1/3 pt-6 flex justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 bg-green-600 text-white p-3 rounded-full shadow-md" fill="none" viewBox="0 0 24 24" height="24" width="24">
                          <path xmlns="http://www.w3.org/2000/svg" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </div>
                  <div class="w-full pt-9 pr-4">
                      <h3 class="font-bold text-green-700 text-lg">Send to sales?</h3>
                      <p class="py-4 text-sm text-green-600">Are you sure you want to send this reservation to sales? This action cannot be canceled.</p>
                  </div>
              </div>
          
              <div class="p-4 flex space-x-4 border-t border-green-200">
                  <a @click="cancelConfirmation" href="#" class="w-1/2 px-4 py-3 text-center bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 font-bold rounded-lg text-sm shadow-md transition duration-300 ease-in-out">Cancel</a>
                  <a @click="submitSendToSales" href="#" class="w-1/2 px-4 py-3 text-center text-white bg-green-600 rounded-lg hover:bg-green-700 font-bold text-sm shadow-md transition duration-300 ease-in-out">Send</a>
              </div>
          </div>
          </section>

          
          <div v-if="showModalselectsales" class="fixed z-50 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen p-3">
              <div class="mx-auto overflow-hidden rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-xl sm:w-full sm:max-w-sm border border-blue-200 transform transition-all duration-300 ease-in-out hover:scale-102">
                <div class="p-4 space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 border-2 border-yellow-300 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-yellow-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-lg font-bold text-blue-800">No sales representative selected</h3>
                      <p class="mt-1 text-sm text-gray-600">Please select a sales representative before continuing.</p>
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <button @click="cancelselectsales" class="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 active:from-green-600 active:to-blue-700 px-4 py-1.5 rounded-full text-white text-sm font-semibold shadow transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      ตกลง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>
  </div>




</template>

<script>
import axios from "axios";
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
  data() {
    return {
      bookingRejects: [],
      loading: true,
      error: null,
      groupedUsers: {},
      departments: [],
      selectedUser: null,
      showSendToSalesModal: false,

      showModalSendToSalesl: false,
      showModalselectsales: false,

      currentBookingRejectId: null,

    };
  },
  methods: {
    async fetchBookingRejects() {
      try {
        this.loading = true;
        this.error = null;

        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in session storage');
        }

        const response = await axios.get(
          "http://LOCALHOST:9992/booking-rejects",
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          this.bookingRejects = response.data.data;
          // Extract departments from booking rejects
          const departments = [...new Set(this.bookingRejects.map(reject => reject.userId[0].roles.department.name))];
          this.fetchAndGroupUsers(departments);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (err) {
        console.error("Error fetching booking rejections:", err);
        this.error = `Failed to fetch booking rejection data: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    async fetchAndGroupUsers(departments) {
      try {
        const response = await axios.get('http://LOCALHOST:9992/salesapprovejp/all');
        const users = response.data;
        const salesUsers = users.filter(user => user.userType === 'sales' && departments.includes(user.department));
        this.groupedUsers = salesUsers.reduce((acc, user) => {
          if (!acc[user.department]) {
            acc[user.department] = [];
          }
          acc[user.department].push(user);
          return acc;
        }, {});
        this.departments = Object.keys(this.groupedUsers);
      } catch (error) {
        console.error('Error fetching and grouping sales users:', error);
      }
    },
    toggleSendToSales(bookingRejectId) {
      this.showSendToSalesModal = true;
      this.currentBookingRejectId = bookingRejectId;
      this.selectedUser = null; // Reset selected user when opening modal
    },
    cancelSendToSales() {
      this.showSendToSalesModal = false;
      this.showModalSendToSalesl = false; // Ensure this modal is also closed
      this.selectedUser = null;
      this.currentBookingRejectId = null;
    },
    showConfirmationModal() {
    if (this.selectedUser) {
      this.showModalSendToSalesl = true;
    } else {
      this.showModalselectsales = true;
    }
    },
    cancelselectsales() {
    this.showModalselectsales = false;
    },
    cancelConfirmation() {
      this.showModalSendToSalesl = false;
    },
    async submitSendToSales() {
      if (!this.selectedUser || !this.currentBookingRejectId) {
        console.log('No user selected or no booking reject ID');
        return;
      }

      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in session storage');
        }

        const response = await axios.post(
          `http://LOCALHOST:9992/booking-reject/${this.currentBookingRejectId}/send-to-salesjp/${this.selectedUser}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.message) {
          console.log(response.data.message);
          // Remove the sent booking from the list
          this.bookingRejects = this.bookingRejects.filter(booking => booking._id !== this.currentBookingRejectId);
          this.showModalSendToSalesl = false;
          this.cancelSendToSales(); // Close both modals
        } else {
          throw new Error("Invalid response from API");
        }
      } catch (err) {
        console.error("Error sending booking to sales:", err);
        // Handle error (e.g., show error message to user)
      }
    },
    
  },
  mounted() {
    this.fetchBookingRejects();
  },
};
</script>

<style scoped>
/* Add any additional styles you need for this page */
</style>
