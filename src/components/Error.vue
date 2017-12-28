<template>
  <v-snackbar
    :timeout='3000'
    bottom
    right
    multi-line
    :color='notificationType'
    v-model='notification'
    >
    {{notificationMSG}}

    <v-btn flat :color="notificationType" @click.native='notification = false'>
        <v-icon color='white'>close</v-icon>
    </v-btn>
</v-snackbar>
</template>

<script>
import { eventBus } from '../assets/js/eventBus';

export default {
  name: 'Error',
  data() {
    return {
      show: false,
      notificationMSG: '',
      notificationType: '',
      notificationQueue: [],
      notification: false,
    };
  },
  mounted() {
    eventBus.$on('add-notification', this.addNotification);
  },
  computed: {
    hasNotificationsPending() {
      return this.notificationQueue.length > 0;
    },
  },
  methods: {
    addNotification(MSG, type) {
      this.notificationQueue.push([MSG, type]);

      if (!this.notification) {
        [this.notificationMSG, this.notificationType] = this.notificationQueue.shift();
        this.notification = true;
      }
    },
  },
  watch: {
    notification() {
      if (!this.notification && this.hasNotificationsPending) {
        [this.notificationMSG, this.notificationType] = this.notificationQueue.shift();

        this.$nextTick(() => {
          this.notification = true;
        });
      }
    },
  },
};
</script>
