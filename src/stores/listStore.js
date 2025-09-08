// stores/listStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListStore = defineStore('listStore', () => {
  const items = ref([])

  function addItem(item) {
    items.value.push({ ...item, id: Date.now() }) // Genera id único
  }

  function deleteItem(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, addItem, deleteItem }
})
