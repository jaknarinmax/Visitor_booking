import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Jinpao - Home',
		},
	},
	{
		path: '/homestep2',
		name: 'Homestep2',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Homestep2.vue'),
		meta: {
			title: 'Jinpao - Homestep2',
		},
	},



	{
		path: '/homestep3',
		name: 'Homestep3',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Homestep3.vue'),
		meta: {
			title: 'Jinpao - Homestep3',
		},
	},

	{
		path: '/homestep4',
		name: 'Homestep4',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Homestep4.vue'),
		meta: {
			title: 'Jinpao - Homestep4',
		},
	},



	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta: {
			title: 'Jinpao - About',
		},
	},
	{
		path: '/projects',
		name: 'Projects',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
		meta: {
			title: 'Jinpao - Projects',
		},
	},
	{
		path: '/projects/single-project',
		name: 'Single Project',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "projects" */ '../views/SingleProject.vue'
			),
		meta: {
			title: 'Jinpao - Single Project',
		},
	},
	{
		path: '/contact',
		name: 'Contact',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Contact.vue'),
		meta: {
			title: 'Jinpao - Contact',
		},
	},

	{
		path: '/vender',
		name: 'Vender',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Vender.vue'),
		meta: {
			title: 'Jinpao - Vender',
		},
	},

	{
		path: '/Training',
		name: 'Training',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Training.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},

	{
		path: '/ScanQRcode',
		name: 'ScanQRcode',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/ScanQRcode.vue'),
		meta: {
			title: 'Jinpao - ScanQRcode',
		},
	},





	{
		path: '/test',
		name: 'test',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/test.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},

	{
		path: '/test2',
		name: 'test2',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/test2.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},

	{
		path: '/test3',
		name: 'test3',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/test3.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},

	{
		path: '/test4',
		name: 'test4',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/test4.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},

	{
		path: '/test5',
		name: 'test5',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/test5.vue'),
		meta: {
			title: 'Jinpao - Training',
		},
	},



	// AdminBoard

	{
		path: '/Adminboard',
		name: 'Adminboard',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Adminboard.vue'),
		meta: {
			title: 'Jinpao - sales',
		},
	},

	{
		path: '/Adminprofile',
		name: 'Adminprofile',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Adminprofile.vue'),
		meta: {
			title: 'Jinpao - Adminprofile',
		},
	},
	
	{
		path: '/Managebookings',
		name: '/Managebookings',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Managebookings.vue'),
		meta: {
			title: 'Jinpao - Managebookings',
		},
	},

	{
		path: '/bookingdepartment',
		name: 'bookingdepartment',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/bookingdepartment.vue'),
		meta: {
			title: 'Jinpao - bookingdepartment',
		},
	},

	{
		path: '/Ticket',
		name: 'Ticket',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Ticket.vue'),
		meta: {
			title: 'Jinpao - Ticket',
		},
	},

	{
		path: '/Allinformation',
		name: 'Allinformation',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Allinformation.vue'),
		meta: {
			title: 'Jinpao - Allinformation',
		},
	},


	{
		path: '/Approveid',
		name: 'Approveid',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Approveid.vue'),
		meta: {
			title: 'Jinpao - Approveid',
		},
	},
	
	{
		path: '/Approveedit',
		name: 'Approveedit',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/Approveedit.vue'),
		meta: {
			title: 'Jinpao - Approveedit',
		},
	},

	{
		path: '/setting',
		name: 'setting',
		// route level code-splitting
		// this generates a separate chunk (projects.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "projects" */ '../Adminmanages/setting.vue'),
		meta: {
			title: 'Jinpao - setting',
		},
	},
// AdminBoard


// SalesJp
{
	path: '/Salesjp',
	name: 'Salesjp',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../SalesJP/Salesjp.vue'),
	meta: {
		title: 'Jinpao - Salesjp',
		
	},
},

{
	path: '/salesjpbooking',
	name: 'salesjpbooking',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../SalesJP/salesjpbooking.vue'),
	meta: {
		title: 'Jinpao - salesjpbooking',
		
	},
},

{
	path: '/salesjpprofile',
	name: 'salesjpprofile',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../SalesJP/salesjpprofile.vue'),
	meta: {
		title: 'Jinpao - salesjpprofile',
		
	},
},

{
	path: '/salesjpticket',
	name: 'salesjpticket',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../SalesJP/salesjpticket.vue'),
	meta: {
		title: 'Jinpao - salesjpticket',
		
	},
},

{
	path: '/salesjpsetting',
	name: 'salesjpsetting',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../SalesJP/salesjpsetting.vue'),
	meta: {
		title: 'Jinpao - salesjpsetting',
		
	},
},

// SalesJp


// SalesJp
{
	path: '/Adminmanagessales',
	name: 'Adminmanagessales',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
		import(/* webpackChunkName: "projects" */ '../Adminsales/Adminmanagessales.vue'),
	meta: {
		title: 'Jinpao - Adminmanagessales',
		
	},
},

{
	path: '/Adminsales',
	name: 'Adminsales',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
     	import(/* webpackChunkName: "projects" */ '../Adminsales/Adminsales.vue'),
	meta: {
		title: 'Jinpao - Adminsales',
		
	},
},

{
	path: '/Adminsalesbooking',
	name: 'Adminsalesbooking',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
	   import(/* webpackChunkName: "projects" */ '../Adminsales/Adminsalesbooking.vue'),
	meta: {
		title: 'Jinpao - Adminsalesbooking',
		
	},
},

{
	path: '/Adminsalesprofile',
	name: 'Adminsalesprofile',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
	   import(/* webpackChunkName: "projects" */ '../Adminsales/Adminsalesprofile.vue'),
	meta: {
		title: 'Jinpao - Adminsalesprofile',
		
	},
},

{
	path: '/Adminsalessetting',
	name: 'Adminsalessetting',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
	   import(/* webpackChunkName: "projects" */ '../Adminsales/Adminsalessetting.vue'),
	meta: {
		title: 'Jinpao - Adminsalessetting',
		
	},
},

{
	path: '/Adminsalesticket',
	name: 'Adminsalesticket',
	// route level code-splitting
	// this generates a separate chunk (projects.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () =>
	   import(/* webpackChunkName: "projects" */ '../Adminsales/Adminsalesticket.vue'),
	meta: {
		title: 'Jinpao - Adminsalesticket',
		
	},
},

// SalesJp








];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

export default router;

/**
 * Below code will display the component/active page title
 * Powered by: Nangialai Stoman
 */

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		document.title = previousNearestWithMeta.meta.title;
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map((el) => el.parentNode.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '');

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag));

	next();
});
