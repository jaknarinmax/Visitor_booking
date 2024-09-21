<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountTie, mdiArrowDownDropCircle, mdiCarBack, mdiCardAccountDetailsStar, mdiContentSaveCheckOutline, mdiDomain, mdiIdentifier, mdiPassport } from '@mdi/js';
import axios from 'axios';

export default {
	components: {
		SvgIcon,
	},
	data() {
		return {
			icons: {
				mdiArrowDownDropCircle,
				mdiDomain,
				mdiCardAccountDetailsStar,
				mdiIdentifier,
				mdiPassport,
				mdiCarBack,
				mdiContentSaveCheckOutline,
				mdiAccountTie,
			},
			selectedItemstatuses: [],
			participants: [],
			userId: '',
			visitdate: '',
			numberofpeople: '',
			starttime: '',
			endtime: '',
			Purposeofvisit: '',
			isModalsaved: false,
			isModalnotsaved: false,
			isModalagainsaved: false,
			selectedDate: null,
			showStartTimeDropdown: false,
			showEndTimeDropdown: false,
			selectedStartTime: null,
			selectedEndTime: null,
			currentSeconds: 0,
			selectedStatus: null,
			user: {
				firstname: '',
				lastname: '',
				position: '',
				country: ''
			},
			validationErrors: {},
		};
	},
	computed: {
		formattedDate() {
			const selectedDate = sessionStorage.getItem('visitdate');
			if (selectedDate) {
				const parts = selectedDate.split('T')[0].split('-').reverse().join('-');
				return parts;
			} else {
				return 'No date selected';
			}
		},
	},
	methods: {
		showSelected(item, index) {
			this.selectedStatus = item;
			this.selectedItemstatuses[index] = item;
			this.participants[index].selectstatus = item;
			console.log(`Participant ${index + 1} status:`, item);
		},


		validateForm() {
    this.validationErrors = {};

    if (!this.visitdate) this.validationErrors.visitdate = true;
    if (!this.starttime) this.validationErrors.starttime = true;
    if (!this.endtime) this.validationErrors.endtime = true;
    if (!this.Purposeofvisit) this.validationErrors.Purposeofvisit = true;

    this.participants.forEach((participant, index) => {
        if (!participant.selecttype) this.validationErrors[`participant${index}.selecttype`] = true;

        // Check if either Thai ID or Passport is filled
        if (!participant.thaiid && !participant.passportno) {
            this.validationErrors[`participant${index}.selectidentity`] = true;
        }

        if (!participant.carregistration) this.validationErrors[`participant${index}.carregistration`] = true;

		
		if ((participant.selectjourney === 'self rental vehical' || participant.selectjourney === 'Personal Vehicle') && !participant.carregistration) {
            this.validationErrors[`participant${index}.carregistration`] = true;
        }

		if (!participant.selectstatus) {
            this.validationErrors[`participant${index}.selectstatus`] = true;
        }


        if (!participant.name) this.validationErrors[`participant${index}.name`] = true;
        if (!participant.surname) this.validationErrors[`participant${index}.surname`] = true;
        if (!participant.email) this.validationErrors[`participant${index}.email`] = true;
        if (!participant.telephonenumber) this.validationErrors[`participant${index}.telephonenumber`] = true;
        if (!participant.country) this.validationErrors[`participant${index}.country`] = true;
        if (!participant.age) this.validationErrors[`participant${index}.age`] = true;
        if (!participant.selectstatus) this.validationErrors[`participant${index}.selectstatus`] = true;
        if (!participant.selectjourney) this.validationErrors[`participant${index}.selectjourney`] = true;

        if (participant.selecttype === 'company' && !participant.companyname) {
            this.validationErrors[`participant${index}.companyname`] = true;
        }

        if (participant.selectedIdentity === 'thaiid' && !participant.thaiid) {
            this.validationErrors[`participant${index}.thaiid`] = true;
        }

        if (participant.selectedIdentity === 'passport' && !participant.passportno) {
            this.validationErrors[`participant${index}.passportno`] = true;
        }

        if ((participant.selectjourney === 'self rental vehical' || participant.selectjourney === 'Personal Vehicle') && !participant.carregistration) {
            this.validationErrors[`participant${index}.carregistration`] = true;
        }
    });

    return Object.keys(this.validationErrors).length === 0;
},








		async submitBooking() {
			if (!this.validateForm()) {
				this.isModalnotsaved = true;
				return;
			}

			try {
				const payload = {
					userId: this.userId,
					visitdate: this.visitdate,
					numberofpeople: parseInt(this.numberofpeople),
					starttime: this.starttime,
					endtime: this.endtime,
					Purposeofvisit: this.Purposeofvisit,
					participants: this.participants.map(participant => ({
						selecttype: participant.selecttype,
						companyname: participant.companyname,
						selectidentity: participant.selectidentity,
						thaiid: participant.thaiid,
						passportno: participant.passportno,
						selectjourney: participant.selectjourney,
						carregistration: participant.carregistration,
						selectstatus: participant.selectstatus,
						name: participant.name,
						surname: participant.surname,
						email: participant.email,
						telephonenumber: participant.telephonenumber,
						country: participant.country,
						age: participant.age,
					})),
				};

				const response = await axios.post('http://LOCALHOST:9992/sales/booking', payload);

				console.log(response.data);
				this.isModalsaved = true;

				this.saveFormDataToSessionStorage();
			} catch (error) {
				console.error('Error creating booking:', error);
				if (error.response) {
					console.error('Response data:', error.response.data);
					this.isModalagainsaved = true;
				} else {
					alert('Error: ' + error.message);
				}
			}
		},

		saveFormDataToSessionStorage() {
			sessionStorage.setItem('userId', this.userId);
			sessionStorage.setItem('visitdate', this.visitdate);
			sessionStorage.setItem('numberofpeople', this.numberofpeople);
			sessionStorage.setItem('starttime', this.starttime);
			sessionStorage.setItem('endtime', this.endtime);
			sessionStorage.setItem('participants', JSON.stringify(this.participants));
		},

		async fetchUserData() {
			const userId = sessionStorage.getItem('userId');
			if (userId) {
				try {
					const response = await axios.get(`http://LOCALHOST:9992/salesapprovejp/all/${userId}`);
					this.user = {
						firstname: response.data.firstname || '',
						lastname: response.data.lastname || '',
						position: response.data.position || '',
						country: response.data.country || ''
					};
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			} else {
				console.error('No user ID found in session storage');
			}
		},

		handleChange(index, type) {
			const participant = this.participants[index];
			if (type === 'Individual') {
				participant.companyname = '';
			}
			participant.selecttype = type.toLowerCase();
		},

		handleChange1(index, identity) {
			const participant = this.participants[index];
			if (identity === 'ID') {
				participant.selectedIdentity = 'thaiid';
				participant.passportno = '';
			} else if (identity === 'Passport') {
				participant.selectedIdentity = 'passport';
				participant.thaiid = '';
			}
		},

		onJourneySelect(participant) {
			console.log(`Journey selected: ${participant.selectjourney}`);
		},

		closeModalnotsaved() {
			this.isModalnotsaved = false;
		},

		closeModalagainsaved() {
			this.isModalagainsaved = false;
		},
	},
	created() {
		const numberOfPeople = sessionStorage.getItem('numberofpeople');
		if (numberOfPeople && !isNaN(numberOfPeople)) {
			const number = parseInt(numberOfPeople);
			if (number > 0) {
				this.participants = new Array(number).fill().map(() => ({
					selecttype: '',
					companyname: '',
					selectidentity: '',
					thaiid: '',
					passportno: '',
					selectjourney: '',
					carregistration: '',
					selectstatus: '',
					name: '',
					surname: '',
					email: '',
					telephonenumber: '',
					country: '',
					age: '',
				}));
			}
		}

		this.userId = sessionStorage.getItem('userId');
		this.visitdate = sessionStorage.getItem('visitdate');
		this.numberofpeople = numberOfPeople;
		this.starttime = sessionStorage.getItem('starttime');
		this.endtime = sessionStorage.getItem('endtime');
		this.Purposeofvisit = sessionStorage.getItem('purposeofvisit');
		this.duration = sessionStorage.getItem('duration');
		this.fetchUserData();
	},
};
</script>




<template>
	<!-- component -->

	<section class="mb-32" style="margin-top: -25px;">
		<div id="map" class="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
			<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1513.7490275182!2d100.65427076936837!3d13.557399981949114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d58fab34c7aa3%3A0x4c9451186318772f!2sJinpao%20Precision%20Industry%20Co.%2CLtd.!5e0!3m2!1sen!2sth!4v1714030197325!5m2!1sen!2sth" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
		<div class=" px-1 md:px-1">
			<div class="hidden md:block">
				<div class="  px-1 py-1   md:py-10 md:px-0 -mt-[90px] backdrop-blur-[100px] " style="border: 2px dashed #4E4C4CC6;  border-radius: 10px; width: 95% ">
					<h2 style="font-size: 16px; color: gray-500;"><b>∗{{ $t('home3.appointmentdetails') }}∗</b></h2>
					<div class="flex flex-wrap " style="margin-top: 10px;">
						<div class="w-full shrink-0 grow-0 basis-auto lg:w-9/12 px-2 ">
							<div class="flex flex-wrap">

								<div class="mb-1 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div class="inline-block rounded-md bg-teal-400-100 p-4  text-teal-700">
												<svg class="h-8 w-8 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
												</svg>
											</div>
										</div>

										<div>
											<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px; ">{{selectedItem ? $t('home3.salesname') : (selectedDepartment ? $t('home3.department') : 'Select Sales') }}
											</p>
											<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
												{{ user.firstname || '' }} {{ user.lastname || '' }}
											</p>
										</div>
									</div>
								</div>
								<div class="mb-1 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
												<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" />
													<rect x="3" y="7" width="18" height="13" rx="2" />
													<path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
													<line x1="12" y1="12" x2="12" y2="12.01" />
													<path d="M3 13a20 20 0 0 0 18 0" />
												</svg>
											</div>
										</div>
										<div>
											<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.position') }}</p>
											<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
												{{ user.position }}
											</p>
										</div>
									</div>
								</div>

								<div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
									<div class="flex items-start">
										<div class="shrink-0">
											<div class="inline-block rounded-md bg-teal-400-100 p-4  text-teal-700">
												<svg class="h-8 w-8 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
											</div>
										</div>
										<div>
											<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px; ">{{ $t('home3.country') }}</p>
											<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
												{{ user.country }}
											</p>
										</div>
									</div>
								</div>
								<div class="mb-1 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6" style="margin-top: -50px;">
									<div class="align-start flex">
										<div class="shrink-0">
											<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
												<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" />
													<rect x="4" y="5" width="16" height="16" rx="2" />
													<line x1="16" y1="3" x2="16" y2="7" />
													<line x1="8" y1="3" x2="8" y2="7" />
													<line x1="4" y1="11" x2="20" y2="11" />
													<line x1="11" y1="15" x2="12" y2="15" />
													<line x1="12" y1="15" x2="12" y2="18" />
												</svg>
											</div>
										</div>
										<div>
											<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.date') }}</p>
											<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
												{{ formattedDate }}
											</p>
										</div>
									</div>
								</div>
								<div class="mb-1 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6"
									style="margin-top: -50px;">
									<div class="align-start flex">
										<div class="shrink-0">
											<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
												<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
													<path stroke="none" d="M0 0h24v24H0z" />
													<circle cx="12" cy="13" r="7" />
													<polyline points="12 10 12 13 14 13" />
													<line x1="7" y1="4" x2="4.25" y2="6" />
													<line x1="17" y1="4" x2="19.75" y2="6" />
												</svg>
											</div>
										</div>
										<div>
											<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.time') }}</p>
											<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
												{{ starttime }} - {{ endtime }} &nbsp; ({{ duration }})
											</p>
										</div>
									</div>
								</div>

							</div>
						</div>

						<div class="shrink-0">
						</div>

						<div class='flex items-center justify-center px-4' style="margin-top: -10px; margin-left:10px;">
							<div class="flex-shrink-0">
								<img class="w-10 h-10 rounded-full" src="@/assets/images/img25.png" alt="search image" />
								<div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
									<svg aria-hidden="true" class="w-4 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd"
											d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
											clip-rule="evenodd"></path>
									</svg>
								</div>
							</div>
							<div class='text-left '>
								<h4 class='text-sm ease-in-out duration-1000 uppercase px-4' style="font-size: 12px;">
									<span class='text-red-500'>{{ $t('home3.participants') }}</span>&nbsp;{{ $t('home3.number') }}</h4>
								<h4 class='text-sm md:text-base font-medium dark:text-gray-200 px-4' style="font-size: 20px; margin-left: 10px; margin-top: 5px;">{{ numberofpeople }}
									&nbsp; <svg-icon type="mdi" :path="path8" class="h-6 w-6 " style="display: inline-block; vertical-align: middle; margin-top: -5px;"></svg-icon>
								</h4>
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>



		<!-- มือถือ -->
		<div class="md:hidden">
			<div class="  px-1 py-1   md:py-10 md:px-0 -mt-[90px] backdrop-blur-[100px] " style="border: 2px dashed #989696C6;  border-radius: 10px; width: 95%;  margin-left: 10px;">
				<div class="flex flex-wrap " style="margin-top: 10px;">
					<div class="w-full shrink-0 grow-0 basis-auto lg:w-9/12 px-2 ">
						<div class="flex flex-wrap">
							<div class="mb-1 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
								<div class="flex items-start">
									<div class="shrink-0">
										<div class="inline-block rounded-md bg-teal-400-100 p-4  text-teal-700">
											<svg class="h-8 w-8 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
											</svg>
										</div>
									</div>
									<div class="ml-1 grow">
										<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px; ">{{ selectedItem ? $t('home3.salesname') : (selectedDepartment ? $t('home3.department') : 'Select Sales') }}</p>
										<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
											{{ selectedItem ? selectedItem.text : 'Select Sales' }}
										</p>
									</div>
								</div>
							</div>
							<div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6" style="margin-top: -20px;">
								<div class="flex items-start">
									<div class="shrink-0">
										<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
											<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" />
												<rect x="3" y="7" width="18" height="13" rx="2" />
												<path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
												<line x1="12" y1="12" x2="12" y2="12.01" />
												<path d="M3 13a20 20 0 0 0 18 0" />
											</svg>
										</div>
									</div>
									<div class="ml-1 grow">
										<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.position') }}</p>
										<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
											{{ selectedItem ? selectedItem.department : 'Select Sales' }}
										</p>
									</div>
								</div>
							</div>
							<div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6" style="margin-top: -60px;">
								<div class="flex items-start">
									<div class="shrink-0">
										<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
											<svg class="h-8 w-8 text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
									</div>
									<div class="ml-1 grow">
										<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.country') }}</p>
										<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
											{{ selectedItem ? selectedItem.country : 'Select Sales' }}
										</p>
									</div>
								</div>
							</div>

							<div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6" style="margin-top: -60px;">
								<div class="align-start flex">
									<div class="shrink-0">
										<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
											<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" />
												<rect x="4" y="5" width="16" height="16" rx="2" />
												<line x1="16" y1="3" x2="16" y2="7" />
												<line x1="8" y1="3" x2="8" y2="7" />
												<line x1="4" y1="11" x2="20" y2="11" />
												<line x1="11" y1="15" x2="12" y2="15" />
												<line x1="12" y1="15" x2="12" y2="18" />
											</svg>
										</div>
									</div>
									<div class="ml-1 grow">
										<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.date') }}</p>
										<p class="text-neutral-500" style="font-size: 12px; margin-top: -5px;">
											{{ formattedDate }}
										</p>

									</div>
								</div>
							</div>
							<div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6" style="margin-top: -60px;">
								<div class="align-start flex">
									<div class="shrink-0">
										<div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
											<svg class="h-8 w-8 text-emerald-900" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="12" cy="13" r="7" />
												<polyline points="12 10 12 13 14 13" />
												<line x1="7" y1="4" x2="4.25" y2="6" />
												<line x1="17" y1="4" x2="19.75" y2="6" />
											</svg>
										</div>
									</div>
									<div class="ml-1 grow">
										<p class="mb-1 font-bold" style="font-size: 13px; margin-top: 10px;">{{ $t('home3.time') }}</p>
										<p class="text-neutral-500" style=" font-size: 12px; margin-top: -5px;">
											{{ selectedStartTime }} - {{ selectedEndTime }} &nbsp; ({{ duration }})
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="mb-2 w-full shrink-0 grow-0 basis-auto md:w-3/12 md:px-3 ">
						<div class="shrink-0">
						</div>

						<div class='flex items-center justify-center px-4' style="margin-top: 10px; ;">
							<div class="flex-shrink-0">
								<img class="w-8 h-8 rounded-full" src="@/assets/images/img25.png" alt="search image" />
								<div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
									<svg aria-hidden="true" class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd"
											d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
											clip-rule="evenodd"></path>
									</svg>
								</div>
							</div>
							<div class='text-left '>
								<h4 class='text-sm ease-in-out duration-1000 uppercase px-4' style="font-size: 12px;">
									<span class='text-red-500'>{{ $t('home3.participants') }}</span>&nbsp;{{ $t('home3.number') }}</h4>
								<h4 class='text-sm md:text-base font-medium dark:text-gray-200 px-4' style="font-size: 12px; margin-left: 10px; margin-top: 2px;">3 &nbsp; <svg-icon
										type="mdi" :path="path8" class="h-4 w-4 "
										style="display: inline-block; vertical-align: middle; margin-top: -5px;"></svg-icon>
								</h4>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- สิ้นสุด -->


	<!-- เส้นจำนวน -->
	<div class="p-6">
		<div>
			<hr style="margin-top:  -120px; border: 1.5px solid #CD5A00" />
		</div>

		<div class="mx-4 p-4">
			<div class="flex items-center">
				<div class="flex items-center text-teal-600 relative">
					<div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 relative">
						<img src="@/assets/images/img11.png" alt="search image" class="w-7 ml-2 -mt-1.5">
						<img src="@/assets/images/img38.png" alt="overlay image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-12 object-cover">
					  </div>
					<div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
						{{ $t('stepdata.searchforsale') }}<br>{{ $t('stepdata.searchforsale1') }}</div>
				</div>

				<div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
				<!-- เส้น -->
				<div class="flex items-center text-teal-600 relative">
					<div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 relative">
						<img src="@/assets/images/img12.png" alt="search image" class="w-7 ml-2 -mt-1.5">
						<img src="@/assets/images/img38.png" alt="overlay image" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-12 object-cover">
					  </div>
					<div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
						{{ $t('stepdata.searchappointment') }}<br>{{ $t('stepdata.searchappointment1') }}</div>
				</div>
				<div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
				<!-- เส้น -->
				<div class="flex items-center text-gray-500 relative">

					<div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
					<!-- เส้น -->
					<div class="flex items-center text-white relative">
						<div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
							<img src="@/assets/images/img13.png" alt="search image" style="width: 40px; margin-left: 4px; height: auto; margin-top: -12px; ">
						</div>
						<div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
							{{ $t('stepdata.informationvisitors') }}<br> {{ $t('stepdata.informationvisitors1') }}</div>
					</div>
					<div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
					<!-- เส้น -->
				</div>
				<div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
				<div class="flex items-center text-gray-500 relative">
					<div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
						<img src="@/assets/images/img14.png" alt="search image" style="width: 35px; margin-left: 5px; height: auto; margin-top: -7px; ">
					</div>
					<div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
						{{ $t('stepdata.confirmation') }}</div>
				</div>
			</div>
		</div>

		<div style="margin-top: -250px;">

			<hr style="margin-top: 300px; border: 1.5px solid #CD5A00" />

		</div>



		<!-- ส่วนกรอก -->
		<div style="margin-top: 60px;">
			<div v-for="(participant, index) in participants" :key="index">
				<section class=" px-1   flex flex-col gap-y-3" style=" padding: 50px; width:  90%; margin-left: 4%; margin-top: -60px;">
					<details class="p-4 border-2 border-sky-500 rounded-sm bg-white shadow-lg" :open="!isDataValid" style="box-shadow: 0 4px 8px rgba(10, 10, 10, 20.2);">
						<summary
							class="  h-6 relative flex cursor-pointer items-center gap-2 pr-8 font-medium text-green-500 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900">
							<div class="flex items-center">
								<img src="@/assets/images/img20.png" alt="search image" style="width: 30px; height: auto; margin-left: 0px;">
								<div class="ml-8" style="font-family: 'Material Icons'; font-size: 22px;"> {{ $t('home3.Participant') }} {{ index + 1 }}</div>
							</div>
							<div class="ml-auto">
								<svg-icon type="mdi" :path="path1" class="h-8 w-8"
									style="display: inline-block; vertical-align: middle;"></svg-icon>
							</div>
						</summary>

						<div class="mt-8 p-4">

							<div class="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-4 mx-2 mt-" style="margin-top: -30px;">
								<h2 class="text-3xl font-semibold" style=" font-family: 'Material Icons'; font-size: 16px; margin-left: 10px; margin-top: -5px; ">
									{{ $t('home3.participant1') }}</h2>
								<h2 class="text-3xl text-red-700 font-semibold" style="  font-family: 'Material Icons'; font-size: 16px; margin-left: 10px; margin-top: -5px; ">
									{{ $t('home3.information') }}</h2>
							</div>

							<div class="py-8" style="text-align: left;  margin-top: -20px;">

								<div class="flex flex-col md:flex-row" style="   margin-left: -30px;  padding: 5px; ">

									<!-- คอลัม1 -->
									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000; padding: 10px;">


										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">{{ $t('home3.selecttype') }}
											</h2>
										</div>


										<div class="px-10 mb-2 inline-block min-h-[1.0rem] ps-[1.0rem]">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full" type="radio" v-model="participant.selecttype" value="company"
												@change="handleChange(index, 'Company')" />
											<label :for="'inlineCheckbox1_' + index"
												class="inline-block ps-[1.0rem] hover:cursor-pointer px-">
												: {{ $t('home3.company') }}
											</label>
										</div>

										<div class="mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]" style="margin-left: 15px;">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full" type="radio" v-model="participant.selecttype" value="individual"
												@change="handleChange(index, 'Individual')" />
											<label :for="'inlineCheckbox2_' + index"
												class="inline-block ps-[1.0rem] hover:cursor-pointer px-1">
												&emsp;: {{ $t('home3.individual') }}
											</label>
										</div>

										<!-- Input field for company name -->
										<div v-if="participant.selecttype === 'company'" style="display: flex; align-items: center; margin-left: 10px; margin-top: 20px;">
											<label class="" style="font-size: 12px;" :for="'companyName_'">{{ $t('home3.name') }} :</label>
											<svg-icon type="mdi" :path="path2" class="h-6 w-6" style="display: inline-block; vertical-align: middle;">
												
											</svg-icon>
											<input v-if="participant.selecttype === 'company'" class="bg-gray-200 rounded svelte-1l8159u p-0 w-80 h-8 appearance-none outline-none text-gray-800"
											type="text" id="companyName" style="font-size: 12px; border: 1px solid black; padding: 4px 10px;"
											v-model="participant.companyname" :class="{ 'shake': validationErrors[`participant${index}.companyname`] }" :style="{ borderColor: validationErrors[`participant${index}.companyname`] ? 'red' : 'black' }" />

										</div>
									</div>

									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000; padding: 10px;">
										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">{{ $t('home3.selectstatus')
												}}</h2>
										</div>
										<div class="flex-1 mx-6 svelte-1l8159u" style="margin-top: -10px;">
											<div class="text-center mt-0 bg-gray-200" :class="{ 'shake': validationErrors[`participant${index}.selectstatus`] }" style="width: 100%; padding: 5px; border-radius: 7px;" :style="{  border: `1px solid ${validationErrors[`participant${index}.selectstatus`] ? 'red' : 'black'}` }">
                                                <p style="text-align: left; margin: 0;">
                                                <svg-icon  type="mdi" :path="icons.mdiCardAccountDetailsStar" class="h-6 w-6" style="display: inline-block; vertical-align: middle;" ></svg-icon>
                                                        Status:&nbsp;{{ selectedItemstatuses[index] || 'Status not selected'}}
                                                </p>
                                            </div>
											<div class="containerme mx-auto mt-12">
												<div class="flex flex-wrap justify-center mx-auto lg:w-full md:w-1/4 xl:shadow-small-blue" style="margin-top: -30px;">
													<a href="#" class="block w-1/6 py-10 text-center border w-20 h-0 hover-effect" :class="{ 'selected-status': selectedItemstatuses[index] === $t('home3.visitors') }"  @click.prevent="showSelected($t('home3.visitors'), index)"  style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
														<img src="@/assets/images/img21.png" alt="search image" style="width: 40px; height: auto; margin: auto;">
														<p class="pt-0 text-sm font-medium capitalize font-body text-green-900 lg:text-lg md:text-base md:pt-6" style="font-size: 14px;">{{ $t('home3.visitors') }}</p>
													</a>
										
													<a href="#" class="block w-1/6 py-10 text-center border lg:w-20 h-0 hover-effect"  :class="{ 'selected-status': selectedItemstatuses[index] === $t('home3.customer') }"  @click.prevent="showSelected($t('home3.customer'), index)"  style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
														<img src="@/assets/images/img22.png" alt="search image" style="width: 40px; height: auto; margin: auto;">
														<p class="pt-0 text-sm font-medium capitalize font-body text-green-900 lg:text-lg md:text-base md:pt-6" style="font-size: 14px;">{{ $t('home3.customer') }}</p>
													</a>
										
													<a href="#" class="block w-1/6 py-10 text-center border lg:w-20 h-0 hover-effect"  :class="{ 'selected-status': selectedItemstatuses[index] === $t('home3.partner') }"  @click.prevent="showSelected($t('home3.partner'), index)"  style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
														<img src="@/assets/images/img23.png" alt="search image" style="width: 40px; height: auto; margin: auto;">
														<p class="pt-0 text-sm font-medium capitalize font-body text-green-900 lg:text-lg md:text-base md:pt-6" style="font-size: 14px;">{{ $t('home3.partner') }}</p>
													</a>
										
													<a href="#" class="block w-1/6 py-10 text-center border lg:w-20 h-0 hover-effect"  :class="{ 'selected-status': selectedItemstatuses[index] === $t('home3.other') }" @click.prevent="showSelected($t('home3.other'), index)"  style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
														<img src="@/assets/images/img24.png" alt="search image" style="width: 40px; height: auto; margin: auto;">
														<p class="pt-0 text-sm font-medium capitalize font-body text-green-900 lg:text-lg md:text-base md:pt-6" style="font-size: 14px;">{{ $t('home3.other') }}</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- คอลัม1 -->

							<!-- คอลัม2 -->
							<div class="py-0" style="text-align: left; margin-top: -30px;">
								<!-- Identity Selection -->
								<div class="flex flex-col md:flex-row" style="margin-left: -30px; padding: 5px;">
									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000; padding: 10px;">
										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">{{ $t('home3.selectidentity') }}</h2>
										</div>

										<div class="px-10 mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full"
												type="radio" v-model="participant.selectedIdentity" :value="'thaiid'"
												@change="handleChange1(index, 'ID')" />
											<label for="inlineCheckbox3" class="inline-block ps-[1.0rem] hover:cursor-pointer">
												{{ $t('home3.id') }}
											</label>
										</div>

										<!-- Passport Checkbox -->
										<div class="mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]" style="margin-left: 15px;">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full"
												type="radio" v-model="participant.selectedIdentity" :value="'passport'"
												@change="handleChange1(index, 'Passport')" />
											<label for="inlineCheckbox4" class="inline-block ps-[1.0rem] hover:cursor-pointer">
												{{ $t('home3.passport') }}
											</label>
										</div>

										<div v-if="participant.selectedIdentity === 'thaiid'" style="margin-left: -35px;">
											<div style="display: flex; align-items: center; margin-left: 30px;">
                                            <label class="" style="font-size: 12px;" :for="'IDName_'">{{ $t('home3.id') }} :</label>
                                                <svg-icon type="mdi" :path="icons.mdiIdentifier" class="h-6 w-6" style="display: inline-block; vertical-align: middle;">
                                                </svg-icon>
                                                <input  v-if="participant.selectedIdentity === 'thaiid'"  class="bg-gray-200 rounded svelte-1l8159u p-1 w-64 appearance-none outline-none text-gray-800" 
												type="text"  :id="'IDName'"  style="font-size: 12px; border: 1px solid black;"  v-model="participant.thaiid"
												:class="{ 'shake': validationErrors[`participant${index}.thaiid`] }" :style="{ borderColor: validationErrors[`participant${index}.thaiid`] ? 'red' : 'black' }"/>
											</div>
										</div>
                                        <div v-if="participant.selectedIdentity === 'passport'" style="margin-left: -35px;">
											<div style="display: flex; align-items: center; margin-left: 30px;">
											<label class="" style="font-size: 12px;" :for="'PassportName_'">{{ $t('home3.passport') }} :</label>
											<svg-icon type="mdi" :path="icons.mdiPassport" class="h-6 w-6" style="display: inline-block; vertical-align: middle;"></svg-icon>
										
                                            <input  v-if="participant.selectedIdentity === 'passport'" :class="['bg-gray-200 rounded svelte-1l8159u p-1 w-60 appearance-none outline-none text-gray-800', { 'border-red': participant.selectedIdentity === 'passport', 'shake': validationErrors[`participant${index}.passportno`] }]"
												type="text"  :id="'PassportName'" 
												style="font-size: 12px; border: 1px solid black;" v-model="participant.passportno"
												:style="{ borderColor: validationErrors[`participant${index}.passportno`] ? 'red' : 'black' }"
											/>
											</div>
                                        </div>
									</div>

									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000;  padding: 10px;  ">
										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">{{ $t('home3.namesurname') }}
											</h2>
										</div>

										<div class="  flex-1 mx-6 svelte-1l8159u" style=" margin-top: -10px;">

											<div class="flex flex-col md:flex-row">
												<div class="w-full flex-1 mx-2 svelte-1l8159u">
												<div class="bg-white my-2 p-1 flex rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.name`] }" :style="{ border: validationErrors[`participant${index}.name`] ? '1px solid red' : '1px solid black' }">
													<input :placeholder="$t('home3.firstname')" class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;" v-model="participant.name">
												</div>
												</div>
												<div class="w-full flex-1 mx-2 svelte-1l8159u">
                                                        <div class="bg-white my-2 p-1 flex rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.surname`] }" :style="{ border: validationErrors[`participant${index}.surname`] ? '1px solid red' : '1px solid black' }">
													<input :placeholder="$t('home3.lastname')" class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;"
                                                            v-model="participant.surname">
												</div>
												</div>
											</div>

											
										</div>
									</div>
								</div>
								
							</div>

							<!-- คอลัม3 -->
							<div class="py-0" style="text-align: left;">
								<div class="flex flex-col md:flex-row" style="   margin-left: -30px;  padding: 5px; ">
									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000;  padding: 10px;  ">
										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">
												{{ $t('home3.selectthejourney') }}</h2>
										</div>
										<div class="px-10 mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full"
												type="radio" v-model="participant.selectjourney"
												value="Arrange by Jinpao" @change="onJourneySelect(participant)" />
											<label :for="'inlineCheckbox5'"
												class="inline-block ps-[1.0rem] hover:cursor-pointer px-1">: {{ $t('home3.companysevice') }}</label>
										</div>

										<!-- Second checkbox -->
										<div class="mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]" style="margin-left: 15px;">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full"
												type="radio" v-model="participant.selectjourney"
												value="self rental vehical" @change="onJourneySelect(participant)" />
											<label :for="'inlineCheckbox6'" class="inline-block ps-[1.0rem] hover:cursor-pointer px-1">&emsp;: {{ $t('home3.carrentalcharter') }}</label>
										</div>

										<!-- Third checkbox -->
										<div class="mb-2 inline-block min-h-[1.5rem] ps-[1.5rem]" style="margin-left: 15px;">
											<input class="py-2 appearance-none w-[1.0rem] h-[0.0rem] border-[0.125rem] border-solid border-secondary-500 rounded-full"
												type="radio" v-model="participant.selectjourney"
												value="Personal Vehicle" @change="onJourneySelect(participant)" />
											<label :for="'inlineCheckbox7'" class="inline-block ps-[1.0rem] hover:cursor-pointer px-1">&emsp;: {{ $t('home3.personalvehicle') }}</label>
										</div>

										<!-- Car registration input -->
										<div class="py-4" style="margin-left: 0px;">
											<div style="display: flex; align-items: center; margin-left: 30px;">
												<label class="" style="font-size: 12px;" for="companyName"> {{ $t('home3.carregistration') }} : </label>
												<svg-icon type="mdi" :path="path6" class="h-6 w-6" style="display: inline-block; vertical-align: middle;"></svg-icon>

												<input 
												class="bg-gray-200 rounded svelte-1l8159u p-1 w-50 appearance-none outline-none text-gray-800"
												:class="{ 'shake': validationErrors[`participant${index}.carregistration`] }"
												type="text" 
												id="companyName" 
												style="font-size: 12px; border: 1px solid;"
												:style="{ borderColor: validationErrors[`participant${index}.carregistration`] ? 'red' : 'black' }"
												v-model="participant.carregistration"
												:placeholder="$t('home3.carregistration')"
											/>

											</div>
										</div>

									</div>

									<div class="w-full flex-1 mx-2 svelte-1l8159u" style="border: 1px dashed #000000;  padding: 10px;  ">
										<div class="flex flex-row ">
											<h2 class="text-3xl font-semibold" style="font-size: 20px; margin-top: -10px; color: red;">**</h2>
											&nbsp;&nbsp;
											<h2 class="text-3xl font-semibold" style="font-size: 12px; margin-top: -10px;">
												{{ $t('home3.fillinadditionalinformation') }}</h2>
										</div>


										<div class="flex flex-col md:flex-row">
											<div class="w-full flex-1 mx-2 svelte-1l8159u">
											<div class="bg-white my-2 p-1 flex  rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.email`] }" :style="{ border: validationErrors[`participant${index}.email`] ? '1px solid red' : '1px solid black' }">
												<input :placeholder="$t('home3.email')"  class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;" 
													v-model="participant.email">
											</div>
											</div>
                                        </div>
										
                                        <div class="flex flex-col md:flex-row">
                                                <div class="w-full flex-1 mx-2 svelte-1l8159u">
                                                    <div class="bg-white my-2 p-1 flex rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.telephonenumber`] }" :style="{ border: validationErrors[`participant${index}.telephonenumber`] ? '1px solid red' : '1px solid black' }">
												<input :placeholder="$t('home3.phonenumber')"  class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;" 
                                                        v-model="participant.telephonenumber">
                                            </div>
											</div>
                                        </div>

										<div class="flex flex-col md:flex-row">
                                                <div class="w-full flex-1 mx-2 svelte-1l8159u">
                                                    <div class="bg-white my-2 p-1 flex  rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.country`] }" :style="{ border: validationErrors[`participant${index}.country`] ? '1px solid red' : '1px solid black' }">
												<input :placeholder="$t('home3.country1')" class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;" 
                                                        v-model="participant.country">
											</div>
                                            </div>

											<div class="w-full flex-1 mx-2 svelte-1l8159u">
                                                <div class="bg-white my-2 p-1 flex  rounded svelte-1l8159u" :class="{ 'shake': validationErrors[`participant${index}.age`] }" :style="{ border: validationErrors[`participant${index}.age`] ? '1px solid red' : '1px solid black' }">
												<input :placeholder="$t('home3.age')"  class="p-1 px-2 appearance-none outline-none w-full text-gray-800" style="font-size: 12px;" 
                                                        v-model="participant.age">
											</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</details>
				</section>

			</div>
		</div>

		<!-- ส่วนกรอก -->

		<!-- button end -->
		<a href="/homestep2" class="relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
			<span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
				<svg class="h-6 w-6 text-white-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
			</span>
			<span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">{{ $t('buttomstepdata.previous') }}</span>
			<span class="relative invisible">Previous</span>
		</a>

		&nbsp; &nbsp;

		<a @click.prevent="submitBooking" href="#_" class="relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
			<span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
				<svg class="h-6 w-6 text-white-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</span>
			<span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">{{
				$t('buttomstepdata.nextstep') }}</span>
			<span class="relative invisible">Next Step</span>
		</a>




	</div>
	<div>
		<hr style="margin-top: 200px; border: 1.5px solid #CD5A00" />
	</div>




	<!-- Modal -->
	<div v-if="isModalsaved" class="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-800 bg-opacity-50"
		tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class=" pointer-events-none relative w-auto translate-y-0 opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[400px]">
			<div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-green-200 bg-clip-padding text-current shadow-4 outline-none dark:bg-red-700">
				<div class="flex flex-shrink-0 items-center justify-between rounded-t-md  p-4 dark:border-white/10">
					<h5 class="text-xl font-medium leading-normal text-black  flex items-center" id="exampleModalLabel">
						<div class="bg-yellow-100 rounded-full p-2 mr-3">
							<svg class="h-8 w-8 text-green-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" />
								<path d="M7 12l5 5l10 -10" />
								<path d="M2 12l5 5m5 -5l5 -5" />
							</svg>
						</div>
						Successfully completed
					</h5>
					<button type="button" class="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300" @click="closeModal" aria-label="Close">
						<span class="[&>svg]:h-6 [&>svg]:w-6">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</span>
					</button>
				</div>
				<div class="relative flex-auto ">The booking information has been saved successfully.</div>
				<div
					class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4 dark:border-white/10">
					<div class="flex gap-2">
						<a class="px-2 py-2 min-w-[60px] text-center text-white border border-green-600 rounded bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring" href="/homestep4">
							Next
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div v-if="isModalnotsaved" class="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-800 bg-opacity-50" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class=" pointer-events-none relative w-auto translate-y-0 opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[400px]">
			<div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-red-100 bg-clip-padding text-current shadow-4 outline-none dark:bg-red-700">
				<div class="flex flex-shrink-0 items-center justify-between rounded-t-md  p-4 dark:border-white/10">
					<h5 class="text-xl font-medium leading-normal text-black  flex items-center" id="exampleModalLabel">
						<div class="bg-red-300 rounded-full p-2 mr-3">
							<svg class="h-10 w-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M9.5 7.5L14.5 12.5M14.5 7.5L9.5 12.5M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
									stroke="currentColor" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</div>
						Operation unsuccessful.
					</h5>
				</div>
				<!-- Modal body -->
				<div class="relative flex-auto ">You have filled in incomplete information. Please fill in complete information.</div>
				<!-- Modal footer -->
				<div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4 dark:border-white/10">
					<div class="flex gap-2">
						<a class="px-2 py-1 min-w-[50px] min-h-[20px] text-center text-white border border-red-500 rounded bg-red-500 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring" @click="closeModalnotsaved">
							OK
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div v-if="isModalagainsaved" class="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-800 bg-opacity-50" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class=" pointer-events-none relative w-auto translate-y-0 opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
			<div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-orange-100 bg-clip-padding text-current shadow-4 outline-none dark:bg-orange-700">
				<div class="flex flex-shrink-0 items-center justify-between rounded-t-md  p-4 dark:border-white/10">
					<h5 class="text-xl font-medium leading-normal text-black  flex items-center" id="exampleModalLabel">
						<div class="bg-yellow-100 rounded-full p-2 mr-3">
							<svg class="h-10 w-10 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path
									d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
								<line x1="12" y1="9" x2="12" y2="13" />
								<line x1="12" y1="17" x2="12.01" y2="17" />
							</svg>
						</div>
						An error occurred.
					</h5>
				</div>

				<!-- Modal body -->
				<div class="relative flex-auto p-4 ">An error occurred in booking. Please return to "homestep2" to
					change the date, time or select a new sales person.
				</div>

				<div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4 dark:border-white/10">
					<div class="flex gap-2">
						<a class="px-2 py-1 min-w-[50px] min-h-[20px] text-center text-white border border-orange-500 rounded bg-orange-500 hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring" href="/homestep2" @click="closeModalagainsaved">
							OK
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>



<style scoped>
.mb-12 {
	border-right: 2px solid #585656c6;
}

.containerme {
	display: flex;
	justify-content: center;
}

.containerme .block {
	flex-grow: 1;
	max-width: 16.666%;
	/* ความกว้างของแต่ละรายการ (1/6) */
	flex-basis: 16.666%;
}

@media (max-width: 1267px) {

	/* เฉพาะสำหรับหน้าจอมือถือ */
	.containerme .block {
		max-width: 50%;
		/* แสดง 2 รายการต่อบรรทัด */
		flex-basis: 35%;
	}
}

.hover-effect:hover {
	background-color: #FFDEAD;
	/* Change this to the desired hover background color */
	transition: background-color 0.3s ease;
	/* Add smooth transition effect */
}

.selected-status {
	background-color: #FFDEAD;
}


@keyframes shake-alternate {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(3deg); }
    50% { transform: rotate(-3deg); }
    75% { transform: rotate(3deg); }
    100% { transform: rotate(0deg); }
}

.shake {
    animation: shake-alternate 0.3s ease-in-out 2;
}









</style>