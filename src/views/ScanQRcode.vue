<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBellAlert } from '@mdi/js';


export default {
  components: {
    SvgIcon,
  },


  data() {
    return {

      path8: mdiBellAlert,
      counter: parseInt(localStorage.getItem('counterValue')) || 1,
      companyName: {},
      IDName: {},
      PassportName: {},
      firstName: {},
      lastName: {},
      emails: {},
      phoneNumbers: {},
      countries: {},
      Age: {},
      isCompanyChecked: {},
      isIDChecked: {},
      Carrental: {},
      Personalvehicle: {},
      Companysevice: {},
      selectedItemstatus: {},
      Carregistration: {},

      // qr code
      checkboxChecked: false,
      showModalSelectQRcode: false,
      additionalInformationVisibility: {},

      showTable: true,
      storedDateTime: null,

      countdown: '5:00',
      showModalTimeout: false,

    };
  },

  methods: {

    handleSearch(event) {
      const query = event.target.value.trim().toLowerCase();
      let found = false;
      for (let index = 1; index <= this.counter; index++) {
        const searchData = (this.firstName[index] + ' ' + this.lastName[index] + ' ' + this.emails[index] + ' ' + this.selectedItemstatus[index]).toLowerCase();
        const row = document.getElementById('row' + index);
        // Check if the search query matches any part of the data
        if (searchData.includes(query)) {
          found = true;
          // If the data matches, show the table row
          row.style.display = 'table-row';
        } else {
          // If the data doesn't match, hide the table row
          row.style.display = 'none';
        }
      }
      // Show or hide the table based on whether any data was found
      this.showTable = found;
    },
    clearSearch() {
      // Clear the search input value
      document.getElementById('voice-search').value = '';
      for (let index = 1; index <= this.counter; index++) {
        const row = document.getElementById('row' + index);
        row.style.display = 'table-row';
      }

    },




    toggleVisibility(index) {
      // Toggle the visibility state for the clicked row index
      this.additionalInformationVisibility[index] = !this.additionalInformationVisibility[index];
    },
    toggleButtonVisibility() {
      this.checkboxChecked = !this.checkboxChecked;
    },
    goToNextPage() {
      if (this.checkboxChecked) {
        // Redirect to homestep3 page
        window.location.href = 'ScanQRcode';
      } else {
        // Show modal if checkbox is not checked
        this.showModalSelectQRcode = true;
      }
    },
    closeModalSelectQRcode() {
      this.showModalSelectQRcode = false;
    },

    startCountdown() {
      let time = 300; // 1 minute in seconds
      const countdownInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.countdown = `${minutes}:${seconds}`;
        time--;
        if (time < 0) {
          clearInterval(countdownInterval);
          // Call showModalTimeoutHandler method when the timer expires
          this.showModalTimeoutHandler();
        }
      }, 1000);
    },
    showModalTimeoutHandler() {
      // Set showModal data property to true to show the modal
      this.showModalTimeout = true;
    },
    navigateToHomepage() {
      // Programmatically navigate to "/home"
      this.$router.push('/');
    },
  },

  mounted() {
    this.startCountdown(); // เรียกใช้งานเมื่อ component ถูกโหลดเสร็จ
    this.storedDateTime = localStorage.getItem('buttonClickDateTime');
  },

  computed: {
    formattedDate() {
      // ใช้ Vue filter เพื่อจัดรูปแบบวันที่
      if (this.selectedDate) {
        return this.selectedDate.split('T')[0].split('-').reverse().join('-');
      } else {
        return 'Select Date';
      }
    },
  },



  created() {

    const counterValue = localStorage.getItem('counterValue');
    console.log('Counter value ', counterValue);
    if (counterValue !== null) {
      this.counter = parseInt(counterValue);
    }
    const selectedItemJson = localStorage.getItem('selectedItem');
    if (selectedItemJson) {
      this.selectedItem = JSON.parse(selectedItemJson);
    }

    for (let index = 1; index <= this.counter; index++) {
      const formDataJson = localStorage.getItem('formData_' + index);
      if (formDataJson) {
        const formData = JSON.parse(formDataJson);
        this.companyName[index] = formData.companyName;
        this.IDName[index] = formData.IDName;
        this.PassportName[index] = formData.PassportName;
        this.firstName[index] = formData.firstName;
        this.selectedItemstatus[index] = formData.selectedItemstatus;
        this.lastName[index] = formData.lastName;
        this.emails[index] = formData.email;
        this.phoneNumbers[index] = formData.phoneNumber;
        this.countries[index] = formData.country;
        this.Age[index] = formData.Age;
        this.isCompanyChecked[index] = formData.isCompanyChecked;
        this.isIDChecked[index] = formData.isIDChecked;
        this.Carrental[index] = formData.Carrental;
        this.Personalvehicle[index] = formData.Personalvehicle;
        this.Companysevice[index] = formData.Companysevice;
        this.Carregistration[index] = formData.Carregistration;
      }
    }

    const savedDate = localStorage.getItem('selectedDate');
    const savedStartTime = localStorage.getItem('selectedStartTime');
    const savedEndTime = localStorage.getItem('selectedEndTime');
    const savedDuration = localStorage.getItem('duration');

    // กำหนดค่าข้อมูลที่ดึงมาจาก LocalStorage ให้กับตัวแปรใน Vue component
    if (savedDate) {
      this.selectedDate = savedDate;
    }
    if (savedStartTime) {
      this.selectedStartTime = savedStartTime;
    }
    if (savedEndTime) {
      this.selectedEndTime = savedEndTime;
    }
    if (savedDuration) {
      this.duration = savedDuration;
    }




  },
};
</script>



<template>


  <div class="max-w-full w-full mx-auto grid gap-4 bg-sky-100 " style="margin-top: -25px;">





    <!-- การ์ดบน -->
    <div class="hidden md:block" style="  margin-left: 50px; margin-top: 25px; ">
      <div class="flex">

        <div class="w-2/3">
          <div class="bg-gray-200 border border-gray-800 shadow-lg  rounded-2xl p-4 h-64">
            <h3 class=" "
              style="    border-top-right-radius: 11px;    border-top-left-radius: 11px;  margin-left: -20px; background-color: #ff6f00;  padding: 0.5rem; margin-top: -17px; width:  103.9%; ">
              JINPAO QR CODE</h3>

            <div
              class="    cursor-pointer group overflow-hidden p-5 duration-1000 hover:duration-1000 relative w-full h-48 py-4 ">
              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 -top-12 -left-12  shadow-yellow-500   w-24 h-24">
              </div>
              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  top-44 left-14 absolute shadow-red-500  w-24 h-24">
              </div>
              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  top-24 right-0  shadow-sky-200  w-24 h-24">
              </div>
              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  top-4 right-10  shadow-orange-500  w-12 h-12">
              </div>
              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  top-12 left-12  shadow-red-500  w-12 h-12">
              </div>

              <div
                class=" bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  -top-24 -left-12  shadow-sky-600  w-64 h-64">
              </div>
              <div
                class="bg-transparent group-hover:scale-150 absolute shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000  top-24 left-12  shadow-sky-500  w-4 h-4">
              </div>
              <div
                class="w-full h-full shadow-xl shadow-neutral-800 p-3 bg-amber-50 opacity-100 rounded-md flex-col gap-2 flex justify-center">
                <span class="text-black font-bold text-xl italic" style="margin-top:-10px;">{{ $t('jinpaoqr.referencecode') }}</span>
                <p class="text-black" style="font-size: 18px;">12345678</p>
                <span class="text-black font-bold text-l italic" style="margin-top: 0px;">{{ $t('jinpaoqr.submitarequest') }} :</span>
                <p class="text-black">{{ storedDateTime }}</p>

              </div>
            </div>

            <div class="flex-none sm:flex justify-center items-center py-14">
              <div class="flex-auto sm:ml-5 justify-evenly">
                <div class="flex flex-row items-center">
                </div>
                <div class="flex pt-2  text-sm text-gray-400">

                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-1 " style="margin-top: 20px;">

            <div class="col-span-1 sm:col-span-5">
              <div class="   bg-gray-800 shadow-lg  rounded-2xl ">
                <h3 class="text-lg font-medium mb-1"
                  style=" font-size: 15px; border-top-right-radius: 11px;  border-top-left-radius: 11px;  background-color: #ff6f00;  padding: 0.2rem;">
                  {{ $t('jinpaoqr.map') }}</h3>

                <section>

                  <div class="max-w-7xl mx-auto py-1 px-1 sm:px-2 lg:py-1 lg:px-4 ">

                    <div class="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    </div>
                    <div>
                      <div class="rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8269.136445861473!2d100.65439887784667!3d13.557838203598855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d58fab34c7aa3%3A0x4c9451186318772f!2sJinpao%20Precision%20Industry%20Co.%2CLtd.!5e0!3m2!1sen!2sth!4v1714982633124!5m2!1sen!2sth"
                          width="450" height="250" style="border:0;" allowfullscreen="" loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"></iframe>
                      </div>

                    </div>
                  </div>
                </section>

              </div>
            </div>
            <div class="col-span-12 sm:col-span-7">

              <div class="p-4 relative  bg-gray-500 border border-gray-800 shadow-lg  rounded-2xl py-7">
                <span
                  class="absolute slide-in-top bg-gradient-to-r from-[#E8300F] to-[#E96208] text-white px-4 py-[4px] rounded-br-lg left-0 top-0 text-sm"
                  style=" border-top-left-radius: 11px;">{{ $t('jinpaoqr.appointmentsummary') }}</span>

                <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
                  <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ isCompanyChecked[1] ? $t('jinpaoqr.company') : 'Individual' }}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg class="w-20 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <div> {{ companyName[1] }}</div>
                    </li>
                  </ul>
                </div>

                <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
                  <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ $t('jinpaoqr.date') }}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg class="w-20 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ formattedDate }}</div>
                    </li>
                  </ul>
                </div>

                <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
                  <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ $t('jinpaoqr.time') }}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg class="w-20 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <div> {{ selectedStartTime }} - {{ selectedEndTime }} &nbsp; ({{ duration }})</div>
                    </li>
                  </ul>
                </div>

                <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
                  <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ $t('jinpaoqr.status') }}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg class="w-20 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ selectedItemstatus[1] }}</div>
                    </li>
                  </ul>
                </div>

                <div class=" lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
                  <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ $t('jinpaoqr.participants') }}</div>
                    </li>
                    <li class="flex flex-col items-center justify-between">
                      <svg class="w-20 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </li>
                    <li class="flex flex-col items-center justify-around">
                      <div>{{ counter }} {{ $t('jinpaoqr.person') }}</div>
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          </div>

          <section class="p-3 sm:p-5 justify-start" style="width: 120%; margin-left: -50px; ">
            <div class="mx-auto max-w-screen-xl px-1 ">
              <!-- Start coding here -->
              <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div
                  class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 justify-start">
                  <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                      <label for="voice-search" class="sr-only">Search</label>
                      <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                          </svg>
                        </div>
                        <input type="text" id="voice-search"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search" required @input="handleSearch" />
                        <button @click="clearSearch" type="button"
                          class="absolute inset-y-0 end-0 flex items-center pe-3">
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                        </button>
                      </div>

                    </form>
                  </div>
                  <div
                    class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div class="flex items-center space-x-3 w-full md:w-auto">

                      <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                        <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                        <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                          <li class="flex items-center">
                            <input id="apple" type="checkbox" value=""
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                            <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple
                              (56)</label>
                          </li>
                          <li class="flex items-center">
                            <input id="fitbit" type="checkbox" value=""
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                            <label for="fitbit"
                              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                          </li>
                          <li class="flex items-center">
                            <input id="razor" type="checkbox" value=""
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                            <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor
                              (49)</label>
                          </li>
                          <li class="flex items-center">
                            <input id="nikon" type="checkbox" value=""
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                            <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon
                              (12)</label>
                          </li>
                          <li class="flex items-center">
                            <input id="benq" type="checkbox" value=""
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                            <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ
                              (74)</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="bg-gray-800 text-gray-200">
                      <tr>
                        <th class="p-3 px-2" style="font-weight: bold; text-align: center;">{{ $t('jinpaoqr.namesurname') }}</th>
                        <th class="p-3 px-2" style="font-weight: bold; text-align: center;">{{ $t('jinpaoqr.email') }}</th>
                        <th class="p-3 px-2" style="font-weight: bold; text-align: center;">{{ $t('jinpaoqr.status') }}</th>
                        <th class="p-3 px-2" style="font-weight: bold; text-align: center;">{{ $t('jinpaoqr.viewmore') }}</th>
                      </tr>
                    </thead>
                    <tbody v-for="index in counter" :key="index">
                      <tr class="bg-gray-100" v-bind:id="'row' + index">
                        <td class="p-3">
                          <div class="flex align-items-center">
                            <img class="rounded-full h-8 w-8 object-cover" src="@/assets/images/img31.png"
                              alt="unsplash image">
                            <div class="ml-4 ">
                              <div class="text-gray-800  py-2">{{ firstName[index] }} {{ lastName[index] }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="p-3 text-gray-800 " style="text-align: center;">{{ emails[index] }}</td>
                        <td class="p-3 px-8" style="text-align: center;">
                          <span class="bg-green-400 text-gray-800 rounded-md px-6">{{ selectedItemstatus[index]}}</span>
                        </td>
                        <td class="p-3">
                          <a href="#" @click.prevent="toggleVisibility(index)"
                            class="text-gray-400 hover:text-gray-100 ml-2">
                            <i class="material-icons-round text-base"
                              style="display: flex; justify-content: center; align-items: center; margin-top: -20px;">
                              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-width="2"
                                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                            </i>
                          </a>
                        </td>
                      </tr>
                      <tr v-show="additionalInformationVisibility[index]">
                        <td colspan="1" style="font-weight: bold; text-align: center;">
                          <!-- Additional Information -->
                          {{ isIDChecked[index] ? $t('jinpaoqr.id') : $t('jinpaoqr.passport') }}
                        </td>
                        <td colspan="1" style="font-weight: bold; text-align: center;">
                          <!-- Additional Information -->
                          {{ $t('jinpaoqr.phonenumber') }}
                        </td>
                        <td colspan="1" style="font-weight: bold; text-align: center;">
                          <!-- Additional Information -->
                          {{ $t('jinpaoqr.country1') }}
                        </td>
                        <td colspan="1" style="font-weight: bold; text-align: center;">
                          <!-- Additional Information -->
                          {{ $t('jinpaoqr.age') }}
                        </td>
                      </tr>

                      <tr v-show="additionalInformationVisibility[index]">
                        <td colspan="1" class="px-3" style="text-align: center;">
                          <!-- Additional Information -->
                          🪪 :&nbsp;&nbsp;{{ IDName[index] || PassportName[index] }}
                        </td>
                        <td colspan="1" style="text-align: center;">
                          <!-- Additional Information -->
                          📱 &nbsp;&nbsp;{{ phoneNumbers[index] }}
                        </td>
                        <td colspan="1" style="text-align: center;">
                          <!-- Additional Information -->
                          🌐 &nbsp;&nbsp;{{ countries[index] }}
                        </td>
                        <td colspan="1" style="text-align: center;">
                          <!-- Additional Information -->
                          ⚥ &nbsp;&nbsp;{{ Age[index] }}
                        </td>
                      </tr>

                    </tbody>

                    <tbody v-if="showTable">
                      <template v-for="index in counter" :key="index">
                        <!-- ข้อมูลและรายละเอียดอื่น ๆ ของแต่ละรายการ -->
                      </template>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" style="text-align: center;">
                          Data not found!!!.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>


              <div class="overflow-x-auto px-4">

                <div
                  class="relative w-full max-w-6xl my-18 md:my-16 space-y-4 sm:space-x-6 px-4 py-8 border-2 border-dashed shadow-lg rounded-lg group hover:saturate-100 saturate-0 transition-[filter] relative w-full h-full bg-[#FAEDE4] font-['Robot_Flex'] border-b-2 border-b-[#F04E29]">
                  <h3
                    style=" padding: 0.3rem; border-top-right-radius: 11px; border-bottom-left-radius: 11px; background-color: #ff6f00; margin-top: -32px; ">
                    📝 {{ $t('agreement.agreement') }}</h3>
                  <div>
                    <h1 style="text-align: left; margin-left: 5%; text-transform: uppercase;">Jinpao Qr Code</h1>
                    <hr style="width: 100%; border-color: black; margin-top: 5px;"> <!-- เส้นไต้ -->
                  </div>
                  <h1 style="text-align: left; margin-left: 7.5%; text-transform: uppercase; font-weight: bold;">{{ $t('agreement.tip') }}
                  </h1>
                  <ul class="list-decimal text-lg px-8" style="margin-top: -3px;">
                    <li style="text-align: left;"> {{ $t('agreement.1') }}</li>
                    <li style="text-align: left;"> {{ $t('agreement.2') }}</li>
                    <li style="text-align: left;"> {{ $t('agreement.3') }}</li>
                    <li style="text-align: left;"> {{ $t('agreement.4') }}</li>
                    <li style="text-align: left;"> {{ $t('agreement.5') }}</li>

                  </ul>

                  <svg class="group-hover:opacity-100 opacity-0 transition-opacity absolute right-[10px] bottom-[10px]"
                    xmlns="http://www.w3.org/2000/svg" width="45" height="64" viewBox="0 0 45 64" fill="none">
                    <path
                      d="M5.67927 0.685928C5.66838 0.658706 5.65749 0.636925 5.65749 0.636925L3.81168 1.12696C5.55403 11.7281 0.588324 15.4905 0.375974 15.6484L1.49217 17.2056C1.69363 17.0641 5.49414 14.2654 6.03318 7.14353C9.0333 14.2545 13.0244 20.1731 17.1298 24.774C17.059 24.8774 16.9882 24.9754 16.9229 25.0789C14.3311 29.0645 14.0861 34.651 16.1933 41.6912C18.6271 49.8203 24.5239 57.748 32.3754 63.4434L33.5025 61.8916C25.9886 56.4358 20.3477 48.8729 18.0336 41.1358C16.1388 34.8089 16.2913 29.6526 18.4692 26.2114C21.7035 29.5927 24.9432 32.1518 27.7636 33.8288C33.8945 37.4659 38.2232 36.377 40.2541 35.4078C42.4919 34.3406 44.1254 32.375 44.414 30.4094C44.4575 30.1099 44.4793 29.805 44.4793 29.5001C44.4793 27.5509 43.5864 25.5853 41.9039 23.8756C38.4628 20.3691 32.713 18.7465 26.5276 19.5306C23.1518 19.9607 20.3695 21.2457 18.3603 23.2821C14.4455 18.8554 10.645 13.1655 7.77554 6.34314C9.95348 8.22706 13.2476 10.2199 18.1425 11.5266L18.638 9.67539C9.24565 7.16531 6.28364 1.94369 5.75005 0.838382C5.73371 0.783935 5.71193 0.729488 5.6956 0.669594L5.67382 0.669594L5.67927 0.685928ZM26.7672 21.4308C33.3555 20.5923 38.2014 22.8411 40.5372 25.215C42.0509 26.7559 42.7533 28.5037 42.5192 30.1317C42.3558 31.2425 41.3431 32.767 39.4319 33.6763C37.744 34.4822 34.1069 35.3642 28.7437 32.179C25.9886 30.5455 22.8197 28.03 19.6617 24.6923C21.7797 22.5035 24.6056 21.6976 26.7726 21.4254L26.7672 21.4308Z"
                      fill="#F04E29" />
                  </svg>
                </div>

              </div>

            </div>
          </section>
        </div>


        <center style="padding: 2%; margin-top: 20px; ">
          <div class=" bg-white rounded-lg overflow-hidden shadow-lg -orange-700 ring-opacity-40 max-w-sm" style=" width: 350px;  box-shadow: 15px 15px 30px rgb(167, 164, 164),
          -15px -15px 30px rgb(211, 208, 208); margin-left: 80px;">
            <h3 class="text-lg font-medium mb-1" style="background-color: #ff6f00;  padding: 0.5rem;">JINPAO QR CODE
            </h3>
            <div class="relative">
              <img class="w-72" src="@/assets/images/img29.png">
            </div>
            <div class="p-4">
              <h3 class="text-m font-medium mb-2 bg-green-400 text-gray-800 rounded-md px-6" style=" font-size: 16px; margin-top: 0px;">{{ $t('jinpaoqr.scantoreceive') }}</h3>
              <hr style="border: 1px solid #C9C5C5;">
              <div class="w-[3rem] h-[3rem] outline outline-2 outline-gray-200 rounded-full grid place-items-center"
                style="margin-top: 10px;">
                {{ countdown }}
              </div>
              <div class="flex items-center justify-between">
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>




    <!-- มือถือ -->
    <div class="md:hidden" style="width:  92%; margin-left: 3px; margin-top: 30px;">

      <div class="bg-gray-800 border border-gray-800 shadow-lg  rounded-2xl p-4 ">
        <div class="flex-none sm:flex justify-center items-center ">
          <div class="flex">
            <div class="w-1/2">
              <!-- คอลัมที่ 1 -->
              <div class="relative h-22 w-28 sm:mb-0 mb-3" style="margin-left: 20px;">
                <img src="@/assets/images/img30.png" alt="aji" class="w-32 h-32 object-cover rounded-2xl">
                <a href="#"
                  class="absolute -right-2 bottom-2 -ml-3 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                    </path>
                  </svg>
                </a>
              </div>
              <div class="flex-auto sm:ml-5 justify-evenly">
                <div class="flex items-center justify-between sm:mt-2">
                  <div class="flex items-center">
                    <div class="flex flex-col py-4">

                      <div class="flex-auto text-gray-400 my-1">
                        <div class="w-full flex-none text-lg text-gray-200 font-bold leading-none"
                          style="font-size: 12px;">
                          {{ $t('jinpaoqr.referencecode') }}</div>
                        <div class="w-full flex-none text-lg text-gray-200 font-bold leading-none"
                          style="font-size: 20px; margin-top: 5px;">18014066 </div>
                        <br>
                        <div class="w-full flex-none text-lg text-gray-200 font-bold leading-none"
                          style="font-size: 14px; margin-left: 10px">{{ $t('jinpaoqr.submitarequest') }} :</div>
                        <div class="w-full flex-none text-lg text-gray-200 font-bold leading-none"
                          style="font-size: 14px; margin-top: 5px; margin-left: 5px">{{ storedDateTime }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row items-center">
                </div>
              </div>
            </div>
            <div class="w-1/2  ">
              <center>
                <div class=" h-60 bg-white rounded-lg overflow-hidden shadow-lg -orange-700 ring-opacity-40 max-w-sm">
                  <h3 class="text-m font-medium mb-1"
                    style=" font-size: 12px; background-color: #ff6f00;  padding: 0.5rem;">JINPAO QR CODE</h3>
                  <div class="relative">
                    <img class="w-28" src="@/assets/images/img29.png">
                  </div>
                  <div class="p-4">
                    <h3 class="text-m font-medium mb-2" style="font-size: 10px; margin-top: -15px;">{{ $t('jinpaoqr.scantoreceive') }}</h3>
                    <hr style="border: 1px solid #C9C5C5;">
                    <div
                      class="w-[2rem] h-[2rem] outline outline-2 outline-gray-200 rounded-full grid place-items-center"
                      style="margin-top: 5px; font-size: 12px; ">
                      {{ countdown }}
                    </div>
                    <div class="flex items-center justify-between">
                    </div>
                  </div>
                </div>
              </center>

            </div>
          </div>
          <div class="flex-auto sm:ml-5 justify-evenly">
            <div class="flex pt-2  text-sm text-gray-400">
              <div class="flex-1 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z">
                  </path>
                </svg>
                <p class="">1.2k Followers</p>
              </div>
              <div class="flex-1 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"></path>
                </svg>
                <p class="">14 Components</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- มือถือ -->


    
    <!-- ตาราง -->



    <div class="hidden md:block" style="  margin-top: 50px;">

    </div>
    <!-- มือถือ -->
    <div class="md:hidden" style="width:  92%; margin-left: 3px;">
      <div class="   bg-gray-800 shadow-lg  rounded-2xl " style="margin-top: 10px;">
        <h3 class="text-lg font-medium mb-1"
          style=" font-size: 15px; border-top-right-radius: 11px;  border-top-left-radius: 11px;  background-color: #ff6f00;  padding: 0.2rem;">
          {{ $t('jinpaoqr.map') }}</h3>

        <section>

          <div class="max-w-7xl mx-auto py-1 px-1 sm:px-2 lg:py-1 lg:px-4 ">

            <div class="max-w-2xl lg:max-w-4xl mx-auto text-center">
            </div>
            <div>
              <div class="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8269.136445861473!2d100.65439887784667!3d13.557838203598855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d58fab34c7aa3%3A0x4c9451186318772f!2sJinpao%20Precision%20Industry%20Co.%2CLtd.!5e0!3m2!1sen!2sth!4v1714982633124!5m2!1sen!2sth"
                  width="450" height="250" style="border:0;" allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>

            </div>
          </div>
        </section>

      </div>

      <div class="col-span-12 sm:col-span-7 py-6">

        <div class="p-4 relative  bg-gray-500 border border-gray-800 shadow-lg  rounded-2xl py-7">
          <span
            class="absolute slide-in-top bg-gradient-to-r from-[#E8300F] to-[#E96208] text-white px-24 py-[4px] rounded-br-lg left-0 top-0 text-sm"
            style=" border-top-left-radius: 11px;">{{ $t('jinpaoqr.appointmentsummary') }}</span>

          <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
            <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <div> {{ isCompanyChecked[1] ? $t('jinpaoqr.company') : 'Individual' }}</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg class="w-36 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </li>
              <li class="flex flex-col items-center justify-around">
                <div>{{ companyName[1] }}</div>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
            <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <div>{{ $t('jinpaoqr.date') }}</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg class="w-36 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </li>
              <li class="flex flex-col items-center justify-around">
                <div>{{ formattedDate }}</div>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
            <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <div>{{ $t('jinpaoqr.time') }}</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg class="w-36 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </li>
              <li class="flex flex-col items-center justify-around">
                <div>{{ selectedStartTime }} - {{ selectedEndTime }} &nbsp; ({{ duration }})</div>
              </li>
            </ul>
          </div>

          <div class="lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
            <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <div>{{ $t('jinpaoqr.status') }}</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg class="w-36 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </li>
              <li class="flex flex-col items-center justify-around">
                <div>{{ selectedItemstatus[1] }}</div>
              </li>
            </ul>
          </div>

          <div class=" lg:mx-auto xl:mx-auto mt-1 bg-white  rounded-lg text-gray-900">
            <ul class="py-2 mt-2 text-gray-700 flex items-center justify-around">
              <li class="flex flex-col items-center justify-around">
                <div>{{ $t('jinpaoqr.participants') }}</div>
              </li>
              <li class="flex flex-col items-center justify-between">
                <svg class="w-36 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </li>
              <li class="flex flex-col items-center justify-around">
                <div>{{ counter }} {{ $t('jinpaoqr.person') }}</div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div class="py-2" v-for="index in counter" :key="index">
        <div class="mx-2 my-0 rounded-l border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-2 ">
          <div class="mb-2 flex flex-col gap-y-6 border-b py-2 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center">
              <img class="h-6 w-6 rounded-full object-cover" src="@/assets/images/img27.png" />
              <div class="ml-8">
                <p class="text-slate-800 text-sm  font-serif ... "> 👤&nbsp; {{ firstName[index] }} {{ lastName[index]
                  }}
                </p>
                <p class="text-slate-500 text-xs "> 🪪 &nbsp;{{ isIDChecked[index] ? $t('jinpaoqr.id') : $t('jinpaoqr.passport') }} : {{ IDName[index] || PassportName[index] }}</p>
                <p class="text-slate-500 text-xs ">📧 &nbsp;{{ $t('jinpaoqr.email') }} : {{ emails[index] }}</p>

              </div>
            </div>
            <div class="text-lg text-center font-semibold  flex justify-end items-center" style="margin-top: -50px; ">
              <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="22">
                <g clip-path="url(#clip0_5880_37773)">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z"
                    fill="#222222"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z"
                    fill="#F7F7F7"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z"
                    fill="#222222"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z"
                    fill="#F7F7F7"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z"
                    fill="#222222"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z"
                    fill="#F7F7F7"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z"
                    fill="#222222"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z"
                    fill="#F7F7F7"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z"
                    fill="#222222"></path>
                </g>
                <defs>
                  <clipPath id="clip0_5880_37773">
                    <rect width="18.8235" height="32" fill="white" transform="translate(0.453125 0.000488281)"></rect>
                  </clipPath>
                </defs>
              </svg>
              <div style="font-size: 14px;">{{ index }}</div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" fill="none" height="22">
                  <g clip-path="url(#clip0_5880_37786)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z"
                      fill="#222222"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z"
                      fill="#F7F7F7"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z"
                      fill="#222222"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z"
                      fill="#F7F7F7"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z"
                      fill="#222222"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z"
                      fill="#F7F7F7"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z"
                      fill="#222222"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z"
                      fill="#F7F7F7"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z"
                      fill="#222222"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_5880_37786">
                      <rect width="20" height="32" fill="white" transform="matrix(-1 0 0 1 19.1016 0.000488281)">
                      </rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div class="mb-2 flex justify-between border-b  text-sm sm:text-base">
            <div class="flex flex-col items-center">
              <p class="text-slate-700  text-sm ">{{ phoneNumbers[index] }}</p>
              <p class="text-slate-500 text-xs font-serif ... ">{{ $t('jinpaoqr.phonenumber') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700  text-sm font-serif ... ">{{ countries[index] }}</p>
              <p class="text-slate-500 text-xs font-serif ... ">{{ $t('jinpaoqr.country1') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700  text-sm font-serif ... ">{{ Age[index] }}</p>
              <p class="text-slate-500 text-xs font-serif ... ">{{ $t('jinpaoqr.age') }}</p>
            </div>
          </div>

        </div>
      </div>

      <div class="overflow-x-auto px-4">

        <div
          class="relative w-full max-w-6xl my-18 md:my-16 space-y-4 sm:space-x-6 px-4 py-8 border-2 border-dashed shadow-lg rounded-lg group hover:saturate-100 saturate-0 transition-[filter] relative w-full h-full bg-[#FAEDE4] font-['Robot_Flex'] border-b-2 border-b-[#F04E29]">
          <h3
            style=" padding: 0.3rem; border-top-right-radius: 11px; border-bottom-left-radius: 11px; background-color: #ff6f00; margin-top: -32px; ">
            📝 Agreement</h3>
          <div>
            <h1 style="text-align: left; margin-left: 5%; text-transform: uppercase;">Jinpao Qr Code</h1>
            <hr style="width: 100%; border-color: black; margin-top: 5px;"> <!-- เส้นไต้ -->
          </div>
          <h1 style="text-align: left; margin-left: 7.5%; text-transform: uppercase; font-weight: bold;">Tip</h1>
          <ul class="list-decimal text-lg px-8" style="margin-top: -3px;">
            <li style="text-align: left;"> Access the Mobile App.</li>
            <li style="text-align: left;"> Select the Scan menu.</li>
            <li style="text-align: left;"> Scan the QR Code.</li>
            <li style="text-align: left;"> Scan within 5 minutes and do not close the QR page until the process is
              finished.
            </li>
            <li style="text-align: left;"> Receive the appointment ticket document.</li>

          </ul>

          <svg class="group-hover:opacity-100 opacity-0 transition-opacity absolute right-[10px] bottom-[10px]"
            xmlns="http://www.w3.org/2000/svg" width="45" height="64" viewBox="0 0 45 64" fill="none">
            <path
              d="M5.67927 0.685928C5.66838 0.658706 5.65749 0.636925 5.65749 0.636925L3.81168 1.12696C5.55403 11.7281 0.588324 15.4905 0.375974 15.6484L1.49217 17.2056C1.69363 17.0641 5.49414 14.2654 6.03318 7.14353C9.0333 14.2545 13.0244 20.1731 17.1298 24.774C17.059 24.8774 16.9882 24.9754 16.9229 25.0789C14.3311 29.0645 14.0861 34.651 16.1933 41.6912C18.6271 49.8203 24.5239 57.748 32.3754 63.4434L33.5025 61.8916C25.9886 56.4358 20.3477 48.8729 18.0336 41.1358C16.1388 34.8089 16.2913 29.6526 18.4692 26.2114C21.7035 29.5927 24.9432 32.1518 27.7636 33.8288C33.8945 37.4659 38.2232 36.377 40.2541 35.4078C42.4919 34.3406 44.1254 32.375 44.414 30.4094C44.4575 30.1099 44.4793 29.805 44.4793 29.5001C44.4793 27.5509 43.5864 25.5853 41.9039 23.8756C38.4628 20.3691 32.713 18.7465 26.5276 19.5306C23.1518 19.9607 20.3695 21.2457 18.3603 23.2821C14.4455 18.8554 10.645 13.1655 7.77554 6.34314C9.95348 8.22706 13.2476 10.2199 18.1425 11.5266L18.638 9.67539C9.24565 7.16531 6.28364 1.94369 5.75005 0.838382C5.73371 0.783935 5.71193 0.729488 5.6956 0.669594L5.67382 0.669594L5.67927 0.685928ZM26.7672 21.4308C33.3555 20.5923 38.2014 22.8411 40.5372 25.215C42.0509 26.7559 42.7533 28.5037 42.5192 30.1317C42.3558 31.2425 41.3431 32.767 39.4319 33.6763C37.744 34.4822 34.1069 35.3642 28.7437 32.179C25.9886 30.5455 22.8197 28.03 19.6617 24.6923C21.7797 22.5035 24.6056 21.6976 26.7726 21.4254L26.7672 21.4308Z"
              fill="#F04E29" />
          </svg>
        </div>

      </div>
    </div>
    <!-- มือถือ -->

  </div>


  <!-- หาง1 -->




  <div v-if="showModalTimeout"
    class="fixed inset-0 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center"
    style="margin-left: -30px;">
    <!-- overlay -->
    <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>
    <div class="relative w-full cursor-pointer pointer-events-none transition my-auto">
      <div class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-sm">
        <div class="space-y-2 p-2 ">
          <h3 style="margin-left: -8px; background-color: #D50101; padding: 0.7rem; margin-top: -17px; width: 104.5%;">
            <svg-icon type="mdi" :path="path8" class="h-6 w-6"
              style="display: inline-block; vertical-align: middle; margin-top:-2px;"></svg-icon> Transaction time
            expired
          </h3>
          <div class="p-4 space-y-2 text-center dark:text-white">
            <p class="text-gray-700">You didn't complete the transaction within the specified time. Please make a new
              transaction again.</p>
          </div>
        </div>
        <div class="space-y-2">
          <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
          <div class="px-6 py-2">
            <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <button @click="navigateToHomepage" type="submit"
                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">
                <span class="flex items-center gap-1">
                  <span class="">Make a new item</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div>

    <hr style=" margin-top: 200px; border: 1.5px solid #CD5A00" />

  </div>

  
</template>


