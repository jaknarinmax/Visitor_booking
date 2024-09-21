<script>
import axios from 'axios';
import feather from 'feather-icons';

export default {
	props: ['showModal', 'modal', 'categories'],
	data() {
		return {
			departmentOptions: [],
			isDepartmentDropdownVisible: false,
			genderOptions: ['Male', 'Female', 'Other'],
			isGenderDropdownVisible: false,
			positionOptions: [],
			isPositionDropdownVisible: false,
			userTypesOptions: [],
			isuserTypesDropdownVisible: false,

			department: { _id: null, name: '' },
			position: { _id: null, name: '' },
			userTypes: { _id: null, name: '' },

			selectedGender: '',
			firstName: '',
			lastName: '',
			registerEmail: '',
			email: '',
			country: '',
			registerPassword: '',
			confirmPassword: '',
			message: '',
			passwordFieldType: 'password',

			isModalCheckstatus: false,
			isModalCheckaccount: false,
			isLoginPage: true,
			isModalVisible: false,
			isModalPasswordMismatchVisible: false,
			isModalWrongpassword: false,
			isModalIncompletedata: false,
			isModalWaitingForApproval: false,
		};
	},

	mounted() {
		feather.replace();
		document.addEventListener('click', this.handleClickOutside);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
	},

	updated() {
		feather.replace();
	},
	watch: {
		modal(newValue) {
			if (newValue) {
				this.isLoginPage = true;
			}
		},
	},
	async created() {
		await this.fetchOptionsFromAPI();
	},
	methods: {
		async fetchOptionsFromAPI() {
			try {
				const [departmentsResponse, positionsResponse, userTypesResponse] = await Promise.all([
					axios.get('http://LOCALHOST:9992/departments'),
					axios.get('http://LOCALHOST:9992/positions'),
					axios.get('http://LOCALHOST:9992/user-types')
				]);

				this.departmentOptions = departmentsResponse.data;
				this.positionOptions = positionsResponse.data;
				this.userTypesOptions = userTypesResponse.data;
			} catch (error) {
				// Handle error
			}
		},

		togglePageAndClearInputs() {
			this.togglePage();
			this.clearInputFields();
		},
		togglePage() {
			this.isLoginPage = !this.isLoginPage;
		},
		toggleDepartmentDropdown(event) {
			event.stopPropagation();
			this.isDepartmentDropdownVisible = !this.isDepartmentDropdownVisible;
			this.isPositionDropdownVisible = false;
			this.isuserTypesDropdownVisible = false;
			this.isGenderDropdownVisible = false;
		},
		selectDepartment(dept) {
			this.department = dept;
			this.isDepartmentDropdownVisible = false;
		},
		togglePositionDropdown(event) {
			event.stopPropagation();
			this.isPositionDropdownVisible = !this.isPositionDropdownVisible;
			this.isDepartmentDropdownVisible = false;
			this.isuserTypesDropdownVisible = false;
			this.isGenderDropdownVisible = false;
		},
		selectPosition(pos) {
			this.position = pos;
			this.isPositionDropdownVisible = false;
		},
		toggleuserTypesDropdown(event) {
			event.stopPropagation();
			this.isuserTypesDropdownVisible = !this.isuserTypesDropdownVisible;
			this.isDepartmentDropdownVisible = false;
			this.isPositionDropdownVisible = false;
			this.isGenderDropdownVisible = false;
		},
		selectuserTypes(type) {
			this.userTypes = type;
			this.isuserTypesDropdownVisible = false;
		},
		toggleGenderDropdown(event) {
			event.stopPropagation();
			this.isGenderDropdownVisible = !this.isGenderDropdownVisible;
			this.isDepartmentDropdownVisible = false;
			this.isPositionDropdownVisible = false;
			this.isuserTypesDropdownVisible = false;
		},
		selectGender(gender) {
			this.selectedGender = gender;
			this.isGenderDropdownVisible = false;
		},
		togglePasswordVisibility() {
			this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
		},
		validateInputs() {
			if (
				!this.firstName ||
				!this.lastName ||
				!this.registerEmail ||
				!this.selectedGender ||
				!this.country ||
				!this.department._id ||
				!this.position._id ||
				!this.userTypes._id ||
				!this.registerPassword ||
				!this.confirmPassword
			) {
				return false;
			}
			return true;
		},
		resetFormData() {
			this.firstName = '';
			this.lastName = '';
			this.registerEmail = '';
			this.selectedGender = '';
			this.country = '';
			this.department = { _id: null, name: '' };
			this.position = { _id: null, name: '' };
			this.userTypes = { _id: null, name: '' };
			this.registerPassword = '';
			this.confirmPassword = '';
		},
		async register() {
			if (!this.validateInputs()) {
				this.isModalVisible = true;
				return;
			}

			if (this.registerPassword !== this.confirmPassword) {
				this.isModalPasswordMismatchVisible = true;
				return;
			}

			if (!this.department._id || !this.position._id || !this.userTypes._id) {
				this.message = 'Roles information is incomplete. Please check your selections.';
				return;
			}

			const registerData = {
				firstname: this.firstName,
				lastname: this.lastName,
				email: this.registerEmail,
				gender: this.selectedGender,
				country: this.country,
				roles: {
					department: this.department._id,
					position: this.position._id,
					userType: this.userTypes._id
				},
				password: this.registerPassword,
				confirmpassword: this.confirmPassword,
			};

			try {
				const response = await axios.post('http://LOCALHOST:9992/salesjp/register', registerData);

				if (response.status === 200) {
					this.message = "Registration successful";
					this.resetFormData();
					this.isModalCheckstatus = true;
				}
			} catch (error) {
				this.message = error.response?.data.message || 'An error occurred during registration';
				if (this.message === 'Account already exists') {
					this.isModalCheckaccount = true;
				}
			}
		},


		async login() {
        try {
        // Check if email and password are provided
        if (!this.email || !this.password) {
            this.isModalIncompletedata = true;
            this.message = "Please fill in your email and password completely.";
            return;
        }

        // Make a POST request to the login endpoint
        const response = await axios.post('http://LOCALHOST:9992/salesjp/login', {
            email: this.email,
            password: this.password,
        });

        // Handle the response based on status and role
        if (response.data.status === true) {
            this.message = "Login successful";
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('tokenactivity', response.data.tokenactivity);

          // Redirect based on the role returned from the backend
            switch (response.data.role) {
            case 'admin':
                window.location.href = '/adminboard';
                break;
            case 'adminsales':
                window.location.href = '/Adminsales';
                break;
            case 'sales':
                window.location.href = '/Salesjp';
                break;
            default:
                this.message = "Login successful, but unable to determine redirect.";
              window.location.href = '/Salesjp'; // Fallback redirect
                break;
            }
        } else {
            this.handleErrorResponse(response);
        }
        } catch (error) {
        // Handle different error scenarios
        if (error.response && error.response.status === 403) {
            this.isModalWaitingForApproval = true;
            this.message = error.response.data.message;
        } else if (error.response && error.response.status === 400) {
            this.isModalWrongpassword = true;
            this.message = error.response.data.message;
        } else {
            this.message = error.response?.data.message || "An error occurred during login";
        }
        }
    },



		
		handleErrorResponse(response) {
			if (response.data.message === 'Invalid password') {
				this.isModalWrongpassword = true;
			} else {
				this.isModalWaitingForApproval = true;
			}
			this.message = response.data.message;
		},
		openWaitingForApproval() {
			this.isModalWaitingForApproval = true;
		},
		closeWaitingForApproval() {
			this.isModalWaitingForApproval = false;
		},
		openWrongpassword() {
			this.isModalWrongpassword = true;
		},
		closeWrongpassword() {
			this.isModalWrongpassword = false;
		},
		openCheckstatusModal() {
			this.isModalCheckstatus = true;
		},
		closeCheckstatusModal() {
			this.isModalCheckstatus = false;
			this.isLoginPage = true;
			this.clearInputFields();
		},
		openCheckaccount() {
			this.isModalCheckaccount = true;
		},
		closeCheckaccount() {
			this.isModalCheckaccount = false;
		},
		closePasswordMismatchModal() {
			this.isModalPasswordMismatchVisible = false;
		},

		openModalIncompletedata() {
			this.isModalIncompletedata = true;
		},
		closeIncompletedata() {
			this.isModalIncompletedata = false;
		},



		clearInputFields() {
			this.firstName = '';
			this.lastName = '';
			this.registerEmail = '';
			this.selectedGender = '';
			this.country = '';
			this.department = { _id: null, name: '' };
			this.position = { _id: null, name: '' };
			this.userTypes = { _id: null, name: '' };
			this.registerPassword = '';
			this.confirmPassword = '';
		},
		handleClickOutside(event) {
			if (!this.$el.contains(event.target)) {
				this.isDepartmentDropdownVisible = false;
				this.isPositionDropdownVisible = false;
				this.isuserTypesDropdownVisible = false;
				this.isGenderDropdownVisible = false;
			}
		},
	}
};
</script>



<template>
	<transition name="fade">
		<div v-show="modal" class="font-general-regular fixed inset-0 z-30">
			<!-- Modal body background as backdrop -->
			<div v-show="modal" @click="showModal()" class="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>
			<!-- Modal content -->
			<main class="flex flex-col items-center justify-center h-full w-full">
				<transition name="fade-up-down">
					<div v-show="modal" class="modal-wrapper flex items-center z-30">
						<div class="flex justify-center items-center flex-col border-2 border-dashed border-gray-300 rounded-lg max-w-md p-6" style="width: 650px;">
							<div class="w-full max-w-md rounded-xl box-on-hover hover:bg-sky-300 border ease-in-out duration-100 transform hover:-translate-y-3 hover:-translate-x-3 px-4 py-6 relative">
								<button @click="showModal()" class="absolute top-0 right-0 mt-2 mr-2 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 input-on-hover1 ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd"
											d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
											clip-rule="evenodd" />
									</svg>
								</button>

								<div class="flex flex-col justify-center items-center">
									<h1 class="text-gray-800 text-3xl font-bold">{{ isLoginPage ? 'Login' : 'Register' }}</h1>
									<p class="text-sm text-gray-800 mt-1" v-html="isLoginPage ? 'Login for <b>JINPAO</b> employees' : 'Please register to continue'"></p>
								</div>
								<div class="flex flex-col justify-center items-end my-2.5 px-1">
									<!-- ส่วนของฟอร์ม -->
									<div class="flex flex-row justify-between w-full">
										<input v-if="!isLoginPage" v-model="firstName" type="text" placeholder="First Name"
											class="border-2 border-black rounded-lg py-2.5 px-4 w-1/2 mr-2 outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
										<input v-if="!isLoginPage" v-model="lastName" type="text" placeholder="Last Name"
											class="border-2 border-black rounded-lg py-2.5 px-4 w-1/2 ml-2 outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
									</div>

									<input v-if="isLoginPage" v-model="email" type="email" placeholder="Email"
										class="border-2 border-black rounded-lg py-2.5 px-4 mt-2 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
									<input v-else v-model="registerEmail" type="email" placeholder="E-mail "
										class="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />


									<div v-if="!isLoginPage" class="flex flex-row justify-between w-full py-4">
										<div class="relative w-1/2 px-1">
											<input @click="toggleGenderDropdown" v-model="selectedGender" type="text" placeholder="Gender" readonly :class="{ 'text-gray-500': !selectedGender }"
												class="border-2 border-black rounded-lg py-3 px-3 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
											<div v-if="isGenderDropdownVisible"
												class="absolute z-10 mt-2 bg-white rounded-md shadow-lg max-h-42 overflow-y-auto w-full">
												<ul>
													<li v-for="option in genderOptions" :key="option" @click="selectGender(option)" class="cursor-pointer px-2 py-2 text-sm hover:bg-amber-200 border-b border-gray-400">
														{{ option }}
													</li>
												</ul>
											</div>
										</div>
										<div class="relative w-1/2 px-1">
											<div class="relative">
												<input @click="toggleDepartmentDropdown" v-model="department.name" v-if="!isLoginPage" type="text" placeholder="Department" readonly :class="{ 'text-gray-500': !department.name }"
													class="border-2 border-black rounded-lg py-3 px-3 pr-10 text-sm w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5 cursor-pointer" />
												<div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
													<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
														<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
													</svg>
												</div>
											</div>
											<div v-if="isDepartmentDropdownVisible" class="absolute z-10 mt-2 bg-white rounded-md shadow-lg max-h-52 overflow-y-auto w-full">
												<ul>
													<li v-for="option in departmentOptions" :key="option._id" @click="selectDepartment(option)" class="cursor-pointer px-0 py-2 text-sm hover:bg-amber-200 border-b border-gray-400">
														{{ option.name }}
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div class="flex flex-row justify-between w-full">
										<div class="relative w-1/3 mr-1">
											<input v-model="country" v-if="!isLoginPage" type="text" placeholder="Country"
											class="border-2 border-black rounded-lg py-2.5 px-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
										</div>
												
										<div class="relative w-1/3 mx-1">
											<div class="relative">
												<input @click="togglePositionDropdown" v-model="position.name" v-if="!isLoginPage" type="text" placeholder="Position" readonly  :class="{ 'text-gray-500': !position.name }"
													class="border-2 border-black rounded-lg py-3 px-3 text-sm w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5 cursor-pointer pr-10" />
												<svg v-if="!isLoginPage" class="absolute top-1/2 right-3 w-4 h-4 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
												</svg>
											</div>
											<div v-if="isPositionDropdownVisible" class="absolute z-10 mt-2 bg-white rounded-md shadow-lg max-h-52 overflow-y-auto w-full">
												<ul>
													<li v-for="option in positionOptions" :key="option._id" @click="selectPosition(option)" class="cursor-pointer px-2 py-2 text-sm hover:bg-amber-200 border-b border-gray-400">
														{{ option.name }}
													</li>
												</ul>
											</div>
										</div>
										
										<div class="relative w-1/3 ml-1">
											<div class="relative">
												<input @click="toggleuserTypesDropdown" v-model="userTypes.name" v-if="!isLoginPage" type="text" placeholder="Status" readonly  :class="{ 'text-gray-500': !userTypes.name }"
													class="border-2 border-black rounded-lg py-3 px-3 text-sm w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5 cursor-pointer pr-10" />
												<svg v-if="!isLoginPage" class="absolute top-1/2 right-3 w-4 h-4 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
												</svg>
											</div>
											<div v-if="isuserTypesDropdownVisible" class="absolute z-10 mt-2 bg-white rounded-md shadow-lg max-h-52 overflow-y-auto w-full">
												<ul>
													<li v-for="option in userTypesOptions" :key="option._id" @click="selectuserTypes(option)" class="cursor-pointer px-2 py-2 text-sm hover:bg-amber-200 border-b border-gray-400">
														{{ option.name }}
													</li>
												</ul>
											</div>
										</div>
										
									</div>
									<input v-if="isLoginPage" v-model="password" :type="passwordFieldType" placeholder="Password"
										class="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />
									<input v-else v-model="registerPassword" :type="passwordFieldType" placeholder="Password"
										class="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />

									<!-- Render confirm password field only for registration -->
									<input v-if="!isLoginPage" v-model="confirmPassword" :type="passwordFieldType" placeholder="Confirm password"
										class="border-2 border-black rounded-lg py-2.5 px-4 mt-4 w-full outline-none input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" />

									<div class='flex items-center gap-2 justify-center' style="margin-top: 5px;">
										<input @click="togglePasswordVisibility" type="checkbox"
											class="relative w-4 h-4 aspect-square !appearance-none !bg-none checked:!bg-gradient-to-tr checked:!from-sky-400 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-sky-400 hover:!border-sky-400 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-sky-400/30 focus-visible:border-sky-400 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.20em] after:border-r-white after:border-b-[0.20em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45">
										<span class="text-gray-800" style="font-size: 13px;">Show password</span>
									</div>

									<!-- ปุ่ม Login/Register -->
									<button @click="isLoginPage ? login() : register()" class="bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5">
										{{ isLoginPage ? 'Login' : 'Register' }}
									</button>
									<!-- ปุ่มสลับหน้า -->
									<button class="bg-black text-white rounded-lg px-4 py-2.5 mt-4 hover:bg-gray-800 input-on-hover ease-in-out duration-100 transform hover:-translate-y-0.5 hover:-translate-x-0.5" @click="togglePageAndClearInputs">
										{{ isLoginPage ? 'Register' : 'Back to Login page' }}
									</button>

								</div>
							</div>
						</div>
					</div>
				</transition>
			</main>
		</div>
	</transition>


	<!-- ModalCheckstatus -->
	<div v-if="isModalCheckstatus" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<div class="absolute bg-black opacity-80 inset-0 z-0"></div>
		<div class="w-96 h-78  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
			<!--content-->
			<div>
				<!--body-->
				<div class="text-center p-5 flex-auto justify-center">
					<svg class="w-14 h-14 -m-1 flex items-center text-sky-400 mx-auto " width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" />
						<polyline points="12 8 12 12 14 14" />
						<path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
					</svg>
					<h3 class="text-xl font-bold py-4 ">Waiting for approval</h3>
					<p class="text-sm text-gray-500 px-8">Please wait for information verification within 24 hours.</p>
				</div>
				<!--footer-->
				<div class="p-3  mt-2 text-center space-x-4 md:block">
					<button @click="closeCheckstatusModal()" class="mb-2 md:mb-0 bg-blue-400 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-700">OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalCheckstatus -->


	<!-- ModalCheckaccount -->

	<div v-if="isModalCheckaccount" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<div class="absolute bg-black opacity-80 inset-0 z-0"></div>
		<div class="w-96 h-78  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
			<!--content-->
			<div>
				<!--body-->
				<div class="text-center p-5 flex-auto justify-center">
					<svg class="w-14 h-14 -m-1 flex items-center text-red-400 mx-auto " width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
						<rect x="9" y="3" width="6" height="4" rx="2" />
						<path d="M10 12l4 4m0 -4l-4 4" />
					</svg>
					<h3 class="text-xl font-bold py-4 text-red-400 ">Error ⚠️</h3>
					<p class="text-sm text-gray-500 px-8">This user account already exists.</p>
				</div>
				<!--footer-->
				<div class="p-3  mt-2 text-center space-x-4 md:block">
					<button @click="closeCheckaccount()" class="mb-2 md:mb-0 bg-blue-400 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-700">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalCheckaccount -->


	<!-- ModalVisible -->
	<div v-if="isModalVisible" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<div class="absolute bg-black opacity-80 inset-0 z-0"></div>
		<div class="w-96 h-78  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
			<!--content-->
			<div>
				<!--body-->
				<div class="text-center p-5 flex-auto justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					<svg class="w-16 h-16 -m-1 flex items-center text-red-500 mx-auto py-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
					<h3 class="text-xl font-bold py-4 ">Not finished</h3>
					<p class="text-sm text-gray-500 px-8">Please fill in complete information.</p>
				</div>
				<!--footer-->
				<div class="p-3  mt-2 text-center space-x-4 md:block">
					<button @click="isModalVisible = false" class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalVisible -->


	<!-- ModalPasswordMismatch -->
	<div v-if="isModalPasswordMismatchVisible" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

		<div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ring-1 ring-red-300 dark:ring-gray-700 border border-red-500">
			<div>
				<div class="flex items-center justify-center">
					<img src="@/assets/images/img32.png" alt="search image" class="w-16 h-16 text-gray-700 dark:text-gray-300">
				</div>
				<div class="mt-2 text-center">
					<h3 class="text-lg font-medium leading-6 text-red-500 capitalize dark:text-white" id="modal-title">
						The operation failed</h3>
					<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
						The operation was unsuccessful because the password you entered does not match.
					</p>
				</div>
			</div>

			<div class="mt-5 sm:flex sm:items-center sm:justify-between">
				<a href="#" class="text-sm text-blue-500 hover:underline"></a>
				<div class="sm:flex sm:items-center ">
					<button @click="closePasswordMismatchModal" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalPasswordMismatch -->

	<!-- ModalWrongpassword -->
	<div v-if="isModalWrongpassword" class="fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
		<div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ring-1 ring-red-300 dark:ring-gray-700 border border-red-500">
			<div>
				<div class="flex items-center justify-center">
					<svg class="h-14 w-14 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
						<line x1="9" y1="9" x2="15" y2="15" />
						<line x1="15" y1="9" x2="9" y2="15" />
					</svg>
				</div>
				<div class="mt-2 text-center">
					<h3 class="text-lg font-medium leading-6 text-red-500 capitalize dark:text-white" id="modal-title">
						Can't login</h3>
					<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
						Unable to log in Because the email or password is incorrect, please enter the correct email and password.
					</p>
				</div>
			</div>
			<div class="mt-5 sm:flex sm:items-center sm:justify-between">
				<a href="#" class="text-sm text-blue-500 hover:underline"></a>
				<div class="sm:flex sm:items-center ">
					<button @click="closeWrongpassword" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalWrongpassword -->


	<!-- ModalIncompletedata -->
	<div v-if="isModalIncompletedata" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
		<div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ring-1 ring-orange-300 dark:ring-gray-700 border border-red-500">
			<div>
				<div class="flex items-center justify-center">
					<svg class="h-14 w-14 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
						<line x1="12" y1="9" x2="12" y2="13" />
						<line x1="12" y1="17" x2="12.01" y2="17" />
					</svg>
				</div>
				<div class="mt-2 text-center">
					<h3 class="text-lg font-medium leading-6 text-orange-400 capitalize dark:text-white" id="modal-title">
						The Incomplete information</h3>
					<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
						Please fill in your email, password completely.
					</p>
				</div>
			</div>
			<div class="mt-5 sm:flex sm:items-center sm:justify-between">
				<a href="#" class="text-sm text-blue-500 hover:underline"></a>
				<div class="sm:flex sm:items-center ">
					<button @click="closeIncompletedata" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md sm:w-auto sm:mt-0 hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- ModalIncompletedata -->


	<div v-if="isModalWaitingForApproval" class=" fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
		<div class="absolute bg-black opacity-80 inset-0 z-0"></div>
		<div class="w-96 h-78  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
			<!--content-->
			<div>
				<!--body-->
				<div class="text-center p-5 flex-auto justify-center">
					<svg class="w-14 h-14 -m-1 flex items-center text-red-400 mx-auto " width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" />
						<polyline points="12 8 12 12 14 14" />
						<path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
					</svg>
					<h3 class="text-xl font-bold py-4 ">Waiting for approval</h3>
					<p class="text-sm text-gray-500 px-8">
						Your account has not been approved yet. Please wait within 24hours.
					</p>
				</div>
				<div class="p-3  mt-2 text-center space-x-4 md:block">
					<button @click="closeWaitingForApproval()" class="mb-2 md:mb-0 bg-red-400 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-700">OK
					</button>
				</div>
			</div>
		</div>
	</div>

</template>


<style scoped>
.modal-body {
	max-height: 570px;
}

.bg-gray-800-opacity {
	background-color: #2d374850;
}

@media screen and (max-width: 768px) {
	.modal-body {
		max-height: 400px;
	}
}

.fade-up-down-enter-active {
	transition: all 0.3s ease;
}

.fade-up-down-leave-active {
	transition: all 0.3s ease;
}

.fade-up-down-enter {
	transform: translateY(10%);
	opacity: 0;
}

.fade-up-down-leave-to {
	transform: translateY(10%);
	opacity: 0;
}

.fade-enter-active {
	-webkit-transition: opacity 2s;
	transition: opacity 0.3s;
}

.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.box-on-hover:hover {
	box-shadow: 12px 12px 1px 1px rgb(109, 104, 104);
}

.input-on-hover:hover {
	box-shadow: 4px 4px 1px 1px rgba(0, 0, 0, 1);
}

.input-on-hover1:hover {
	box-shadow: 4px 4px 1px 1px rgb(243, 27, 27);
}

@media (max-width: 640px) {
	.modal-wrapper {
		max-width: calc(100% - 40px);
	}
}
</style>
