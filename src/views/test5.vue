<template>
  <div>

    <div class="overflow-hidden w-full overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700" style="width: 90%; margin: 0 auto">
      <table class="w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead class="border-b border-slate-300 bg-slate-100 text-sm text-black dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <tr>
                  <th scope="col" class="p-4 text-center">NO.</th>
                  <th scope="col" class="p-4 text-center">LEAVESTARTDATE</th>
                  <th scope="col" class="p-4 text-center">LEAVESTARTTIME</th>
                  <th scope="col" class="p-4 text-center">LEAVEENDDATE</th>
                  <th scope="col" class="p-4 text-center">LEAVEENDTIME</th>
                  <th scope="col" class="p-4 text-center">LEAVEREASON</th>
                  <th scope="col" class="p-4 text-center">STATUS</th>
                  <th scope="col" class="p-4 text-center">LEAVECREATEDAT</th>
                  <th scope="col" class="p-4 text-center">ACTION</th>
              </tr>
          </thead>
          <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
              <tr>
                  <td class="p-4 text-center">1</td>
                  <td class="p-4 text-center">2024-08-10</td>
                  <td class="p-4 text-center">09:00</td>
                  <td class="p-4 text-center">2024-08-12</td>
                  <td class="p-4 text-center">18:00</td>
                  <td class="p-4 text-center">Personal matters</td>
                  <td class="p-4 text-center">
                      <span class="inline-flex overflow-hidden rounded-xl border border-orange-600 px-1 py-0.5 text-xs font-medium text-orange-600 bg-orange-600/10">pending</span>                    
                  </td>
                  <td class="p-4 text-center">2024-08-01 14:30</td>
                  <td class="p-2 text-center" style="display: flex; justify-content: center; align-items: center">
                      <div class="flex space-x-2">
                          <a target="_blank" rel="noopener noreferrer" class="bg-blue-500 text-white font-medium rounded-md px-1 py-1 flex items-center justify-center hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg">
                              <span class="text-lg mr-2">✔</span>
                              Approve
                          </a>
                          <a target="_blank" rel="noopener noreferrer" class="bg-red-500 text-white font-medium rounded-md px-1 py-1 flex items-center justify-center hover:bg-red-600 transition duration-300 ease-in-out shadow-lg">
                              <span class="text-lg mr-2">✖</span>
                              Reject
                          </a>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>






    <h2 class="text-lg text-gray-900 dark:text-white font-semibold mb-3 py-8">Digital Transformation Meeting</h2>

    <div class="flex justify-center space-x-8">
      <!-- Start Date/Time Card -->
      <div class="w-[450px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" style="box-shadow: -2px 2px 10px #5a5a5a, 2px -2px 10px #EAE7E7;">
        <h2 class="border-double border-4 border-sky-500 text-lg text-gray-900 dark:text-white font-semibold mb-3">Start Date</h2>
        
        <!-- Start Date picker -->
        <div class="mb-3">
          <div class="flex justify-between items-center mb-2">
            <button @click="previousMonth('start')" 
            class="rounded-full w-6 h-6 bg-red-300 border-2 border-solid border-red-500 transition-colors hover:bg-red-500 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd"></path>
              </svg>
            </button>

            <span class="border-dotted border-[2px] border-sky-500 text-[18px] font-medium rounded-[50px] px-6">{{ startMonthYear }}</span>

            <button @click="nextMonth('start')" type="submit"
            class="rounded-full w-6 h-6 bg-teal-300 border-2 border-solid border-teal-500 transition-colors hover:bg-teal-500 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-xs">
            <div v-for="day in daysOfWeek" :key="day" class="bg-sky-400 text-center text-gray-900 font-bold rounded-[20px] text-[15px] py-[3px]">{{ day }}</div>
            <button v-for="date in startDates" :key="date.getTime()" @click="selectDate(date, 'start')" 
            :class="['p-1 rounded-full font-bold',
              isSelectedDate(date, 'start') ? 'bg-sky-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              date.getMonth() !== startDate.getMonth() ? 'text-gray-400' : 'text-gray-800 dark:text-gray-300',
              !isDateSelectable(date) ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!isDateSelectable(date)">
              {{ date.getDate() }}
            </button>
          </div>
        </div>
        
        <!-- Start Time selection -->
        <div class="mb-3">
          <h3 class="text-sm font-medium mb-2">Start Time</h3>
          <div class="grid grid-cols-4 gap-1">
            <button v-for="time in availableTimes" :key="time" @click="selectTime(time, 'start')" 
            :class="['p-1 text-xs rounded',
              startTime === time ? 'bg-sky-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[13px]',
              !isTimeSelectable(time, 'start') ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!isTimeSelectable(time, 'start')">
              {{ time }}
            </button>
          </div>
        </div>
        
        <!-- Selected info -->
        <div class="text-sm text-gray-600 dark:text-gray-400 mt-3">
          {{ startSelectedDate }} at {{ startTime || 'No time selected' }}
        </div>
      </div>

      <!-- End Date/Time Card -->
      <div class="w-[450px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" style="box-shadow: -2px 2px 10px #5a5a5a, 2px -2px 10px #EAE7E7;">
        <h2 class="border-double border-4 border-orange-500 text-lg text-gray-900 dark:text-white font-semibold mb-3">End Date</h2>
        
        <!-- End Date picker -->
        <div class="mb-3">
          <div class="flex justify-between items-center mb-2">
            <button @click="previousMonth('end')" type="submit"
            class="rounded-full w-6 h-6 bg-red-300 border-2 border-solid border-red-500 transition-colors hover:bg-red-500 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd"></path>
              </svg>
            </button>
          
            <span class="border-dotted border-[2px] border-orange-500 text-[18px] font-medium rounded-[50px] px-6">{{ endMonthYear }}</span>

            <button @click="nextMonth('end')" type="submit"
              class="rounded-full w-6 h-6 bg-teal-300 border-2 border-solid border-teal-500 transition-colors hover:bg-teal-500 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-xs">
            <div v-for="day in daysOfWeek" :key="day" class="bg-orange-400 text-center text-gray-900 font-bold rounded-[20px] text-[15px] py-[3px]">{{ day }}</div>
            <button v-for="date in endDates" :key="date.getTime()" @click="selectDate(date, 'end')" 
            :class="['p-1 rounded-full font-bold',
              isSelectedDate(date, 'end') ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
              date.getMonth() !== endDate.getMonth() ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300',
              !isDateSelectable(date, 'end') ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!isDateSelectable(date, 'end')">
              {{ date.getDate() }}
            </button>
          </div>
        </div>
        
        <!-- End Time selection -->
        <div class="mb-3">
          <h3 class="text-sm font-medium mb-2">End Time</h3>
          <div class="grid grid-cols-4 gap-1">
            <button v-for="time in availableTimes" :key="time" @click="selectTime(time, 'end')" 
            :class="['p-1 text-xs rounded',
              endTime === time ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[13px]',
              !isTimeSelectable(time, 'end') ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!isTimeSelectable(time, 'end')">
              {{ time }}
            </button>
          </div>
        </div>
        
        <!-- Selected info -->
        <div class="text-sm text-gray-600 dark:text-gray-400 mt-3">
          {{ endSelectedDate }} at {{ endTime || 'No time selected' }}
        </div>
        <div class="mt-2">
          <textarea v-model="leaveReason" name="message" class="w-full min-h-[50px] max-h-[200px] h-20 appearance-none block w-full text-grey-darker border border-red-500 rounded-lg py-4 px-4 text-sm" placeholder="Reason for Leave" spellcheck="false"></textarea>
          <div class="flex justify-end space-x-2 py-2">
            <a @click="createLeaveRequest" class="relative inline-flex items-center px-6 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-indigo-500 cursor-pointer">
              <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span class="absolute right-0 flex items-center justify-start w-5 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="relative" style="font-size: 14px;">Confirm</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="message" :class="['mt-4 p-4 rounded', isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </div>
  </div>



 







</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      startSelectedDate: null,
      endSelectedDate: null,
      startTime: null,
      endTime: null,
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      availableTimes: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      leaveReason: '',
      message: '',
      isError: false,
      today: new Date().toISOString().split('T')[0],
      isFormValid: false
    };
  },
  computed: {
    startMonthYear() {
      return this.startDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    },
    endMonthYear() {
      return this.endDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    },
    startDates() {
      return this.getDatesForMonth(this.startDate);
    },
    endDates() {
      return this.getDatesForMonth(this.endDate);
    },
  },
  methods: {
    getDatesForMonth(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const dates = [];
      for (let i = 0; i < firstDay.getDay(); i++) {
        dates.push(new Date(year, month, -i));
      }
      for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i));
      }
      const remainingDays = 7 - (dates.length % 7);
      for (let i = 1; i <= remainingDays; i++) {
        dates.push(new Date(year, month + 1, i));
      }
      return dates;
    },
    previousMonth(type) {
      if (type === 'start') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, 1);
      } else {
        this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() - 1, 1);
      }
    },
    nextMonth(type) {
      if (type === 'start') {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
      } else {
        this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() + 1, 1);
      }
    },
    selectDate(date, type) {
      if (this.isDateSelectable(date, type)) {
        if (type === 'start') {
          this.startSelectedDate = date.toLocaleDateString();
          this.endSelectedDate = null;
          this.endTime = null;
        } else {
          this.endSelectedDate = date.toLocaleDateString();
        }
        this.validateDates();
      }
    },
    selectTime(time, type) {
      if (this.isTimeSelectable(time, type)) {
        if (type === 'start') {
          this.startTime = time;
          this.endSelectedDate = null;
          this.endTime = null;
        } else {
          this.endTime = time;
        }
        this.validateTimes();
      }
    },
    isSelectedDate(date, type) {
      if (type === 'start') {
        return this.startSelectedDate === date.toLocaleDateString();
      } else {
        return this.endSelectedDate === date.toLocaleDateString();
      }
    },
    isDateSelectable(date, type = 'start') {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      if (type === 'start') {
        return date >= now;
      } else {
        if (!this.startSelectedDate) return false;
        const startDate = new Date(this.startSelectedDate);
        return date >= startDate;
      }
    },
    isTimeSelectable(time, type) {
      const now = new Date();
      const [hours, minutes] = time.split(':').map(Number);
      const selectedDate = type === 'start' ? this.startSelectedDate : this.endSelectedDate;
      
      if (!selectedDate) return false;
      
      const dateToCheck = new Date(selectedDate);
      dateToCheck.setHours(hours, minutes, 0, 0);
      
      if (type === 'start') {
        return dateToCheck > now;
      } else {
        if (!this.startSelectedDate || !this.startTime) return false;
        const startDateTime = new Date(this.startSelectedDate);
        const [startHours, startMinutes] = this.startTime.split(':').map(Number);
        startDateTime.setHours(startHours, startMinutes, 0, 0);
        return dateToCheck > startDateTime;
      }
    },
    formatDate(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
},
    validateForm() {
      if (!this.startSelectedDate || !this.startTime || !this.endSelectedDate || !this.endTime || !this.leaveReason.trim()) {
        return false;
      }
      return true;
    },
    async createLeaveRequest() {
      if (!this.validateForm()) {
        this.showError('Please fill in all fields');
        return;
      }

      const token = sessionStorage.getItem('tokenactivity');
      if (!token) {
        this.showError('No token found. Please log in again.');
        return;
      }

      try {
        const requestData = {
          leaveStartDate: this.formatDate(this.startSelectedDate),
          leaveStartTime: this.startTime,
          leaveEndDate: this.formatDate(this.endSelectedDate),
          leaveEndTime: this.endTime,
          leaveReason: this.leaveReason
        };

        const response = await axios.post('http://LOCALHOST:9992/createLeaveRequest', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.showMessage(response.data.message);
        this.resetCalendar();
      } catch (error) {
        if (error.response) {
          this.showError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          this.showError('No response received from server. Please check your connection.');
        } else {
          this.showError(`Error: ${error.message}`);
        }
        console.error('Detailed error:', error);
      }
    },
    showMessage(msg) {
      this.message = msg;
      this.isError = false;
    },
    showError(msg) {
      this.message = msg;
      this.isError = true;
    },
    validateDates() {
      if (this.startSelectedDate && this.endSelectedDate) {
        const start = new Date(this.startSelectedDate);
        const end = new Date(this.endSelectedDate);
        if (start > end) {
          this.showError('End date cannot be earlier than start date');
          this.isFormValid = false;
        } else {
          this.message = '';
          this.validateForm();
        }
      }
    },
    validateTimes() {
      if (this.startSelectedDate === this.endSelectedDate && this.startTime && this.endTime) {
        if (this.startTime >= this.endTime) {
          this.showError('End time must be later than start time on the same day');
          this.isFormValid = false;
        } else {
          this.message = '';
          this.validateForm();
        }
      }
    },
    resetCalendar() {
      this.startDate = new Date();
      this.endDate = new Date();
      this.startSelectedDate = null;
      this.endSelectedDate = null;
      this.startTime = null;
      this.endTime = null;
      this.leaveReason = '';
      this.isFormValid = false;
      this.message = ''; // เพิ่มบรรทัดนี้เพื่อล้างข้อความ
    }
  },
  mounted() {
    this.today = new Date().toISOString().split('T')[0];
  },
  watch: {
    startSelectedDate() {
      this.validateForm();
    },
    startTime() {
      this.validateForm();
    },
    endSelectedDate() {
      this.validateForm();
    },
    endTime() {
      this.validateForm();
    },
    leaveReason() {
      this.validateForm();
    }
  }
};
</script>

<style scoped>
/* From Uiverse.io by andrew-demchenk0 */ 
.card {
  --font-color: #323232;
  --bg-color: #f7ebeb;
  width: 250px;
  height: 350px;
  border-radius: 20px;
  background: var(--bg-color);
  box-shadow: -5px 9px 18px #5a5a5a,
              9px -9px 18px #ffffff;
  display: flex;
  flex-direction: column;
  transition: .4s;
  position: relative;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 10px 2px #5a5a5a;
}


</style>