import getContainerWidth from './getContainerWidth';
import getViewHeight from './getViewHeight';

export default {
  methods: {
    initDimensions(callback = (viewHeight) => {
      this.setHeight(viewHeight - this.margin.top - this.margin.bottom);
    }) {
      // Pull plot's parent container width, this will be used to scale the plot responsively
      // var containerWidth = document.getElementById("plot-" + vm.ID).offsetWidth;
      // let viewHeight = containerWidth / (vm.dimensions.aspectW/vm.dimensions.aspectH);
      const containerWidth = getContainerWidth(this.ID);

      // View Height is calculated on a 16:9 aspect ratio
      // This is to properly adjust the plot to the container width
      // This is mostly used when the user adjusts the browser
      // from small (mobile) to large (desktop) window sizes.
      const viewHeight = getViewHeight(16, 9, containerWidth);

      callback(viewHeight);

      this.setWidth(containerWidth - this.margin.left - this.margin.right);

      // Set viewbox for to enable responsive scaling for svg upon window resize
      this.setViewBox(`0 0 ${containerWidth} ${viewHeight}`);
    },
  },
};
