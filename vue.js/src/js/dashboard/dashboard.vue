<template>
    <div class="container">
        <div class="row">
            <h1>{{ title }}</h1>
            <h3 :class="{'green-text': updateStatusBills() > 0, 'red-text': updateStatusBills() < 0, 'yellow-text': updateStatusBills() == 0}">
                Seu Saldo atual é de {{ updateStatusBills() | numberFormat }}.
            </h3>
        </div>
    </div>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import {BillPayResource as BillPay, BillReceiveResource as BillReceive} from '../resources';

    export default {
        data() {
            return {
                title: "Dashboard",
                receives: [],
                pays: [],
                total: 0
            };
        },
        created() {
            this.updateTotalBills();
        },
        methods: {
            updateTotalBills() {
                BillReceive.total().then((response) => {
                    this.receives = response.data;
                });
                BillPay.total().then((response) => {
                    this.pays = response.data;
                });
            },
            updateStatusBills() {
                let total = 0;
                total = this.receives.total - this.pays.total;
                this.total = total;
                return total;
            }
        }
    };
</script>