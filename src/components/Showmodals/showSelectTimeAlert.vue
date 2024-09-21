<script>
export default {
    props: {
        showSelectTimeAlert: Boolean
    },
    methods: {
        closeshowSelectTimeAlert() {
            // เมื่อคลิกปุ่ม "OK" ให้ปิดโมดัลโดยกำหนดค่า showSelectTimeAlert เป็น false
            this.$emit('update:showSelectTimeAlert', false);
        },
    }
}
</script>

<template>
    <div v-if="showSelectTimeAlert" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-secondary-700/50"></div>
        <!-- Modal -->
        <div class="relative mx-auto w-full max-w-sm p-4 bg-white rounded-lg shadow-xl z-50">
            <div class="p-5">
                <div class="text-center">
                    <div class="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-red-100 rounded-full text-red-500">
                        <img src="@/assets/images/img19.png" alt="search image" class="w-10 h-auto">
                    </div>
                    <h3 class="text-lg font-medium text-secondary-900">Error❗</h3>
                    <div class="mt-2 text-sm text-secondary-500">{{ $t('home2.showSelectTimeAlert') }}</div>
                </div>
                <div class="mt-5 sm:mt-6">
                    <a @click.prevent="closeshowSelectTimeAlert" href="#_" class="relative inline-block w-24 h-10 px-5 py-2.5 text-white font-medium group rounded">
                        <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 to-red-500 rounded opacity-50 filter blur-sm"></span>
                        <span class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600 to-red-500 rounded opacity-50 filter group-active:opacity-0"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out bg-gradient-to-br from-red-600 to-red-500 rounded shadow-xl filter group-active:opacity-0 group-hover:blur-sm"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out bg-gradient-to-br from-red-600 to-red-500 rounded"></span>
                        <span class="relative text-sm">{{ $t('home2.ok') }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fixed {
    z-index: 50;
}
</style>
