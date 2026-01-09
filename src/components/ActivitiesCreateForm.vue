<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createActivity" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Create activity:</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Name" v-model="this.activityName" />
      </div>
      <div class="flex flex-col mt-4">
        <TextArea
          name="description"
          placeholder="Description"
          rows="5"
          cols="30"
          v-model="this.activityDescription"
        />
      </div>
      <div class="mb-4 mt-4">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
        >
          <span class="pi pi-upload mx-3"></span>Image</label
        >
        <input
          type="file"
          hidden
          id="file"
          name="file"
          v-on:change="changeCaption"
          required
          accept="image/*"
        />
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" label="Create" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext'
import TextArea from 'primevue/textarea'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useUserStore } from '@/stores/userStore.js'
export default {
  name: 'ActivitiesCreateForm',
  components: { InputText, TextArea, Button, Toast },
  data() {
    return {
      userStore: useUserStore(),
      activityName: '',
      activityDescription: '',
      activityImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.userStore.errorMessage
    },
    errorCode() {
      return this.userStore.errorCode
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0]
      if (file) {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-file mx-3"></span>' + file.name
        this.activityImage = file
      } else {
        document.getElementById('file-label').innerHTML =
          '<span class="pi pi-upload mx-3"></span>Image'
        this.activityImage = null
      }
    },
    async createActivity() {
      const formData = new FormData()
      formData.append('name', this.activityName)
      formData.append('description', this.activityDescription)
      formData.append('image', this.activityImage)
      await this.userStore.createActivity(formData)
      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: 'Input error',
          detail: this.errorMessage,
          life: 4000,
        })
      else
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: this.errorMessage,
          life: 4000,
        })
    },
  },
}
</script>
<style scoped></style>
