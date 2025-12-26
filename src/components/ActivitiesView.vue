<template>
  <DataTable
    :value="paginatedActivities"
    :lazy="true"
    :loading="userStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="sessionsTotal"
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
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'ActivitiesTable',
  components: { DataTable, Column },
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
