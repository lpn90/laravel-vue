import './bootstrap';
import DashboardComponent from './dashboard/dashboard.vue';
import BillPayComponent from './to-pay/bill-pay.vue';
import BillPayListComponent from './to-pay/bill-pay-list.vue';
import BillPayCreateComponent from './to-pay/bill-pay-create.vue';
import BillReceiveComponent from './to-receive/bill-receive.vue';
import BillReceiveListComponent from './to-receive/bill-receive-list.vue';
import BillReceiveCreateComponent from './to-receive/bill-receive-create.vue';
import BillComponent from './Bill.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();

router.map({
    '/': {
        name: 'dashboard',
        component: DashboardComponent
    },
    '/bill-pays': {
        component: BillPayComponent,
        subRoutes: {
            '/': {
                name: 'billPays.list',
                component: BillPayListComponent
            },
            '/create': {
                name: 'billPays.create',
                component: BillPayCreateComponent
            },
            '/:id/update': {
                name: 'billPays.update',
                component: BillPayCreateComponent
            }
        }
    },
    '/bill-receives': {
        component: BillReceiveComponent,
        subRoutes: {
            '/': {
                name: 'billReceives.list',
                component: BillReceiveListComponent
            },
            '/create': {
                name: 'billReceives.create',
                component: BillReceiveCreateComponent
            },
            '/:id/update': {
                name: 'billReceives.update',
                component: BillReceiveCreateComponent
            }
        }
    },
    '*': {
        component: DashboardComponent
    }
});


router.start({
    components: {
        'bill-component': BillComponent
    }
}, '#app');

router.redirect({
    '*': '/'
});