<template>
    <div>
        <q-btn flat round dense color="red" icon="close" @click="confirm = true" />

        <q-dialog v-model="confirm">
            <q-card>
                <q-card-section class="row items-center">
                    <q-icon name="warning" color="red" size="md" class="q-mr-sm" />
                    <span>¿Seguro que quieres eliminar esta lista?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Eliminar" color="red" @click="onConfirm" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    id: { type: [String, Number], required: true }
});

const emit = defineEmits(["delete"]);

const confirm = ref(false);

function onConfirm() {
    emit("delete", props.id);
    confirm.value = false;
}
</script>
