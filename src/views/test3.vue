<template>

    <div class="overflow-hidden w-full overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700"
        style="width: 90%; margin: 0 auto">
        <table class="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead
                class="border-b border-slate-300 bg-slate-100 text-sm text-black dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <tr>
                    <th scope="col" class="p-4 text-center">NO.</th>
                    <th scope="col" class="p-4 text-center">REASON</th>
                    <th scope="col" class="p-4 text-center">STATUS</th>
                    <th scope="col" class="p-4 text-center">LEAVESTART DATE</th>
                    <th scope="col" class="p-4 text-center">LEAVESTART TIME</th>
                    <th scope="col" class="p-4 text-center">LEAVEEND DATE</th>
                    <th scope="col" class="p-4 text-center">LEAVEEND TIME</th>
                    <th scope="col" class="p-4 text-center">LEAVECREATED AT</th>
                    <th scope="col" class="p-4 text-center">ACTION</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-300 dark:divide-slate-700">
                <tr v-for="(request, index) in leaveRequests" :key="request._id">
                    <td class="p-4 text-center">{{ index + 1 }}</td>
                    <td class="p-4 text-center">{{ request.leaveReason }}</td>
                    <td class="p-4 text-center">
                        <span
                            :class="['inline-flex overflow-hidden rounded-xl px-1 py-0.5 text-xs font-medium', statusClass(request.status)]">
                            {{ request.status }}
                        </span>
                    </td>
                    <td class="p-4 text-center">{{ formatDate(new Date(request.leaveStartDate)) }}</td>
                    <td class="p-4 text-center">{{ request.leaveStartTime }}</td>
                    <td class="p-4 text-center">{{ formatDate(new Date(request.leaveEndDate)) }}</td>
                    <td class="p-4 text-center">{{ request.leaveEndTime }}</td>
                    <td class="p-4 text-center">{{ formatDateTime(request.leaveCreatedAt) }}</td>

                    <td class="p-2 text-center" style="display: flex; justify-content: center; align-items: center">
                        <div class="flex space-x-2">
                            <button @click="showApprovalConfirmation(request._id)"
                                :disabled="request.status !== 'pending'"
                                class="bg-blue-500 text-white font-medium rounded-md px-1 py-1 flex items-center justify-center hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg">
                                ✔ Approve
                            </button>
                            <button @click="rejectLeave(request._id)" v-if="showRejectButton(request.status)"
                                :disabled="request.status !== 'pending'"
                                class="bg-red-500 text-white font-medium rounded-md px-1 py-1 flex items-center justify-center hover:bg-red-600 transition duration-300 ease-in-out shadow-lg">
                                ✖ Reject
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>




    <div class="flex justify-center items-center h-screen">

        <div class="wrapper bg-white rounded"
            style="box-shadow: 0 10px 15px 4px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4); width: 1400px;">
            <div class="header flex justify-between items-center border-b p-2 m-4">
                <span class="text-lg font-bold">{{ currentMonthYear }}</span>
                <div class="flex items-center space-x-4">
                    <!-- Month Dropdown (Fuchsia theme) -->
                    <div class="relative" style="width: 500px;">
                        <button @click="toggleMenuSearchMonth"
                            class="rounded-lg px-2 py-2 bg-fuchsia-100 border-2 border-solid border-fuchsia-300 transition-colors hover:bg-fuchsia-200 font-medium text-base leading-none text-fuchsia-800 flex items-center justify-between w-30">
                            {{ searchMonth ? monthNames[searchMonth - 1] : 'Select Month' }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <ul v-show="isMonthMenuOpen"
                            class="absolute left-0 z-10 mt-1 w-40 rounded-md border border-fuchsia-200 bg-white py-1 shadow-lg focus:outline-none">
                            <li v-for="(month, index) in monthNames" :key="index" @click="selectMonth(index + 1)"
                                class="cursor-pointer select-none px-3 py-2 text-sm text-fuchsia-800 hover:bg-fuchsia-100">
                                {{ month }}
                            </li>
                        </ul>
                    </div>

                    <!-- Year Dropdown (Green theme) -->
                    <div class="relative">
                        <button @click="toggleMenuSearchYear"
                            class="rounded-lg px-2 py-2 bg-green-100 border-2 border-solid border-green-300 transition-colors hover:bg-green-200 font-medium text-base leading-none text-green-800 flex items-center justify-between w-26">
                            {{ searchYear || 'Select Year' }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <ul v-show="isYearMenuOpen"
                            class="year-list absolute left-0 z-10 mt-1 w-40 rounded-md border border-green-200 bg-white py-1 shadow-lg focus:outline-none max-h-60 overflow-y-auto">
                            <li v-for="year in years" :key="year" @click="selectYear(year)" :data-year="year"
                                class="cursor-pointer select-none px-3 py-2 text-sm text-green-800 hover:bg-green-100">
                                {{ year }}
                            </li>
                        </ul>
                    </div>

                    <button @click="searchDate"
                        class="rounded-lg px-2 py-2 bg-blue-400/20 border-2 border-solid border-blue-500/20 transition-colors hover:bg-blue-500/40 font-medium text-base leading-none">
                        Search
                    </button>

                    <button @click="goToToday"
                        class="rounded-lg px-2 py-2 bg-purple-400/20 border-2 border-solid border-purple-500/20 transition-colors hover:bg-purple-500/40 font-medium text-base leading-none flex items-center justify-center">
                        Today
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>

                    <div class="buttons flex flex-row space-x-2">
                        <button @click="previousMonth" type="submit"
                            class="rounded-lg px-2 py-2 bg-pink-400/20 border-2 border-solid border-pink-500/20 transition-colors hover:bg-pink-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16"
                                height="16">
                                <path fill-rule="evenodd"
                                    d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <button @click="nextMonth" type="submit"
                            class="rounded-lg px-2 py-2 bg-pink-400/20 border-2 border-solid border-pink-500/20 transition-colors hover:bg-pink-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16"
                                height="16">
                                <path fill-rule="evenodd"
                                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <table class="w-full">
                <thead>
                    <tr>
                        <th v-for="day in weekdays" :key="day"
                            class="p-2 border-r h-8 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                            <span :class="[dayColors[day], 'xl:block lg:block md:block sm:block hidden']"
                                style="padding: 10px; margin-top: -20px;">{{ day }}</span>
                            <span class="xl:hidden lg:hidden md:hidden sm:hidden block">{{ day.charAt(0) }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="week in calendar" :key="week[0].date" class="text-center h-18">
                        <td v-for="day in week" :key="day.date"
                            class="border p-1 h-24 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden transition cursor-pointer duration-500 ease hover:bg-gray-300"
                            :class="{ 'bg-orange-200': isToday(day.date), 'bg-gray-100': !day.currentMonth }"
                            @click="showAppointmentDetails(day.date)">
                            <div class="flex flex-col h-full">
                                <div class="top h-5 w-full">
                                    <span class="text-gray-900" style="font-size: 14px; font-weight: bold;"
                                        :class="{ 'font-bold': isToday(day.date) }">{{ day.number }}</span>
                                </div>
                                <div class="bottom flex-grow h-full w-full overflow-y-auto cursor-pointer">
                                    <div v-for="appointment in getAppointmentsForDate(day.date)" :key="appointment.id"
                                        @click.stop="showAppointmentDetails(appointment)"
                                        :class="getEventClass(appointment, day.date)"
                                        class="event text-black p-1 mb-1 truncate"
                                        style="font-size: 10px; font-weight: bold; width: 100%; text-align: left;">
                                        <span class="event-name">
                                            {{ formatDateWithoutYear(appointment.date) }} {{
                    formatTime(appointment.time) }} TO
                                            {{ formatDateWithoutYear(appointment.endDate) }} {{
                    formatTime(appointment.endTime) }}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>


            </table>
        </div>
    </div>






    <section v-if="showModalLeaveapproval"
        class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
            <svg class="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
                <h4 class="text-slate-600 font-bold text-base text-center">
                    Confirm Approval
                </h4>
                <p class="text-slate-600 text-xs mt-2 md:mt-1 text-center">
                    Are you sure you want to approve this leave request?
                </p>
            </div>
            <div class="flex">
                <button @click="confirmApproval"
                    class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-green-400 bg-white text-green-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-green-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-green-600 hover:border-2">
                    <span class="text-slate-600 relative z-10"><b>OK</b></span>
                </button>
                <button @click="cancelApproval"
                    class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
                    <span class="text-slate-600 relative z-10"><b>Cancel</b></span>
                </button>
            </div>
        </div>
    </section>




    <section v-if="showModalReject"
        class="w-full h-screen flex flex-col items-center gap-10 bg-slate-50 p-5 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div class="w-full max-w-sm flex flex-col items-center gap-8 bg-slate-200 p-5 rounded-xl">
            <svg class="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <div class="flex flex-col items-center gap-1" style="margin-top: -20px;">
                <h4 class="text-slate-600 font-bold text-base text-center">
                    Confirm Rejection
                </h4>

                <div class="flex flex-col-reverse w-full">
                    <input v-model="rejectionMessage" placeholder="Enter rejection reason"
                        class="peer outline-none border pl-2 py-1 duration-500 border-black focus:border-dashed relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                        type="text" />
                    <span
                        class="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0"
                        style="font-weight: bold;">Enter rejection reason</span>
                </div>

                <p class="text-slate-600 text-xs mt-2 md:mt-1 text-center">
                    Are you sure you want to reject this leave request?
                </p>
            </div>
            <div class="flex">
                <button @click="confirmReject"
                    class="rounded-tl-2xl rounded-bl-2xl relative h-[35px] w-20 overflow-hidden border border-green-400 bg-white text-green-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-green-400 hover:before:w-2/4 hover:before:bg-green-500 hover:after:w-2/4 hover:after:bg-green-500 hover:border-green-600 hover:border-2">
                    <span class="text-slate-600 relative z-10"><b>OK</b></span>
                </button>
                <button @click="cancelReject"
                    class="rounded-tr-2xl rounded-br-2xl relative h-[35px] w-20 overflow-hidden border border-red-400 bg-white text-red-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-red-400 hover:before:w-2/4 hover:before:bg-red-500 hover:after:w-2/4 hover:after:bg-red-500 hover:border-red-600 hover:border-2">
                    <span class="text-slate-600 relative z-10"><b>Cancel</b></span>
                </button>
            </div>
        </div>
    </section>










    <teleport to="body">
        <div v-if="showParticipantsOnTicket"
            class="dialog-overlay fixed inset-0 bg-grey-50 bg-opacity-50 z-50 flex items-center justify-center"
            @click="handleCloseparticipantsOnTicket">

            <div v-if="selectedAppointment" class="dialog w-[430px]"
                :class="{ 'dialog-enter': isOpen, 'dialog-leave': !isOpen }" @click.stop>

                <div class="flex items-center p-2  " style="margin-top: -10px;">
                    <div class="px-1" style="margin-top: -3px;">
                        <span @click="handleCloseparticipantsOnTicket"
                            class="w-4 h-4 rounded-full inline-block bg-red-500 cursor-pointer flex items-center justify-center">
                            <svg class="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 9.293l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <div class="px-1">
                        <span class="w-4 h-4 rounded-full inline-block bg-yellow-400 cursor-pointer"></span>
                    </div>
                    <div class="px-1">
                        <span class="w-4 h-4 rounded-full inline-block bg-green-500 cursor-pointer"></span>
                    </div>
                    <div class="px-1 ml-auto">
                        <span style="font-size: 12px;">{{ formatDateWithTime(selectedAppointment.leaveCreatedAt)
                            }}</span>
                    </div>
                </div>


                <div class="flex flex-row items-center justify-center gap-[0.5em] p-[0.25em]">
                    <svg class="h-8 w-8 text-yellow-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                        <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                    </svg>
                    <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                    <p>SALES NAME: {{ selectedAppointment.salesUser.firstname }} {{
                    selectedAppointment.salesUser.lastname }}</p>
                </div>

                <div class="flex flex-col items-center p-[1.25em]" style="margin-top: -15px;">
                    <!-- Top Row with Icons and Labels -->
                    <div class="flex flex-row justify-between items-center w-full">
                        <div class="flex flex-row items-center gap-[0.5em]">
                            <svg class="h-8 w-8 text-cyan-600" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="13" r="7" />
                                <polyline points="12 10 12 13 14 13" />
                                <line x1="7" y1="4" x2="4.25" y2="6" />
                                <line x1="17" y1="4" x2="19.75" y2="6" />
                            </svg>
                            <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                            <span style="font-size: 12px; margin-right: 2em;">LEAVE START DATE</span>
                        </div>
                        <div class="flex flex-row items-center gap-[0.5em]">
                            <svg class="h-8 w-8 text-cyan-600" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="13" r="7" />
                                <polyline points="12 10 12 13 14 13" />
                                <line x1="7" y1="4" x2="4.25" y2="6" />
                                <line x1="17" y1="4" x2="19.75" y2="6" />
                            </svg>
                            <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                            <span style="font-size: 12px;">LEAVE END DATE</span>
                        </div>
                    </div>
                    <!-- Bottom Row with Labels Centered -->
                    <div class="flex flex-row  gap-[4em] " style="margin-top: 0px;">
                        <span style="font-size: 12px; margin-left: 2em;">{{
                    formatDateWithTime(selectedAppointment.leaveStartDate) }}</span>
                        <span style="font-size: 12px;">{{ formatDateWithTime(selectedAppointment.leaveEndDate) }}</span>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center gap-[0.5em] p-[0.25em]"
                    style="margin-top: -10px;">
                    <div class="flex flex-row items-center justify-center gap-[0.5em]">
                        <svg class="h-8 w-8 text-blue-600" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 19l7-7 3 3-7 7-3-3z" />
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                            <path d="M2 2l7.586 7.586" />
                            <circle cx="11" cy="11" r="2" />
                        </svg>
                        <span class="h-[0.5em] w-[1px] rounded-full bg-[hsla(336,86%,70%,0.5)]"></span>
                        <p>REASON</p>
                    </div>
                    <div>
                        <span
                            style="font-size: 14px; display: block; margin-left: 30px; margin-right: 30px; text-indent: 20px; margin-top: 5px;">
                            {{ selectedAppointment.title.replace('Leave: ', '') }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </teleport>













</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentDate: new Date(),
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayColors: {
                'Sunday': 'bg-red-200',
                'Monday': 'bg-yellow-200',
                'Tuesday': 'bg-pink-200',
                'Wednesday': 'bg-green-200',
                'Thursday': 'bg-orange-200',
                'Friday': 'bg-blue-200',
                'Saturday': 'bg-purple-200'
            },
            appointments: [],
            selectedDate: null,
            selectedAppointments: [],
            searchMonth: '',
            searchYear: new Date().getFullYear(),
            isMonthMenuOpen: false,
            isYearMenuOpen: false,
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            years: [],
            leaveRequests: [],
            showModalLeaveapproval: false,
            currentLeaveId: null,
            showModalReject: false,
            selectedLeaveId: null,
            rejectionMessage: '',
            leaveColors: {},
            showParticipantsOnTicket: false,
            selectedAppointment: null,
        };
    },
    created() {
        this.fetchLeaveRequests();
        const startYear = 2010;
        const endYear = 2060;
        this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollToCurrentYear();
        });
    },
    computed: {
        currentMonthYear() {
            return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        },
        calendar() {
            const startDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
            const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
            let date = 1;
            const calendar = [];
            for (let i = 0; i < 6; i++) {
                const week = [];
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < startDay) {
                        week.push({ number: '', date: null, currentMonth: false });
                    } else if (date > daysInMonth) {
                        week.push({ number: '', date: null, currentMonth: false });
                    } else {
                        const currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date);
                        week.push({
                            number: date,
                            date: currentDate,
                            currentMonth: true
                        });
                        date++;
                    }
                }
                calendar.push(week);
                if (date > daysInMonth) break;
            }
            return calendar;
        }
    },
    methods: {
        previousMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        },
        nextMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        },
        getAppointmentsForDate(date) {
            if (!date) return [];
            const dateString = this.formatDate(date);
            return this.appointments.filter(appointment => {
                const startDate = appointment.date;
                const endDate = appointment.endDate || appointment.date;
                return dateString >= startDate && dateString <= endDate;
            });
        },
        showAppointmentDetails(appointment) {
            if (!appointment || !appointment.date) {
                console.error('Invalid appointment:', appointment);
                return;
            }
            this.selectedAppointment = appointment;
            this.showParticipantsOnTicket = true;
        },
        formatDate(date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.toISOString().split('T')[0];
        },
        formatLeaveDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        },
        formatTime(time) {
            if (!time) return '';
            return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        formatDateTime(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatDateWithTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        },

        formatDateWithoutYear(date) {
            if (!date) return '';
            const options = { day: '2-digit', month: '2-digit' }; // Use '2-digit' for both day and month
            return new Date(date).toLocaleDateString('th-TH', options);
        },


        isToday(date) {
            if (!date) return false;
            const today = new Date();
            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        },
        goToToday() {
            this.currentDate = new Date();
            this.searchMonth = this.currentDate.getMonth() + 1;
            this.searchYear = this.currentDate.getFullYear();
        },
        toggleMenuSearchMonth() {
            this.isMonthMenuOpen = !this.isMonthMenuOpen;
            this.isYearMenuOpen = false;
        },
        toggleMenuSearchYear() {
            this.isYearMenuOpen = !this.isYearMenuOpen;
            this.isMonthMenuOpen = false;
        },
        selectMonth(month) {
            this.searchMonth = month;
            this.isMonthMenuOpen = false;
        },
        selectYear(year) {
            this.searchYear = year;
            this.isYearMenuOpen = false;
        },
        searchDate() {
            const month = parseInt(this.searchMonth) - 1;
            const year = parseInt(this.searchYear);
            if (isNaN(month) || isNaN(year) || month < 0 || month > 11) {
                return;
            }
            this.currentDate = new Date(year, month, 1);
        },
        scrollToCurrentYear() {
            this.$nextTick(() => {
                const yearList = this.$refs.yearList;
                if (yearList) {
                    const currentYearElement = yearList.querySelector(`[data-year="${this.searchYear}"]`);
                    if (currentYearElement) {
                        currentYearElement.scrollIntoView({ block: 'center' });
                    }
                }
            });
        },
        async fetchLeaveRequests() {
            try {
                const response = await axios.get('http://LOCALHOST:9992/all-leave-requests');
                this.leaveRequests = response.data.leaveRequests;
                this.convertApprovedLeavesToAppointments();
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        },
        convertApprovedLeavesToAppointments() {
            const approvedLeaves = this.leaveRequests.filter(request => request.status === 'approved');
            const leaveColors = {};

            approvedLeaves.forEach((leave, index) => {
                const leaveMonth = new Date(leave.leaveStartDate).getMonth();
                if (!leaveColors[leaveMonth]) {
                    leaveColors[leaveMonth] = [];
                }
                leaveColors[leaveMonth].push(this.getColorClass(index));
            });

            this.leaveColors = leaveColors;

            this.appointments = approvedLeaves.map((leave, index) => {
                const leaveMonth = new Date(leave.leaveStartDate).getMonth();

                const adjustDate = (date) => {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() - 1);
                    return newDate;
                };

                const adjustedStartDate = adjustDate(leave.leaveStartDate);
                const adjustedEndDate = adjustDate(leave.leaveEndDate);

                const appointment = {
                    id: leave._id,
                    date: this.formatDate(adjustedStartDate),
                    endDate: this.formatDate(adjustedEndDate),
                    time: leave.leaveStartTime,
                    endTime: leave.leaveEndTime,
                    title: `Leave: ${leave.leaveReason}`,
                    colorClass: this.leaveColors[leaveMonth][index % this.leaveColors[leaveMonth].length],
                    leaveStartDate: leave.leaveStartDate,
                    leaveEndDate: leave.leaveEndDate,
                    leaveCreatedAt: leave.leaveCreatedAt,
                    salesUser: {
                        firstname: leave.salesUserId.firstname,
                        lastname: leave.salesUserId.lastname
                    }
                };
                console.log('Converted appointment:', appointment);
                return appointment;
            });
        },
        getColorClass(index) {
            const colorClasses = [
                'bg-red-200', 'bg-yellow-200', 'bg-pink-200', 'bg-green-200', 'bg-orange-200',
                'bg-blue-200', 'bg-purple-200', 'bg-indigo-200', 'bg-teal-200', 'bg-gray-200',
                'bg-red-300', 'bg-yellow-300', 'bg-pink-300', 'bg-green-300', 'bg-orange-300',
                'bg-blue-300', 'bg-purple-300', 'bg-indigo-300', 'bg-teal-300', 'bg-gray-300'
            ];
            return colorClasses[index % colorClasses.length];
        },
        async approveLeave(leaveId) {
            try {
                await axios.put(`http://LOCALHOST:9992/leave/${leaveId}/approve`);
                this.fetchLeaveRequests();
            } catch (error) {
                console.error('Error approving leave:', error);
            }
        },
        async rejectLeave(leaveId) {
            this.selectedLeaveId = leaveId;
            this.showModalReject = true;
        },
        statusClass(status) {
            return {
                'border-orange-600 text-orange-600 bg-orange-600/10': status === 'pending',
                'border-green-600 text-green-600 bg-green-600/10': status === 'approved',
                'border-red-600 text-red-600 bg-red-600/10': status === 'rejected'
            };
        },
        showApprovalConfirmation(leaveId) {
            this.currentLeaveId = leaveId;
            this.showModalLeaveapproval = true;
        },
        confirmApproval() {
            this.approveLeave(this.currentLeaveId);
            this.showModalLeaveapproval = false;
        },
        cancelApproval() {
            this.showModalLeaveapproval = false;
        },
        confirmReject() {
            if (!this.rejectionMessage) {
                alert('Please enter a rejection message.');
                return;
            }
            axios.put(`http://LOCALHOST:9992/leave/${this.selectedLeaveId}/reject`, { rejectionMessage: this.rejectionMessage })
                .then(() => {
                    this.fetchLeaveRequests();
                })
                .catch(error => {
                    console.error('Error rejecting leave:', error);
                })
                .finally(() => {
                    this.closeRejectModal();
                });
        },
        cancelReject() {
            this.closeRejectModal();
        },
        closeRejectModal() {
            this.showModalReject = false;
            this.selectedLeaveId = null;
            this.rejectionMessage = '';
        },
        showRejectButton(status) {
            return status !== 'approved' && status !== 'rejected';
        },
        getEventClass(appointment, date) {
            const isFirstDay = this.isFirstDayOfEvent(appointment, date);
            const isLastDay = this.isLastDayOfEvent(appointment, date);
            return {
                [appointment.colorClass]: true,
                'rounded-l': isFirstDay,
                'rounded-r': isLastDay,
                'rounded-none': !isFirstDay && !isLastDay,
            };
        },
        isFirstDayOfEvent(appointment, date) {
            return this.formatDate(date) === appointment.date;
        },
        isLastDayOfEvent(appointment, date) {
            return this.formatDate(date) === appointment.endDate;
        },
        handleCloseparticipantsOnTicket() {
            this.showParticipantsOnTicket = false;
            this.selectedAppointment = null;
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
        transform: scale(0.7) translateY(-100px);
    }
}
</style>
