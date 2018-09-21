<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2"
                         :class="{'green': status === 0, 'red': status > 0, 'gray': status === false}">
                        <div class="card-content white-text">
                            <p class="card-title">
                                <i class="material-icons left">account_balance</i>À Pagar
                            </p>
                            <h5>{{ status | statusBillsPay }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons left">payment</i>Total
                            </p>
                            <h5>{{ total | numberFormat }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <router-view></router-view>
</template>

<script type="text/javascript">
    import {BillPayResource as BillPay} from '../resources';

    export default {
        data() {
            return {
                title: "Contas a Pagar",
                status: false,
                total: 0
            };
        },
        created() {
            this.updateStatus();
            this.updateTotal();
        },
        methods: {
            calculedStatus(bills) {
                if (!bills.length) {
                    this.status = false;
                }
                let count = 0;
                for (let i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count;
            },
            updateStatus() {
                BillPay.query().then((response) => {
                    this.calculedStatus(response.data);
                });
            },
            updateTotal() {
                BillPay.total().then((response) => {
                    this.total = response.data.total;
                });
            }
        },
        events: {
            'change-info': function () {
                this.updateStatus();
                this.updateTotal();
            }
        }
    };
</script>