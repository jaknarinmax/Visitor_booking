<script>
import feather from 'feather-icons';
import { socialLinks } from '../../data/socialLinks';

export default {

	data() {
		return {
			socials: socialLinks,
		};
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	
		

	


	<div
	class="font-general-regular text-lg text-ternary-dark dark:text-ternary-light"
>
© JINPAO PRECISION INDUSTRY 2022

</div>


			
		
	
</template>

<style scoped>

  

/* ส่วนคอลัมนนะ */
  .containercolumn {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
  }
  .column {
	padding: 50px;
	flex: 1;
	margin-bottom: 10px; /* เพิ่มการเว้นระยะห่างด้านล่าง 10px */
  }
  
  
  @media screen and (max-width: 768px) {
	.containercolumn {
		flex-direction: column;
	}
	.column {
		border-bottom: 1px solid black;
	}
	.column:last-child {
		border-bottom: none;
	}
  }</style>
