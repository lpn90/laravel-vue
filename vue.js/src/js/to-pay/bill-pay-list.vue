<template>
    <div class="container">
        <div class="row">
            <h3>Minhas contas a Pagar</h3>
            <table class="bordered striped centered responsive-table z-depth-5">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Paga?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(index,o) in bills">
                    <td>{{ index + 1 }}</td>
                    <td>{{ o.date_due | dateFormat 'pt-BR' }}</td>
                    <td>{{ o.name | nameFormat }}</td>
                    <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>
                    <td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">
                        {{ o.done | doneLabelPay }}
                    </td>
                    <td>
                        <a v-link="{ name: 'billPays.update', params: {id: o.id} }">Editar</a> |
                        <a class="modal-trigger" href="#modal-delete" @click.prevent="openModalDelete(o)">Excluir</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{billToDelete.name}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>
            <p>Data vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn-flat waves-effect waves-red modal-action modal-close">Cancelar</button>
            <button class="btn-flat waves-effect green lighten-2 modal-action modal-close"
                    @click="removeBill()">OK
            </button>
        </div>
    </modal>
</template>

<script type="text/javascript">
    import {BillPayResource as BillPay} from '../resources';
    import ModalComponent from '../Modal.vue';

    export default {
        components: {
            'modal': ModalComponent
        },
        data() {
            return {
                bills: [],
                billToDelete: null,
                modal: {
                    id: 'modal-delete'
                }
            };
        },
        created() {
            BillPay.query().then((response) => {
                this.bills = response.data;
            });
        },
        methods: {
            removeBill() {
                BillPay.delete({id: this.billToDelete.id}).then(() => {
                    this.bills.$remove(this.billToDelete);
                    this.billToDelete = null;
                    Materialize.toast('Conta excluída com sucesso!', 4000);
                    this.$dispatch('change-info');
                });
            },
            openModalDelete(bill) {
                this.billToDelete = bill;
                $('#modal-delete').modal();
            }
        }
    };
</script>