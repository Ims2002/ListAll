<template>
    <q-page padding>
        <q-card flat bordered class="q-pa-md">

            <q-toolbar class="bg-white no-shadow q-mb-md">
                <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title class="text-center text-weight-bold">
                    {{ listTitle }}
                </q-toolbar-title>
            </q-toolbar>

            <q-separator />

            <!-- Listado de elementos -->
            <q-card-section>
                <q-list bordered separator>
                    <q-item v-for="(item, index) in elements" :key="index" clickable>
                        <q-item-section avatar>
                            <q-icon :name="item.icon" color="blue" />
                        </q-item-section>
                        <q-item-section>
                            {{ item.title }}
                        </q-item-section>
                        <q-item-section side>
                            <DeleteButton :id="item.id" @delete="deleteElement" />
                        </q-item-section>
                    </q-item>

                    <div v-if="elements.length === 0" class="text-grey text-center q-mt-md">
                        No hay elementos aún, pulsa el botón <q-icon name="add" /> para crear uno.
                    </div>
                </q-list>
            </q-card-section>
        </q-card>

        <!-- Botón flotante para añadir elementos -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" class="bg-blue" @click="showDialog = true" />
        </q-page-sticky>

        <!-- Diálogo para añadir un nuevo elemento -->
        <q-dialog v-model="showDialog">
            <q-card style="min-width: 350px;">
                <q-card-section>
                    <div class="text-h6">Añadir elemento nuevo</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="newElement.title" label="Título" outlined dense />

                    <q-select v-model="newElement.icon" :options="iconOptions" label="Icono" outlined dense emit-value
                        map-options>
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                                <q-item-section avatar>
                                    <q-icon :name="scope.opt.value" />
                                </q-item-section>
                                <q-item-section>
                                    {{ scope.opt.label }}
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="negative" v-close-popup />
                    <q-btn flat label="Guardar" color="positive" @click="saveElement" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DeleteButton from 'src/components/DeleteButton.vue'

const route = useRoute()
const listId = route.params.id // capturamos el id de la lista
const listTitle = ref(`Lista #${listId}`) // por ahora un título provisional

const elements = ref([])

const showDialog = ref(false)
const newElement = ref({
    title: "",
    icon: ""
})

const iconOptions = [
    { label: "Tarea", value: "check" },
    { label: "Evento", value: "event" },
    { label: "Documento", value: "description" },
    { label: "Alerta", value: "warning" }
]

const saveElement = () => {
    if (newElement.value.title && newElement.value.icon) {
        elements.value.push({ ...newElement.value, id: Date.now() })
        newElement.value = { title: "", icon: "" }
        showDialog.value = false
    }
}

function deleteElement(id) {
    elements.value = elements.value.filter(el => el.id !== id)
}
</script>
