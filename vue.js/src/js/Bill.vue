<template>
    <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">
        <li v-for="item in o.items">
            <a v-link="{name: item.routeName}" class="blue-text text-darken-3">{{ item.name }}</a>
        </li>
    </ul>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper container">
                <div class="row">
                    <div class="col s12">
                        <a href="#" class="right brand-logo">Code Contas</a>
                        <a href="#" data-activates="nav-mobile" class="button-collapse">
                            <i class="material-icons">menu</i>
                        </a>
                        <ul class="left hide-on-med-and-down">
                            <li v-for="o in menus">
                                <a v-if="o.dropdownId" class="dropdown-button" href="#!"
                                   v-bind:data-activates="o.dropdownId">
                                    {{ o.name }} <i class="material-icons right">arrow_drop_down</i>
                                </a>
                                <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>
                            </li>
                        </ul>
                        <ul id="nav-mobile" class="side-nav">
                            <li v-for="o in menus">
                                <a v-link="{name: o.routeName}">{{ o.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <router-view></router-view>
</template>

<script type="text/javascript">
    export default {
        ready() {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        data() {
            return {
                menus: [
                    {name: "Dashboard", routeName: 'dashboard'},
                    {name: "Contas a Pagar", routeName: 'billPays.list', dropdownId: 'bill-pay'},
                    {name: "Contas a Receber", routeName: 'billReceives.list', dropdownId: 'bill-receive'}
                ],
                menusDropdown: [
                    {
                        id: 'bill-pay',
                        items: [
                            {name: "Listar Contas", routeName: 'billPays.list'},
                            {name: "Criar Conta", routeName: 'billPays.create'}
                        ]
                    },
                    {
                        id: 'bill-receive',
                        items: [
                            {name: "Listar Contas", routeName: 'billReceives.list'},
                            {name: "Criar Conta", routeName: 'billReceives.create'}
                        ]
                    },
                ],
            }
        }
    };
</script>