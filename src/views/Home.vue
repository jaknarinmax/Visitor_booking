<script>
import Modalnotnumber from '@/components/Showmodals/showmodalnotnumber.vue';
import { mdiAccountBoxMultiple, mdiBadgeAccountHorizontal, mdiEarth, mdiEmailMultiple, mdiGenderMaleFemale, mdiSitemap } from '@mdi/js';
import axios from 'axios';

export default {
  name: 'SalesApproveList',
  components: {
    Modalnotnumber,
  },
  data() {
    return {
      imagePath: require('@/assets/images/img36.png'),
      users: [],
      groupedUsers: {},
      departments: [],
      showModalSalesinformation: false,
      showModalSalesinformation1: false,
      selectedDepartment: '',
      departmentMembers: [],
      selectedUser: null,
      path: mdiGenderMaleFemale,
      path1: mdiEarth,
      path2: mdiBadgeAccountHorizontal,
      path3: mdiSitemap,
      path4: mdiAccountBoxMultiple,
      path5: mdiEmailMultiple,
      selectedDate: null,
      searchTerm: '',
      selectedItem: null,
      counter: 0,
      showModalDepartment: false,
      showModalnotnumber: false,
    };
  },
  methods: {
    async fetchData() {
  try {
    const response = await axios.get('http://LOCALHOST:9992/salesapprovejp/all');
    this.users = response.data;
    console.log("Fetched users:", this.users); // เพิ่ม logging
    this.groupUsersByDepartment();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
},
    groupUsersByDepartment() {
      const grouped = this.users.reduce((acc, user) => {
        const department = user.department;

        if (user.userType === 'admin') {
          return acc;
        }

        if (!acc[department]) {
          acc[department] = { head: [], users: [] };
        }

        if (user.userType === 'adminsales') {
          acc[department].head.push(user);
        } else {
          acc[department].users.push(user);
        }

        return acc;
      }, {});

      this.groupedUsers = grouped;
      this.departments = Object.keys(grouped);
    },
    getFirstLetter(department) {
      return department.charAt(0).toUpperCase();
    },
    openInformation(department) {
      this.selectedDepartment = department;
      this.departmentMembers = [...this.groupedUsers[department].head, ...this.groupedUsers[department].users];
      this.showModalSalesinformation = true;
    },
    closeshowModalsales() {
      this.showModalSalesinformation = false;
    },
    Selectsales(member) {
      this.selectedUser = member;
      this.showModalSalesinformation1 = true;
      this.showModalSalesinformation = false;
    },
    closeIndividualModal() {
      this.showModalSalesinformation1 = false;
      this.selectedUser = null;
    },

    confirmSelection() {
  console.log("Selected User:", this.selectedUser); // เพิ่ม logging

  if (this.selectedUser && this.selectedUser._id) {
    this.selectedItem = {
      text: `${this.selectedUser.firstname} ${this.selectedUser.lastname}`,
      _id: this.selectedUser._id
    };
    console.log("Selection confirmed:", this.selectedItem);
    sessionStorage.setItem('userId', this.selectedUser._id);
    console.log("UserId saved to sessionStorage:", sessionStorage.getItem('userId')); // เพิ่ม logging
  } else {
    console.log("No valid selection made.");
  }

  this.showModalDepartment = false;
  this.closeIndividualModal();
},
    cancelSelection() {
      this.selectedItem = null;
      this.closeIndividualModal();
    },
    toggleDepartment() {
      this.showModalDepartment = !this.showModalDepartment;
    },
    closeshowModalDepartment() {
      this.showModalDepartment = false;
    },
    handleBeforeUnload() {
      this.counter = 0;
      sessionStorage.setItem('numberofpeople', this.counter);
    },
    incrementCounter() {
      this.counter += 1;
      sessionStorage.setItem('numberofpeople', this.counter);
    },
    decrementCounter() {
      if (this.counter > 0) {
        this.counter -= 1;
      }
      sessionStorage.setItem('numberofpeople', this.counter);
    },
    goToHomeStep2() {
      if (this.counter === 0) {
        this.showModalWithMessage("Please select a number.");
      } else {
        this.$router.push('/homestep2');
      }
    },
    showModalWithMessage(message) {
      this.modalMessage = message;
      this.showModalnotnumber = true;
    },
    closeModalnotnumber() {
      this.showModalnotnumber = false;
    },
    saveDateToSessionStorage() {
      sessionStorage.setItem('visitdate', this.selectedDate);
    },
  },
  computed: {
  filteredItems() {
    if (!this.searchTerm) {
      return this.departments.map(dept => ({ text: dept, _id: dept }));
    }
    return this.departments.filter(dept => 
      dept.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).map(dept => ({ text: dept, _id: dept }));
  },

  departmentMemberCounts() {
    return Object.keys(this.groupedUsers).reduce((acc, dept) => {
      acc[dept] = this.groupedUsers[dept].head.length + this.groupedUsers[dept].users.length;
      return acc;
    }, {});
  }
},
  mounted() {
    this.fetchData();
  },
  created() {
    this.counter = 0;
    sessionStorage.setItem('numberofpeople', this.counter);
  },
};
</script>




<template>
  <section class="pt-1 sm:pt-14" style="   padding: 1%;">
    <div style=" border: 2px solid rgba(128, 128, 128, 0.5); padding: 20px; margin: 10 auto;  background-color: rgba(173, 216, 230, 0.3); border-radius: 10px; ">
      <div>
        <div style="display: flex; align-items: center;">
          <img src="@/assets/images/img10.png" alt="search image" style="width: 60px; height: auto; margin-left: 10px; margin-top: -10px;">
          <div style="display: flex; flex-direction: column">
            <h2 style="margin: 20px; font-size: 28px; margin-left: 20px; margin-top: -10px; font-weight: bold; color: #e64a19;"> Visitor booking</h2>
          </div>
        </div>

        <div class="card-container">

          <!-- การ์ด1 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <div class="absolute py-1 px-3 -left-8 -top-4 -rotate-[10deg] border border-black black_border bg-[#CD5A00] text-white font-bold" style="z-index: 1;">
              <h1>{{ $t('home.selectsales') }}</h1>
            </div>
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">
              <div class="flex items-center -mt-+4">
                <img src="@/assets/images/img7.png" alt="search image"  style="width: 60px; height: auto; margin-left: 0px; margin-top: 5px;">
                <div class="relative left-4">
                  <button @click="toggleDepartment" class="inline-flex justify-center w-full px-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                    <span class="mr-1">{{ selectedItem ? selectedItem.text : 'Select Sales' }}</span>
                  </button>
                  <div v-show="isOpen" class="absolute left-4 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10" style="overflow-y: auto;">
                    <input v-model="searchTerm" class="block w-full px-8 py-2 text-sm text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                      type="text" placeholder="Search Sales" autocomplete="off">
                    <a v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)" class="block px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                      {{item.text }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- การ์ด1 -->


          <div v-if="showModalDepartment" class="fixed inset-0 bg-transparent backdrop-blur-md z-50 flex justify-center items-center">
            <div class="relative cursor-pointer dark:text-white">
              <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-slate-500 rounded-lg dark:bg-gray-200"></span>
              <div class="modal-content relative p-4 bg-white dark:bg-gray-800 border-2 border-slate-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                <h2 style="margin: 5px; font-size: 26px;  font-weight: bold; color: #070606; margin-top: -15px;"> 
                  {{ $t('home.Selectdepartment') }}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <button @click="closeshowModalDepartment" class="absolute top-0 right-0 mt-2 mr-2 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 input-on-hover1 ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <div v-for="(department, index) in departments" :key="index" class="flex flex-col space-y-8">
                  <button @click="openInformation(department)" class="flex flex-col rounded-lg overflow-hidden bg-white hover:shadow-xl hover:shadow-blue-200/70 transition-all duration-300 ease-in-out" style="border: 2px solid black;" @mouseover="$event.currentTarget.style.boxShadow = '0 10px 10px -5px rgba(100, 129, 205, 2.4), 0 0 rgba(59, 130, 246, 0.5)';
                            $event.currentTarget.style.transform = 'scale(1.05)';
                            $event.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 1)';" @mouseout="$event.currentTarget.style.boxShadow = 'none';
                            $event.currentTarget.style.transform = 'scale(1)';
                            $event.currentTarget.style.backgroundColor = 'white';">
                      <div class="grid grid-cols-1 sm:grid-cols-4">
                        <div class="flex flex-col border-b sm:border-b-0 items-center sm:justify-center">
                          <p class="text-5xl font-bold text-[#0ed3cf] rounded-full">{{ getFirstLetter(department) }}</p>
                        </div>
                        <div class="flex flex-col sm:border-l col-span-3">
                          <div class="flex flex-col space-y-2 p-1 text-gray-600">
                            <div class="flex flex-row text-sm">
                              <span class="mr-1"></span>
                              <p class="flex items-center text-gray-500">
                                <span class="font-semibold mr-1 uppercase" style="font-size: 12px;">{{ $t('home.departmentname') }}:</span>
                                <span style="font-size: 15px; font-weight: bold; color: brown;">{{ department }}</span>
                              </p>
                            </div>
                            <div class="flex flex-row text-sm">
                              <span class="mr-1"></span>
                                <p class="flex items-center text-gray-500">
                                <span class="font-semibold mr-1 uppercase" style="font-size: 12px;">
                                  {{ $t('home.numberofSales') }}:</span>
                                  <span style="font-size: 15px; font-weight: bold; color: brown;">{{ departmentMemberCounts[department] }}</span>                              
                                </p>
                            </div>
                          </div>
                          <div class="flex w-full relative bottom-0">
                            <div class="grid  border-t divide-x text-[#0ed3cf] bg-gray-50 dark:bg-transparent py-1">
                              <div></div>
                              <a class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold hover:text-[#0c9d92] transition-colors duration-300 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
                                </svg>
                                {{ $t('home.selectd') }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div v-if="showModalSalesinformation" class="fixed inset-0 bg-transparent backdrop-blur-md z-50 flex justify-center items-center">
            <div class="relative flex flex-col items-start justify-center px-6 py-8 w-full md:w-1/3 bg-white rounded-lg shadow-lg hover:shadow-2xl shadow-gray-500/50 ring-2 ring-gray-200 ring-opacity-50">
              <div class="w-full text-center text-xl font-semibold text-gray-800 mb-2">
                <div style="border: 4px solid #D3D3D3; border-left-color: #2F4F4F; border-right-color: #2F4F4F; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                  {{ $t('home.members') }} {{ selectedDepartment }}
                </div> 
              </div>
              <button @click="closeshowModalsales" class="absolute top-0 right-0 mt-2 mr-2 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 input-on-hover1 ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="w-full h-full px-2">
                <div v-for="(member, index) in departmentMembers" :key="index"  :class="['flex flex-col md:flex-row justify-between items-center rounded-lg p-2 shadow-lg mb-2', member.userType === 'adminsales' ? 'bg-yellow-100' : 'bg-yellow-50']">
                  <div class="flex items-center relative mb-2 md:mb-0">
                    <div class="relative mr-4 w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img class="w-full h-full overflow-hidden object-cover object-center rounded-full" src="@/assets/images/img15.png" alt="avatar" />
                      <img v-if="member.userType === 'adminsales'" src="@/assets/images/img37.png" alt="Crown" class="absolute w-6 h-6 -top-5 left-1/2 transform -translate-x-1/2" />
                    </div>
                    <div>
                      <h3 class="mb-1 text-gray-800 text-[16px] font-normal leading-4">{{ member.firstname }} {{ member.lastname }}</h3>
                      <p class="text-gray-600 text-[14px] leading-3 font-bold">{{ member.userType }}</p>
                    </div>
                  </div>
                  <div class="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                    <button @click="Selectsales(member)" class="cursor-pointer font-semibold overflow-hidden relative z-100 group px-3 py-1" style="border: 2px solid #28a745; border-radius: 15px;">
                      <span class="relative z-10 text-green-500 group-hover:text-white text-[15px] duration-500">Select</span>
                      <span class="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                      <span class="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div v-if="showModalSalesinformation1" class="fixed inset-0 bg-transparent backdrop-blur-md z-50 flex justify-center items-center">
            <div class="relative flex w-full max-w-md flex-col rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-border text-gray-700 shadow-2xl" style="box-shadow: 0 10px 20px rgba(0,0,3,0.5), 0 6px 6px rgba(0,0,0,5.15); border: 2px solid #e0e0e0;">  
              <div class="relative mx-4 -mt-20 h-56 ">
                <h2 style="font-size: 20px; font-weight: bold; margin: 0; color: #000000; margin-top: -30px;">{{ $t('home.information') }}</h2>

                <div class="bg-white rounded-xl shadow-lg py-14 px-4 max-w-sm mx-auto" :style="{ backgroundImage: `url(${imagePath})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                  <div class="text-black flex flex-col justify-between h-full">
                    <div class="mb-2" style="display: flex; justify-content: space-between; align-items: center; margin-top: -50px; ">
                      <div>
                        <p style="line-height: 1.3; font-size: 14px; font-weight: bold; margin: 0;">{{ selectedUser.firstname }} {{ selectedUser.lastname }}</p>
                        <p style="line-height: 1.3; font-size: 14px; font-weight: bold; margin: 0; margin-left: 10px;">{{ selectedUser.position }}</p>
                        <p style="line-height: 1.3; font-size: 14px; font-weight: bold; margin: 0; margin-left: 10px;">{{ selectedUser.department }}</p>
                      </div>
                      <img src="@/assets/images/logojinpao1.png" alt="search image" style="width: 70px; height: auto;">
                    </div>        
                    <div class="mb-[-40px]" style="text-align: left; margin-top: 40px;">
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">Jinpao Precision Industry Co.,Ltd.</p>
                      <div style="padding: 1.5px;">
                        <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px; border: 1px solid black;"></p>
                      </div>
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">經 寶 精 密 股 份 有 限 公 司</p>
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">631 Soi 12 Bangpoo Industrial </p>
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">A.Muang, Samutprakarn 10280</p>
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">Country: {{ selectedUser.country }}</p>
                      <p style="line-height: 1.2; font-size: 12px; font-weight: bold; margin-left: 140px;">E-mail : {{ selectedUser.email }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex gap-2 px-2">
                  <button @click="confirmSelection" class="btn shadow-[0_6px_0_rgb(0,0,0)] hover:shadow-[0_3px_0px_rgb(0,0,0)] flex-1 rounded-full bg-blue-600 dark:bg-blue-600 text-white dark:text-white antialiased font-bold hover:bg-green-400 dark:hover:bg-blue-900 px-2 py-1">
                    Confirm
                  </button>
                  <button @click="cancelSelection" class="btn shadow-[0_6px_0_rgb(0,0,0)] hover:shadow-[0_3px_0px_rgb(0,0,0)] flex-1 rounded-full bg-red-500 dark:bg-red-500 text-white dark:text-white antialiased font-bold hover:bg-red-800 dark:hover:bg-blue-900 px-2 py-1">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>



          <!-- การ์ด 2 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <div class="absolute py-1 px-3 -left-8 -top-4 -rotate-[10deg] border border-black black_border bg-[#CD5A00] text-white font-bold" style="z-index: 1;">
              {{ $t('home.selectdate') }}
            </div>
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">
              <div class="flex items-center -mt-+4">
                <img src="@/assets/images/img8.png" alt="search image" style="width: 60px; height: auto; margin-left: 0px; margin-top: 5px;">
                <input type="date" v-model="selectedDate" @change="saveDateToSessionStorage"
                  style="margin: 0; font-size: 18px; margin-left: 10px; font-weight: bold; border: 1.5px solid grey; padding: 0 20px; margin: 0;border-radius: 5px;">
              </div>
            </div>
          </div>



          <!-- การ์ด 3 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <div class="absolute py-1 px-3 -left-8 -top-4 -rotate-[10deg] border border-black black_border bg-[#CD5A00] text-white font-bold" style="z-index: 1;">
              {{ $t('home.participants') }}
            </div>
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">
              <div class="flex items-center -mt-4 ">
                <img src="@/assets/images/img9.png" alt="search image" style="width: 60px; height: auto; margin-left: 0px; margin-top: 15px;">
                <div class="ml-auto bg-gray-300" style="margin-top: 13px;">
                  <div class="border rounded-lg border-gray-300 px-3 py-0 flex items-center">
                    <button @click="decrementCounter" class="px-3 py-0 bg-red-500 text-white rounded-l-md" style="font-size: 30px;">-</button>
                    <span class="px-12 flex-grow text-center" style="font-size: 30px;">{{ counter }}</span>
                    <button @click="incrementCounter" class="px-2 py-0 bg-green-500 text-white rounded-r-md" style="font-size: 30px;">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- การ์ด 4 -->
          <div style="margin-top: -25px;">
            <button @click="goToHomeStep2" class="relative inline-block font-medium group py-2 px-4">
              <div class="relative  h-30  p-1 w-56   top-5  bg-white border-2 border-orange-700 rounded-lg">
                <span class=" absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-2 translate-y-2 bg-orange-700 group-hover:-translate-x-0 group-hover:-translate-y-0 "></span>
                <span class="absolute inset-0 w-full h-full bg-white border border-orange-700 group-hover:bg-orange-700"></span>
                <span class="relative text-indigo-600">
                  <div class="flex items-center mt-4"> <!-- ตรงนี้เปลี่ยน -mt-+4 เป็น mt-4 -->
                    <img src="@/assets/images/img2.png" alt="search image" style="width: 60px; height: auto; margin-left: 20px; margin-top: -20px;">
                    <h3 class="my-4 ml-3 text-lg font-bold text-gray-800 text-3xl">
                      {{ $t('home.search') }}
                    </h3>
                  </div>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>



    <div class="card-containerapp" style="display: flex; justify-content: center; margin-top: 30px; ">
      <!-- การ์ดที่1 -->
      <button @click="3">
        <div class="card" style=" display: flex; align-items: center; max-width: 370px; height: 120px; margin-left: 20px; border: 2px solid #2a36b1; padding: 20px; /* เพิ่มระยะขอบ 10px */ border-radius: 10px;">
          <div style="display: flex; flex-direction: column; margin-left: 15px;">
            <img src="@/assets/images/img1.png" alt="search image" style="width: 80px; height: auto;">
          </div>
          <h2 style="margin: 0; font-size: 32px; margin-left: 20px; font-weight: bold; color: #0000ff;">
            {{ $t('home.appointment') }}</h2>
        </div>
      </button>

      <!-- การ์ดที่2 -->
      <button @click="3">
        <div class="card" style=" display: flex; align-items: center; max-width: 370px; height: 120px; margin-left:20px; border: 2px solid #2a36b1; padding: 50px; /* เพิ่มระยะขอบ 10px */ border-radius: 10px;">
          <div style="display: flex; flex-direction: column; margin-left: 15px;">
            <img src="@/assets/images/img3.png" alt="search image" style="width: 80px; height: auto;">
          </div>
          <h2 style="margin: 0; font-size: 32px; margin-left: 40px; font-weight: bold; color: #0000ff;">PPE</h2>
        </div>
      </button>
    </div>


    <div class="card-containerapp" style="text-align: right; margin-top: 10px; ">
      <div class="card1" style="display: flex; align-items: center; max-width: 90%; height: 250px; background-color: #33CCFF; overflow: hidden;">
        <h2 style="margin: 0; font-size: 32px; font-weight: bold; color: #FFFFFF;  margin-top: -155px; margin: center; ">
          <span style="display: inline-block; ">
            <img src="@/assets/images/img4.png" alt="search image" style="width: 50px; height: auto;">
          </span>
          <span style="display: inline-block; vertical-align: middle;">{{ $t('home.callcenter') }}</span>
        </h2>
        <div style="margin-top: 0px;  color: #FFFF00; font-size: 24px;  margin-left: -150px;">
          <strong>+66-2-7093367</strong><br>
          <strong>+66-2-7093367</strong>
        </div>
      </div>
      <div class="button-container" style="display: flex;">
        <div style="display: flex; align-items: center; max-width: auto; height: auto; margin-top: 20px; ">
          <button @click="3" style="display: inline-block; margin: 0 50px;">
            <div style="display: flex; flex-direction: column; margin-left: 15px;">
              <img src="@/assets/images/img5.png" alt="search image" style="width: 100px; height: auto;">
            </div>
          </button>
        </div>
        <div style="display: flex; align-items: center; max-width: auto; height: auto; margin-top: 20px;">
          <button @click="3" style="display: inline-block; margin: 0 10px;">
            <div style="display: flex; flex-direction: column; margin-left: 15px;">
              <img src="@/assets/images/img6.png" alt="search image" style="width: 100px; height: auto;">
            </div>
          </button>
        </div>
        <h2 style="display: flex; flex-direction: column; margin-left: -320px; margin-top: -20px; font-weight: bold; font-size: 30px;">
          {{ $t('home.saleschannels') }}</h2>
      </div>
    </div>


    <div>

      <hr style="margin-top: 80px; border: 2px solid black;">

    </div>


    <div class="containercolumn margin-top: 80px;">
      <div class="column" style="text-align: left;">
        <h2 style="font-weight: bold; font-size: 20px; ">&nbsp;&nbsp;&nbsp;Participants Condition</h2>
        <ul>
          <li style="color: black; font-size: 18px; ">Check-in Proof of Participants</li>
          <li style="font-size: 18px;">Baggage allowance and conditions</li>
          <li style="font-size: 18px;">Visitation rules and regulations</li>
          <li style="font-size: 18px;">Personal Protective Equipment</li>
          <li style="font-size: 18px;">Lady Zone</li>
        </ul>
      </div>
      <div class="column" style="text-align: left;">
        <h2 style="font-weight: bold; font-size: 20px;">&nbsp;&nbsp;&nbsp;Departure</h2>
        <ul>
          <li style="font-size: 18px;">Shuttle Service - Company</li>
          <li style="font-size: 18px;">Car Rental - Charter</li>
          <li style="font-size: 18px;">Personal- Vehicle</li>
        </ul>
      </div>
      <div class="column" style="text-align: left;">
        <h2 style="font-weight: bold; font-size: 20px;">&nbsp;&nbsp;&nbsp;Accommodation and meals</h2>
        <ul>
          <li style="font-size: 18px;">Hotel reservation</li>
          <li style="font-size: 18px;">Meal</li>
          <li style="font-size: 18px;">Recommend</li>
        </ul>
      </div>
    </div>

    <div>
      <hr style="margin-top: 80px; border: 2px solid black" />
    </div>

  </section>
  <Modalnotnumber :showModalnotnumber="showModalnotnumber" @update:showModalnotnumber="showModalnotnumber = $event" />

</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  padding: 2%;
  margin-right: 10px;
}

.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}

@media screen and (max-width: 68px) {
  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  .max-w-sm {
    max-width: 100px;
  }
}

/* card2 */
.card-containerapp {
  display: flex;
  flex-wrap: wrap;
  /* ให้การ์ดขยับไปข้างล่างเมื่อความกว้างของ container ไม่เพียงพอ */
  justify-content: center;
  /* จัดการ์ดให้อยู่กลาง */
}

.card {
  /* ค่าที่เหลือเหมือนเดิม */
  display: flex;
  align-items: center;
  max-width: 370px;
  height: 120px;
  margin: 0 20px 30px 0;
  /* ปรับ margin ให้การ์ดไม่ติดกันโดยตรง */
  border: 2px solid #000;


  /* เพิ่มเงา */
  box-shadow: 10px 10px 28px rgba(0, 0, 0, 0.1);
  /* ขนาดและสีของเงา */
  transition: box-shadow 0.3s ease;
  /* ให้เงามีการเปลี่ยนแปลงอย่างนุ่มนวล */

  /* เพิ่มเอฟเฟคการ์ด */
  filter: brightness(100%) contrast(100%);
  /* ค่าเริ่มต้น */
  transition: filter 0.3s ease;
  /* ให้เอฟเฟคมีการเปลี่ยนแปลงอย่างนุ่มนวล */
}

.card:hover {
  /* การ์ดเมื่อ hover ควรมีการเพิ่มแสงและเปลี่ยนเงา */
  filter: brightness(110%) contrast(110%);
  box-shadow: 10px 10px 36px rgba#5677fc;
}

.card {
  background-color: #fff;
  box-shadow: 15px 10px 5px rgba(51, 5, 235, 0.4);

}

/* ส่วนการ์ดติดต่อ */

.card-containerapp {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* กำหนดความกว้างของคอลัมน์ */
  gap: 30px;
  position: relative;
  /* ตั้งค่าเป็น relative เพื่อให้ left ทำงาน */
  top: 0px;
  /* ขยับลงด้านล่าง 50px */
  place-content: center;
  /* จัดเรียงข้อมูลในตารางให้ตรงกลาง */
}





/* ส่วนคอลัมนนะ */



ul li::before {
  font-size: 22px;
  /* เพิ่มขนาดจุด */
  content: '\2022';
  /* ใช้ Unicode ของจุดดำ */
  margin-right: 5px;
  /* เพิ่มระยะห่างระหว่างข้อความและจุด */
}


.containercolumn {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.column {
  padding: 50px;
  flex: 1;
  margin-bottom: 10px;
  /* เพิ่มการเว้นระยะห่างด้านล่าง 10px */
}


@media screen and (max-width: 768px) {
  .containercolumn {
    flex-direction: column;
  }

  .column {
    border-bottom: 1px solid black;
  }

  .column:last-child {
    border-bottom: none;
  }
}


.purple_border {
  box-shadow: 4px 4px 1px rgb(126, 34, 206);
  /* เงาเซลล์ */
}

.black_border {
  box-shadow: 4px 4px 1px rgb(0, 0, 0);
}

.modal-content {
  max-height: 90vh; /* ความสูงสูงสุด 90% ของความสูงหน้าจอ */
  overflow-y: auto; /* เพิ่ม scrollbar ในแนวตั้งเมื่อจำเป็น */
  -webkit-overflow-scrolling: touch; /* ทำให้การเลื่อนบนอุปกรณ์ iOS นุ่มนวลขึ้น */
}

</style>
