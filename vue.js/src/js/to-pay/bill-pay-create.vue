<template>
    <div class="container">
        <div class="row">
            <h3>Nova Conta</h3>
            <form name="form" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                        <input class="datepicker" id="due_date" type="text" v-model="bill.date_due | dateFormat"
                               placeholder="Informe a data">
                        <label class="active" for="due_date">Vencimento</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="value" type="text" v-model="bill.value | numberFormat">
                        <label class="active" for="value">Valor</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <select v-model="bill.name" id="name" class="browser-default">
                            <option value="" disabled selected>Escolha um Nome</option>
                            <option v-for="o in names" :value="o">{{ o | nameFormat }}</option>
                        </select>
                        <label class="active" for="name">Nome</label>
                    </div>
                    <div class="input-field col s6 fixed">
                        <input type="checkbox" class="filled-in" v-model="bill.done" id="done"/>
                        <label for="done">Pago?</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="submit" value="Salvar" class="btn btn-medium left waves-effect waves-ligth">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {BillPayResource as BillPay} from '../resources';
    import {Bill} from '../bill';

    const namesPay = [
        'Conta de luz',
        'Conta de água',
        'Conta de telefone',
        'Supermercado',
        'Cartão de Crédito',
        'Empréstimo',
        'Gasolina'
    ];

    export default {
        data() {
            return {
                formType: 'insert',
                names: namesPay,
                bill: new Bill()
            };
        },
        created() {
            if (this.$route.name === 'billPays.update') {
                this.formType = 'update';
                this.getBill(this.$route.params.id);
            }
        },
        ready() {
            $('#name').material_select();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Hoje',
                clear: 'Limpar',
                close: 'Ok',
                closeOnSelect: false, // Close upon selecting a date,
                container: undefined, // ex. 'body' will append picker to body
                format: 'dd/mm/yyyy',
                monthsFull: [
                    'Janeiro', 'Fevereiro', 'Março', 'Abril',
                    'Maio', 'Junho', 'Julho', 'Agosto',
                    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ],
                monthsShort: [
                    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                    'Jul', 'Ago', 'Set', 'Otu', 'Nov', 'Dez'
                ],
                weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
            });
        },
        methods: {
            submit() {
                let data = this.bill.toJSON();
                if (this.formType === 'insert') {
                    BillPay.save({}, data).then(() => {
                        Materialize.toast('Conta criada com sucesso!', 4000);
                        this.$dispatch('change-info');
                        this.$router.go({name: 'billPays.list'});
                    });
                } else {
                    BillPay.update({id: this.bill.id}, data).then(() => {
                        Materialize.toast('Atualizada com sucesso!', 4000);
                        this.$dispatch('change-info');
                        this.$router.go({name: 'billPays.list'});
                    });
                }
            },
            getBill(id) {
                BillPay.get({id: id}).then((response) => {
                    this.bill = new Bill(response.data);
                });
            },
            getDateDue(date_due) {
                let dateDueObject = date_due;
                if (!(date_due instanceof Date)) {
                    dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
                }
                return dateDueObject.toISOString().split('T')[0];
            }
        }
    };
</script>