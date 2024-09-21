<script>
import { mdiAccountTie } from '@mdi/js';
import axios from 'axios';

export default {
  components: {

  },

  data() {
    return {
      path8: mdiAccountTie,
      counter: parseInt(sessionStorage.getItem('numberofpeople')) || 1,
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
      selectjourney: {},
      Carregistration: {},

      checkboxChecked: false,
      showModalSelectQRcode: false,
      selectedDepartment: sessionStorage.getItem('selectedDepartment') || null,

      showCard: false,

      userData: null,

      isCheckboxQRChecked: false, 
      showErrorModal: false,

      selectedDate: '',
      selectedStartTime: '',
      selectedEndTime: '',
      duration: '',
      purposeofvisit: '',

      showNoDataModal: false,
    };
  },

  methods: {
    toggleButtonVisibility() {
      this.checkboxChecked = !this.checkboxChecked;
      this.isCheckboxQRChecked = this.checkboxChecked;
      const dateTime = new Date().toLocaleString();
      sessionStorage.setItem('buttonClickDateTime', dateTime);
    },

    goToNextPage() {
      if (this.checkboxChecked) {
        this.$router.push('/ScanQRcode');
      } else {
        this.showModalSelectQRcode = true;
      }
    },

    closeModalSelectQRcode() {
      this.showModalSelectQRcode = false;
    },

    toggleCard() {
      const hasData = this.checkSessionStorageData();
      
      if (hasData) {
        if (this.isCheckboxQRChecked) {
          this.showCard = !this.showCard;

          const emails = Object.values(this.emails).filter(Boolean);
          const name = Object.values(this.firstName).find(Boolean);
          const bookingDate = this.selectedDate;
          const bookingTime = `${this.selectedStartTime} - ${this.selectedEndTime}`;
          const location = this.selectedDepartment;

          this.sendEmail(emails, name, bookingDate, bookingTime, location);
          
          // Clear session storage
          this.clearSessionStorage();
        } else {
          this.showErrorModal = true;
        }
      } else {
        this.showNoDataModal = true;
      }
    },

    checkSessionStorageData() {
      return sessionStorage.getItem('numberofpeople') &&
             sessionStorage.getItem('visitdate') &&
             sessionStorage.getItem('starttime') &&
             sessionStorage.getItem('endtime');
    },

    closeNoDataModal() {
      this.showNoDataModal = false;
    },

    closeErrorModal() {
      this.showErrorModal = false;
    },

    async sendEmail(emails, name, bookingDate, bookingTime, location) {
      try {
        const response = await axios.post('http://LOCALHOST:9992/sendEmail', {
          emails,
          name,
          bookingDate,
          bookingTime,
          location
        });

        if (response.status === 200) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },

    async fetchUserData() {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in session storage');
        return;
      }

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

    clearSessionStorage() {
      sessionStorage.clear();
    },

    returnToHomePage() {
      this.clearSessionStorage();
      this.$router.push('/');
    }
  },

  computed: {
    formattedDate() {
      if (this.selectedDate) {
        return this.selectedDate.split('T')[0].split('-').reverse().join('-');
      } else {
        return 'Select Date';
      }
    },
    userFullName() {
      return this.userData ? `${this.userData.firstname} ${this.userData.lastname}` : 'N/A';
    }
  },

  created() {
    this.message = sessionStorage.getItem('Purposeofvisit');
    const numberOfPeople = sessionStorage.getItem('numberofpeople');
    console.log('Number of people:', numberOfPeople);
    if (numberOfPeople !== null) {
      this.counter = parseInt(numberOfPeople);
    }
    
    const selectedItemJson = sessionStorage.getItem('selectedItem');
    if (selectedItemJson) {
      this.selectedItem = JSON.parse(selectedItemJson);
    }

    const participants = JSON.parse(sessionStorage.getItem('participants') || '[]');
    for (let index = 0; index < this.counter; index++) {
      const participant = participants[index] || {};
      this.companyName[index + 1] = participant.companyname;
      this.IDName[index + 1] = participant.thaiid;
      this.PassportName[index + 1] = participant.passportno;
      this.firstName[index + 1] = participant.name;
      this.selectedItemstatus[index + 1] = participant.selectstatus;
      this.selectjourney[index + 1] = participant.selectjourney;

      this.lastName[index + 1] = participant.surname;
      this.emails[index + 1] = participant.email;
      this.phoneNumbers[index + 1] = participant.telephonenumber;
      this.countries[index + 1] = participant.country;
      this.Age[index + 1] = participant.age;
      this.isCompanyChecked[index + 1] = participant.selecttype === 'company';
      this.isIDChecked[index + 1] = participant.selectidentity === 'thaiid';
      this.Carrental[index + 1] = participant.selectjourney === 'Car rental-charter';
      this.Personalvehicle[index + 1] = participant.selectjourney === 'Personal Vehicle';
      this.Companysevice[index + 1] = participant.selectjourney === 'Company Service';
      this.Carregistration[index + 1] = participant.carregistration;
    }

    this.selectedDate = sessionStorage.getItem('visitdate');
    this.selectedStartTime = sessionStorage.getItem('starttime');
    this.selectedEndTime = sessionStorage.getItem('endtime');
    this.duration = sessionStorage.getItem('duration');
    this.purposeofvisit = sessionStorage.getItem('purposeofvisit');

    this.fetchUserData();

    // Clear session storage on page refresh
    window.addEventListener('beforeunload', this.clearSessionStorage);
  },

  unmounted() {
    window.removeEventListener('beforeunload', this.clearSessionStorage);
  },
};
</script>


<template>


  <!-- เส้นจำนวน -->
  <div class="">
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
          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{ $t('stepdata.searchforsale') }}<br>{{ $t('stepdata.searchforsale1') }}</div>
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div> <!-- เส้น -->
        <div class="flex items-center text-teal-600 relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 relative">
            <img src="@/assets/images/img12.png" alt="search image" class="w-7 ml-2 -mt-1.5">
            <img src="@/assets/images/img38.png" alt="overlay image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-12 object-cover">
          </div>
          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{ $t('stepdata.searchappointment') }}<br>{{ $t('stepdata.searchappointment1') }}</div>
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div> <!-- เส้น -->
        <div class="flex items-center text-gray-500 relative">
          <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div> <!-- เส้น -->
          <div class="flex items-center text-white relative">
            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 relative">
              <img src="@/assets/images/img13.png" alt="search image" class="w-7 ml-2 -mt-1.5">
              <img src="@/assets/images/img38.png" alt="overlay image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-12 object-cover">
            </div>
            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{ $t('stepdata.informationvisitors') }}<br> {{ $t('stepdata.informationvisitors1') }}</div>
          </div>
          <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div> <!-- เส้น -->

        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
        <div class="flex items-center text-gray-500 relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
            <img src="@/assets/images/img14.png" alt="search image" style="width: 35px; margin-left: 5px; height: auto; margin-top: -7px; ">
          </div>
          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">{{ $t('stepdata.confirmation') }}</div>
        </div>
      </div>
    </div>


    <div style="margin-top: -250px;">
      <hr style="margin-top: 300px; border: 1.5px solid #CD5A00" />
    </div>


  </div>
  <div class="mx-auto flex  max-w-lg flex-col md:max-w-none md:flex-row md:pr-10" style="margin-top: 30px;">
    <div class="md:w-1/3 rounded-2xl bg-sky-400 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
      <h1 style="font-size: 25px; font-weight: 900; margin-top: -20px;">{{$t('home4.participants') }}</h1>
      <div class="py-2 animate-pulse" v-for="index in counter" :key="index">
        <div class="mx-2 my-0 rounded-l border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-2 ">
          <div class="mb-2 flex flex-col gap-y-6 border-b py-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="ml-2">
                <p class="text-slate-800 text-sm font-serif text-left">  🏢 : &nbsp; {{ companyName[index] || 'Individual' }}</p>
                <p class="text-slate-800 text-sm font-serif text-left">  👤 : &nbsp; {{ firstName[index] }}  {{ lastName[index] }}</p>
                <p class="text-slate-800 text-sm font-serif text-left">
                  🪪 : {{ IDName[index] ? 'ID' : PassportName[index] ? 'Passport' : '' }} : {{ IDName[index] || PassportName[index] || 'Not Provided' }}                </p>
                <p class="text-slate-800 text-sm font-serif text-left">  📧 : &nbsp; {{ $t('home4.email') }} : {{ emails[index] }}</p>
              </div>
            <div class="text-lg text-center font-semibold  flex justify-end items-center">
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
    
          <div class="mb-2 flex justify-between border-b text-sm sm:text-base">
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm">
                {{ selectjourney[index] }}
              </p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.journey') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm font-serif">{{ Carregistration[index] || 'N/A' }}</p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.carregistration') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm font-serif">{{ selectedItemstatus[index] || 'Not specified' }}</p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.status') }}</p>
            </div>
          </div>
          
          <div class="mb-2 flex justify-between border-b text-sm sm:text-base">
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm">{{ phoneNumbers[index] }}</p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.phonenumber') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm font-serif">{{ countries[index] }}</p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.country1') }}</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-slate-700 text-sm font-serif">{{ Age[index] }}</p>
              <p class="text-slate-500 text-xs font-serif">{{ $t('home4.age') }}</p>
            </div>
          </div>
    
        </div>
      </div>
    </div>


    <div class="flex-grow">
      <div class="flex flex-col gap-2 dark:text-white w-full max-w-5xl bg-sky-400 dark:bg-sky-500 p-4 rounded-2xl mt-6 shadow-md  ">
        <h1 style="font-size: 25px; font-weight: 900; color: white;">{{$t('home4.appointmentsummary') }}</h1>
        <div class="flex flex-row justify-between w-full " style=" margin-top: 20px;">
          <div class="bg-gray-200 dark:bg-neutral-700 rounded-md px-2 animate-pulse text-orange-600 font-bold" style=" font-size: 13px;">
            JINPAO PRECISION INDUSTRY COMPANY LIMITED
          </div>         
           <div class="text-xs">
            <div class="flex flex-row">
              <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
              </svg>
              <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" ></path>
              </svg>
              <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
              </svg>
              <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" ></path>
              </svg>
              <svg fill="currentColor" viewBox="0 0 20 20" class="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" ></path>
              </svg>
            </div>
          </div>
        </div>
      
        <div class="flex flex-col md:flex-row gap-4" style="margin-top:  5px;">
          <div class="bg-gray-200 dark:bg-neutral-700 rounded-md w-full md:w-1/3 h-full animate-pulse flex justify-center items-center p-4">
            <div class="relative">
              <div class="relative bg-white p-3 shadow-md inline-block" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.8);">
                <img class="w-56 h-40 object-cover" src="@/assets/images/jinpaolocation.png" alt="Location image">
                <div class="absolute -top-4 -left-4 w-12 h-12 rounded-full border-4 border-red-300 bg-yellow-400 overflow-hidden shadow-lg">
                  <img class="w-full h-full object-cover" src="@/assets/images/img26.png" alt="Avatar">
                </div>
              </div>
            </div>
          </div>
      
          <div class="bg-gray-200 dark:bg-neutral-700 rounded-md w-full md:w-2/3 h-full animate-pulse">
            <div class="grid gap-1 p-2">
              <div class="flex items-center space-x-4 p-1 rounded-full bg-gray-200">
                <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900">
                  <svg class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <div class="flex flex-col flex-1 text-left">
                  <h3 class="text-sm font-medium">  {{ userData?.firstname }} {{ userData?.lastname }} </h3>
                  <div class="divide-x divide-gray-200 mt-auto">
                    <span class="inline-block px-3 text-xs text-gray-500">{{ $t('home4.salesname') }}</span>
                  </div>
                </div> 
              </div>
        
              <div class="flex items-center space-x-4 p-1 rounded-full bg-gray-200">
                <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900">
                  <svg class="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd" />
                  </svg>
                </span>
                <div class="flex flex-col flex-1 text-left">
                  <h3 class="text-sm font-medium">{{ formattedDate }}</h3>
                  <div class="divide-x divide-gray-200 mt-auto">
                    <span class="inline-block px-3 text-xs text-gray-500">{{ $t('home4.visitdata') }}</span>
                  </div>
                </div>
              </div>
        
              <div class="flex items-center space-x-4 p-1 rounded-full bg-gray-200">
                <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900">
                  <svg class="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                  </svg>
                </span>
                <div class="flex flex-col flex-1 text-left">
                  <h3 class="text-sm font-medium">{{ selectedStartTime }} - {{ selectedEndTime }} &nbsp; ({{ duration }})</h3>
                  <div class="divide-x divide-gray-200 mt-auto">
                    <span class="inline-block px-3 text-xs text-gray-500">{{ $t('home4.visittime') }}</span>
                  </div>
                </div>
              </div>
        
              <div  class="flex items-center space-x-4 p-1 rounded-full bg-gray-200">
                <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-900">
                  <svg class="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                    <line x1="8" y1="9" x2="16" y2="9" />
                    <line x1="8" y1="13" x2="14" y2="13" />
                  </svg>
                </span>
                <div class="flex flex-col flex-1 text-left">
                  <h3 class="text-sm font-medium">{{ purposeofvisit }}</h3>
                  <div class="divide-x divide-gray-200 mt-auto">
                    <span class="inline-block px-3 text-xs text-gray-500">{{ $t('home4.purposeofvisit') }}</span>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>


      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 50px;">
        <div style="display: flex; align-items: center;  margin-left: 20px; margin-top: 20px;">
          <h2 style="font-size: 18px; font-weight: bold; margin-right: 10px;">{{ $t('home4.Press') }}</h2>
          <img src="@/assets/images/img28.png" alt="search image" style="width: 50px; height: auto; margin-right: 10px;">
          <h2 style="font-size: 18px; font-weight: bold; ">{{ $t('home4.confirmyourbooking') }}</h2>
        </div>
          
        <div style="max-width: 350px; margin-left: 10px;">
          <div class="card" style="width: 95%; background: #fff; box-shadow: 0  15px 30px rgba(0, 140, 255, 5); padding: 10px; border-radius: 5px; margin-top: 5px;">
            <div data-placeholder class="overflow-hidden relative ">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 25px;">
              
              <div  class="card_load" style="width: 75px; height: 65px; position: relative; background: linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0 40%, #e5e5e5 48%); border-radius: 50%; background-size: 200% 100%; background-position: 100% 0; animation: load89234 2s infinite;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                  
                  <input id="checkboxQR" type="checkbox" class="hidden peer" @change="toggleButtonVisibility">
                  <label for="checkboxQR" class="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-green-500 border rounded-full overflow-hidden" style="transform: scale(2.0);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                      <path d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z" data-name="7-Check" data-original="#000000" />
                    </svg>
                  </label>
                </div>
              </div>
              
              <button @click="toggleCard" class="border text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-20 w-60 rounded-md bg-neutral-800 p-2 font-extrabold hover:bg-sky-700">
                <div class="absolute group-hover:-top-2 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-14 bg-yellow-500"></div>
                <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-4 bg-orange-500"></div>
                <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-3 bg-pink-500"></div>
                <div class="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
                <p class="z-10 absolute bottom-2 left-2 top-10" style="font-size: 22px;">{{ $t('home4.confirm') }}</p>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div  v-if="showCard" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="flex flex-col items-center space-y-4">
      <div class="card px-4 sm:px-0">
        <div class="relative bg-black w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] group transition-all duration-700 aspect-video flex items-center justify-center">
          <div class="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-[98%] h-[98%] absolute group-hover:-translate-y-14">
            <p class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-500 font-serif">
              {{ $t('home4.thankyou') }}
            </p>
            <p class="px-10 text-[14px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-gray-900">
              {{ $t('home4.bookingconfirmation') }}
            </p>
            <p class="font-serif text-[14px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-gray-900">
              {{ $t('home4.registeredemail') }}
            </p>
            <p class="font-sans text-[10px] sm:text-[11px] md:text-[12px] lg:text-[10px] text-black pt-3">
              {{ $t('home4.contactus') }}<br>
              <b>+66-2-7093367</b> <br>
              {{ $t('home4.or') }} <b>jinpao.co.th</b>.
            </p>
          </div>
          <button class="seal bg-rose-500 text-red-100 w-10 sm:w-11 md:w-12 lg:w-13 aspect-square rounded-full z-40 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900">
            {{ $t('home4.open') }}
          </button>
          <div class="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]">
          </div>
          <div class="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]">
          </div>
          <div class="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]">
          </div>
          <div class="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]">
          </div>
        </div>
      </div>
      <div>
        <a @click.prevent="returnToHomePage" class="group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-3 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 disabled:bg-gray-400 disabled:text-gray-600 ring-white text-white hover:text-gray-100 active:bg-gradient-to-r active:from-cyan-700 active:via-blue-800 active:to-indigo-900 active:text-gray-200 focus-visible:outline-blue-700 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl" href="">
          <svg class="h-8 w-8 text-white mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/>
          </svg>
          {{ $t('home4.returnhomepage') }}
        </a>
      </div>
    </div>
  </div>


  <div  v-if="showErrorModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg p-4 w-full max-w-sm transform scale-90 hover:scale-95 transition-transform duration-200">
      <div class="flex items-center mb-3">
        <svg class="w-8 h-8 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />  <polygon points="12 15 17 21 7 21 12 15" /></svg>
          <h2 class="text-2xl font-bold text-red-700">Error !</h2>
        </div>
      <p class="text-base text-white font-semibold text-center">{{ $t('home4.pleasepress') }}</p>
      <div class="flex justify-center items-center my-1">
        <img src="@/assets/images/img28.png" alt="Reminder Image" class="w-12 h-10 object-contain transform transition-transform duration-300 hover:scale-110">
      </div>
      <p class="text-base text-white font-semibold text-center">{{ $t('home4.confirmyour') }}</p>
  
      <div @click="closeErrorModal" class="flex justify-end mt-3">
        <button class="px-6 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-orange-800 hover:text-teal-500 border-2 border-transparent hover:border-teal-500">
          {{ $t('home4.ok') }}
        </button>
      </div>
    </div>
  </div>

  
  <div v-if="showNoDataModal" class="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-green-100">
    <div x-show="open" class="fixed inset-0 px-2 z-0 overflow-hidden flex items-center justify-center">
      <div x-show="open" x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform scale-75" x-transition:enter-end="transform scale-100" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform scale-100" x-transition:leave-end="transform scale-75" class="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
        <div class="bg-gradient-to-r from-blue-500 to-green-500 text-white px-2 py-2 flex justify-between items-center">
          <h2 class="text-xl font-bold flex items-center">
            {{ $t('home4.completed') }}
          </h2>
        </div>
        <div class="p-2">
          <div class="flex items-center mb-2">
            <svg class="w-12 h-12 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="9 11 12 14 20 6" />  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
            <p class="text-gray-700 leading-relaxed"> {{ $t('home4.registeredemailaddress') }} </p>
          </div>
        </div>
        <div class="border-t border-gray-200 px-2 py-2 flex justify-end">
          <button @click.prevent="returnToHomePage" class="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full w-full sm:w-auto hover:from-blue-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            {{ $t('home4.returnhomepage') }}
          </button>
        </div>
      </div>
    </div>
</div>


  <div style="margin-top: 10px;">

    <hr style="margin-top: 150px; border: 1.5px solid #CD5A00" />

  </div>



</template>


<style scoped>
@keyframes load89234 {
  100% {
    background-position: -100% 0;
  }
}


[data-placeholder]::after {
  content: " ";
  box-shadow: 0 0 40px 9px rgb(243, 238, 238);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%; 
  animation: load 2s infinite;
}
@keyframes load {
  0%{ left: -100%}
  100%{ left: 150%}
}


</style>
