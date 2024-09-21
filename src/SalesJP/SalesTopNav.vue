<template>
  <nav class="bg-gray-800 shadow-md h-16 flex items-center">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-1 flex justify-between w-full">
      <div class="flex items-center flex-shrink-0">
        <h1 style="font-size: 32px; font-weight: 900; color: white;">SALES</h1>
      </div>
      <div class="flex items-center flex-grow justify-center">
      </div>
      <div class="flex items-center">
        <button class="bg-stone-500 px-1 py-1 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <BellDotIcon class="h-7 w-7" stroke="white" />
        </button>
        <div class="ml-6 relative flex-shrink-0">
          <button @click="toggleUserCard" class="bg-stone-500 px-1 py-1 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <UserRoundCogIcon class="h-7 w-7" stroke="white" />
          </button>
        
        

          
        <div   v-if="showUserCard" class="user-card py-3">
            <div class="group before:hover:h-[190px] before:hover:w-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-48 before:h-14 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-48 h-[200px] relative bg-slate-50 flex flex-col items-center justify-start gap-2 text-center rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105">
              <div class="w-14 h-14 bg-blue-700 mt-6 mr-[-8px] rounded-full border-4 border-slate-50 z-10 group-hover:scale-125 group-hover:-translate-y-4 transition-all duration-500 shadow-md hover:shadow-lg overflow-hidden">
                <img src="@/assets/images/img15.png" alt="George Johnson" class="w-full h-full object-cover">
              </div>
              
              <div class="z-10 group-hover:-translate-y-3 transition-all duration-500">
                <ul class="flex flex-col items-start gap-1 has-[:last]:border-b-0 *:inline-flex *:gap-1 *:items-center *:justify-center *:border-b-[1px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-2">
                  <li>
                    <svg  id="phone" viewBox="0 0 24 24" class="h-4 w-4 fill-stone-700 group-hover:fill-[#58b0e0]" height="12" width="12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"></path>
                    </svg>
                    <p style="font-size: 13px; color: black;">+123-458-784</p>
                  </li>
                  <li>
                    <svg id="phone" viewBox="0 0 24 24" class=" h-4 w-4 fill-stone-700 group-hover:fill-[#58b0e0]" height="12" width="12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <p style="font-size: 13px; color: black;">smkys@gmail.com</p>
                  </li>
                  <li>
                    <svg class=" h-4 w-4 fill-stone-700 group-hover:fill-[#58b0e0]" height="12" width="12" id="globe" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g data-name="Layer 2">
                        <path data-name="globe" d="M22 12A10 10 0 0 0 12 2a10 10 0 0 0 0 20 10 10 0 0 0 10-10zm-2.07-1H17a12.91 12.91 0 0 0-2.33-6.54A8 8 0 0 1 19.93 11zM9.08 13H15a11.44 11.44 0 0 1-3 6.61A11 11 0 0 1 9.08 13zm0-2A11.4 11.4 0 0 1 12 4.4a11.19 11.19 0 0 1 3 6.6zm.36-6.57A13.18 13.18 0 0 0 7.07 11h-3a8 8 0 0 1 5.37-6.57zM4.07 13h3a12.86 12.86 0 0 0 2.35 6.56A8 8 0 0 1 4.07 13zm10.55 6.55A13.14 13.14 0 0 0 17 13h2.95a8 8 0 0 1-5.33 6.55z"></path>
                      </g>
                    </svg>
                    <p style="font-size: 13px; color: black;">smkydevelopr.com</p>
                  </li>
                </ul>
              </div>
          <div class="z-10 flex gap-2 justify-end w-full px-4">
                <button class="flex justify-center items-center gap-2 w-7 h-7 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] mb-2">
                      <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button class="flex justify-center items-center gap-2 w-7 h-7 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] mb-2">
                  <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="15" y1="5" x2="15" y2="7" />
                  <line x1="15" y1="11" x2="15" y2="13" />
                  <line x1="15" y1="17" x2="15" y2="19" />
                  <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
                </svg>
                </button>
              
                <button class="flex justify-center items-center gap-2 w-7 h-7 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] mb-2">
                  <svg class="w-5 fill-white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </button>
              
              </div>
            </div>
        </div>
          
          


          


        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { BellDotIcon, UserRoundCogIcon } from 'lucide-vue-next';

export default {
  name: 'AdminSalesTopNav',
  components: {
    BellDotIcon,
    UserRoundCogIcon
  },
  data() {
    return {
      showUserCard: false
    }
  },
  methods: {
    toggleUserCard() {
      this.showUserCard = !this.showUserCard;
    }
  }
};
</script>

<style scoped>
.user-card {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  z-index: 50;
}
</style>