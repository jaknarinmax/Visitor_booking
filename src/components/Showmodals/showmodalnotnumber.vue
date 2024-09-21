<script>
export default {
    props: {
    showModalnotnumber: Boolean
    },
    methods: {
        closeModalnotnumber() {
        // เมื่อคลิกปุ่ม "OK" ให้ปิดโมดัลโดยกำหนดค่า showModalnotnumber เป็น false
        this.$emit('update:showModalnotnumber', false);
        },
    }
    }
    
</script>


<template>
    <div v-if="showModalnotnumber" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="absolute inset-0 transition-opacity flex items-center justify-center" aria-hidden="true">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:max-w-sm sm:w-full sm:max-w-xs" role="dialog" aria-modal="true">
                <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg class="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Error!!
                </h3>
                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        {{ $t('home.showModalnotnumber') }} 
                    </p>
                </div>
                </div>
            </div>
                    <div class="mt-5 sm:mt-6">
                        <a @click="closeModalnotnumber" href="#_" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block" style="height: 40px; width: 100px;">
                            <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-red-600 to-red-500"></span>
                            <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-red-600 to-red-500"></span>
                            <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-600 to-red-500"></span>
                            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-red-600 from-red-500"></span>
                            <span class="relative" style="font-size: 12px;">{{ $t('home.ok') }} </span>
                        </a>
                    </div>
                </div>
        </div>
        </div>
    </div>
</template>
  
  