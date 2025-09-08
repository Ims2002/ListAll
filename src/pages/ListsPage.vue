<template>
    <q-page padding>
        <q-card flat bordered class="q-pa-md">
            <q-separator />

            <q-card-section>
                <q-list bordered separator>
                    <q-item v-for="(item, index) in store.items" :key="index" clickable class="rounded-borders"
                        @click="goToList(item)">
                        <q-item-section avatar>
                            <q-icon :name="item.icon" color="blue" />
                        </q-item-section>
                        <q-item-section>
                            {{ item.title }}
                        </q-item-section>
                        <q-item-section side>
                            <DeleteButton :id="index" @delete="deleteList" />
                        </q-item-section>
                    </q-item>

                    <div v-if="store.items.length === 0" class="text-grey text-center q-mt-md">
                        No hay listas aún, pulsa el botón <q-icon name="add" /> para crear una.
                    </div>
                </q-list>
            </q-card-section>
        </q-card>

        <!-- Botón flotante -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" class="bg-blue" @click="showDialog = true" />
        </q-page-sticky>

        <!-- Diálogo para añadir -->
        <q-dialog v-model="showDialog">
            <q-card style="min-width: 350px;">
                <q-card-section>
                    <div class="text-h6">Añadir lista nueva</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="newItem.title" label="Título" outlined dense />

                    <q-select v-model="newItem.icon" :options="iconOptions" label="Icono" outlined dense emit-value
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
                    <q-btn flat label="Guardar" color="positive" @click="saveItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref } from "vue"
import DeleteButton from "src/components/DeleteButton.vue"
import { useListStore } from "src/stores/listStore"
import { useRouter } from "vue-router"

const store = useListStore()
const router = useRouter()

//const items = ref([])

const showDialog = ref(false)
const newItem = ref({ title: "", icon: "", items: [] })

const iconOptions = [
    { label: "Lista", value: "list" },
    { label: "Carrito", value: "shopping_cart" },
    { label: "Usuario", value: "person" },
    { label: "Correo", value: "mail" },
    { label: "Teléfono", value: "phone" },
    { label: "Favorito", value: "favorite" },
    { label: "Casa", value: "home" },
    { label: "Trabajo", value: "work" },
    { label: "Calendario", value: "event" },
    { label: "Ajustes", value: "settings" },
    { label: "Buscar", value: "search" }
]

const saveItem = () => {
    if (newItem.value.title && newItem.value.icon) {
        store.addItem(newItem.value)
        newItem.value = { title: '', icon: '' }
        showDialog.value = false
    }
}

function deleteList(id) {
    store.deleteItem(id)
}

function goToList(item) {
    router.push({ path: `/listas/${item.id}`, query: { title: item.title } })
}

</script>
