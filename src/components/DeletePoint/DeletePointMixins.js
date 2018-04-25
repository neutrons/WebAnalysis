import { eventBus } from '../../assets/js/eventBus';

export default {
  data: () => ({
    showDeleteModal: false,
    pointToDelete: null,
  }),
  methods: {
    triggerDelete(point) {
      this.pointToDelete = { ...point };
      this.showDeleteModal = true;
    },
    confirmDeletePoint() {
      const group = this.$route.meta.group;
      const feature = this.$route.meta.feature;

      this.deletePoint({ ...this.pointToDelete, group })
        .then(() => {
          this.resetDeletePoint();
          eventBus.$emit('add-notification', 'Point deleted!', 'success');
          eventBus.$emit(`redraw-chart-${group.toLowerCase()}-${feature.toLowerCase()}`);
        })
        .catch((error) => {
          this.resetDeletePoint();
          eventBus.$emit('add-notification', error, 'error');
        });
    },
    resetDeletePoint() {
      this.showDeleteModal = false;
      this.pointToDelete = null;
    },
  },
};
