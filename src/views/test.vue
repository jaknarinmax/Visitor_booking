
<template>


  <div class="flex flex-row h-48 mt-6 justify-center" style="padding-left: 100px; padding-right: 100px;">
    <div class="bg-no-repeat bg-red-200 border border-red-300 rounded-xl flex-1 mx-2 p-6"
    style="background-image: url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5); background-position: 90% center;">
    <p class="text-3xl text-indigo-900">Waiting for approval<br><strong>{{ totalEntries1 }}</strong> </p>
  <br>
    <button @click.prevent="showUnapprovedTickets" class="group relative inline-block px-8 py-2 font-medium">
      <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-white"></span>
      <span class="absolute inset-0 h-full w-full border-2 border-dotted border-red-600 bg-white group-hover:bg-red-600"></span>
      <span class="relative text-black group-hover:text-white">TICKET</span>
  </button>
  &nbsp; &nbsp; 
  <button @click.prevent="showTableofUnapprovedTickets" class="group relative inline-block px-8 py-2 font-medium">
    <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-white"></span>
    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-blue-600 bg-white group-hover:bg-black"></span>
    <span class="relative text-black group-hover:text-white">TABLE</span>
  </button>
  </div>

    <div class="bg-no-repeat bg-blue-200 border border-blue-300 rounded-xl flex-1 mx-2 p-6"
      style="background-image: url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5); background-position: 100% 40%;">
      <p class="text-3xl text-indigo-900">Approved tickets<br><strong>{{ totalEntriessucceed }}</strong></p>
      <br>
      <button @click.prevent="showapprovedticketssuccessful" class="group relative inline-block px-8 py-2 font-medium">
        <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-2 border-dotted border-blue-200 bg-black transition duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-white"></span>
        <span class="absolute inset-0 h-full w-full border-2 border-dotted border-red-600 bg-white group-hover:bg-red-600"></span>
        <span class="relative text-black group-hover:text-white">TICKET</span>
    </button>
    &nbsp; &nbsp; 
    <button   @click.prevent="showTableofunapprovedticketssucceed" class="group relative inline-block px-8 py-2 font-medium">
      <span class="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform border-2 border-dotted border-blue-200 bg-black transition duration-200 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-white"></span>
      <span class="absolute inset-0 h-full w-full border-2 border-dotted border-blue-600 bg-white group-hover:bg-black"></span>
      <span class="relative text-black group-hover:text-white">TABLE</span>
    </button>
    </div>

    <div class="bg-no-repeat bg-purple-200 border border-orange-300 rounded-xl flex-1 mx-2 p-6"
      style="background-image: url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5); background-position: 100% 40%;">
      <p class="text-3xl text-indigo-900">Successful tickets<br><strong>23</strong></p>
      <a href="" class="bg-purple-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-8 px-8 py-2"><strong>See more</strong></a>&nbsp;&nbsp;
      <a href="" class="bg-purple-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-8 px-8 py-2"><strong>Table</strong></a>
    </div>
  </div>







  

  <div v-if="Unapprovedtickets"  class="ticket-container py-8" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    <div class="bg-red-100" v-for="booking in bookings" :key="booking._id" style="flex-basis: calc(33.333% - 30px); margin-top: 15px; border-radius: 20px;">
      <div class="justify-content: center; max-w-md w-[360px] h-[189px] mx-auto bg-blue-900 rounded-2xl" style="display: flex; justify-content: center; align-items: center; position: relative;">  
        <div style="position: absolute; top: 0; right: 0; z-index: 10;">
          <span class="text-white px-3" style="border-top-right-radius: 20px; background-color: #1062EF; font-size: 13px; font-weight: bold; display: inline-block;">
            {{ formatDate(booking.bookedAt) }}
          </span>
        </div>

        <div style="position: absolute; bottom: 0; right: 0; z-index: 10;">
          <span class="max-w-md w-[300px] text-white px-4 py-0 flex items-center" style="border-bottom-right-radius: 20px; background-color: #1e398a; font-size: 14px; font-weight: bold;">
            <svg v-if="booking.scantime" class="h-4 w-4 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Datetime scan: {{ booking.scantime ? formatDateTime(booking.scantime) : '' }}
          </span>
        </div>
      
    
  <!-- Ticket -->
  <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
    <div style="width: 240px; height: 130px; position: relative; background-color: #b4cce4;">
        <!-- Outer black border -->
        <div style="border: 3px solid black; border-right: 0.5px dashed black; width: 100%; height: 100%; border-radius: 20px; position: absolute; top: 0; left: 0;">
        </div>
        <div style="border: 3px solid black; width: 88%; height: 77%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-image: ">
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; box-sizing: border-box; position: relative; z-index: 2;">
            <table style="border-collapse: collapse; width: 80%;">
                <tr style="background-color: black; color: white;">
                    <td style="border: 2px solid black; text-align: center; font-weight: 900; font-size: 15px; color: #b4cce4; letter-spacing: 2px; font-weight: 900;"
                        colspan="4">TICKET</td>
                </tr>

                <tr>
                  <td style="border: 2px solid black; text-align: center;">
                    <div style="font-size: 9px; font-weight: 600; text-align: left;">
                        DATE: &nbsp;&nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ formatDate(booking.visitdate) }}</span>
                    </div>
                </td>
                <td style="border: 2px solid black; text-align: center;">
                  <div style="font-size: 9px; font-weight: 600; text-align: left;">&nbsp;
                      PERSON: &nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ booking.numberofpeople }}</span>
                  </div>
                </td>
                </tr>
              </table>

                <table style="border-collapse: collapse; width: 80%; margin-top: -2px;">
                <tr>
                  <td style="border: 2px solid black; text-align: center; ">
                    <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                        START TIME:</div>
                    <div style="font-size: 12px; font-weight: bold; color: #660000; margin-top: -3px; padding: 0 4px;">
                      {{ booking.starttime }}</div>
                </td>
                <td style="border: 2px solid black; text-align: center;">
                    <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                        END TIME:</div>
                    <div style="font-size: 12px; font-weight: bold; color: #660000; margin-top: -3px; padding: 0 4px;">
                      {{ booking.endtime }}</div>
                </td>
              </tr>
            </table>
            <!-- Decorative circles -->
            <div style="position: absolute; top: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-45deg); z-index: 1;"></div>
            <div style="position: absolute; top: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%;border: 3px solid transparent; border-bottom-color: black; transform: rotate(-44deg);"></div>
            <div style="position: absolute; bottom: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-135deg); z-index: 1;"></div>
            <div style="position: absolute; bottom: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-140deg);"> </div>
            <div style="position: absolute; top: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-right-color: black; transform: rotate(45deg); z-index: 1;"></div>
            <div style="position: absolute; top: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(44deg);"></div>
            <div style="position: absolute; bottom: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-left-color: black; transform: rotate(135deg); z-index: 1;"></div>
            <div style="position: absolute; bottom: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(140deg);"></div>
        </div>
    </div>
    <div style="width: 90px; height: 130px; position: relative; background-color: #b4cce4; z-index: 1;">
        <div style="border: 3px solid black; border-left: 0.5px dashed black; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
            <div class="date-container py-2" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 5px; margin-top: 10px; position: relative; z-index: 2;">
              <span style="position: relative; z-index: 3;">
                <button @click.prevent="Approveticket(booking._id)" class="rounded-md bg-black">
                  <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-green-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                  style="font-size: 13px; font-weight: bold;">Approval</span>                
                </button>
              </span>
              <span style="margin-top: 10px; position: relative; z-index: 3;">
                <button @click.prevent="handleOpenparticipantsOnTicke(booking)"  class="rounded-md bg-black">
                  <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-sky-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0" style="font-size: 12px;">View <br>Participant</span>
                </button>
              </span>
            </div>
        </div>
        <div style="position: absolute; top: 0; right: 0; width: 4px; height: 100%; background-color: white;">
        </div>
        <svg width="100%" height="100%" viewBox="0 0 13.5 40" xmlns="http://www.w3.org/2000/svg" transform="translate(42)">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color: #1c3c8c; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #1c3c8c; stop-opacity: 1" />
                </linearGradient>
            </defs>
            <path d="M8,0L5,2 L7,4 L5,6 L7,8 L5,10 L7,12 L5,14 L7,16 L5,18 L7,20 L5,22 L7,24 L5,26 L7,28 L5,30 L7,32 L5,34 L7,36 L5,38L8,40" fill="url(#grad)" stroke="black" stroke-width="0.5" stroke-linejoin="round" />
        </svg>
    </div>
</div>

<!-- Ticket -->
    </div>
  </div>
</div>


 <!-- ParticipantsOnTicket -->
 <teleport to="body">
  <div v-if="showParticipantsOnTicket" class="dialog-overlay fixed inset-0 bg-grey-50 bg-opacity-50 z-50 flex items-center justify-center" @click="handleCloseparticipantsOnTicke">
                <div class="dialog" :class="{ 'dialog-enter': isOpen, 'dialog-leave': !isOpen }" @click.stop>

            <div class="flex flex-col px-3 py-2">
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black; font-size: 10px;">NO.</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">COMPANY NAME</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black; font-size: 10px;">NAME-SURNAME</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">ID CARD/PASSPORT</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black; font-size: 10px;">EMAIL</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">JOURNEY<br>CARREGISTRATION</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black; font-size: 10px;">PHONE NUMBER</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black; font-size: 10px;">COUNTRY</th>
                            <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black; font-size: 10px;">AGE</th>
                            <th class="bg-red-200  px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black; font-size: 10px;">STATUS</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(participant, index) in currentParticipants" :key="participant._id">
                        <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px; ">{{ index + 1 }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.companyname }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.name }} {{ participant.surname }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm text-center">
                          <div style="font-size: 8px; font-weight: bold; color: #111111; text-align: left;">
                            <span style="font-size: 10px;">{{ participant.passportno ? 'Passport No:' : '' }}</span>
                            <span style="font-size: 10px;">{{ participant.thaiid ? 'Thai ID:' : '' }}</span>
                            <span style="font-size: 12px;  margin-top: -5px;">
                              &nbsp;{{ participant.thaiid ? participant.thaiid : participant.passportno }}
                            </span>
                          </div>
                        </td> 
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.email }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.selectjourney }}</p>
                          <p class="text-gray-900 text-center" style="font-size: 12px;">( {{ participant.carregistration }} )</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.telephonenumber }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.country }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.age }}</p>
                        </td>
                        <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                          <span class="text-center inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" style="font-size: 12px;" >
                          {{ participant.selectstatus }}
                          </span>
                      </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
                    
                </div>
            </div>
    </teleport>





        <div v-if="Tableofunapprovedtickets" class="py-8">
          <div class="my-2 flex sm:flex-row flex-col" style="margin-left: 120px;">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative">
                <select @change="changeEntriesPerPage($event.target.value)" class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>

            <div class="block relative">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input v-model="searchQuery" placeholder="Search" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
            <div class="flex items-center ml-auto" style="margin-right: 80px;">
                <input v-model="startDate" type="date" class="date-input" style="border: 1.5px solid #D3D3D3; padding: 5px;">
              <span class="mx-2">To</span>
              <input v-model="endDate" type="date" class="date-input" style="border: 1.5px solid #D3D3D3; padding: 5px;">&nbsp;&nbsp;
              <a @click="applyFilters" class=" h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-6 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 border-b-sky-800 disabled:border-0 disabled:bg-sky-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-sky-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900">
                Search
              </a>
            </div>
          </div>
          
          <!-- Table section -->
          <div class="px-4 sm:px-8 py-4 overflow-x-auto" style="width: 90%; margin-left: 100px;">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 4%;">No</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 12%;">SALES NAME</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%;">DATE</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%;">START TIME</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 7%;">END TIME</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 25%;">PURPOSE OF VISIT</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%;">BOOKING DATE</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%;">SCAN DATE</th>
                    <th class="bg-red-300 px-1 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 9%;">VIEW/EDIT/DELETE/APPROVE<br>BOOKING/PARTICIPANT</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(booking, index) in paginatedBookings" :key="booking._id">
                    <tr>
                      <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ (currentPage - 1) * entriesPerPage + index + 1 }}
                        </p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ booking.salesFirstName }} {{ booking.salesLastName }}
                        </p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ formatDate(booking.visitdate) }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ booking.starttime }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ booking.endtime }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap text-center">{{ booking.Purposeofvisit }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ formatDateTime(booking.bookedAt) }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ booking.scantime ? formatDateTime(booking.scantime) : '' }}</p>
                      </td>
                      <td class="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                        <a href="#" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block" @click.prevent="toggleTableparticipants(booking)">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </i>
                        </a>

                        <a href="#" @click.prevent="startEditingBooking(booking)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </i>
                        </a>

                        <a href="#" @click.prevent="confirmDeleteBooking(booking._id)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </i>
                        </a>

                        <a href="#" @click.prevent="Approveticket(booking._id)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </i>
                        </a>
                        
                      </td>
                    </tr>
                    <tr v-if="booking.showParticipants">
                      <td colspan="9" class="px-5 py-5 bg-white">
                        <table class="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black;">NO.</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">COMPANY NAME</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black;">NAME-SURNAME</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">ID CARD/PASSPORT</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black;">EMAIL</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">JOURNEY<br>CARREGISTRATION</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black;">PHONE NUMBER</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black;">COUNTRY</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black;">AGE</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 6%; border-top: 1px solid black;">STATUS</th>
                              <th class="bg-red-200 px-1 py-1 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 1%; border-top: 1px solid black;">ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(participant, participantIndex) in booking.participants" :key="participant.id">
                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participantIndex + 1 }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.companyname }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.name }} {{ participant.surname }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <div style="font-size: 8px; font-weight: bold; color: #111111; text-align: left;">
                                  <span style="font-size: 10px;">{{ participant.passportno ? 'Passport No:' : '' }}</span>
                                  <span style="font-size: 10px;">{{ participant.thaiid ? 'Thai ID:' : '' }}</span>
                                  <span style="font-size: 14px;  margin-top: -5px;">
                                    &nbsp;{{ participant.thaiid ? participant.thaiid : participant.passportno }}
                                  </span>
                                </div>
                              </td> 
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.email }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.selectjourney }}</p>
                                <p class="text-gray-900">( {{ participant.carregistration }} )</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.telephonenumber }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.country }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900">{{ participant.age }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" >
                                {{ participant.selectstatus }}
                                </span>
                            </td>
                            <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                              <div class="inline-flex space-x-2">
                                  <button @click="editParticipant(participant)" class="relative border-2 border-dashed rounded border-green-500 px-1 py-1 cursor-pointer text-sm font-bold before:bg-green-400 hover:rounded-b-none before:absolute before:bottom-0 before:left-0 before:block before:h-[8px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                      EDIT
                                  </button>
                                  <button @click="bookingIdToDelete = booking._id; participantIdToDelete = participant._id; showModalDeletesales = true;" class="relative border-2 border-dashed rounded border-red-500 px-1 py-1 cursor-pointer text-sm font-bold before:bg-red-500 hover:rounded-b-none before:absolute before:bottom-0 before:left-0 before:block before:h-[8px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    DELETE
                                  </button>
                              </div>
                            </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table> 
              <!-- Pagination -->
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span class="text-xs xs:text-sm text-gray-900">
                  Showing {{ (currentPage - 1) * entriesPerPage + 1 }} to 
                  {{ Math.min(currentPage * entriesPerPage, totalEntries) }} of 
                  {{ totalEntries }} Entries
                  {{ isFiltered ? `(filtered from ${bookings.length} total entries)` : '' }}                
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button @click="prevPage" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-orange-300 transition-all duration-400 rounded-l-lg" style="padding: 8px 16px; border-bottom: 4px solid #FF6633; color: black; transition: all 0.4s;">
                    Prev
                  </button>
                  <button @click="nextPage" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-blue-400 transition-all duration-400 rounded-r-lg" style="padding: 8px 16px; border-bottom: 4px solid blue; color: black; transition: all 0.4s;">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>











        <div v-if="approvedticketssuccessful" class="ticket-container py-8 " style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
          <div class="bg-blue-100" v-for="booking in bookingssucceed" :key="booking._id"  style="flex-basis: calc(33.333% - 30px); margin-top: 15px; border-radius: 20px;">
            <div class="justify-content: center; max-w-md w-[360px] h-[175px] mx-auto bg-blue-900 rounded-2xl" style="display: flex; justify-content: center; align-items: center; position: relative;">  
              <div style="position: absolute; top: 0; right: 0; z-index: 10;">
                <span class="text-white px-3" style="border-top-right-radius: 20px; background-color: #1062EF; font-size: 13px; font-weight: bold; display: inline-block;">
                  Approved Date:  {{ formatDateTime(booking.createdAt) }}
                </span>
              </div>
        <!-- Ticket -->
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
          <div style="width: 240px; height: 130px; position: relative; background-color: #b4cce4;">
              <!-- Outer black border -->
              <div style="border: 3px solid black; border-right: 0.5px dashed black; width: 100%; height: 100%; border-radius: 20px; position: absolute; top: 0; left: 0;">
              </div>
              <div style="border: 3px solid black; width: 88%; height: 77%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-image: ">
              </div>
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; box-sizing: border-box; position: relative; z-index: 2;">
                  <table style="border-collapse: collapse; width: 80%;">
                      <tr style="background-color: black; color: white;">
                          <td style="border: 2px solid black; text-align: center; font-weight: 900; font-size: 15px; color: #b4cce4; letter-spacing: 2px; font-weight: 900;"
                              colspan="4">TICKET</td>
                      </tr>
      
                      <tr>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 9px; font-weight: 600; text-align: left;">
                              DATE: &nbsp;&nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ formatDate(booking.visitdate) }}</span>
                          </div>
                      </td>
                      <td style="border: 2px solid black; text-align: center;">
                        <div style="font-size: 9px; font-weight: 600; text-align: left;">&nbsp;
                            PERSON: &nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ booking.numberofpeople }}</span>
                        </div>
                      </td>
                      </tr>
                    </table>
      
                      <table style="border-collapse: collapse; width: 80%; margin-top: -2px;">
                      <tr>
                        <td style="border: 2px solid black; text-align: center; ">
                          <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                              START TIME:</div>
                          <div style="font-size: 12px; font-weight: bold; color: #660000; margin-top: -3px; padding: 0 4px;">
                            {{ booking.starttime }}</div>
                      </td>
                      <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                              END TIME:</div>
                          <div style="font-size: 12px; font-weight: bold; color: #660000; margin-top: -3px; padding: 0 4px;">
                            {{ booking.endtime }}</div>
                      </td>
                    </tr>
                  </table>
                  <!-- Decorative circles -->
                  <div style="position: absolute; top: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-45deg); z-index: 1;"></div>
                  <div style="position: absolute; top: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%;border: 3px solid transparent; border-bottom-color: black; transform: rotate(-44deg);"></div>
                  <div style="position: absolute; bottom: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-135deg); z-index: 1;"></div>
                  <div style="position: absolute; bottom: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-140deg);"> </div>
                  <div style="position: absolute; top: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-right-color: black; transform: rotate(45deg); z-index: 1;"></div>
                  <div style="position: absolute; top: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(44deg);"></div>
                  <div style="position: absolute; bottom: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-left-color: black; transform: rotate(135deg); z-index: 1;"></div>
                  <div style="position: absolute; bottom: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(140deg);"></div>
              </div>
          </div>
          <div style="width: 90px; height: 130px; position: relative; background-color: #b4cce4; z-index: 1;">
              <div style="border: 3px solid black; border-left: 0.5px dashed black; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                  <div class="date-container py-2" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 5px; margin-top: 10px; position: relative; z-index: 2;">
                    <span style="position: relative; z-index: 1;">
                        <button class="rounded-md bg-black">
                          <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-green-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                              style="font-size: 10px; font-weight: bold;">GIVE <br>TICKETS</span>
                        </button>
                    </span>
                    <span style="margin-top: 10px; position: relative; z-index: 2;">
                        <button @click.prevent="handleOpenparticipantsOnTicke(booking)"  class="rounded-md bg-black">
                              <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-sky-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                                  style="font-size: 10px; font-weight: bold;">View <br>Participant</span>
                        </button>
                    </span>
                  </div>
              </div>
              <div style="position: absolute; top: 0; right: 0; width: 4px; height: 100%; background-color: white;">
              </div>
              <svg width="100%" height="100%" viewBox="0 0 13.5 40" xmlns="http://www.w3.org/2000/svg" transform="translate(42)">
                  <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style="stop-color: #1c3c8c; stop-opacity: 1" />
                          <stop offset="100%" style="stop-color: #1c3c8c; stop-opacity: 1" />
                      </linearGradient>
                  </defs>
                  <path d="M8,0L5,2 L7,4 L5,6 L7,8 L5,10 L7,12 L5,14 L7,16 L5,18 L7,20 L5,22 L7,24 L5,26 L7,28 L5,30 L7,32 L5,34 L7,36 L5,38L8,40" fill="url(#grad)" stroke="black" stroke-width="0.5" stroke-linejoin="round" />
              </svg>
          </div>
      </div>
      
      <!-- Ticket -->
          </div>
        </div>
      </div>
      
      
      <!-- ParticipantsOnTicket -->
     <teleport to="body">
        <div v-if="showParticipantsOnTicket" class="dialog-overlay fixed inset-0 bg-grey-50 bg-opacity-50 z-50 flex items-center justify-center" @click="handleCloseparticipantsOnTicke">
                      <div class="dialog" :class="{ 'dialog-enter': isOpen, 'dialog-leave': !isOpen }" @click.stop>
      
                  <div class="flex flex-col px-3 py-2">
                      <table class="table-auto w-full">
                          <thead>
                              <tr>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black; font-size: 10px;">NO.</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">COMPANY NAME</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black; font-size: 10px;">NAME-SURNAME</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">ID CARD/PASSPORT</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black; font-size: 10px;">EMAIL</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black; font-size: 10px;">JOURNEY<br>CARREGISTRATION</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black; font-size: 10px;">PHONE NUMBER</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black; font-size: 10px;">COUNTRY</th>
                                  <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black; font-size: 10px;">AGE</th>
                                  <th class="bg-red-200  px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black; font-size: 10px;">STATUS</th>
                                  
                              </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(participant, index) in currentParticipants" :key="participant._id">
                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px; ">{{ index + 1 }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.companyname }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.name }} {{ participant.surname }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm text-center">
                                <div style="font-size: 8px; font-weight: bold; color: #111111; text-align: left;">
                                  <span style="font-size: 10px;">{{ participant.passportno ? 'Passport No:' : '' }}</span>
                                  <span style="font-size: 10px;">{{ participant.thaiid ? 'Thai ID:' : '' }}</span>
                                  <span style="font-size: 12px;  margin-top: -5px;">
                                    &nbsp;{{ participant.thaiid ? participant.thaiid : participant.passportno }}
                                  </span>
                                </div>
                              </td> 
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.email }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.selectjourney }}</p>
                                <p class="text-gray-900 text-center" style="font-size: 12px;">( {{ participant.carregistration }} )</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.telephonenumber }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.country }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.age }}</p>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <span class="text-center inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" style="font-size: 12px;" >
                                {{ participant.selectstatus }}
                                </span>
                            </td>
                                  
                              </tr>
                          </tbody>
                      </table>
                  </div>
                          
                      </div>
                  </div>
          </teleport>






      
        <div v-if="Tableofunapprovedticketssucceed"  class="py-8">
          <div class="my-2 flex sm:flex-row flex-col" style="margin-left: 120px;">
              <div class="flex flex-row mb-1 sm:mb-0">
                <div class="relative">
                  <select @change="changeEntriesPerPagesucceed($event.target.value)"
                      class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                  </select>
              </div>
              </div>
  
              <div class="block relative">
                  <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                          <path
                              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                          </path>
                      </svg>
                  </span>
                  <input v-model="searchQuerysucceed" placeholder="Search"
                      class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
              </div>
              <div class="flex items-center ml-auto" style="margin-right: 80px;">
                  <input v-model="startDatesucceed" type="date" class="date-input"
                      style="border: 1.5px solid #D3D3D3; padding: 5px;">
                  <span class="mx-2">To</span>
                  <input v-model="endDatesucceed" type="date" class="date-input"
                      style="border: 1.5px solid #D3D3D3; padding: 5px;">&nbsp;&nbsp;
                  <a @click="applyFilterssucceed"
                      class="h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-6 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 border-b-sky-800 disabled:border-0 disabled:bg-sky-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-sky-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900">
                      Search
                  </a>
              </div>
          </div>
  
          <!-- Table section -->
          <div class="px-4 sm:px-8 py-4 overflow-x-auto" style="width: 90%; margin-left: 100px;">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                      <thead>
                          <tr>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 4%;">No</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 12%;">SALES NAME</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%;">DATE</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%;">START TIME</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 7%;">END TIME</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 27%;">PURPOSE OF VISIT</th>
                              <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%;">APPROVAL DATE</th>
                              <th class="bg-blue-300 px-1 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%;">VIEWPARTICIPANT/<br>DELETEBOOKING/<br>GIVE TICKETS</th>
                          </tr>
                      </thead>
                      <tbody>
                        <template v-for="(booking, index) in paginatedBookingssucceed" :key="booking._id">
                          <tr>
                                  <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">
                                        {{ (currentPagesucceed - 1) * entriesPerPagesucceed + index + 1 }}
                                      </p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">
                                        {{ getUserName(booking.userId._id) }}
                                      </p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">{{ formatDateTimedate(booking.visitdate)}}</p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">{{ booking.starttime }}</p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">{{ booking.endtime }}</p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap text-center">{{ booking.Purposeofvisit }}</p>
                                  </td>
                                  <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                                      <p class="text-gray-900 whitespace-no-wrap">{{ formatDateTime(booking.createdAt) }}
                                      </p>
                                  </td>
                                  <td class="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                      <a class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block"
                                          @click.prevent="toggleSuccessfullyTicket(booking._id)">
                                          <i class="material-icons-round text-base">
                                              <svg class="h-7 w-7 text-blue-500" viewBox="0 0 24 24" fill="none"
                                                  stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                  stroke-linejoin="round">
                                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                  <circle cx="12" cy="12" r="3" />
                                              </svg>
                                          </i>
                                      </a>
  
                                      <a @click.prevent="toggledeletesuccessfullyTicket(booking)"
                                      class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                                          <i class="material-icons-round text-base">
                                              <svg class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24"
                                                  stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                              </svg>
                                          </i>
                                      </a>
  
                                      <a 
                                      class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                                          <i class="material-icons-round text-base">
                                              <svg class="h-7 w-7 text-fuchsia-600" fill="none" viewBox="0 0 24 24"
                                                  stroke="currentColor">
                                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                              </svg>
                                          </i>
                                      </a>
  
                                  </td>
                              </tr>
                          <tr v-if="showSuccessfullyTicket[booking._id]">
                              <td colspan="8" class="px-5 py-5 bg-white">
                                  <table class="min-w-full leading-normal">
                                      <thead>
                                          <tr>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black;">NO.</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">COMPANY NAME</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black;">NAME-SURNAME</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">ID CARD/PASSPORT</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black;">EMAIL</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black;">JOURNEY<br>CARREGISTRATION</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black;">PHONE NUMBER</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black;">COUNTRY</th>
                                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black;">AGE</th>
                                              <th class="bg-blue-200  px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black;">STATUS</th>
                                              <th class="bg-blue-200 px-1 py-1 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 1%; border-top: 1px solid black;">ACTION</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(participant, pIndex) in booking.participants" :key="participant._id">
                                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ pIndex + 1 }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-l border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.companyname }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.name }} {{ participant.surname }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <div style="font-size: 8px; font-weight: bold; color: #111111; text-align: left;">
                                                      <span style="font-size: 10px;">{{ participant.passportno ? 'Passport No:' : '' }}</span>
                                                      <span style="font-size: 10px;">{{ participant.thaiid ? 'Thai ID:' : '' }}</span>
                                                      <span style="font-size: 14px;  margin-top: -5px;">
                                                      &nbsp;{{ participant.thaiid ? participant.thaiid : participant.passportno }}
                                                      </span>
                                                  </div>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.email }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.selectjourney }}</p>
                                                  <p class="text-gray-900">( {{ participant.carregistration }} )</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.telephonenumber }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.country }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <p class="text-gray-900">{{ participant.age }}</p>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <span class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" >
                                                      {{ participant.selectstatus }}
                                                  </span>
                                              </td>
                                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                                  <div class="inline-flex space-x-2">
                                                      <button @click="toggleDeleteParticipant(booking, participant)"  class="relative border-2 border-dashed rounded border-red-500 px-1 py-1 cursor-pointer text-sm font-bold before:bg-red-500 hover:rounded-b-none before:absolute before:bottom-0 before:left-0 before:block before:h-[8px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                                          DELETE
                                                      </button>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </template>
                  </tbody>
              </table>

              <!-- Pagination -->
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span class="text-xs xs:text-sm text-gray-900">
                    Showing {{ (currentPagesucceed - 1) * entriesPerPagesucceed + 1 }} to 
                    {{ Math.min(currentPagesucceed * entriesPerPagesucceed, filteredBookingssucceed.length) }} of 
                    {{ filteredBookingssucceed.length }} Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                    <button @click="prevPagesucceed" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
                        Prev
                    </button>
                    <button @click="nextPagesucceed" class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
                        Next
                    </button>
                </div>
            </div>
          </div>
      </div>
  </div>
                    


























        <div v-if="editingParticipant" class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div class="max-w-4xl mx-auto bg-white overflow-hidden md:max-w-2xl m-4 transform hover:scale-105 transition duration-200" style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5); border-radius: 15px;">
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gray-200 flex flex-col justify-between py-10">
            <div class="space-y-2">
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            </div>
            <div class="space-y-2">
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
              <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            </div>
          </div>
          <div class="md:flex pl-8">
            <div class="md:shrink-0">
              <div class="h-full w-full md:w-4 bg-gradient-to-br from-purple-600 to-blue-500"></div>
            </div>
            <div class="p-10">
              <form @submit.prevent="updateParticipant" class="space-y-4 px-6" style="width: 100%;">
                <div class="uppercase tracking-wide text-lg text-indigo-600 font-semibold mb-1">
                  <u>EDIT PARTICIPANT</u>
                </div> 
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="companyname">Company Name</label>
                    <input v-model="editingParticipant.companyname" type="text" id="companyname" name="companyname" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter company name">
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="selectjourney">Select Journey</label>
                    <select v-model="editingParticipant.selectjourney" id="selectjourney" name="selectjourney" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                      <option disabled value="">Select journey</option>
                      <option v-for="journey in journeyOptions" :key="journey" :value="journey">{{ journey }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="carregistration">Car Registration</label>
                    <input v-model="editingParticipant.carregistration" type="text" id="carregistration" name="carregistration" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter car registration">
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="selectstatus">Select Status</label>
                    <select v-model="editingParticipant.selectstatus" id="selectstatus" name="selectstatus" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                      <option disabled value="">Select status</option>
                      <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="name">Name</label>
                    <input v-model="editingParticipant.name" type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter name">
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="surname">Surname</label>
                    <input v-model="editingParticipant.surname" type="text" id="surname" name="surname" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter surname">
                  </div>
                </div>
              
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="email">E-mail</label>
                    <input v-model="editingParticipant.email" type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter email">
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="telephonenumber">Telephone number</label>
                    <input v-model="editingParticipant.telephonenumber" type="tel" id="telephonenumber" name="telephonenumber" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter phone number">
                  </div>
                </div>
              
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="country">Country</label>
                    <input v-model="editingParticipant.country" type="text" id="country" name="country" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter country">
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700" for="age">Age</label>
                    <input v-model="editingParticipant.age" type="text" id="age" name="age" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50" placeholder="Enter age">
                  </div>
                </div>
              
                <div class="flex justify-end space-x-4 ">
                  <a @click="updateParticipant" class="relative rounded px-16 py-2 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span class="relative"><b>Save</b></span>
                    </a>

                  <a @click="cancelEdit" class="relative rounded px-16 py-2 overflow-hidden group bg-red-400 relative hover:bg-gradient-to-r hover:from-red-400 hover:to-red-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-300 transition-all ease-out duration-300">
                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span class="relative"><b>Cancel</b></span>
                  </a>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div v-if="editingBooking" class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
        <div class="max-w-4xl mx-auto bg-white overflow-hidden md:max-w-2xl m-4 transform hover:scale-105 transition duration-200" style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5); border-radius: 15px;">
          <div class="absolute left-0 top-0 bottom-0 w-8 bg-gray-200 flex flex-col justify-between py-10">
          <div class="space-y-2">
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
          </div>
          <div class="space-y-2">
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
            <div class="h-2 w-6 bg-gray-500 rounded-full ml-1"></div>
          </div>
        </div>
        <div class="md:flex pl-8">
          <div class="md:shrink-0">
            <div class="h-full w-full md:w-4 bg-gradient-to-br from-purple-600 to-blue-500"></div>
          </div>
          <div class="p-10">
      
            <form @submit.prevent="saveEditedBooking" class="space-y-4 px-6" style="width: 100%;">
              <div class="uppercase tracking-wide text-lg text-indigo-600 font-semibold mb-1">
                <u>EDIT Booking</u>
              </div>
              
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700" for="visitdate">Date</label>
                <input v-model="editingBooking.visitdate" type="date" id="visitdate" class="date-input" style="border: 1.5px solid #D3D3D3; padding: 5px; width: 300px;" @input="formatDateInput">
              </div>

              <div class="flex space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="starttime">Start time</label>
                  <select v-model="editingBooking.starttime" id="starttime" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                    <option v-for="timeSlot in availableTimes" :key="timeSlot.time" :value="timeSlot.time" :disabled="!timeSlot.available">
                      {{ timeSlot.time }}
                    </option>                 
                  </select>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700" for="endtime">End time</label>
                  <select v-model="editingBooking.endtime" id="endtime" class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                    <option v-for="timeSlot in filteredEndTimes" :key="timeSlot.time" :value="timeSlot.time" :disabled="!timeSlot.available">
                      {{ timeSlot.time }}
                    </option>                  
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button type="submit" class="relative rounded px-16 py-2 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative"><b>Save</b></span>
                </button>

                <button @click="cancelEditingBooking" type="button" class="relative rounded px-16 py-2 overflow-hidden group bg-red-400 relative hover:bg-gradient-to-r hover:from-red-400 hover:to-red-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-300 transition-all ease-out duration-300">
                  <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span class="relative"><b>Cancel</b></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



    <section v-if="showModalDeletesales"
      class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
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
      <button @click="confirmDeleteParticipant"
        class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-red-600 hover:border-2">
        <span class="text-slate-600 relative z-10"><b>OK</b></span>
        </button>
      <button @click="cancelDeleteParticipant"
              class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
        <span class="text-slate-600 relative z-10"><b>Cancel</b></span>
      </button>
      </div>
    </div>
    </section>


    <section v-if="showModalDeleteBooking"
      class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
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
        <button @click="deleteBooking"
            class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-red-600 hover:border-2">
            <span class="text-slate-600 relative z-10"><b>OK</b></span>
        </button>

        <button @click="cancelDeleteBooking"
            class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
            <span class="text-slate-600 relative z-10"><b>Cencle</b></span>
        </button>
      </div>
    </div>
    </section>


    <section v-if="showModalapproveticket"
    class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
      <svg class="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <div>
        <h4 class="text-slate-600 font-bold text-base text-center">
          Approve Ticket
        </h4>
        <p class="text-slate-600 text-xs mt-2 md:mt-1 text-center">
          Are you sure you want to approve this ticket?
        </p>
      </div>
      <div class="flex">
        <button @click="confirmApproveTicket"
          class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-green-400 bg-white text-green-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-green-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-green-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>OK</b></span>
        </button>
  
        <button @click="cancelApproveTicket"
          class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>Cancel</b></span>
        </button>
      </div>
    </div>
  </section>


<!--modalsucced-->

<section v-if="showModalDeletesuccessfullyTicket" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
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
  <button @click="deleteBookingTicket"
      class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-red-600 hover:border-2">
      <span class="text-slate-600 relative z-10"><b>OK</b></span>
  </button>
  <button @click="cancelDeleteBookingTicket"
      class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
      <span class="text-slate-600 relative z-10"><b>Cencle</b></span>
  </button>
  </div>
</div>
</section>



<section v-if="showModalDeleteparticipantssuccessfullyTicket" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
          <svg class="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
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
      <button @click="deleteBookingparticipantsTicket" class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-red-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>OK</b></span>
      </button>
      <button @click="cancelDeleteBookingparticipantsTicket" class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>Cencle</b></span>
      </button>
  </div>
</div>
</section>



        <div>
          <hr style="margin-top: 300px; border: 1.5px solid #CD5A00" />
        </div>

  </template>
  

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        bookings: [],
        salesList: [],
        loading: true,
        error: null,
        editingParticipant: null,
        editingBooking: null,
        statusOptions: ['Visitors', 'Customer', 'Partner', 'Other'],
        journeyOptions: ['Arrange by Jinpao', 'self rental vehical', 'Personal vehicle'],
        showModalDeletesales: false,
        showModalDeleteBooking: false,
        times: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
        unavailableTimes: [],
        availableTimes: null,
        bookingIdToDelete: null,
        participantIdToDelete: null,
        searchQuery: '',
        startDate: '',
        endDate: '',
        isFiltered: false,
        entriesPerPage: 10,
        currentPage: 1,
        totalPages: 1,
        Unapprovedtickets: false,
        Tableofunapprovedtickets: false,
        showModalapproveticket: false,
        bookingIdToApprove: null,
  
        // succeed
        bookingssucceed: [],
        showSuccessfullyTicket: {},
        showModalDeletesuccessfullyTicket: false,
        bookingToDelete: null,
        showModalDeleteparticipantssuccessfullyTicket: false,
        participantToDelete: null,
        bookingForParticipantDelete: null,
        searchQuerysucceed: '',
        startDatesucceed: '',
        endDatesucceed: '',
        currentPagesucceed: 1,
        entriesPerPagesucceed: 10,
        totalFilteredEntriessucceed: 0,
        Tableofunapprovedticketssucceed: false,
        approvedticketssuccessful: false,


        // participants on the ticket
        showParticipantsOnTicket: false,
        isOpen: false
      };
    },
    
    created() {
      this.fetchBookings();
      this.fetchSalesData();
      this.fetchBookingssucceed();
    },
    
    computed: {
      displayedBookings() {
        if (!this.isFiltered) {
          return this.bookings;
        }
        return this.bookings.filter(booking => {
          const fullName = `${booking.salesFirstName} ${booking.salesLastName}`.toLowerCase();
          const matchesSearch = this.searchQuery === '' || 
            fullName.includes(this.searchQuery.toLowerCase()) ||
            booking.Purposeofvisit.toLowerCase().includes(this.searchQuery.toLowerCase());
          const bookingDate = new Date(booking.visitdate);
          const matchesDateRange = (!this.startDate || bookingDate >= new Date(this.startDate)) &&
                              (!this.endDate || bookingDate <= new Date(this.endDate));
          return matchesSearch && matchesDateRange;
        });
      },
      filteredTimes() {
        return this.availableTimes || this.times;
      },
      filteredEndTimes() {
        if (!this.editingBooking || !this.editingBooking.starttime) {
          return this.filteredTimes;
        }
        return this.filteredTimes.filter(timeSlot => {
          return timeSlot.time > this.editingBooking.starttime && timeSlot.available;
        });
      },
      paginatedBookings() {
        const start = (this.currentPage - 1) * this.entriesPerPage;
        const end = start + this.entriesPerPage;
        return this.displayedBookings.slice(start, end);
      },
      totalEntries() {
        return this.displayedBookings.length;
      },
      totalEntries1() {
        return this.bookings.length;
      },
  
      // succeed
      filteredBookingssucceed() {
        let filtered = this.bookingssucceed; 
        if (this.searchQuerysucceed) {
          const lowercaseQuery = this.searchQuerysucceed.toLowerCase();
          filtered = filtered.filter(booking =>
            this.getUserName(booking.userId._id).toLowerCase().includes(lowercaseQuery) ||
            (booking.userId && booking.userId.name && booking.userId.name.toLowerCase().includes(lowercaseQuery)) ||
              (booking.Purposeofvisit && booking.Purposeofvisit.toLowerCase().includes(lowercaseQuery))
          );
            }
          if (this.startDatesucceed && this.endDatesucceed) {
            const start = new Date(this.startDatesucceed);
            const end = new Date(this.endDatesucceed);
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.visitdate);
          return bookingDate >= start && bookingDate <= end;
          });
          }  
            return filtered;
          },
        paginatedBookingssucceed() {
          const start = (this.currentPagesucceed - 1) * this.entriesPerPagesucceed;
          const end = start + this.entriesPerPagesucceed;
            return this.filteredBookingssucceed.slice(start, end);
          },
        totalPagessucceed() {
            return Math.ceil(this.filteredBookingssucceed.length / this.entriesPerPagesucceed);
          },
        totalEntriessucceed() {
            return this.bookingssucceed.length;
          },
    },
    

    watch: {
      'editingBooking.visitdate': function() {
        this.updateAvailableTimes();
      },
      'editingBooking.starttime': function() {
        if (this.editingBooking) {
          this.editingBooking.endtime = null;
          this.updateAvailableTimes();
        }
      },
      searchQuery() {
        if (this.searchQuery === '') {
          this.isFiltered = false;
        }
      },
      startDate() {
        if (this.startDate === '') {
          this.isFiltered = false;
        }
      },
      endDate() {
        if (this.endDate === '') {
          this.isFiltered = false;
        }
      },
  
      // succeed
      searchQuerysucceed() {
        if (this.searchQuerysucceed === '') {
          this.isFilteredsucceed = false;
        }
      },
      startDatesucceed() {
        if (this.startDatesucceed === '') {
          this.isFilteredsucceed = false;
        }
      },
      endDatesucceed() {
        if (this.endDatesucceed === '') {
          this.isFilteredsucceed = false;
        }
      },
    },
    
    methods: {
      toggleTableparticipants(booking) {
        booking.showParticipants = !booking.showParticipants;
      },

      showapprovedticketssuccessful() {
        this.approvedticketssuccessful = !this.approvedticketssuccessful;
          if (this.approvedticketssuccessful) {
            this.Tableofunapprovedticketssucceed = false;
            this.Unapprovedtickets = false;
            this.Tableofunapprovedtickets = false;
          }
    },
      showTableofunapprovedticketssucceed() {
        this.Tableofunapprovedticketssucceed = !this.Tableofunapprovedticketssucceed;
          if (this.Tableofunapprovedticketssucceed) {
            this.approvedticketssuccessful = false;
            this.Unapprovedtickets = false;
            this.Tableofunapprovedtickets = false;
          }
    },
      showUnapprovedTickets() {
          this.Unapprovedtickets = !this.Unapprovedtickets;
            if (this.Unapprovedtickets) {
            this.approvedticketssuccessful = false;
            this.Tableofunapprovedticketssucceed = false;
            this.Tableofunapprovedtickets = false;
          }
    },
      showTableofUnapprovedTickets() {
        this.Tableofunapprovedtickets = !this.Tableofunapprovedtickets;
          if (this.Tableofunapprovedtickets) {
            this.approvedticketssuccessful = false;
            this.Tableofunapprovedticketssucceed = false;
            this.Unapprovedtickets = false;
          }
    },

      async fetchUserBookings(userId) {
        try {
          const [bookingResponse, ticketResponse] = await Promise.all([
            axios.get(`http://LOCALHOST:9992/booking/viewbooking/${userId}`).catch(() => ({ data: { bookings: [] } })),
            axios.get(`http://LOCALHOST:9992/ticketsuccess/user/${userId}`).catch(() => ({ data: [] }))
          ]);
  
          const bookings = bookingResponse.data.bookings.map(booking => ({
            date: new Date(booking.visitdate).toISOString().split('T')[0],
            startTime: booking.starttime,
            endTime: booking.endtime,
            id: booking._id
          }));
  
          const tickets = ticketResponse.data.map(ticket => ({
            date: new Date(ticket.visitdate).toISOString().split('T')[0],
            startTime: ticket.starttime,
            endTime: ticket.endtime,
            id: ticket._id
          }));
  
          const allBookings = [...bookings, ...tickets];
          allBookings.sort((a, b) => {
            if (a.date !== b.date) {
              return new Date(a.date) - new Date(b.date);
            }
            return a.startTime.localeCompare(b.startTime);
          });
  
          return allBookings;
        } catch (error) {
          console.error('Error fetching user bookings:', error);
          return [];
        }
      },
  
      async fetchBookings() {
        try {
          const [bookingsResponse, salesResponse] = await Promise.all([
            axios.get('http://LOCALHOST:9992/booking/viewbookingall'),
            axios.get('http://LOCALHOST:9992/salesapprovejp/all')
          ]);
  
          const salesMap = new Map(salesResponse.data.map(sale => [sale._id, sale]));
  
          this.bookings = bookingsResponse.data.bookings.map(booking => {
            const sale = salesMap.get(booking.userId);
            return {
              ...booking,
              showParticipants: false,
              salesFirstName: sale ? sale.firstname : '',
              salesLastName: sale ? sale.lastname : ''
            };
          });
  
          this.calculateTotalPages();
        } catch (err) {
          this.error = 'Failed to load bookings';
        } finally {
          this.loading = false;
        }
      },
  
      formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
  
      formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${time}, ${formattedDate}`;
      },
  
      editParticipant(participant) {
        this.editingParticipant = { ...participant };
      },
  
      async updateParticipant() {
        try {
          if (!this.editingParticipant) {
            throw new Error('No participant is being edited');
          }
  
          const bookingIndex = this.bookings.findIndex(b => 
            b.participants.some(p => p._id === this.editingParticipant._id)
          );
  
          if (bookingIndex === -1) {
            throw new Error('Booking not found');
          }
  
          const booking = this.bookings[bookingIndex];
          const updatedParticipants = booking.participants.map(p => 
            p._id === this.editingParticipant._id ? this.editingParticipant : p
          );
  
          await axios.put(`http://LOCALHOST:9992/sales/editbooking/${booking._id}`, {
            participants: updatedParticipants
          });
  
          booking.participants = updatedParticipants;
  
          this.editingParticipant = null;
        } catch (error) {
          console.error('Failed to update participant:', error);
        }
      },
  
      cancelEdit() {
        this.editingParticipant = null;
      },
  
      async startEditingBooking(booking) {
        this.editingBooking = { ...booking };
        const userBookings = await this.fetchUserBookings(booking.userId);
        this.unavailableTimes = userBookings.filter(b => b.id !== booking._id);
        this.updateAvailableTimes();
      },
  
      updateAvailableTimes() {
        if (!this.editingBooking) return;
        const bookingDate = new Date(this.editingBooking.visitdate).toISOString().split('T')[0];
        const unavailableForDay = this.unavailableTimes.filter(t => t.date === bookingDate);
  
        this.availableTimes = this.times.map(time => {
          const isAvailable = !unavailableForDay.some(unavailable => {
            if (unavailable.id === this.editingBooking._id) return false;
            return time >= unavailable.startTime && time <= unavailable.endTime;
          });
  
          return { time, available: isAvailable };
        });
      },
  
      async saveEditedBooking() {
        if (!this.isBookingValid()) {
          alert("The edited time slot cannot be edited over another booking.");
          return;
        }
  
        try {
          const response = await this.updateBooking(this.editingBooking);
          const index = this.bookings.findIndex(b => b._id === this.editingBooking._id);
          if (index !== -1) {
            this.bookings[index] = { ...this.editingBooking, ...response };
          }
          this.editingBooking = null;
          this.availableTimes = null;
        } catch (error) {
          console.error('Failed to update booking:', error);
        }
      },
  
      isBookingValid() {
        if (!this.editingBooking) return false;
        const bookingDate = new Date(this.editingBooking.visitdate).toISOString().split('T')[0];
        const conflictingBooking = this.unavailableTimes.find(t => 
          t.date === bookingDate &&
          t.id !== this.editingBooking._id &&
          ((this.editingBooking.starttime >= t.startTime && this.editingBooking.starttime <= t.endTime) ||
          (this.editingBooking.endtime >= t.startTime && this.editingBooking.endtime <= t.endTime) ||
          (this.editingBooking.starttime <= t.startTime && this.editingBooking.endtime >= t.endTime))
        );
        return !conflictingBooking;
      },
  
      cancelEditingBooking() {
        this.editingBooking = null;
        this.availableTimes = null;
      },
  
      async updateBooking(booking) {
        const response = await axios.put(`http://LOCALHOST:9992/sales/editbooking/${booking._id}`, {
          starttime: booking.starttime,
          endtime: booking.endtime,
          visitdate: booking.visitdate
        });
        return response.data;
      },
  
      async deleteParticipant(bookingId, participantId) {
        try {
          const response = await axios.delete(`http://LOCALHOST:9992/deletebooking/${bookingId}/participants/${participantId}`);
          if (response.status === 200) {
            this.bookings = this.bookings.map(booking => {
              if (booking._id === bookingId) {
                booking.participants = booking.participants.filter(participant => participant._id !== participantId);
              }
              return booking;
            });
          } else {
            throw new Error(response.data.error || 'Failed to delete participant');
          }
        } catch (error) {
          console.error('Failed to delete participant:', error);
        } finally {
          this.showModalDeletesales = false;
        }
      },
  
      confirmDeleteParticipant() {
        if (this.bookingIdToDelete && this.participantIdToDelete) {
          this.deleteParticipant(this.bookingIdToDelete, this.participantIdToDelete);
          }
        },
      
        cancelDeleteParticipant() {
          this.showModalDeletesales = false;
          this.bookingIdToDelete = null;
          this.participantIdToDelete = null;
        },
        confirmDeleteBooking(bookingId) {
          this.bookingIdToDelete = bookingId;
          this.showModalDeleteBooking = true;
        },

    async deleteBooking() {
      try {
        await axios.delete(`http://LOCALHOST:9992/deletebooking/${this.bookingIdToDelete}`);
        this.bookings = this.bookings.filter(booking => booking._id !== this.bookingIdToDelete);
      } catch (error) {
        console.error('Failed to delete booking:', error);
      } finally {
        this.showModalDeleteBooking = false;
      }
    },

    cancelDeleteBooking() {
      this.showModalDeleteBooking = false;
      this.bookingIdToDelete = null;
    },

    applyFilters() {
      this.isFiltered = true;
    },

    resetFilters() {
      this.searchQuery = '';
      this.startDate = '';
      this.endDate = '';
      this.isFiltered = false;
    },

    changeEntriesPerPage(value) {
      this.entriesPerPage = parseInt(value);
      this.currentPage = 1;
      this.calculateTotalPages();
    },
  
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.totalEntries / this.entriesPerPage);
    },
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    Approveticket(bookingId) {
      this.bookingIdToApprove = bookingId;
      this.showModalapproveticket = true;
    },

    async confirmApproveTicket() {
      try {
        await axios.post('http://LOCALHOST:9992/sales/booking/approve', {
          bookingId: this.bookingIdToApprove
        });
      
      // Find the approved booking
        const approvedBooking = this.bookings.find(b => b._id === this.bookingIdToApprove);
      
        if (approvedBooking) {
        // Remove the booking from unapproved list
          this.bookings = this.bookings.filter(b => b._id !== this.bookingIdToApprove);
        
        // Fetch the updated list of approved bookings
          await this.fetchBookingssucceed();
        
        // Update counts
          this.totalEntries--;
          this.totalEntriessucceed = this.bookingssucceed.length;
        
        // Recalculate pages if necessary
          this.calculateTotalPages();
        }
      
        this.showModalapproveticket = false;
        this.bookingIdToApprove = null;
      } catch (error) {
        console.error('Failed to approve ticket:', error);
      }
    },

    cancelApproveTicket() {
      this.showModalapproveticket = false;
      this.bookingIdToApprove = null; // ล้างค่า bookingId ที่กำลังจะอนุมัติ (ถ้ามี)
    },



    // succeed methods
    async fetchBookingssucceed() {
      try {
        const response = await axios.get('http://LOCALHOST:9992/ticketsuccess');
        this.bookingssucceed = response.data;
        this.totalEntriessucceed = this.bookingssucceed.length;
      } catch (error) {
        this.error = 'Failed to fetch bookings.';
      } finally {
        this.loading = false;
      }
    },

    async fetchSalesData() {
      this.loading = true;
      try {
        const response = await axios.get('http://LOCALHOST:9992/salesapprovejp/all');
        this.salesList = response.data;
      } catch (err) {
        this.error = 'Failed to load data';
      } finally {
        this.loading = false;
      }
    },

    getUserName(userId) {
      const bookingUser = this.bookingssucceed.find(booking => booking.userId._id === userId);
      return bookingUser ? `${bookingUser.userId.firstname} ${bookingUser.userId.lastname}` : 'Unknown User';
    },

    toggleSuccessfullyTicket(bookingId) {
      this.showSuccessfullyTicket[bookingId] = !this.showSuccessfullyTicket[bookingId];
    },

    showTableapprovedTickets() {
      this.bookingssucceed.forEach(booking => {
        this.showSuccessfullyTicket[booking._id] = true;
      });
    },

    formatDateTimedate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    toggledeletesuccessfullyTicket(booking) {
      this.bookingToDelete = booking;
      this.showModalDeletesuccessfullyTicket = true;
    },

    async deleteBookingTicket() {
      if (!this.bookingToDelete) return;

      try {
        await axios.delete(`http://LOCALHOST:9992/ticketsuccess/${this.bookingToDelete._id}`);
        this.bookingssucceed = this.bookingssucceed.filter(b => b._id !== this.bookingToDelete._id);
        this.showModalDeletesuccessfullyTicket = false;
        this.bookingToDelete = null;
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    },

    cancelDeleteBookingTicket() {
      this.showModalDeletesuccessfullyTicket = false;
      this.bookingToDelete = null;
    },

    toggleDeleteParticipant(booking, participant) {
      this.bookingForParticipantDelete = booking;
      this.participantToDelete = participant;
      this.showModalDeleteparticipantssuccessfullyTicket = true;
    },

    async deleteBookingparticipantsTicket() {
      if (!this.bookingForParticipantDelete || !this.participantToDelete) return;

      try {
        await axios.delete(`http://LOCALHOST:9992/ticketsuccess/participant/${this.bookingForParticipantDelete._id}/${this.participantToDelete._id}`);
      
        const bookingIndex = this.bookingssucceed.findIndex(b => b._id === this.bookingForParticipantDelete._id);
        if (bookingIndex !== -1) {
          const participantIndex = this.bookingssucceed[bookingIndex].participants.findIndex(p => p._id === this.participantToDelete._id);
        if (participantIndex !== -1) {
          this.bookingssucceed[bookingIndex].participants.splice(participantIndex, 1);
        }
      }

        this.showModalDeleteparticipantssuccessfullyTicket = false;
        this.bookingForParticipantDelete = null;
        this.participantToDelete = null;
      } catch (error) {
        console.error('Failed to delete participant:', error);
      }
    },

    cancelDeleteBookingparticipantsTicket() {
      this.showModalDeleteparticipantssuccessfullyTicket = false;
      this.bookingForParticipantDelete = null;
      this.participantToDelete = null;
    },

    changeEntriesPerPagesucceed(value) {
      this.entriesPerPagesucceed = parseInt(value);
      this.currentPagesucceed = 1;
    },
    prevPagesucceed() {
      if (this.currentPagesucceed > 1) {
        this.currentPagesucceed--;
      }
    },
    nextPagesucceed() {
      if (this.currentPagesucceed < this.totalPagessucceed) {
        this.currentPagesucceed++;
      }
    },

    applyFilterssucceed() {
      this.currentPagesucceed = 1;
    },
  
    resetFilterssucceed() {
      this.searchQuerysucceed = '';
      this.startDatesucceed = '';
      this.endDatesucceed = '';
      this.currentPagesucceed = 1;
    },

    handleOpenparticipantsOnTicke(booking) {
      this.showParticipantsOnTicket = true;
      this.isOpen = true;
      this.currentParticipants = booking.participants;
      this.currentBooking = booking;  // Add this line
    },
    
    handleCloseparticipantsOnTicke() {
      this.isOpen = false;
      setTimeout(() => {
        this.showParticipantsOnTicket = false;
        this.currentParticipants = [];
        }, 300); // Adjust this timing to match your CSS transition
    }



  },
};


</script>
    
<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}

.dialog-enter {
  animation: dialog-enter 0.3s ease-out;
}

.dialog-leave {
  animation: dialog-leave 0.3s ease-in;
}

@keyframes dialog-enter {
  from {
    transform: scale(0.9) translateY(-100px);
  }
  to {
    transform: scale(1) translateY(0);
  }
}

@keyframes dialog-leave {
  from {
    transform: scale(1) translateY(0);
  }
  to {
    transform: scale(0.5) translateY(-100px);
  }
}

@media (max-width: 640px) {
  .ticket-content {
    flex-direction: column;
  }
  
  .ticket-left, .ticket-right {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  
  .ticket-right {
    display: flex;
    justify-content: space-around;
  }
}
</style>
