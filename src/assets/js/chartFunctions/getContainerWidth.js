export default {
  methods: {
    getContainerWidth(label) {
      // Pull plot's parent container width, this will be used to scale the plot responsively
      let containerWidth = document.querySelector(label).offsetWidth;

      // set a default width if container is less than zero
      // using window width - 350
      // 350 is because of the default width of left navigation drawer,
      // since by default it is open
      if (containerWidth < 1) containerWidth = window.innerWidth - 350;

      // View Height is calculated on a 16:9 aspect ratio
      // This is to properly adjust the plot to the container width
      // This is mostly used when the user adjusts the browser
      // from small (mobile) to large (desktop) window sizes.
      const viewHeight = containerWidth / (16 / 9);

      this.width = containerWidth - this.margin.left - this.margin.right;
      this.height = viewHeight - this.margin.top - this.margin.bottom;
      this.viewBox = `0 0 ${containerWidth} ${viewHeight}`;
    },
  },
};
