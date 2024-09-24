<template>
    <div class="flex items-center">
      <!-- View participants button -->
      <div class="relative inline-block mr-2">
        <a href="#" class="text-gray-400 hover:text-gray-100" @click.prevent="toggleTableparticipants(booking)" data-tooltip-target="tooltip-view">
          <i class="material-icons-round text-base">
            <svg class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </i>
        </a>
        <div class="tooltip" role="tooltip">
          View participants
          <div class="tooltip-arrow"></div>
        </div>
      </div>
  
      <!-- Edit button -->
      <div class="relative inline-block mr-2">
        <a href="#" @click.prevent="startEditingBookingandparticipants(booking._id)" class="text-gray-400 hover:text-gray-100">
          <i class="material-icons-round text-base">
            <svg class="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </i>
        </a>
        <div class="tooltip" role="tooltip">
          Edit booking
          <div class="tooltip-arrow"></div>
        </div>
      </div>
  
      <!-- Reject button -->
      <div class="relative inline-block mr-2">
        <a href="#" @click.prevent="openRejectBookingSalesModal(booking)" class="text-gray-400 hover:text-gray-100">
          <i class="material-icons-round text-base">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </a>
        <div class="tooltip" role="tooltip">
          Reject booking
          <div class="tooltip-arrow"></div>
        </div>
      </div>
  
      <!-- Approve button -->
      <div class="relative inline-block">
        <a href="#" @click.prevent="Approveticket(booking._id)" class="text-gray-400 hover:text-gray-100">
          <i class="material-icons-round text-base">
            <svg class="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </i>
        </a>
        <div class="tooltip" role="tooltip">
          Approve ticket
          <div class="tooltip-arrow"></div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>

  
  .tooltip {
    visibility: hidden;
    position: absolute;
    z-index: 9999; /* เพิ่มค่า z-index ให้สูงขึ้น */
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background-color: #111827;
    color: white;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 10ms linear, visibility 0ms;
    pointer-events: none;
  }
  
  .relative:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
  
  .tooltip-arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #111827 transparent transparent transparent;
  }


  </style>