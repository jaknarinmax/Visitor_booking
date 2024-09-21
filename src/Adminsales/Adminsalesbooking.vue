<template>
  <div class="flex h-screen bg-gray-100">
    <AdminSalesNavbar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AdminSalesTopNav />
      <div class="flex-1 overflow-y-auto p-4" @click="closetoggleSidebar">



        <div class="flex flex-wrap justify-center my-2 -mx-2 gap-2">
          <!-- Card 1 -->
          <div class="w-full max-w-sm mb-4">
            <div class="flex items-center w-full h-auto bg-gradient-to-r dark:from-red-700 dark:to-red-600 from-red-200 via-red-300 to-red-400 rounded-md p-3">
              <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-12 h-12">
                <svg class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
                </svg>
              </div>
              <div class="flex flex-col justify-around flex-grow ml-3 text-white">
                <div class="text-lg font-bold">
                  Wait for approval
                </div>
                <div>
                  <p class="text-2xl py-1"><strong>{{ totalFilteredBookings }}</strong></p>
                </div>
                <div class="flex flex-row justify-center mt-2 gap-2">
                  <button @click.prevent="showUnapprovedTickets" class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-red-600 bg-white group-hover:bg-red-600"></span>
                    <span class="relative text-black group-hover:text-white">TICKET</span>
                  </button>
                  <button @click.prevent="showTableofUnapprovedTickets" class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-blue-600 bg-white group-hover:bg-black"></span>
                    <span class="relative text-black group-hover:text-white">TABLE</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center flex-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="w-full max-w-sm mb-4">
            <div class="flex items-center w-full h-auto bg-gradient-to-r dark:to-sky-600 from-sky-200 via-sky-300 to-sky-400 rounded-md p-3">
              <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-12 h-12">
                <svg class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div class="flex flex-col justify-around flex-grow ml-3 text-white">
                <div class="text-lg font-bold">
                  Approved tickets.
                </div>
                <div>
                  <p class="text-2xl py-1"><strong>{{ totalFilteredBookingsSucceed }}</strong></p>
                </div>
                <div class="flex flex-row justify-center mt-2 gap-2">
                  <button @click.prevent="showUnapprovedTicketsSucceed" class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-red-600 bg-white group-hover:bg-red-600"></span>
                    <span class="relative text-black group-hover:text-white">TICKET</span>
                  </button>
                  <button @click.prevent="showTableofUnapprovedTicketsSucceed" class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-blue-600 bg-white group-hover:bg-black"></span>
                    <span class="relative text-black group-hover:text-white">TABLE</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center flex-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="w-full max-w-sm mb-4">
            <div class="flex items-center w-full h-auto bg-gradient-to-r dark:to-purple-600 from-purple-200 via-purple-300 to-purple-400 rounded-md p-3">
              <div class="flex text-indigo-500 dark:text-white items-center bg-white dark:bg-[#0F172A] p-2 rounded-md flex-none w-12 h-12">
                <svg class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12L11 14L15.5 9.5M9.2019 20.6009C9.52965 20.5575 9.86073 20.6464 10.1218 20.8475L11.3251 21.7708C11.7228 22.0764 12.2761 22.0764 12.6727 21.7708L13.9215 20.812C14.1548 20.6331 14.4492 20.5542 14.7403 20.5931L16.3024 20.7986C16.799 20.8642 17.2779 20.5875 17.4701 20.1242L18.0712 18.6709C18.1834 18.3987 18.3989 18.1832 18.6711 18.0709L20.1243 17.4698C20.5876 17.2787 20.8643 16.7988 20.7987 16.3021L20.601 14.7966C20.5576 14.4688 20.6465 14.1377 20.8476 13.8766L21.7709 12.6733C22.0764 12.2755 22.0764 11.7222 21.7709 11.3256L20.812 10.0767C20.6332 9.84339 20.5543 9.54896 20.5932 9.25785L20.7987 7.69568C20.8643 7.19902 20.5876 6.72015 20.1243 6.52793L18.6711 5.92684C18.3989 5.81462 18.1834 5.59907 18.0712 5.32685L17.4701 3.87356C17.279 3.41024 16.799 3.13358 16.3024 3.19913L14.7403 3.40468C14.4492 3.44468 14.1548 3.36579 13.9226 3.18802L12.6738 2.22916C12.2761 1.92361 11.7228 1.92361 11.3262 2.22916L10.0774 3.18802C9.84407 3.36579 9.54965 3.44468 9.25856 3.40691L7.69647 3.20136C7.19984 3.1358 6.721 3.41246 6.52879 3.87578L5.92884 5.32907C5.81552 5.60018 5.59998 5.81573 5.32889 5.92906L3.87568 6.52904C3.41238 6.72126 3.13574 7.20013 3.20129 7.69679L3.40683 9.25897C3.4446 9.55007 3.36572 9.8445 3.18796 10.0767L2.22915 11.3256C1.92362 11.7233 1.92362 12.2767 2.22915 12.6733L3.18796 13.9222C3.36683 14.1555 3.44571 14.4499 3.40683 14.741L3.20129 16.3032C3.13574 16.7999 3.41238 17.2787 3.87568 17.471L5.32889 18.0721C5.60109 18.1843 5.81663 18.3998 5.92884 18.672L6.5299 20.1253C6.721 20.5887 7.20096 20.8653 7.69758 20.7998L9.2019 20.6009Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="flex flex-col justify-around flex-grow ml-3 text-white">
                <div class="text-lg font-bold">
                  Cancelled tickets
                </div>
                <div>
                  <p class="text-2xl py-1"><strong>66</strong></p>
                </div>
                <div class="flex flex-row justify-center mt-2 gap-2">
                  <button class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-red-600 bg-white group-hover:bg-red-600"></span>
                    <span class="relative text-black group-hover:text-white">TICKET</span>
                  </button>
                  <button class="group relative inline-block px-4 py-1 text-sm font-medium">
                    <span class="absolute inset-0 h-full w-full translate-x-0.5 translate-y-0.5 transform border-2 border-dotted border-red-200 bg-black transition duration-200 ease-out group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white"></span>
                    <span class="absolute inset-0 h-full w-full border-2 border-dotted border-blue-600 bg-white group-hover:bg-black"></span>
                    <span class="relative text-black group-hover:text-white">TABLE</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center flex-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        <div v-if="Unapprovedtickets" class="ticket-container py-8" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
          <div v-for="booking in bookings" :key="booking._id" style="flex-basis: calc(33.333% - 30px); margin-top: 15px;">
            <div class="justify-content: center; max-w-md w-[360px] h-[175px] mx-auto bg-blue-900 rounded-2xl" style="display: flex; justify-content: center; align-items: center; position: relative;">
              <div style="position: absolute; top: 0; right: 0; z-index: 10;">
                <span class="text-white px-3" style="border-top-right-radius: 20px; background-color: #1062EF; font-size: 13px; font-weight: bold; display: inline-block;">
                  {{ formatDate(booking.bookedAt) }}</span>
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
                        <td style="border: 2px solid black; text-align: center; font-weight: 900; font-size: 15px; color: #b4cce4; letter-spacing: 2px; font-weight: 900;" colspan="4">
                          TICKET
                        </td>
                      </tr>

                      <tr>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 9px; font-weight: 600; text-align: left;">  DATE: &nbsp;&nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ formatDate(booking.visitdate) }}</span>
                          </div>
                        </td>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 9px; font-weight: 600; text-align: left;">&nbsp; PERSON: &nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ booking.numberofpeople }}</span>
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
                    <div style="position: absolute; top: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-45deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; top: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%;border: 3px solid transparent; border-bottom-color: black; transform: rotate(-44deg);">
                    </div>
                    <div style="position: absolute; bottom: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-135deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; bottom: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-140deg);">
                    </div>
                    <div style="position: absolute; top: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-right-color: black; transform: rotate(45deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; top: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(44deg);">
                    </div>
                    <div style="position: absolute; bottom: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-left-color: black; transform: rotate(135deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; bottom: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(140deg);">
                    </div>
                  </div>
                </div>
                <div style="width: 90px; height: 130px; position: relative; background-color: #b4cce4; z-index: 1;">
                  <div style="border: 3px solid black; border-left: 0.5px dashed black; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                    <div class="date-container py-2" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 5px; margin-top: 7px; position: relative; z-index: 2;">
                      <span style="position: relative; z-index: 1;">
                        <button @click.prevent="Approveticket(booking._id)" class="rounded-md bg-black">
                          <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-green-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                            style="font-size: 12px; font-weight: bold;">Approve</span>
                        </button>
                      </span>
                      <span style="margin-top: 10px; position: relative; z-index: 2;">
                        <button @click.prevent="handleOpenparticipantsOnTicke(booking)" class="rounded-md bg-black">
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
                    <path d="M8,0L5,2 L7,4 L5,6 L7,8 L5,10 L7,12 L5,14 L7,16 L5,18 L7,20 L5,22 L7,24 L5,26 L7,28 L5,30 L7,32 L5,34 L7,36 L5,38L8,40"
                      fill="url(#grad)" stroke="black" stroke-width="0.5" stroke-linejoin="round" />
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
                          <span style="font-size: 12px;  margin-top: -5px;">&nbsp;{{ participant.thaiid ? participant.thaiid : participant.passportno }}
                          </span>
                        </div>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.email }}</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.selectjourney }}
                        </p>
                        <p class="text-gray-900 text-center" style="font-size: 12px;">( {{ participant.carregistration }} )</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.telephonenumber }}
                        </p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.country }}</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.age }}</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <span class="text-center inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" style="font-size: 12px;">
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


        <div v-if="Tableofunapprovedtickets" class="py-14">
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
          <div class="px-4 sm:px-8 py-4 overflow-x-auto" style="width: 90%; margin-left: 100px">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 4%">No</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%">DATE</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%">START TIME</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 7%">END TIME</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 28%">PURPOSE OF VISIT</th>
                    <th class="bg-red-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%">BOOKING DATE</th>
                    <th class="bg-red-300 px-1 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%">VIEW/APPROVE<br />BOOKING/PARTICIPANT</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(booking, Index) in paginatedBookings" :key="booking._id">
                    <tr>
                      <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                        <p class="text-gray-900">{{ pageStartIndex + Index + 1 }}</p>
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
                      <td class="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                        <a href="#" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block" @click.prevent="toggleTableparticipants(booking)">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </i>
                        </a>

                        <a href="#" @click.prevent="startEditingBookingandparticipants(booking._id)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </i>
                        </a>

                        <a href="#" @click.prevent="Approveticket(booking._id)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black"> NO.</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black">COMPANY NAME</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black">NAME-SURNAME</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black">ID CARD/PASSPORT</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 13%; border-top: 1px solid black">EMAIL</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black">JOURNEY<br />CARREGISTRATION</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black">PHONE NUMBER</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black">COUNTRY</th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black"> AGE </th>
                              <th class="bg-red-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 6%; border-top: 1px solid black">STATUS</th>
                              <th class="bg-red-200 px-1 py-1 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 1%; border-top: 1px solid black">ACTION</th>
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
                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600">
                                  {{ participant.selectstatus }}
                                </span>
                              </td>
                              <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                                <div class="inline-flex space-x-2">
                                  <button @click="deleteParticipant(participant._id)" class="relative border-2 border-dashed rounded border-red-500 px-1 py-1 cursor-pointer text-sm font-bold before:bg-red-500 hover:rounded-b-none before:absolute before:bottom-0 before:left-0 before:block before:h-[8px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    DELETE
                                  </button>
                                  <button @click="openEmailConfirmModal(participant.email)" class="relative border-2 border-dashed rounded border-blue-500 px-1 py-1 cursor-pointer text-[12px] font-bold before:bg-blue-400 hover:rounded-b-none before:absolute before:bottom-0 before:left-0 before:block before:h-[8px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                                    SEND EMAIL
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
                <span class="text-xs xs:text-sm text-gray-900"> Showing {{ (currentPage - 1) * entriesPerPage + 1 }} to {{ Math.min(currentPage * entriesPerPage, totalEntries) }}of {{ totalEntries }} Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button @click="prevPage" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-orange-300 transition-all duration-400 rounded-l-lg" style=" padding: 8px 16px; border-bottom: 4px solid #ff6633; color: black; transition: all 0.4s;">
                    Prev
                  </button>
                  <button @click="nextPage" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-blue-400 transition-all duration-400 rounded-r-lg" style=" padding: 8px 16px; border-bottom: 4px solid blue; color: black; transition: all 0.4s; ">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div v-if="UnapprovedticketsSucceed" class="ticket-container py-8" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
          <div v-for="(booking) in bookingsSucceed" :key="booking._id" style="flex-basis: calc(33.333% - 30px); margin-top: 15px;">
            <div class="justify-content: center; max-w-md w-[360px] h-[175px] mx-auto bg-blue-900 rounded-2xl"  style="display: flex; justify-content: center; align-items: center; position: relative;">
              <div style="position: absolute; top: 0; right: 0; z-index: 10;">
                <span class="text-white px-3" style="border-top-right-radius: 20px; background-color: #1062EF; font-size: 13px; font-weight: bold; display: inline-block;">
                  Approved Date: {{ formatDateTime(booking.createdAt) }}
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
                        <td style="border: 2px solid black; text-align: center; font-weight: 900; font-size: 15px; color: #b4cce4; letter-spacing: 2px; font-weight: 900;" colspan="4">TICKET</td>
                      </tr>
                      <tr>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 9px; font-weight: 600; text-align: left;"> DATE: &nbsp;&nbsp;&nbsp;<span style="color:  #660000; font-size: 12px;">{{ formatDate(booking.visitdate) }}</span>
                          </div>
                        </td>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 9px; font-weight: 600; text-align: left;">&nbsp;PERSON: &nbsp;&nbsp;
                            <span style="color:  #660000; font-size: 12px;">{{ booking.numberofpeople }}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table style="border-collapse: collapse; margin-top: -2px; width: 80%;">
                      <tr>
                        <td style="border: 2px solid black; text-align: center; ">
                          <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                            &nbsp; START TIME:</div>
                          <div style="font-size: 13px; font-weight: bold; color: #660000; margin-top: -3px; ">
                            {{ booking.starttime }}</div>
                        </td>
                        <td style="border: 2px solid black; text-align: center;">
                          <div style="font-size: 8px; font-weight: 600; color: #111111; text-align: left;">
                            &nbsp; END TIME:</div>
                          <div style="font-size: 13px; font-weight: bold; color: #660000; margin-top: -3px; ">
                            {{ booking.endtime }}</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Decorative circles -->
                    <div style="position: absolute; top: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-45deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; top: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%;border: 3px solid transparent; border-bottom-color: black; transform: rotate(-44deg);">
                    </div>
                    <div style="position: absolute; bottom: -15px; left: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-135deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; bottom: 3px; left: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(-140deg);">
                    </div>
                    <div style="position: absolute; top: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-right-color: black; transform: rotate(45deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; top: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(44deg);">
                    </div>
                    <div style="position: absolute; bottom: -15px; right: -15px; width: 35px; height: 35px; background-color: #1c3c8c; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; border-left-color: black; transform: rotate(135deg); z-index: 1;">
                    </div>
                    <div style="position: absolute; bottom: 3px; right: 3px; width: 25px; height: 25px; background-color: #b4cce4; border-radius: 50%; border: 3px solid transparent; border-bottom-color: black; transform: rotate(140deg);">
                    </div>
                  </div>
                </div>
                <div style="width: 90px; height: 130px; position: relative; background-color: #b4cce4; z-index: 1;">
                  <div
                    style="border: 3px solid black; border-left: 0.5px dashed black; width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
                    <div class="date-container py-2" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 5px; margin-top: 7px; position: relative; z-index: 2;">
                      <span style="position: relative; z-index: 1;">
                        <button @click.prevent="showApproveModal(booking._id)" class="rounded-md bg-black">
                          <span class="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-green-500 p-1 text-sx transition-all hover:-translate-y-2 active:translate-x-0 active:translate-y-0"
                            style="font-size: 10px; font-weight: bold;">GIVE <br>TICKETS</span>
                        </button>
                      </span>
                      <span style="margin-top: 10px; position: relative; z-index: 2;">
                        <button @click.prevent="handleOpenparticipantsOnTicke(booking)" class="rounded-md bg-black">
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
                    <path d="M8,0L5,2 L7,4 L5,6 L7,8 L5,10 L7,12 L5,14 L7,16 L5,18 L7,20 L5,22 L7,24 L5,26 L7,28 L5,30 L7,32 L5,34 L7,36 L5,38L8,40"
                      fill="url(#grad)" stroke="black" stroke-width="0.5" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <!-- Ticket -->
            </div>
          </div>
        </div>


        <!-- ParticipantsOnTicket -->
        <teleport to="body">
          <div v-if="showParticipantsOnTicket" class="dialog-overlay fixed inset-0 bg-grey-50 bg-opacity-50 z-50 flex items-center justify-center"
            @click="handleCloseparticipantsOnTicke">
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
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.selectjourney }}
                        </p>
                        <p class="text-gray-900 text-center" style="font-size: 12px;">( {{ participant.carregistration }} )</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.telephonenumber }}
                        </p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.country }}</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <p class="text-gray-900 text-center" style="font-size: 12px;">{{ participant.age }}</p>
                      </td>
                      <td class="px-2 py-2 border-b-2 border-r border-black bg-white text-sm">
                        <span class="text-center inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600" style="font-size: 12px;">
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



        <div v-if="TableofunapprovedticketsSucceed" class="py-14">
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
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input v-model="searchQuerysucceed" placeholder="Search" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
            <div class="flex items-center ml-auto" style="margin-right: 80px;">
              <input v-model="startDatesucceed" type="date" class="date-input" style="border: 1.5px solid #D3D3D3; padding: 5px;">
              <span class="mx-2">To</span>
              <input v-model="endDatesucceed" type="date" class="date-input" style="border: 1.5px solid #D3D3D3; padding: 5px;">&nbsp;&nbsp;
              <a @click="applyFilterssucceed" class="h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-6 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 border-b-sky-800 disabled:border-0 disabled:bg-sky-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-sky-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900">
                Search
              </a>
            </div>
          </div>

          <!-- Table section -->
          <div class="px-4 sm:px-8 py-4 overflow-x-auto" style="width: 90%; margin-left: 100px">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 4%">No</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%">DATE</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%">START TIME</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 7%">END TIME</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width:30%">PURPOSE OF VISIT</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%">BOOKING DATE</th>
                    <th class="bg-blue-300 px-2 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 8%">ISSUE DATE <br>TICKET</th>
                    <th class="bg-blue-300 px-1 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 9%">VIEW/APPROVE<br>BOOKING/PARTICIPANT</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(booking, index) in paginatedBookingsSucceed" :key="booking._id">
                    <tr>
                      <td class="px-2 py-3 border-b border-gray-600 bg-white text-sm">
                        <p class="text-gray-900">{{ pageStartsucceedIndex + index + 1 }}</p>
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
                        <p class="text-gray-900 whitespace-no-wrap">{{ formatDateTime(booking.createdAt) }}</p>
                      </td>
                      <td class="px-2 py-3 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{{ booking.scanDate || '-' }}</p>
                      </td>
                      <td class="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                        <!-- Action buttons -->
                        <a href="#" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block" @click.prevent="toggleTableparticipants(booking)">
                          <i class="material-icons-round text-base">
                            <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </i>
                        </a>
                        <a @click="showApproveModal(booking._id)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                            <svg class="h-7 w-7 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                          </i>
                        </a>

                        <a @click.stop="openRejectModal(booking)" class="text-gray-400 hover:text-gray-100 ml-2" style="display: inline-block">
                          <i class="material-icons-round text-base">
                              <svg class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M4.93 4.93L19.07 19.07M19.0699 4.92999L4.92993 19.07M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 2%; border-top: 1px solid black"> NO.</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 20%; border-top: 1px solid black">COMPANY NAME</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black">NAME-SURNAME</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 17%; border-top: 1px solid black">ID CARD/PASSPORT</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 0%; border-top: 1px solid black">EMAIL</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 15%; border-top: 1px solid black">JOURNEY<br />CARREGISTRATION</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black">PHONE NUMBER</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 10%; border-top: 1px solid black">COUNTRY</th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 5%; border-top: 1px solid black"> AGE </th>
                              <th class="bg-blue-200 px-2 py-2 border-b-2 border-r border-l border-gray-600 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider" style="width: 6%; border-top: 1px solid black">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(participant, pIndex) in booking.participants" :key="pIndex">
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
                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600">
                                  {{ participant.selectstatus }}
                                </span>
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
                <span class="text-xs xs:text-sm text-gray-900"> Showing {{ (currentPagesucceed - 1) * entriesPerPagesucceed + 1 }} to {{ Math.min(currentPagesucceed *  entriesPerPagesucceed, totalEntriessucceed) }} of {{ totalEntriessucceed }} Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button @click="prevPagesucceed" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-orange-300 transition-all duration-400 rounded-l-lg" style=" padding: 8px 16px; border-bottom: 4px solid #ff6633; color: black; transition: all 0.4s;">
                    Prev
                  </button>
                  <button @click="nextPagesucceed" class="px-4 py-1 border-b-4 border-red-500 bg-gray-200 text-black hover:text-white hover:bg-blue-400 transition-all duration-400 rounded-r-lg" style=" padding: 8px 16px; border-bottom: 4px solid blue; color: black; transition: all 0.4s; ">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </div>
  </div>




  <div v-if="editbookingand" class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
    <div class="max-w-4xl mx-auto bg-white overflow-hidden md:max-w-2xl m-4 transform hover:scale-105 transition duration-200"
      style="box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5); border-radius: 15px;">
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
              <input type="date" v-model="editingBooking.visitdate" id="visitdate"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>

            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700" for="starttime">Start time</label>
                <select v-model="editingBooking.starttime" id="starttime" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option v-for="timeSlot in availableTimes" :key="timeSlot.time" :value="timeSlot.time" :disabled="!timeSlot.available">
                    {{ timeSlot.time }}
                  </option>
                </select>
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700" for="endtime">End time</label> 
                <select v-model="editingBooking.endtime" id="endtime" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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




  <TransitionChild v-if="showModalexpire" as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <div class="h-80">
      <div x-data="{ showModal: true }" x-on:keydown.window.escape="showModal = false">
        <div class="flex justify-center">
          <button x-on:click="showModal = !showModal" class="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">
            Toggle Modal
          </button>
        </div>
        <div x-cloak x-show="showModal" x-transition.opacity class="fixed inset-0 z-10 bg-secondary-700/50">
        </div>
        <div x-cloak x-show="showModal" x-transition class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div class="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
            <div class="relative p-5">
              <div class="text-center">
                <div class="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-secondary-900">
                    Time's up.
                  </h3>
                  <div class="mt-2 text-sm text-secondary-500">
                    Access time has expired. Please log in again.
                  </div>
                </div>
              </div>
              <div class="mt-5 flex justify-end gap-3">
                <button type="button" @click="logout" class="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionChild>



  <section v-if="showModalapproveticket" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
      <svg class="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        <button @click="confirmApproveTicket" class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-green-400 bg-white text-green-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-green-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-green-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>OK</b></span>
        </button>

        <button @click="cancelApproveTicket" class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-pink-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
          <span class="text-slate-600 relative z-10"><b>Cancel</b></span>
        </button>
      </div>
    </div>
  </section>


  <div v-if="showRejectModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div class="w-full max-w-md bg-white rounded-lg overflow-hidden transform transition-all" style="box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.15); border: 2px solid #8A2BE2;">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
            <h3 class="text-2xl font-bold text-white">Reason for refusal</h3>
        </div>
        <div class="p-6">
            <form id="rejectionForm">
                <div class="mb-4">
                <textarea v-model="rejectReason" class="w-full p-3 border-2 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200"
                style="border: 2px solid #8A2BE2; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" rows="4"
                placeholder="Enter the rejection reason here..."></textarea>
            </div>
            <div class="flex justify-between items-center">
                <button @click="rejectBooking" type="button" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <span class="w-full h-full flex items-center gap-2 px-4 py-2 text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />  <path d="M2 2l7.586 7.586" />  <circle cx="11" cy="11" r="2" /></svg>
                    Reject
                    </span>
                </button>
                <button @click="closeRejectModal" type="button" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8B0000] to-[#FF4500] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <span class="w-full h-full flex items-center gap-2 px-4 py-2 text-white rounded-[14px] bg-gradient-to-t from-[#B22222] to-[#FF6347]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />  <path d="M10 11l4 4m0 -4l-4 4" /></svg>
                    Cancel
                </span>
                </button>
            </div>
            </form>
            </div>
        </div>
    </div>
</div>



<section v-if="approvalInProgress" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div class="flex flex-col justify-center items-center w-auto h-auto gap-4 p-4 bg-gray-800 rounded-lg md:flex-row">
      <div class="flex justify-center items-center w-20 h-20 p-5 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
      <div class="flex items-center justify-center h-screen">
          <div class="relative">
          <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
          </div>
          </div>
      </div>
      </div>
      <div class="max-w-sm h-auto space-y-3">
      <div class="flex justify-center items-center sm:justify-between">
          <h2 class="text-white text-2xl font-bold tracking-widest">Approving reservation</h2>
      </div>
      </div>
  </div>
</section>


<section v-if="showEmailConfirmModal" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]">
  <div class="bg-white rounded-lg shadow-xl border-2 border-green-200">
    <div class="w-96 border-t-8 border-green-400 rounded-t-lg flex">
      <div class="w-1/3 pt-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 bg-green-400 text-white p-3 rounded-full shadow-md" fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path xmlns="http://www.w3.org/2000/svg" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="w-full pt-9 pr-4">
        <h3 class="font-bold text-green-500 text-lg">Send Email?</h3>
        <p class="py-4 text-sm text-gray-600">Are you sure you want to send an email to <b>{{ emailToSend }}</b>? This action cannot be undone.</p>
      </div>
    </div>

    <div class="p-4 flex space-x-4 border-t border-green-200">
      <a @click="closeEmailConfirmModal" href="#" class="w-1/2 px-4 py-3 text-center bg-green-100 text-green-600 hover:bg-green-200 hover:text-black font-bold rounded-lg text-sm shadow-md transition duration-300 ease-in-out">Cancel</a>
      <a @click="confirmAndSendEmail" href="#" class="w-1/2 px-4 py-3 text-center text-white bg-green-500 rounded-lg hover:bg-green-600 font-bold text-sm shadow-md transition duration-300 ease-in-out">Send</a>
    </div>
  </div>
</section>


<section v-if="sendInProgress" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]">
  <div class="flex flex-col justify-center items-center w-auto h-auto gap-4 p-4 bg-gray-800 rounded-lg md:flex-row">
    <div class="flex justify-center items-center w-20 h-20 p-5 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-sm h-auto space-y-3">
      <div class="flex justify-center items-center sm:justify-between">
        <h2 class="text-white text-2xl font-bold tracking-widest">Sending email</h2>
      </div>
    </div>
  </div>
</section>


<div v-if="showRejectModal" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
      <div class="w-full max-w-md bg-white rounded-lg overflow-hidden transform transition-all" style="box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.15); border: 2px solid #8A2BE2;">
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
          <h3 class="text-2xl font-bold text-white">Reason for refusal</h3>
      </div>
      <div class="p-6">
          <form id="rejectionForm">
              <div class="mb-4">
              <textarea v-model="rejectReason" class="w-full p-3 border-2 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200"
              style="border: 2px solid #8A2BE2; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" rows="4"
              placeholder="Enter the rejection reason here..."></textarea>
          </div>
          <div class="flex justify-between items-center">
              <button @click="rejectBooking" type="button" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <span class="w-full h-full flex items-center gap-2 px-4 py-2 text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />  <path d="M2 2l7.586 7.586" />  <circle cx="11" cy="11" r="2" /></svg>
                  Reject
                  </span>
              </button>
              <button @click="closeRejectModal" type="button" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8B0000] to-[#FF4500] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <span class="w-full h-full flex items-center gap-2 px-4 py-2 text-white rounded-[14px] bg-gradient-to-t from-[#B22222] to-[#FF6347]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />  <path d="M10 11l4 4m0 -4l-4 4" /></svg>
                  Cancel
              </span>
              </button>
          </div>
          </form>
          </div>
      </div>
  </div>
</div>

<section v-if="rejectInProgress" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]">
  <div class="flex flex-col justify-center items-center w-auto h-auto gap-4 p-4 bg-gray-800 rounded-lg md:flex-row">
    <div class="flex justify-center items-center w-20 h-20 p-5 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-sm h-auto space-y-3">
      <div class="flex justify-center items-center sm:justify-between">
        <h2 class="text-white text-2xl font-bold tracking-widest">Approving reservation</h2>
      </div>
    </div>
  </div>
</section>





<section v-if="approvalInProgress" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[100]">
  <div class="flex flex-col justify-center items-center w-auto h-auto gap-4 p-4 bg-gray-800 rounded-lg md:flex-row">
    <div class="flex justify-center items-center w-20 h-20 p-5 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-sm h-auto space-y-3">
      <div class="flex justify-center items-center sm:justify-between">
        <h2 class="text-white text-2xl font-bold tracking-widest">Approving reservation</h2>
      </div>
    </div>
  </div>
</section>


<section v-if="approveSendemail" class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
  <div class="bg-white rounded-lg shadow-xl border-2 border-blue-200">
    <div class="w-96 border-t-8 border-blue-400 rounded-t-lg flex">
      <div class="w-1/3 pt-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 bg-blue-400 text-white p-3 rounded-full shadow-md" fill="none" viewBox="0 0 24 24" height="24" width="24">
          <path xmlns="http://www.w3.org/2000/svg" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="w-full pt-9 pr-4">
        <h3 class="font-bold text-blue-500 text-lg">Approve Booking?</h3>
        <p class="py-4 text-sm text-blue-600">Are you sure you want to approve this booking? This action cannot be undone.</p>
      </div>
    </div>

    <div class="p-4 flex space-x-4 border-t border-blue-200">
      <a @click="cancelApprove" href="#" class="w-1/2 px-4 py-3 text-center bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 font-bold rounded-lg text-sm shadow-md transition duration-300 ease-in-out">Cancel</a>
      <a @click="confirmApprove" href="#" class="w-1/2 px-4 py-3 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-sm shadow-md transition duration-300 ease-in-out">Send</a>
    </div>
  </div>
</section>


  <div>
    <hr style="margin-top: 0px; border: 1.5px solid #cd5a00" />
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
      message: "",
      showModalexpire: false,
      bookings: [],
      loadingBookings: false,
      bookingError: null,
      showParticipants: false,

      currentPage: 1,
      entriesPerPage: 10,
      totalEntries: 0,
      searchQuery: '',
      startDate: '',
      endDate: '',
      showModalapproveticket: false,
      isFiltered: false,
      totalPages: 1,
      bookingIdToApprove: null,
      Unapprovedtickets: false,
      Tableofunapprovedtickets: false,

      searchQuerysucceed: '',
      startDatesucceed: '',
      endDatesucceed: '',
      currentPagesucceed: 1,
      entriesPerPagesucceed: 10,
      totalEntriessucceed: 0,
      UnapprovedticketsSucceed: false,
      TableofunapprovedticketsSucceed: false,

      editbookingand: false,
      editingBooking: null,
      availableTimes: [],
      times: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],


      showParticipantsOnTicket: false,
      isOpen: false,

            // Sendemail
      showEmailConfirmModal: false,
      emailToSend: null,
      sendInProgress: false,


       // rejectemail
      showRejectModal: false,
      rejectInProgress: false,
      bookingToReject: null,
      rejectReason: '',


      approvalInProgress: false,
      bookingsSucceed: [],
      approveSendemail: false,

    };
  },

  created() {
    this.checkTokenActivity();
    this.fetchBookings();
    this.fetchBookingSucceed();
  },
  methods: {
    showUnapprovedTickets() {
      this.closeAllSections();
      this.Unapprovedtickets = true;
    },
    showTableofUnapprovedTickets() {
      this.closeAllSections();
      this.Tableofunapprovedtickets = true;
    },
    showUnapprovedTicketsSucceed() {
      this.closeAllSections();
      this.UnapprovedticketsSucceed = true;
    },
    showTableofUnapprovedTicketsSucceed() {
      this.closeAllSections();
      this.TableofunapprovedticketsSucceed = true;
    },
    closeAllSections() {
      this.Unapprovedtickets = false;
      this.Tableofunapprovedtickets = false;
      this.UnapprovedticketsSucceed = false;
      this.TableofunapprovedticketsSucceed = false;
    },
    async logout() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        this.message = "You are not logged in";
        return;
      }
      try {
        const response = await axios.post(
          "http://LOCALHOST:9992/salesjp/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("tokenactivity");
          this.message = "Logged out successfully";
          this.$router.push("/");
        } else {
          this.message = response.data.message;
        }
      } catch (error) {
        this.message = "An error occurred during logout";
        console.error(error);
      }
    },
    async checkTokenActivity() {
      const tokenActivity = sessionStorage.getItem("tokenactivity");
      if (!tokenActivity) {
        this.message = "No token activity found in sessionStorage";
        return;
      }
      try {
        const response = await axios.post(
          "http://LOCALHOST:9992/check-token-activity",
          {
            tokenactivity: tokenActivity,
          }
        );
        if (response.data.message === "The token is still usable.") {
          this.message = "Token activity ";
        } else {
          this.message = "Token activity has expired";
          this.showModalexpire = true;
        }
      } catch (error) {
        this.message = "An error occurred during token activity check";
        this.showModalexpire = true;
        console.error(error);
      }
    },
    redirectToLogin() {
      this.$router.push("/");
    },
    async fetchBookings() {
      const tokenActivity = sessionStorage.getItem("tokenactivity");
      if (!tokenActivity) {
        this.bookingError = "No token activity found. Please log in again.";
        return;
      }
      this.loadingBookings = true;
      try {
        const response = await axios.get(
          "http://LOCALHOST:9992/user/sales/viewbooking",
          {
            headers: {
              Authorization: `Bearer ${tokenActivity}`
            }
          }
        );
        this.bookings = response.data.map(booking => ({
          ...booking,
          showParticipants: false
        }));
        this.totalEntries = this.bookings.length;
        this.loadingBookings = false;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        this.bookingError = "Failed to fetch bookings. Please try again later.";
        this.loadingBookings = false;
      }
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
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
    toggleTableparticipants(booking) {
      booking.showParticipants = !booking.showParticipants;
    },
    Approveticket(bookingId) {
      this.bookingIdToApprove = bookingId;
      this.showModalapproveticket = true;
    },
    async confirmApproveTicket() {
      try {
        const response = await axios.post('http://LOCALHOST:9992/sales/booking/approve', {
          bookingId: this.bookingIdToApprove
        });

        if (response.data.success) {
          await this.fetchBookings();
          await this.fetchBookingSucceed();

          this.showModalapproveticket = false;
          this.bookingIdToApprove = null;
        } else {
          console.error('Failed to approve ticket:', response.data.message);
        }
      } catch (error) {
        console.error('Failed to approve ticket:', error);
      }
    },
    cancelApproveTicket() {
      this.showModalapproveticket = false;
      this.bookingIdToApprove = null;
    },
    applyFilters() {
      this.isFiltered = true;
      this.currentPage = 1;
      this.calculateTotalPages();
    },
    resetFilters() {
      this.searchQuery = '';
      this.startDate = '';
      this.endDate = '';
      this.isFiltered = false;
      this.currentPage = 1;
      this.calculateTotalPages();
    },
    changeEntriesPerPage(value) {
      this.entriesPerPage = parseInt(value);
      this.currentPage = 1;
      this.calculateTotalPages();
    },
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.filteredBookings.length / this.entriesPerPage);
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

    async fetchBookingSucceed() {
      const tokenActivity = sessionStorage.getItem("tokenactivity");
      if (!tokenActivity) {
        this.bookingError = "No token activity found. Please log in again.";
        return;
      }
      this.loadingBookings = true;
      try {
        const response = await axios.get(
          "http://LOCALHOST:9992/user/sales/viewbookingsucceed",
          {
            headers: {
              Authorization: `Bearer ${tokenActivity}`
            }
          }
        );
        this.bookingsSucceed = response.data.map(booking => ({
          ...booking,
          showParticipants: false
        }));
        this.totalEntriessucceed = this.bookingsSucceed.length;
        this.loadingBookings = false;
      } catch (error) {
        console.error('Error fetching successful bookings:', error);
        this.bookingError = "Failed to fetch successful bookings. Please try again later.";
        this.loadingBookings = false;
      }
    },

    
    applyFilterssucceed() {
      this.currentPagesucceed = 1;
    },
    changeEntriesPerPagesucceed(value) {
      this.entriesPerPagesucceed = parseInt(value);
      this.currentPagesucceed = 1;
    },
    nextPagesucceed() {
      if (this.currentPagesucceed < this.totalPagessucceed) {
        this.currentPagesucceed++;
      }
    },
    prevPagesucceed() {
      if (this.currentPagesucceed > 1) {
        this.currentPagesucceed--;
      }
    },

    startEditingBookingandparticipants(bookingId) {
      this.editbookingand = true;
      const booking = this.bookings.find(b => b._id === bookingId || b.id === bookingId);
      if (!booking) {
        console.error('Booking not found!');
        return;
      }
      this.editingBooking = { ...booking };
      this.generateAvailableTimes();
    },



    cancelEditingBooking() {
      this.editbookingand = false;
      this.editingBooking = null;
    },



    async saveEditedBooking() {
      if (!this.editingBooking || (!this.editingBooking._id && !this.editingBooking.id)) {
        console.error('Invalid booking ID or booking data');
        return;
      }

      const bookingId = this.editingBooking._id || this.editingBooking.id;

      try {
        const response = await axios.put(`http://LOCALHOST:9992/user/sales/updatebooking/${bookingId}`, {
          visitdate: this.editingBooking.visitdate,
          starttime: this.editingBooking.starttime,
          endtime: this.editingBooking.endtime
        }, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tokenactivity")}`
          }
        });

        console.log('Server response:', response.data);

        if (response.data && response.data.success) {
          // อัพเดทข้อมูลในตารางโดยตรง
          const index = this.bookings.findIndex(b => b._id === bookingId || b.id === bookingId);
          if (index !== -1) {
            this.bookings[index] = { ...this.bookings[index], ...this.editingBooking };
          }

          this.editbookingand = false;
          this.editingBooking = null;
          console.log('Booking updated successfully');
          // อาจจะเพิ่ม alert หรือ notification แจ้งว่าอัพเดทสำเร็จ
        } else {
          throw new Error(response.data ? response.data.message : 'Unknown error occurred');
        }
      } catch (error) {
        // อาจจะเพิ่ม alert หรือ notification แจ้งว่าเกิดข้อผิดพลาด
      } finally {
        this.editbookingand = false;
        // รีเฟรชข้อมูลทั้งหมด
        await this.fetchBookings();
      }
    },

    generateAvailableTimes() {
      if (!this.editingBooking || !this.editingBooking.visitdate) return;

      const bookingDate = new Date(this.editingBooking.visitdate).toDateString();

      // Create a map to track available times
      const availabilityMap = this.times.reduce((map, time) => {
        map[time] = true;
        return map;
      }, {});

      // Check bookings from both lists
      const allBookings = [...this.bookings, ...this.bookingsSucceed];

      allBookings.forEach(booking => {
        if (new Date(booking.visitdate).toDateString() === bookingDate && booking._id !== this.editingBooking._id) {
          const startTimeIndex = this.times.indexOf(booking.starttime);
          const endTimeIndex = this.times.indexOf(booking.endtime);

          // Mark times as unavailable including the end time
          for (let i = startTimeIndex; i <= endTimeIndex; i++) {
            availabilityMap[this.times[i]] = false;
          }
        }
      });

      this.availableTimes = this.times.map(time => ({
        time,
        available: availabilityMap[time]
      }));
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
    },


    async sendEmail(emails, suppressAlert = false) {
      if (!emails || emails.length === 0) {
        const errorMessage = 'No valid email addresses found.';
        if (!suppressAlert) alert(errorMessage);
        throw new Error(errorMessage);
      }
      try {
        const response = await axios.post('http://LOCALHOST:9992/sendEmail', { emails });
        if (response.status === 201) {
          const successMessage = 'Email sent successfully!';
          if (!suppressAlert) alert(successMessage);
          console.log(successMessage);
          return { success: true, message: successMessage };
        } else {
          throw new Error('');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = 'Email not found';
        if (!suppressAlert) alert(errorMessage);
        return { success: false, message: errorMessage };
      }
    },
    openEmailConfirmModal(email) {
      this.emailToSend = email;
      this.showEmailConfirmModal = true;
    },

    closeEmailConfirmModal() {
      this.showEmailConfirmModal = false;
      this.emailToSend = null;
    },

    async confirmAndSendEmail() {
      if (this.emailToSend) {
        this.sendInProgress = true;
        await this.sendEmail([this.emailToSend]);
        this.sendInProgress = false;
        this.closeEmailConfirmModal();
      }
    },



    async rejectBooking() {
      if (!this.rejectReason) {
        alert('Please provide a reason for rejection.');
        return { success: false, message: 'Please provide a reason for rejection.' };
      }

      this.rejectInProgress = true;

      try {
        const response = await axios.post(`http://LOCALHOST:9992/bookings/${this.bookingToReject._id}/reject`, {
          reason: this.rejectReason
        });

        if (response.status === 200) {
          this.bookings = this.bookings.filter(b => b._id !== this.bookingToReject._id);
          
          const emailResult = await this.sendEmail([this.bookingToReject.userId.email], true);
          
          let resultMessage;
          if (emailResult.success) {
            resultMessage = 'Booking rejected successfully and email sent.';
          } else {
            resultMessage = 'Booking rejected successfully, but failed to send email.';
          }
          
          alert(resultMessage);
          return { success: true, message: resultMessage };
        } else {
          throw new Error('Failed to reject booking.');
        }
      } catch (error) {
        console.error('Error rejecting booking:', error);
        const errorMessage = 'An error occurred while rejecting the booking.';
        alert(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        this.rejectInProgress = false;
        this.closeRejectModal();
      }
    },

    openRejectModal(booking) {
      this.bookingToReject = booking;
      this.showRejectModal = true;
      this.rejectReason = '';
    },

    closeRejectModal() {
      this.showRejectModal = false;
      this.bookingToReject = null;
      this.rejectReason = '';
    },
  




    async confirmApprove() {
      if (!this.bookingToApprove) return;

      this.approvalInProgress = true;
      try {
        const response = await axios.post(`http://LOCALHOST:9992/bookings/${this.bookingToApprove}/approve`);
        if (response.status === 200) {
          alert('Booking approval successful');
          // Update the local state or re-fetch the bookings
          await this.fetchBookings();
        } else {
          throw new Error(response.data.message || 'Unable to approve booking');
        }
      } catch (error) {
        console.error('There was an error approving the booking:', error);
        alert('Unable to approve the reservation. Please try again.');
      } finally {
        this.approvalInProgress = false;
        this.approveSendemail = false;
        this.bookingToApprove = null;
      }
    },
    showApproveModal(bookingId) {
      this.bookingToApprove = bookingId;
      this.approveSendemail = true;
    },

    cancelApprove() {
      this.approveSendemail = false;
      this.bookingToApprove = null;
    },

  },
  watch: {
    searchQuery() {
      if (this.searchQuery === '') {
        this.isFiltered = false;
      }
    },
    startDate() {
      this.currentPage = 1;
      this.calculateTotalPages();
    },
    endDate() {
      this.currentPage = 1;
      this.calculateTotalPages();
    },
    filteredBookings() {
      this.calculateTotalPages();
    },
    searchQuerysucceed() {
      this.currentPagesucceed = 1;
    },
    startDatesucceed() {
      this.currentPagesucceed = 1;
    },
    endDatesucceed() {
      this.currentPagesucceed = 1;
    },
    'editingBooking.visitdate': function () {
      this.generateAvailableTimes();
    }

  },

  computed: {
    filteredBookings() {
      return this.bookings.filter(booking => {
        const matchesSearch = this.searchQuery === '' ||
          booking.userId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          booking.Purposeofvisit.toLowerCase().includes(this.searchQuery.toLowerCase());

        const bookingDate = new Date(booking.visitdate);
        const matchesDateRange = (!this.startDate || bookingDate >= new Date(this.startDate)) &&
          (!this.endDate || bookingDate <= new Date(this.endDate));

        return matchesSearch && matchesDateRange;
      });
    },
    paginatedBookings() {
      const start = (this.currentPage - 1) * this.entriesPerPage;
      const end = start + this.entriesPerPage;
      return this.filteredBookings.slice(start, end);
    },
    pageStartIndex() {
      return (this.currentPage - 1) * this.entriesPerPage;
    },
    totalFilteredBookings() {
      return this.filteredBookings.length;
    },
    filteredBookingsSucceed() {
      return this.bookingsSucceed.filter(booking => {
        const userId = String(booking.userId || '');
        const purposeOfVisit = String(booking.Purposeofvisit || '');

        const matchesSearch = this.searchQuerysucceed === '' ||
          userId.toLowerCase().includes(this.searchQuerysucceed.toLowerCase()) ||
          purposeOfVisit.toLowerCase().includes(this.searchQuerysucceed.toLowerCase());

        const bookingDate = new Date(booking.visitdate);
        const matchesDateRange = (!this.startDatesucceed || bookingDate >= new Date(this.startDatesucceed)) &&
          (!this.endDatesucceed || bookingDate <= new Date(this.endDatesucceed));

        return matchesSearch && matchesDateRange;
      });
    },
    totalFilteredBookingsSucceed() {
      return this.filteredBookingsSucceed.length;
    },
    paginatedBookingsSucceed() {
      const start = (this.currentPagesucceed - 1) * this.entriesPerPagesucceed;
      const end = start + this.entriesPerPagesucceed;
      return this.filteredBookingsSucceed.slice(start, end);
    },
    totalPagessucceed() {
      return Math.ceil(this.filteredBookingsSucceed.length / this.entriesPerPagesucceed);
    },
    pageStartsucceedIndex() {
      return (this.currentPagesucceed - 1) * this.entriesPerPagesucceed;
    },

    filteredEndTimes() {
      if (!this.editingBooking || !this.editingBooking.starttime) return this.availableTimes;
      const startIndex = this.times.indexOf(this.editingBooking.starttime);
      return this.availableTimes.filter((_, index) => index > startIndex);
    },

    availableStartTimes() {
      return this.availableTimes.filter(timeSlot => timeSlot.available);
    }


  }

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