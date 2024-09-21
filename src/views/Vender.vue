<template>




 
  <div  class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
      <div class="w-full max-w-md bg-white rounded-lg overflow-hidden transform transition-all" style="box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.15); border: 2px solid #8A2BE2;">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
          <h3 class="text-2xl font-bold text-white">Reason for refusal</h3>
        </div>
        <div class="p-6">
          <form id="rejectionForm">
            <div class="mb-4">
              <textarea name="comment" class="w-full p-3 border-2 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition duration-200"
                style="border: 2px solid #8A2BE2; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" rows="4"
                placeholder="Enter the rejection reason here..."></textarea>
            </div>
            <div class="flex justify-between items-center">
              <button type="button" id="rejectButton" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <span class="w-full h-full flex items-center gap-2 px-4 py-2 text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />  <path d="M2 2l7.586 7.586" />  <circle cx="11" cy="11" r="2" /></svg>
                    Reject
                    </span>
              </button>
              <button type="button" id="cancelButton" class="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] rounded-[16px] bg-gradient-to-t from-[#8B0000] to-[#FF4500] active:scale-95" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
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









</template>


<script>


</script>

<style scoped></style>