import $ from 'jquery';

export default {
  methods: {
    setResponsive() {
      const vm = this;

      // Add responsive elements
      // Essentially when the plot-1D gets resized it will look to the
      // width and scale the plot according to newly updated width.
      // The css file has min- and max-width's incase the resizing gets too small,
      // the plot will not scale below these dimensions.
      // Solution courtesy of: https://stackoverflow.com/a/26077110
      $.event.special.widthChanged = {
        remove() {
          $(this).children(`iframe.width-changed-${vm.ID}`).remove();
        },
        add() {
          const elm = $(this);
          let iframe = elm.children(`iframe.width-changed-${vm.ID}`);
          if (!iframe.length) {
            iframe = $('<iframe/>').addClass(`width-changed width-changed-${vm.ID}`).prependTo(this);
          }
          let oldWidth = elm.width();

          function elmResized() {
            const width = elm.width();
            if (oldWidth !== width) {
              elm.trigger('widthChanged', [width, oldWidth]);
              oldWidth = width;
            }
          }

          let timer = 0;
          const ielm = iframe[0];
          (ielm.contentWindow || ielm).onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(elmResized, 50);
          };
        },
      };

      const chart = $(`.chart-${vm.ID}`);
      const aspectRatio = chart.width() / chart.height();
      const container = chart.parent();

      $(`#chart-wrapper-${vm.ID}`).on('widthChanged', () => {
        const targetWidth = container.width();
        chart.attr('width', targetWidth);
        chart.attr('height', Math.round(targetWidth / aspectRatio));
      });
    },
  },
};
