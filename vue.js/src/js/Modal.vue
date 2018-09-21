<template>
    <!-- Modal Structure -->
    <div :id="modal.id" class="modal">
        <div class="modal-title">
            <slot name="title"></slot>
        </div>
        <div class="modal-content">
            <slot name="content"></slot>
        </div>
        <div class="modal-footer">
            <slot name="footer">
                <button class="green modal-action modal-close waves-effect waves-ligth btn-flat">OK</button>
            </slot>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: {
            modal: {
                type: Object,
                default() {
                    return {
                        id: ''
                    }
                }
            }
        }
    };
</script>


