import * as d3 from 'd3';
import _ from 'lodash';

// The eventBus serves as the means to communicating between components.
import { eventBus } from '../../assets/js/eventBus';

function enableBrushPointerEvents(selection, vm) {
  selection.each(function a(brushItem) {
    d3.select(this)
      .selectAll('.overlay')
      .style('pointer-events', () => {
        const brush = brushItem.brush;
        if (brushItem.id === vm.brushes.length - 1 && brush !== undefined) return 'all';

        return 'none';
      });
  });
}

export default {
  methods: {
    newBrush() {
      const vm = this;

      function brushstart() {
        // Brush start here
      }

      function brushed() {
        // Add brush label
        // console.log('Brush has been brushed...');
        const sel = d3.select(this).data()[0];
        const bTitle = d3.select(this).selectAll('text').data([sel.id]);

        bTitle.enter()
          .append('text').text(d => `selection-${d}`)
          .attr('id', `selection-label-${sel.id}`)
          .attr('x', -5);

        d3.select(this).select(`#selection-label-${sel.id}`)
          .attr('dy', '0.75em')
          .attr('transform', 'rotate(-90)')
          .attr('y', d3.event.selection[0] + 5);
        // End add brush label

        const rawSelection = d3.event.selection;
        const convertedSelection = d3.event.selection.map(i => vm.brushScale.invert(i));

        // this is to let Vue able to watch dynamic changes to brush selections
        // that way they can be printed in the table with a computed property.
        const obj = {
          [this.id]: {
            raw: rawSelection,
            converted: convertedSelection,
          },
        };

        vm.addBrushSelections(obj);
      }

      function brushend() {
        // Figure out if our latest brush has a selection
        const lastBrushID = vm.brushes[vm.brushes.length - 1].id;
        const lastBrush = document.getElementById(`selection-${lastBrushID}`);
        const selection = d3.brushSelection(lastBrush);

        if (selection === null) d3.select(`#selection-label-${lastBrushID}`).remove();

        if (selection && selection[0] !== selection[1]) {
          vm.brushes[vm.brushes.length - 1].selection =
            [vm.brushScale.invert(selection[0]), vm.brushScale.invert(selection[1])];
        }

        // If it does, that means we need another one
        if (vm.brushes.length < vm.brushCount && selection && selection[0] !== selection[1]) {
          vm.newBrush();
        }

        // Always draw brushes
        vm.drawBrushes();
      }

      // console.log('new brush');
      const brush = d3.brushX()
        .extent([
          [0, 0],
          [vm.width, vm.height],
        ])
        .on('start', brushstart)
        .on('brush', brushed)
        .on('end', brushend);

      vm.addNewBrush({ id: vm.brushes.length, brush, selection: undefined });
    },
    drawBrushes() {
      /* eslint-disable */
      const vm = this;
      const brushSelection = vm.g.select(`#zoom-group-${vm.ID}`)
        .select('.brushes')
        .selectAll('.brush')
        .data(vm.brushes, d => d.id);

      // ENTER Brushes
      function moveBrushTo(brushItem) {
        // call the brush
        brushItem.brush(d3.select(this));

        if (brushItem.selection !== undefined) {
          brushItem.brush.move(d3.select(this), brushItem.selection.map(vm.brushScale));
        }
      }

      brushSelection.enter()
        .insert('g', '.brush')
        .attr('class', 'brush')
        .attr('id', brush => `selection-${brush.id}`)
        .each(moveBrushTo);

      // UPDATE Brushes
      vm.g.select(`#zoom-group-${vm.ID}`)
        .select('.brushes')
        .selectAll('.brush')
        .call(enableBrushPointerEvents, vm);

      // EXIT Brushes
      brushSelection.exit().remove();
      /* eslint-enable */
    },
    removeBrushes() {
      // vm.brushObj.brushGroup.selectAll('.brush').remove();
      this.g.select(`#zoom-group-${this.ID}`)
        .select('.brushes')
        .selectAll('.brush').remove();

      this.resetBrushes();
      this.resetBrushSelections();

      if (this.brushCount >= 1) {
        this.newBrush();
        this.drawBrushes();
      }

      this.toggleEdit(this.isZoomBrush);
    },
    sortBrushes() {
      // The object will be turned to an order array,
      // because objects do not promise an exact order like arrays.
      const sorted = _.toPairs(_.cloneDeep(this.brushSelections));

      sorted.sort((a, b) => a[1].raw[0] - b[1].raw[0]);

      return sorted;
    },
    drawSavedBrushes() {
      this.resetBrushes();
      this.resetBrushSelections();

      this.g.select('.brushes')
        .selectAll('.brush')
        .remove();

      const selected = this.g.select('.brushes').selectAll('.selected');
      selected.classed('selected', false);

      if (this.brushCount < this.savedBrushes.length) {
        const errorMsg = `The brush settings were for ${this.savedBrushes.length + 1} curves. There are only ${this.brushCount + 1} curves.`;
        eventBus.$emit('add-notification', errorMsg, 'warning');

        this.newBrush();
        this.drawBrushes();
        this.toggleEdit(!this.isZoomBrush);
      } else if (!Object.keys(this.savedBrushSelections).length) {
        const errorMsg = 'Unable to draw brushes. No brushes were stored.';
        eventBus.$emit('add-notification', errorMsg, 'warning');

        this.setBrushes(_.cloneDeep(this.savedBrushes));
        this.setBrushSelections(_.cloneDeep(this.savedBrushSelections));

        this.newBrush();
        this.drawBrushes();
        this.toggleEdit(!this.isZoomBrush);
      } else {
        this.setBrushes(_.cloneDeep(this.savedBrushes));
        this.setBrushSelections(_.cloneDeep(this.savedBrushSelections));

        this.drawBrushes();
        this.toggleEdit(!this.isZoomBrush);
      }
    },
    updateBrushScale() {
      const t = d3.zoomTransform(this.g.select(`#zoom-group-${this.ID}`).select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);

      // Update brush scale
      this.setBrushScale(newXScale.copy());
    },
    toggleEdit(choice) {
      // console.log('Toggle edit...', choice);
      const vm = this;
      this.toggleZoomBrush(choice);

      if (choice || this.brushCount < 1) {
        // Toggle off all brushes
        // Disable brush pointer events
        this.g.select('.brushes').selectAll('.selection').style('pointer-events', 'none');
        this.g.select('.brushes').selectAll('.overlay').style('pointer-events', 'none');
        this.g.select('.brushes').selectAll('.handle').style('pointer-events', 'none');

        for (let i = 0, len = this.brushes.length; i < len; i += 1) {
          d3.select(`#brush-${i}`).on('.brush', null);
        }

        this.g.select('.zoom').call(this.zoom);
      } else if (!choice) {
        this.g.select('.zoom').on('.zoom', null);

        // Toggle on all brushes
        for (let i = 0, len = this.brushes.length; i < len; i += 1) {
          this.brushes[i].brush(d3.select(`#brush-${i}`));
        }

        // Enable brush pointer events
        this.g.select('.brushes').selectAll('.selection').style('pointer-events', 'all');
        this.g.select('.brushes').selectAll('.handle').style('pointer-events', 'all');

        // Toggle overlay pointer-event
        vm.g.select(`#zoom-group-${vm.ID}`)
          .select('.brushes')
          .selectAll('.brush')
          .call(enableBrushPointerEvents, vm);
      }
    },
  },
};

