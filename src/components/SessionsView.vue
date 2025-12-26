<template>
  <DataTable
    :value="paginatedSessions"
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
    <Column header="Activity name">
      <template #body="slotProps">
        {{ getActivityName(slotProps.data.activity_id) }}
      </template>
    </Column>
    <Column field="start_time" header="Start time" />
    <Column field="end_time" header="End time" />
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'SessionsTable',
  components: { DataTable, Column },
  data() {
    return {
      userStore: useUserStore(),
      perpage: 5,
      first: 0,
    }
  },
  computed: {
    allSessions() {
      return this.userStore.sessions || []
    },
    paginatedSessions() {
      const start = this.first
      const end = start + this.perpage
      return this.allSessions.slice(start, end)
    },
    sessionsTotal() {
      return Number(this.allSessions.length)
    },
  },
  methods: {
    onPageChange(event) {
      this.first = event.first
      this.perpage = event.rows
    },
    getActivityName(id) {
      const activity = this.userStore.activities?.find((item) => item.id === id)
      return activity ? activity.name : 'Not found'
    },
  },
  mounted() {
    console.log('Sessions component Mounted!')
    this.userStore
      .getSessions()
      .then(() => {
        console.log('All sessions loaded: ', this.allSessions)
      })
      .catch((error) => {
        console.error('Data loading failed:', error)
      })
  },
}
</script>
<style scoped></style>
