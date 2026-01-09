<template>
  <DataTable
    :value="paginatedActivities"
    :lazy="true"
    :loading="userStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="activitiesTotal"
    @page="onPageChange"
    responsiveLayout="scroll"
    :first="first"
  >
    <Column header="№">
      <template #body="slotProps">
        {{ slotProps.index + 1 + first }}
      </template>
    </Column>
    <Column field="name" header="Name" />
    <Column field="description" header="Description" />
    <Column header="Image">
      <template #body="slotProps">
        <img
          :src="slotProps.data.image_url"
          alt="Image"
          style="width: 100px; height: 100px; object-fit: cover"
        />
      </template>
    </Column>
    <template #footer>
      <div class="flex justify-end">
        <Button
          type="button"
          @click="this.$router.push('activities/create')"
          icon="pi pi-plus"
          label="Add activity"
        />
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'ActivitiesTable',
  components: { DataTable, Column, Button },
  data() {
    return {
      userStore: useUserStore(),
      perpage: 5,
      first: 0,
    }
  },
  computed: {
    allActivities() {
      return this.userStore.activities || []
    },
    paginatedActivities() {
      const start = this.first
      const end = start + this.perpage
      return this.allActivities.slice(start, end)
    },
    activitiesTotal() {
      return Number(this.allActivities.length)
    },
  },
  methods: {
    onPageChange(event) {
      this.first = event.first
      this.perpage = event.rows
    },
  },
  mounted() {
    console.log('Activities component Mounted!')
    this.userStore
      .getActivities()
      .then(() => {
        console.log('All activities loaded: ', this.allActivities)
      })
      .catch((error) => {
        console.error('Data loading failed:', error)
      })
  },
}
</script>
<style scoped></style>
