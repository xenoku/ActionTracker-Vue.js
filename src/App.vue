<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="50" alt="My SVG Icon" />
      </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon" />
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4" /> {{ user.name }}
          <Button @click="logout" class="ml-4">Exit</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText
              v-model="email"
              type="email"
              id="email"
              required
              placeholder="Login"
              class="m-2 sm:w-auto"
              :class="{ 'p-ivalid': authError }"
            />
            <InputText
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Password"
              class="m-2 sm:w-auto"
              :class="{ 'p-ivalid': authError }"
            />
            <Button type="submit">Enter</Button>
            <div class="ml-2">
              <small v-if="authError" class="error">{{ authError }}</small>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>
<script>
import { useAuthStore } from '@/stores/authStore'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
export default {
  components: { Button, Menubar, InputText },
  data() {
    return {
      date: '',
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Main page',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: []
        },
        {
          label: 'Activities',
          icon: 'pi pi-fw pi-bolt',
          route: '/activities'
        },
        {
          label: 'Sessions',
          icon: 'pi pi-fw pi-book',
          route: '/sessions'
        },
      ],
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated
    },
    user() {
      return this.authStore.user
    },
    activities() {
      return this.authStore.activities
    },
    sessions() {
      return this.authStore.sessions
    },
    authError() {
      return this.authStore.errorMessage
    },
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password })
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true
      this.authStore.getUser()
    }
  },
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
