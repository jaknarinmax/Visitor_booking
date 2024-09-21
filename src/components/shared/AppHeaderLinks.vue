<script>
export default {
  props: ["showModal", "isOpen"],
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  






  methods: {

    
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.isDropdownOpen = false;
    },
    flagImagePath(lang) {
      return lang === 'en' ? require('@/assets/images/England.png') : require('@/assets/images/thailand.png');
    }



  },
};
</script>

<template>






  <!-- Header links -->
  <div
    :class="isOpen ? 'block' : 'hidden'"
    class="m-0 sm:ml-4 mt-1 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none"
  >
    <router-link
      to="/projects"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2"
      aria-label="Projects"
      >Customer</router-link
    >
    <router-link
      to="/about"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
      aria-label="About Me"
      >Visitor</router-link
    >
    <router-link
      to="/contact"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
      aria-label="Contact"
      >Supplier</router-link
    >
    <router-link
      to="/vender"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
      aria-label="Vender"
      >Vender</router-link
    >
    <router-link
      to="/Training"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
      aria-label="Training"
      >Training</router-link
    >
    <router-link
      to="/contact"
      class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-300 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
      aria-label="Contact"
      >Auditor</router-link
    >

    
    <div class="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
      <button
        class="font-general-medium sm:hidden block text-left text-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-500"
        @click="showModal()"
        aria-label="Hire Me Button"
      >
        Log in
      </button>


      <div class="relative inline-block text-center px-1" style="margin-top: -40px;">
        <div>
          <button @click="toggleDropdown" type="button">
            <img :src="flagImagePath($i18n.locale)" alt="Current Language" class="w-6 h-6 object-cover" style="border: 2px solid black; border-radius: 50px;">
          </button>
        </div>
        <div v-if="isDropdownOpen" class="origin-top-right absolute right-1/2 transform translate-x-1/2 mt-2 w-14 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <a href="#" @click.prevent="changeLanguage('en')" class="flex items-center px-4 py-2 hover:bg-gray-100" role="menuitem" tabindex="-1">
              <img :src="flagImagePath('en')" alt="English" class="w-6 h-6 object-cover" style="border: 2px solid black; border-radius: 40px; margin-right: 4px;">
            </a>
            <a href="#" @click.prevent="changeLanguage('th')" class="flex items-center px-4 py-2 hover:bg-gray-100" role="menuitem" tabindex="-1">
              <img :src="flagImagePath('th')" alt="Thai" class="w-6 h-6 object-cover" style="border: 2px solid black; border-radius: 40px; margin-right: 4px;">
            </a>
          </div>
        </div>
      </div>
      
    
    





    


        
  </div>



 

    
    

  </div>

  


    



</template>


<style scoped>

</style>

