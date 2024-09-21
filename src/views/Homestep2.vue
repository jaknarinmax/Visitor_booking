<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCalendarMonthOutline, mdiChevronLeft, mdiChevronRight, mdiClockOutline, mdiClockTimeNineOutline, mdiClockTimeTwoOutline } from '@mdi/js';
import axios from 'axios';
import ModalSelectTimeAlert from '../components/Showmodals/showSelectTimeAlert.vue';

export default {
  components: {
    SvgIcon,
    ModalSelectTimeAlert
  },
  data() {
    return {
      selectedItem: null,
      showStartTimeDropdown: false,
      showEndTimeDropdown: false,
      visitdate: null,
      starttime: '',
      endtime: '',
      purposeofvisit: '',
      path: mdiChevronLeft,
      path1: mdiChevronRight,
      path2: mdiClockOutline,
      path3: mdiCalendarMonthOutline,
      path4: mdiClockTimeNineOutline,
      path5: mdiClockTimeTwoOutline,
      numberOfPeople: 0,
      showModalselecttime: false,
      showSelectTimeAlert: false,
      filteredTimes: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
      filteredEndTimes: [],
      bookedTimes: [],
      selectedDate: '',
      items: [],
      selectedItems: [],
      showchangesales: false,
      userId: sessionStorage.getItem('userId') || '',
      visitDate: new Date(),
      userData: null,
      groupedUsers: {},
      departments: [],
    };
  },
  computed: {
    formattedDate() {
      if (this.visitDate) {
        const date = new Date(this.visitDate);
        const day = ('0' + date.getDate()).slice(-2);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${day} -${monthNames[monthIndex]}-${year}`;
      }
      return null;
    },
    formattedPreviousDate() {
      if (this.visitDate) {
        const previousDate = new Date(this.visitDate);
        previousDate.setDate(previousDate.getDate() - 1);
        const day = ('0' + previousDate.getDate()).slice(-2);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = previousDate.getMonth();
        const year = previousDate.getFullYear();
        return `${day}/${monthNames[monthIndex]}/${year}`;
      }
      return null;
    },
    formattedNextDate() {
      if (this.visitDate) {
        const nextDate = new Date(this.visitDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const day = ('0' + nextDate.getDate()).slice(-2);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndex = nextDate.getMonth();
        const year = nextDate.getFullYear();
        return `${day}/${monthNames[monthIndex]}/${year}`;
      }
      return null;
    },
    previousDay() {
      return this.visitDate ? this.getDayOfWeek(new Date(this.visitDate).getDay() - 1) : null;
    },
    currentDay() {
      return this.visitDate ? this.getDayOfWeek(new Date(this.visitDate).getDay()) : null;
    },
    nextDay() {
      return this.visitDate ? this.getDayOfWeek(new Date(this.visitDate).getDay() + 1) : null;
    },
    filteredItems() {
      if (!this.searchTerm) {
        return this.items;
      }
      return this.items.filter(item =>
        item.text.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    const savedDate = sessionStorage.getItem('visitDate');
    if (savedDate) {
      this.visitDate = new Date(savedDate);
    }

    const savedStartTime = sessionStorage.getItem('starttime');
    if (savedStartTime) {
      this.starttime = savedStartTime;
    }

    const savedEndTime = sessionStorage.getItem('endtime');
    if (savedEndTime) {
      this.endtime = savedEndTime;
    }

    this.userId = sessionStorage.getItem('userId') || '';

    if (this.userId) {
      this.fetchUserData(this.userId);
    }

    this.clearSelectedTimesDisplay();
    this.fetchSalesData();
    this.fetchAndGroupUsers();
  },
  created() {
    this.visitDate = sessionStorage.getItem('visitdate') ? new Date(sessionStorage.getItem('visitdate')) : null;
    this.numberOfPeople = sessionStorage.getItem('numberofpeople');

    this.fetchBookings().then(() => {
      this.selectedDate = sessionStorage.getItem('visitdate') || '';
      this.updateBookedTimes();
    });
  },
  methods: {
    async fetchBookings() {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in session storage');
        }

        const bookingUrl = `http://LOCALHOST:9992/booking/viewbooking/${userId}`;
        const ticketUrl = `http://LOCALHOST:9992/ticketsuccess/user/${userId}`;

        const [bookingResponse, ticketResponse] = await Promise.allSettled([
          axios.get(bookingUrl),
          axios.get(ticketUrl)
        ]);

        let bookings = [];
        let tickets = [];

        if (bookingResponse.status === 'fulfilled') {
          bookings = bookingResponse.value.data.bookings.map(booking => ({
            starttime: booking.starttime,
            endtime: booking.endtime,
            date: booking.visitdate
          }));
        } else {
          console.error('Error fetching bookings:', bookingResponse.reason);
        }

        if (ticketResponse.status === 'fulfilled') {
          tickets = ticketResponse.value.data.map(ticket => ({
            starttime: ticket.starttime,
            endtime: ticket.endtime,
            date: ticket.visitdate
          }));
        } else {
          console.error('Error fetching tickets:', ticketResponse.reason);
        }

        this.bookedTimes = [...bookings, ...tickets];
        this.updateBookedTimes();
      } catch (error) {
        console.error('Error fetching bookings and tickets:', error);
      }
    },
    updateBookedTimes() {
      this.selectedDate = sessionStorage.getItem('visitdate');
      this.bookedTimes = this.bookedTimes.filter(booking => booking.date.startsWith(this.selectedDate));
    },
    isTimeOverlappingBookedRanges(startTime, endTime) {
      return this.bookedTimes.some(booking => {
        return (startTime < booking.endtime && endTime > booking.starttime);
      });
    },
    toggleStartTimeDropdown() {
      this.showStartTimeDropdown = !this.showStartTimeDropdown;
    },
    toggleEndTimeDropdown() {
      this.showEndTimeDropdown = !this.showEndTimeDropdown;
    },
    saveUserIdToSession() {
      sessionStorage.setItem('userId', this.userId);
    },
    async fetchUserData(userId) {
      try {
        const response = await axios.get(`http://LOCALHOST:9992/salesapprovejp/all/${userId}`);
        if (response.data) {
          this.userData = response.data;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        this.userData = null;
      }
    },

    async fetchSalesData() {
      try {
        const response = await axios.get('http://LOCALHOST:9992/salesapprovejp/all');
        this.items = response.data.map(item => ({
          text: `${item.firstname} ${item.lastname}`,
          href: '#',
          email: item.email,
          gender: item.gender,
          country: item.country,
          jobTitle: item.position,
          department: item.department,
          _id: item._id
        }));
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    },
    goToPreviousPage() {
      this.$router.push({ path: '/' });
    },
    skipStep() {
      this.$router.push({ path: '/nextPageAfterSkipping' });
    },
    goToPreviousDate() {
      if (this.visitDate) {
        const previousDate = new Date(this.visitDate);
        previousDate.setDate(previousDate.getDate() - 1);
        this.visitDate = previousDate;
        this.saveDateToLocalStorage();
        this.fetchBookings();
      }
    },
    goToNextDate() {
      if (this.visitDate) {
        const nextDate = new Date(this.visitDate);
        nextDate.setDate(nextDate.getDate() + 1);
        this.visitDate = nextDate;
        this.saveDateToLocalStorage();
        this.fetchBookings();
      }
    },
    saveDateToLocalStorage() {
      sessionStorage.setItem('visitdate', this.visitDate.toISOString());
    },
    getDayOfWeek(dayIndex) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[(dayIndex + 7) % 7];
    },
    selectStartTime(time) {
      if (!this.isTimeInBookedRange(time)) {
        this.starttime = this.blurTime(time);
        this.showStartTimeDropdown = false;
        sessionStorage.setItem('starttime', this.starttime);
        this.updateFilteredEndTimes();
        this.calculateDuration();
      }
    },
    selectEndTime(time) {
      if (!this.isTimeInBookedRange(time) && !this.isTimeOverlappingBookedRanges(this.starttime, time)) {
        this.endtime = this.blurTime(time);
        this.showEndTimeDropdown = false;
        sessionStorage.setItem('endtime', this.endtime);
        this.calculateDuration();
      }
    },
    blurTime(time) {
      return time; // Simply return the time as is, without any rounding
    },
    isTimeInBookedRange(time) {
      return this.bookedTimes.some(booking => {
        const startTime = booking.starttime;
        const endTime = booking.endtime;
        return time >= startTime && time <= endTime;
      });
    },
    isTimeAvailable(time) {
      return !this.isTimeInBookedRange(time) && !this.isTimeOverlappingBookedRanges(this.starttime, time);
    },
    updateFilteredEndTimes() {
      if (!this.starttime) return;
      const startTimeIndex = this.filteredTimes.indexOf(this.starttime);
      if (startTimeIndex !== -1) {
        this.filteredEndTimes = this.filteredTimes.slice(startTimeIndex + 1)
          .filter(time => this.isTimeAvailable(time));
      }
    },
    calculateDuration() {
      if (!this.starttime || !this.endtime) return '';
      const [startHour, startMinute] = this.starttime.split(':').map(Number);
      const [endHour, endMinute] = this.endtime.split(':').map(Number);
      const start = new Date(0, 0, 0, startHour, startMinute);
      const end = new Date(0, 0, 0, endHour, endMinute);
      let diff = (end.getTime() - start.getTime()) / 1000;
      diff /= (60 * 60);
      const duration = parseInt(diff) + ' hrs.';
      sessionStorage.setItem('duration', duration);
      return duration;
    },
    toggleModalSelecttime() {
      this.showModalselecttime = !this.showModalselecttime;
    },
    closeModalselecttime() {
      this.showModalselecttime = false;
    },
    clearSelectedTimesDisplay() {
      this.starttime = null;
      this.endtime = null;
    },
    handleConfirm() {
      if (!this.starttime || !this.endtime || !this.purposeofvisit.trim()) {
        this.showSelectTimeAlert = true;
      } else {
        this.toggleModalSelecttime();
        this.showSelectTimeAlert = false;
      }
    },
    goToNextPage() {
      if (!this.starttime || !this.endtime || !this.purposeofvisit.trim()) {
        this.showSelectTimeAlert = true;
        return;
      }
      this.$router.push({ path: '/homestep3' });
    },
    closeSelectTimeAlert() {
      this.showSelectTimeAlert = false;
    },
    toggleChangesales() {
      this.showchangesales = !this.showchangesales;
    },
    
    selectItem(user) {
    if (user && user._id) {
      this.selectedItem = user;
      this.userId = user._id;
      sessionStorage.setItem('userId', this.userId);
      this.showchangesales = false;
      this.fetchUserData(this.userId);
    } else {
      console.error('Invalid user object:', user);
    }
    },

    updateTimesForNewUser() {
      this.fetchBookings().then(() => {
        this.clearSelectedTimesDisplay();
        this.starttime = sessionStorage.getItem('starttime') || '';
        this.endtime = sessionStorage.getItem('endtime') || '';
        this.updateFilteredEndTimes();
      });
    },

    async fetchAndGroupUsers() {
      try {
        const response = await axios.get('http://LOCALHOST:9992/salesapprovejp/all');
        const users = response.data;
        
        this.groupedUsers = users.reduce((acc, user) => {
          if (!acc[user.department]) {
            acc[user.department] = { head: [], users: [] };
          }
          
          if (user.userType !== 'admin') {
            if (user.userType === 'Head of Department') {
              acc[user.department].head.push(user);
            } else {
              acc[user.department].users.push(user);
            }
          }
          
          return acc;
        }, {});
        
        this.departments = Object.keys(this.groupedUsers);
      } catch (error) {
        console.error('Error fetching and grouping users:', error);
      }
    },
    
    getFirstLetter(department) {
      return department.charAt(0).toUpperCase();
    },
    
    closeshowchangesales() {
      this.showchangesales = false;
    },

  },
  watch: {
    purposeofvisit(purposeofvisit) {
      sessionStorage.setItem('purposeofvisit', purposeofvisit);
    },
    visitdate(newDate) {
      sessionStorage.setItem('visitdate', newDate);
      this.updateBookedTimes();
      this.fetchBookings();
    },
    userId(newUserId, oldUserId) {
      if (newUserId !== oldUserId) {
        this.updateTimesForNewUser();
      }
    }
  }
};
</script>



<template>
  <section class="pt-10 sm:pt-14">
    <div style=" border: 2px solid rgba(128, 128, 128, 0.5); padding: 30px; margin: 10 auto; margin-top: -40px; background-color: rgba(173, 216, 230, 0.3); border-radius: 10px; ">
      <div style="margin-top: -30px;">
        <div style="display: flex; align-items: center ">
          <img src="@/assets/images/img10.png" alt="search image" style="width: 60px; height: auto; margin-left: 10px; margin-top: 5px; ">
          <div style="display: flex; flex-direction: column">
            <h2 style="margin: 20px; font-size: 28px; margin-left: 20px; margin-top: 30px; font-weight: bold; color: #e64a19;">
              Visitor booking</h2>
          </div>
        </div>

        <div class="card-container">
          <!-- การ์ด 1 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">

              <div v-if="userData" class="flex items-center -mt-+4">
                <img src="@/assets/images/img7.png" alt="search image" style="width: 60px; height: auto; margin-left: 0px; margin-top: 5px; ">
                <h2 style="margin: 0; font-size: 16px; margin-left: 30px; font-weight: bold; border: 1.5px solid grey; padding: 0 15px; margin: 0;border-radius: 5px;">
                  {{ userData.firstname }} {{ userData.lastname }}</h2>
              </div>
            </div>
          </div>

          <!-- การ์ด 2 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">

              <div class="flex items-center -mt-+4">

                <img src="@/assets/images/img8.png" alt="search image" style="width: 60px; height: auto; margin-left: 0px; margin-top: 5px; ">
                <h2 style="margin: 0; font-size: 18px; margin-left: 40px; font-weight: bold; border: 1.5px solid grey; padding: 0 30px; margin: 0;border-radius: 5px;">
                  {{ formattedDate }}</h2>
              </div>
            </div>
          </div>

          <!-- การ์ด 3 -->
          <div class="relative max-w-sm w-80 h-24 mx-auto">
            <span class="absolute top-0 left-0 w-full h-full mt-2 ml-2 bg-orange-700 rounded-lg"></span>
            <div class="relative h-full p-4 bg-white border-2 border-orange-700 rounded-lg">
              <div class="flex items-center -mt-+4">

                <img src="@/assets/images/img9.png" alt="search image" style="width: 60px; height: auto; margin-left: 0px; margin-top: 5px;">
                <h2 id="counterValue" style="margin: 0; font-size: 18px; margin-left: 60px; font-weight: bold; border: 1.5px solid grey; padding: 0 50px; margin: 0;border-radius: 5px;">
                  {{ numberOfPeople }}
                </h2>
              </div>
            </div>
          </div>

          <!-- การ์ด 4 -->
          <div class="relative max-w-sm w-80 h-24  mx-auto " style="margin-top: -15px;">       
              <span class="absolute  left-0 w-60 h-20  top-6   mt-1 ml-2 bg-orange-700 rounded-lg"></span>
              <div class="relative  h-20  p-1 w-60   top-5  bg-white border-2 border-orange-700 rounded-lg">
                <div class="flex items-center -mt-+4">
                  <img src="@/assets/images/img2.png" alt="search image" style="width: 60px; height: auto; margin-left: 30px; margin-top: 5px; ">
                  <h3 class="my-4 ml-1 text-lg font-bold text-gray-800 text-3xl">
                    {{ $t('home2.results') }}
                  </h3>
                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>

    <!--  stepdata -->

    <div class="p-4">
      <div>
        <hr style="margin-top: 10px; border: 1.5px solid #CD5A00" />
      </div>
      <div class="mx-4 p-4">
        <div class="flex items-center">
          <div class="flex items-center text-teal-600 relative">
            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 relative">
              <img src="@/assets/images/img11.png" alt="search image" class="w-7 ml-2 -mt-1.5">
              <img src="@/assets/images/img38.png" alt="overlay image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-12 object-cover">
            </div>
            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{
                $t('stepdata.searchforsale') }}<br>{{ $t('stepdata.searchforsale1') }}</div>
          </div>

          <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
          <div class="flex items-center text-white relative">
            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
              <img src="@/assets/images/img12.png" alt="search image" style="width: 30px; margin-left: 9px; height: auto; margin-top: -5px; ">
            </div>
            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{
                $t('stepdata.searchappointment') }}<br>{{ $t('stepdata.searchappointment1') }}</div>
          </div>
          <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div class="flex items-center text-gray-500 relative">

            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
              <img src="@/assets/images/img13.png" alt="search image" style="width: 40px; margin-left: 4px; height: auto; margin-top: -12px; ">
            </div>

            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">{{
                $t('stepdata.informationvisitors') }}<br> {{ $t('stepdata.informationvisitors1') }}</div>
          </div>
          <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
              <img src="@/assets/images/img14.png" alt="search image" style="width: 35px; margin-left: 5px; height: auto; margin-top: -7px; ">
            </div>
            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">{{
                $t('stepdata.confirmation') }}</div>
          </div>
        </div>
      </div>
      <!--  stepdata -->

      <div>
        <hr style="margin-top: 60px; border: 1.5px solid #CD5A00" />
      </div>


      <div class="hidden md:block">
        <h2 class="text-xl font-bold text-center text-blue-700 mt-4">{{ $t('home2.Selectdateand') }}</h2>
        
        <div class="flex justify-center items-center my-6">
            <div class="flex items-center space-x-24">
                <!-- Left Button -->
                <button @click.prevent="goToPreviousDate" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                    <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span class="relative p-2 transition-all ease-out bg-gray-300 rounded-full group-hover:bg-opacity-0 duration-400">
                        <svg-icon type="mdi" :path="path" class="h-6 w-6"></svg-icon>
                    </span>
                </button>
                
                <div class="flex space-x-16">
                    <!-- Previous Date Card -->
                    <div class="relative flex flex-col items-center px-16 border-2 border-dashed border-gray-400 rounded-lg shadow-md">
                        <span class="absolute top-0 left-0 text-xs font-medium bg-primary-100 px-2 py-1 rounded-br-lg rounded-tl-lg border-gray-400 border-b-2 border-r-2 border-dashed">
                            {{ previousDay }}
                        </span>
                        <h2 class="mt-8 font-bold text-gray-500" style="font-size: 20px;">{{ formattedPreviousDate }}</h2>
                    </div>
                    
                    <div class="relative flex flex-col items-center px-20 border-4 border-dashed border-black rounded-lg shadow-md bg-blue-400">
                        <span class="absolute top-0 left-0 text-xs font-medium bg-primary-100 px-2 py-1 rounded-br-lg rounded-tl-lg border-black border-b-4 border-r-4 border-dashed">
                            {{ currentDay }}
                        </span>
                        <h2 class="mt-8 text-sm font-bold" style="font-size: 20px;">{{ formattedDate }}</h2>
                    </div>
                    
                    <div class="relative flex flex-col items-center px-16 border-2 border-dashed border-gray-400 rounded-lg shadow-md">
                        <span class="absolute top-0 left-0 text-xs font-medium bg-primary-100 px-2 py-1 rounded-br-lg rounded-tl-lg border-gray-400 border-b-2 border-r-2 border-dashed">
                            {{ nextDay }}
                        </span>
                        <h2 class="mt-8 text-sm font-bold text-gray-500" style="font-size: 20px;">{{ formattedNextDate }}</h2>
                    </div>
                </div>
                
                <div>
                    <a @click.prevent="goToNextDate" href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
                        <span class="w-full h-full bg-gradient-to-br from-[#33FF99] via-[#00CCFF] to-[#0066FF] group-hover:from-[#00FFFF] group-hover:via-[#0099CC] group-hover:to-[#0033FF] absolute"></span>
                        <span class="relative px-1 py-1 transition-all ease-out bg-gray-300 rounded-full group-hover:bg-opacity-0 duration-400">
                            <svg-icon type="mdi" :path="path1" class="h-8 w-8"></svg-icon>
                        </span>
                    </a>
                </div>
            </div>
        </div>
      
        <!-- Button to open time picker modal -->
        <div id="dropdownTimepickerButton" @click.prevent="toggleModalSelecttime" style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <button class="cursor-pointer uppercase font-mono bg-blue-500 text-white font-bold py-2 px-4 rounded border-2 border-black shadow-[0.25rem_0.25rem_#121212] transition-[transform_50ms, box-shadow_50ms] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0.125rem_0.125rem_#121212] flex items-center" style="border: 3px dashed #000;">
            {{ $t('home2.selecttime') }}
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
        </div>

        <!-- Time picker modal -->
        <div v-if="showModalselecttime" id="dropdownTimepicker" class="z-10 bg-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 p-3 " style="margin-top: 20px; max-width: 40rem;">
          <h2 style="margin-top: 10px; font-weight: bold; font-size: 20px;">{{ $t('home2.estimatearrivaltime') }}</h2>
          <div class="max-w-[20rem] mx-auto grid grid-cols-2 gap-8 mb-2 py-4">
            <div>
              <!-- Start Time Selection -->
              <span class="text-3xl font-semibold" style=" margin-left: -50px; font-size: 20px; margin-top: -10px; color: red;"> ** </span>
              <span class="mr-1">{{ $t('home2.starttime') }}</span>
              <button @click="toggleStartTimeDropdown" class="inline-flex justify-center w-full px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span class="mr-1">{{ starttime || 'start time' }}</span>
                <svg class="h-4 w-4 text-slate-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div v-if="showStartTimeDropdown" class="mt-2 bg-white border rounded shadow">
                <ul>
                  <li v-for="time in filteredTimes" :key="time" @click="selectStartTime(time)" :class="{ 'cursor-pointer': !isTimeInBookedRange(time), 'text-gray-400 bg-gray-200': isTimeInBookedRange(time) }" class="px-4 py-2 hover:bg-gray-200">
                    {{ time }}
                  </li>
                </ul>
              </div>
            </div>
            <div>

              <!-- End Time Selection -->
              <span class="text-3xl font-semibold" style=" margin-left: -50px; font-size: 20px; margin-top: -10px; color: red;"> ** </span>
              <span class="mr-1">{{ $t('home2.endtime') }}</span>
              <button @click="toggleEndTimeDropdown" class="inline-flex justify-center w-full px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span class="mr-1">{{ endtime || 'end time' }}</span>
                <svg class="h-4 w-4 text-slate-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div v-if="showEndTimeDropdown" class="mt-2 bg-white border rounded shadow">
                <ul>
                  <li v-for="time in filteredEndTimes" :key="time" @click="selectEndTime(time)" :class="{ 'cursor-pointer': !isTimeInBookedRange(time), 'text-gray-400 bg-gray-200': isTimeInBookedRange(time) }" class="px-4 py-2 hover:bg-gray-200">
                    {{ time }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-span-2" style="margin-top: -25px;">
              ( <svg-icon type="mdi" :path="path2" class="h-4 w-6" style="display: inline-block; vertical-align: middle;"></svg-icon>
              <span style="margin: 5px; font-size: 14px; vertical-align: middle;">{{ calculateDuration() }}</span>)
            </div>
          </div>

          <div class="max-w-lg lg:ms-auto mx-auto text-center">

            <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
              <span class="text-3xl font-semibold" style=" margin-left: -120px; font-size: 20px; margin-top: -10px; color: red;"> ** </span>
              <span class="mr-1" style="margin-left: -450px;">{{ $t('home2.purposevisit') }}</span>

              <div class="md:col-span-2" style="margin-top: -20px;">
                <textarea v-model="purposeofvisit" name="purposeofvisit" rows="3" placeholder="Purpose of visit *" class="bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" style="width: 90%; height: 100px;"></textarea>
              </div>
              <div class="md:col-span-2"></div>
            </div>
          </div>

          <div style="margin-top: -20px;">
            <button @click="handleConfirm" class="relative px-2 py-1 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
              <span class="relative" style="font-size: 16px;">{{ $t('home2.confirm') }}</span>
            </button>
            <h2 style="margin-top: 10px; color: red;">{{ $t('home2.Missingtime') }}</h2>
          </div>
        </div>

        <div>
          <hr style="margin-top: 30px; border: 1.5px solid #CD5A00" />
        </div>

        
      </div>
    </div>

    <div class="hidden md:block">

      <div class="mx-10 grid">
        <div class="flex flex-row rounded-lg border border-gray-200/80 bg-white p-1 shadow-lg shadow-xl">

          <div class="relative">
            <img class="w-36 h-32 rounded-md object-cover" src="@/assets/images/img15.png" alt="User" />
            <div class="absolute -right-3 bottom-5 h-5 w-5 sm:top-2 rounded-full border-4 border-white bg-green-400 sm:invisible md:visible" title="User is online"></div>
          </div>

          <div class="flex flex-col px-4">
            <div v-if="userData" class="flex w-48 h-8 flex-row">
              <a target="_blank">
                <h2 class="text-base font-semibold">{{ userData.firstname }} {{ userData.lastname }}</h2>
              </a>
              <!-- User Verified -->
              <svg class="my-auto ml-2 h-4 fill-blue-400" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
              </svg>
            </div>
            <!-- Meta Badges -->
            <div v-if="userData" class="my-2 flex flex-row space-x-2 py-4">
              <!-- Badge Role -->
              <div class="flex flex-row">
                <svg class="mr-2 h-4 w-8 fill-gray-500/280" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                </svg>
                <div class="text-xs text-gray-400/100 hover:text-gray-400"> {{ userData.department }}</div>
              </div>
              <!-- Badge Location -->
              <div class="flex flex-row">
                <svg class="mr-2 h-4 w-4 fill-gray-500/280" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
                </svg>
                <div class="text-xs text-gray-400/100 hover:text-gray-400">{{ userData.country }}</div>
              </div>
              <!-- Badge Email-->
              <div class="flex flex-row">
                <svg class="mr-2 h-4 w-4 fill-gray-500/280" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                </svg>
                <div class="text-xs text-gray-400/100 hover:text-gray-400">{{ userData.email }}</div>
              </div>
            </div>
          </div>

          <!-- เส้นจำนวน -->
          <div class="w-50 flex flex-grow flex-col items-end justify-start ">
            <div class=" py-10 px-10">
              <div class="w-3/6 mx-auto py-1" style="position: relative; ">
                <div class="h-px" style="background-image: linear-gradient(90deg, rgba(149, 131, 198, 0.6) 1000.83%, rgba(149, 131, 198, 0.3) 95.57%, rgba(149, 131, 198, 0) 127.92%);  height: 7px; /* ปรับความสูงของเส้น */">
                </div>
                <div style="position: absolute; top: -12px; left: -39px; width: 40px; height: 40px; background-color: rgba(149, 131, 198, 0.6); border-radius: 50%;">
                  <svg-icon type="mdi" :path="path4" class="h-6 w-6 " style="display: inline-block; vertical-align: middle; margin-top: 7px;"></svg-icon>
                </div>
                <svg-icon type="mdi" :path="path2" class="h-4 w-6" style="display: inline-block; vertical-align: middle;"></svg-icon>
                <span style="margin: 5px; font-size: 16px; vertical-align: middle;">{{ calculateDuration() }}</span>
                <div style="position: absolute; top: -12px; right: -39px; width: 40px; height: 40px; background-color: rgba(149, 131, 198, 0.6); border-radius: 50%;">
                  <svg-icon type="mdi" :path="path5" class="h-6 w-6"  style="display: inline-block; vertical-align: middle; margin-top: 7px;"></svg-icon>
                </div>
                <span style="position: absolute; top: 7px; left: -70px; transform: translate(-50%, -50%); font-size: 20px; color: black;">{{
                starttime }}</span>
                <!-- ตัวอักษร หลังวงกลม -->
                <span  style="position: absolute; top: 7px; right: -70px; transform: translate(50%, -50%); font-size: 20px; color: balck;">{{ endtime }}</span>
                <div class="col-span-2 " style="margin-top: 10px;  width: 300px; ">
                </div>
              </div>
            </div>
          </div>

          <div class="w-50 flex flex-grow flex-col items-end justify-start ">
            <div class="flex flex-row space-3 py-2 px-2">
              <button @click.prevent="toggleChangesales" class="flex flex-col items-center group relative h-28 w-28 overflow-hidden rounded-lg bg-white text-lg shadow" style="border: 0.5px solid black; margin-right: 10px;">
                <div class="absolute inset-0 w-1 bg-orange-400 transition-all duration-[250ms] ease-out group-hover:w-full">
                </div>
                <span class="relative text-black group-hover:text-white flex flex-col items-center">
                  <span style="margin-bottom: 10px; font-family: 'Your Chosen Font', sans-serif; font-size: 16px; ">{{ $t('home2.changesales') }}</span>
                  <img src="@/assets/images/img16.png" alt="search image" style="width: 60px; height: auto;">
                </span>
              </button>

              <button @click.prevent="goToNextPage" class="flex flex-col items-center group relative h-28 w-28 overflow-hidden rounded-lg bg-white text-lg shadow" style="border: 0.5px solid black;">
                <div class="absolute inset-0 w-1 bg-cyan-300 transition-all duration-[250ms] ease-out group-hover:w-full">
                </div>
                <span class="relative text-black group-hover:text-white flex flex-col items-center">
                  <span style="margin-bottom: 10px; font-family: 'Your Chosen Font', sans-serif;">{{ $t('home2.confirmtime') }}</span>
                  <img src="@/assets/images/img17.png" alt="search image" style="width: 60px; height: auto;">
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>



    <!-- มือถือ -->

    <div class="md:hidden">
      <div class="max-w-sm mx-auto mt-4" style="width: 90%;">
        <div class="flex justify-between items-center mb-2">
          <a @click.prevent="goToPreviousDate" href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
            <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span class="relative px-1 py-1 transition-all ease-out bg-gray-300 rounded-full group-hover:bg-opacity-0 duration-400">
              <svg-icon type="mdi" :path="path" class="h-6 w-6"></svg-icon>
            </span>
          </a>
    
          <div class="relative flex flex-col items-center px-10 border-4 border-dashed border-black rounded-lg shadow-md bg-blue-400">
            <span class="absolute top-0 left-0 text-xs font-medium bg-primary-100 px-2 py-1 rounded-br-lg rounded-tl-lg border-black border-b-4 border-r-4 border-dashed">
                {{ currentDay }}
            </span>
            <h2 class="mt-8 text-sm font-bold" style="font-size: 18px;">{{ formattedDate }}</h2>
        </div>
    
          <a @click.prevent="goToNextDate" href="#_" class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-full">
            <span class="w-full h-full bg-gradient-to-br from-[#33FF99] via-[#00CCFF] to-[#0066FF] group-hover:from-[#00FFFF] group-hover:via-[#0099CC] group-hover:to-[#0033FF] absolute"></span>
            <span class="relative px-1 py-1 transition-all ease-out bg-gray-300 rounded-full group-hover:bg-opacity-0 duration-400">
              <svg-icon type="mdi" :path="path1" class="h-6 w-6"></svg-icon>
            </span>
          </a>
        </div>

        <div id="dropdownTimepickerButton" @click.prevent="toggleModalSelecttime" style=" display: flex; justify-content: center; align-items: center; height: 100%; margin-top: 20px;">
          <button class="cursor-pointer uppercase font-mono bg-blue font-bold py-2 px-4 rounded border-2 border-black shadow-[0.25rem_0.25rem_#121212] transition-[transform_50ms, box-shadow_50ms] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0.125rem_0.125rem_#121212] flex items-center"  style=" border: 3px dashed #000;">
            {{ $t('home2.selecttime') }}
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
        </div>

        <!-- Time picker modal -->
        <div v-if="showModalselecttime" id="dropdownTimepicker" class="z-10 bg-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 p-3 " style="margin-top: 10px;">
          <h2 style="margin-top: 10px; font-weight: bold;">{{ $t('home2.estimatearrivaltime') }}</h2>
          <div class="max-w-[20rem] mx-auto grid grid-cols-2 gap-8 mb-2 py-4">
            <div>
              <span class="mr-1">{{ $t('home2.starttime') }}</span>
              <button @click="toggleStartTimeDropdown" class="inline-flex justify-center w-full px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span class="mr-1">{{ starttime || 'start time' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-4 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 111.414 1.414l-3 3a1 1 01-1.414 0l-3-3a1 1 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="showStartTimeDropdown" class="mt-2 bg-white border rounded shadow">
                <ul>
                  <li v-for="time in filteredTimes" :key="time" @click="selectStartTime(time)" :class="{ 'cursor-pointer': !isTimeInBookedRange(time), 'text-gray-400 bg-gray-200': isTimeInBookedRange(time) }" class="px-4 py-2 hover:bg-gray-200">
                    {{ time }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- End Time Selection -->
            <div>
              <span class="mr-1">{{ $t('home2.endtime') }}</span>
              <button @click="toggleEndTimeDropdown" class="inline-flex justify-center w-full px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span class="mr-1">{{ endtime || 'end time' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-4 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 111.414 1.414l-3 3a1 1 01-1.414 0l-3-3a1 1 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="showEndTimeDropdown" class="mt-2 bg-white border rounded shadow">
                <ul>
                  <li v-for="time in filteredEndTimes" :key="time" @click="selectEndTime(time)" :class="{ 'cursor-pointer': !isTimeInBookedRange(time), 'text-gray-400 bg-gray-200': isTimeInBookedRange(time) }" class="px-4 py-2 hover:bg-gray-200">
                    {{ time }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-span-2" style="margin-top: -25px;">
              ( <svg-icon type="mdi" :path="path2" class="h-4 w-6" style="display: inline-block; vertical-align: middle;"></svg-icon>
              <span style="margin: 5px; font-size: 14px; vertical-align: middle;">{{ calculateDuration() }}</span>)
            </div>
          </div>

          <div class="max-w-lg lg:ms-auto mx-auto text-center">

            <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
              <span class="mr-1">{{ $t('home2.purposevisit') }}</span>
              <div class="md:col-span-2" style="margin-top: -20px;">
                <textarea v-model="purposeofvisit" name="purposeofvisit" rows="3" placeholder="Purpose of visit *" class="bg-white w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" style="width: 80%; height: 100px;"></textarea>
              </div>
              <div class="md:col-span-2"></div>
            </div>
          </div>

          <div style="margin-top: -20px;">
            <button @click="handleConfirm" class="relative px-2 py-1 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
              <span class="relative" style="font-size: 16px;">{{ $t('home2.confirm') }}</span>
            </button>
            <h2 style="margin-top: 10px; color: red;">{{ $t('home2.Missingtime') }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- มือถือ -->

    <div class="md:hidden">

      <div style="display: flex; justify-content: center; margin-top: 20px;">

        <div class="mx-1 grid">
          <div class="flex flex-col rounded-lg border border-gray-200/80 bg-white p-1 shadow-lg shadow-xl">
            <div class="flex justify-center">
              <img class="w-20 h-20 rounded-md object-cover" src="@/assets/images/img15.png" alt="User" />
              <svg class="my-1 h-4 fill-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
              </svg>
              <div class="w-5 h-5 rounded-full border-4 border-white bg-green-400 invisible sm:visible md:hidden" title="User is online">
              </div>
            </div>

            <div v-if="userData" class="px-4 py-2">
              <a href="https://github.com/EgoistDeveloper/" target="_blank">
                <h2 class=" justify-center text-base font-semibold"> {{ userData.firstname }} {{ userData.lastname }}</h2>
              </a>
            </div>

            <div class="px-0 py-0 flex justify-between">
              <div v-if="userData" class="flex flex-col">
                <div class="flex flex-row">
                  <svg class="mr-2 h-4 w-4 fill-gray-500/180" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                  </svg>
                  <div class="text-xs text-gray-400/180 hover:text-gray-400" style="font-size: 10;"> {{ userData.department }} &nbsp; &nbsp; </div>
                </div>

                <div class="flex flex-row">
                  <svg class="mr-2 h-4 w-4 fill-gray-500/180" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
                  </svg>
                  <div class="text-xs text-gray-400/180 hover:text-gray-400">{{ userData.country }}</div>
                </div>

                <div class="flex flex-row">
                  <svg class="mr-2 h-4 w-4 fill-gray-500/180" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                  </svg>
                  <div class="text-xs text-gray-400/180 hover:text-gray-400">{{ userData.email }} &nbsp; &nbsp;</div>
                </div>

                <div class="flex flex-row">
                  <p style="font-size: 10px; "><strong><svg-icon type="mdi" :path="path3" class="h-4 w-4" style="display: inline-block; vertical-align: middle; margin-top: -1px;"></svg-icon> </strong>
                    &nbsp;&nbsp;{{ starttime }}-{{ endtime }} &nbsp; ({{ calculateDuration() }}) &nbsp;
                  </p>
                </div>
              </div>

              <button @click.prevent="toggleChangesales" class="flex flex-col items-center group relative h-18 w-18 overflow-hidden rounded-lg bg-white text-lg shadow" style="border: 0.5px solid black; margin-right: 10px;">
                <div class="absolute inset-0 w-1 bg-orange-400 transition-all duration-[250ms] ease-out group-hover:w-full">
                </div>
                <span class="relative text-black group-hover:text-white flex flex-col items-center">
                  <span  style="margin-bottom: 10px; font-family: 'Your Chosen Font', sans-serif; font-size: 11px; padding: 3px;">{{
                $t('home2.changesales') }}</span>
                  <img src="@/assets/images/img16.png" alt="search image" style="width: 40px; margin-top: -20px; height: auto; padding: 3px;">
                </span>
              </button>
              <button @click="goToNextPage" class="flex flex-col items-center group relative h-18 w-18 overflow-hidden rounded-lg bg-white text-lg shadow" style="border: 0.5px solid black; margin-right: 10px;">
                <div class="absolute inset-0 w-1 bg-cyan-300 transition-all duration-[250ms] ease-out group-hover:w-full">
                </div>
                <span class="relative text-black group-hover:text-white flex flex-col items-center">
                  <span style="margin-bottom: 10px; font-family: 'Your Chosen Font', sans-serif; font-size: 12px; padding: 3px;">&nbsp;&nbsp;&nbsp;&nbsp;{{
                $t('home2.confirmtime') }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <img src="@/assets/images/img17.png" alt="search image" style="width: 40px; margin-top: -20px; height: auto; padding: 3px;">
                </span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <hr style="margin-top: 30px; border: 1.5px solid #CD5A00" />
    </div>

  </section>
  <ModalSelectTimeAlert :showSelectTimeAlert="showSelectTimeAlert"
    @update:showSelectTimeAlert="showSelectTimeAlert = $event" />


    <div v-if="showchangesales" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="bg-white p-2 rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto relative">
        <!-- Close button -->
        <button @click="closeshowchangesales" class="absolute top-0 right-0 mt-2 mr-2 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
    
        <h2 class="text-xl font-bold mb-6 text-center text-blue-700" style="font-size: 20px; font-weight: bold;">{{ $t('home2.SelectnewSales') }}</h2>
        
        <div v-for="department in departments" :key="department.id" class="flex flex-col p-2 bg-gray-700 border-gray-800 shadow-md hover:shadow-lg rounded-2xl mb-6">
          <div class="flex">
            <div class="flex flex-col border-b sm:border-b-0 items-center sm:justify-center px-4">
              <p class="text-5xl font-bold text-[#0ed3cf] rounded-full">{{ getFirstLetter(department) }}</p>
            </div>      
            
            <div class="flex flex-col justify-center w-full px-2 py-1">
              <div class="flex justify-between items-center">
                <div class="flex flex-col">
                  <h2 class="font-medium leading-none text-gray-100" style="font-size: 18px; font-weight: bold;">{{ department }}</h2>
                </div>
              </div>
              <div class="flex  text-sm text-gray-500">
                
                <div class="flex items-center mr-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  </div>
                  <div class="flex flex-col flex-0">
                    <div class="divide-x divide-gray-200 mt-auto">
                      <span class="inline-block px-3 text-xs leading-none text-white font-normal first:pl-0" style="font-size: 14px; font-weight: bold;"> {{ $t('home2.Departmentmembers') }}</span>
                      <span class="inline-block px-3 text-xs leading-none text-white font-normal first:pl-0" style="font-size: 14px; font-weight: bold;">{{ groupedUsers[department].users.length }}</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="  px-2 relative mt-4 ">
            <svg class="absolute bottom-full right-4" width="30" height="20" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                <polygon points="15, 0 30, 20 0, 20" fill="#FFFFFF"/>
            </svg>
        
            <div v-for="member in groupedUsers[department].users.filter(user => user.userType === 'adminsales')" :key="member.email" class="bg-pink-200 rounded-lg shadow-xl px-4 relative mt-1" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 10, 1.1), 0 1px 3px rgba(0, 0, 10, 1.08); transition: all 0.3s ease;">
              <div class="py-2 flex items-center w-full">    
                <div class="flex flex-col flex-0">
                  <div class="flex items-center divide-x divide-gray-800 mt-auto">
                      <span class="inline-flex items-center px-3 text-xm leading-none text-black font-normal first:pl-0">
                        <svg class="h-6 w-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        &nbsp;  &nbsp;  {{ member.firstname }} {{ member.lastname }}
                      </span>
                      <span class="inline-block px-3 text-xm leading-none text-black font-normal">{{ member.position }}</span>
                      <span class="inline-block px-3 text-xm leading-none text-black font-normal">{{ member.userType }}</span>
                  </div>
              </div>  
                <a  @click="selectItem(member)" class="relative inline-block text-lg group ml-auto">
                    <span class="relative z-10 block px-1  overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-green-500 rounded-lg group-hover:text-white">
                        <span class="absolute inset-0 w-full h-full px-2 py-1 rounded-lg bg-gray-50"></span>
                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-500 group-hover:-rotate-180 ease"></span>
                        <span class="relative text-sm">Change</span>
                      </span>
                    <span class="absolute bottom-0 right-0 w-full h-7 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-green-500 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </a>
            </div>  
            </div>
            <!-- แสดง sales ปกติ -->
            <div v-for="member in groupedUsers[department].users.filter(user => user.userType === 'sales')" :key="member.email" class="bg-pink-50 rounded-lg shadow-xl px-4 relative mt-1"  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 10, 1.1), 0 1px 3px rgba(0, 0, 10, 1.08); transition: all 0.3s ease;">
              <div class="py-2 flex items-center w-full">    
                <div class="flex flex-col flex-0">
                  <div class="flex items-center divide-x divide-gray-800 mt-auto">
                      <span class="inline-flex items-center px-3 text-xm leading-none text-black font-normal first:pl-0">
                        <svg class="h-6 w-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        &nbsp;  &nbsp;  {{ member.firstname }} {{ member.lastname }}
                      </span>
                      <span class="inline-block px-3 text-xm leading-none text-black font-normal">{{ member.position }}</span>
                      <span class="inline-block px-3 text-xm leading-none text-black font-normal">{{ member.userType }}</span>
                  </div>
              </div>  
                <a  @click="selectItem(member)" class="relative inline-block text-lg group ml-auto">
                    <span class="relative z-10 block px-1  overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-green-500 rounded-lg group-hover:text-white">
                        <span class="absolute inset-0 w-full h-full px-2 py-1 rounded-lg bg-gray-50"></span>
                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-500 group-hover:-rotate-180 ease"></span>
                        <span class="relative text-sm">Change</span>
                      </span>
                    <span class="absolute bottom-0 right-0 w-full h-7 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-green-500 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </a>
            </div>  
            </div>
          </div>
        </div>
      </div>
    </div>

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

#dropdownTimepicker {
  border: 2px dashed #000;
  /* Adding a dashed border */
  max-width: 450px;
  /* Adjust the max-width to control the size */
  margin: 0 auto;
  /* Center horizontally */
}

.dropdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.max-h-80vh {
  max-height: 60vh;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
