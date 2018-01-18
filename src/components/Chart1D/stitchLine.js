import * as d3 from 'd3';
import _ from 'lodash';
// import $ from 'jquery';
// import axios from 'axios';
// import { eventBus } from '../../assets/js/eventBus';
import interpolate from './interpolateLine';
import { eventBus } from '../../assets/js/eventBus';

export default {
  methods: {
    // saveStitchLine() {
    //   const vm = this;

    //   this.saveConfirm(function (confirm) {
    //     if (confirm) {
    //       $('#cancel-save-btn').off();
    //       $('#save-btn').off();

    //       let filename = $('#file-name-input').val();
    //       // console.log('Saving the file name: ' + filename + '_Iq.txt');
    //       $('#file-name-input').val('');


    //       // console.log('Stitch Line Data:', stitchLineData);
    //       // console.log('Calling axios.post to save new data file');

    //       axios.post('/external/save', {
    //           id: filename + '_Iq.txt',
    //           content: vm.stitchLineData
    //         })
    //         .then(function (response) {
    //           console.log(response);

    //           // If posting stitch line works, store brush selections
    //           vm.savedSelections = _.cloneDeep(vm.brushObj.brushSelections);
    //           vm.savedBrushes = _.cloneDeep(_.reverse(vm.brushObj.brushes));

    //           // console.log('Saved brushes:', savedBrushes);
    //           // console.log('-----------------------------')

    //           // console.log('Here are your saved brush selections:')
    //           // for(let key in savedSelections) {
    //           //     console.log('Key: ' + key);
    //           //     console.log(savedSelections[key]);
    //           //     console.log('---------------------------');
    //           // }

    //           // Then reset plot for next iteration of stitching
    //           vm.brushObj.brushSelections = {};
    //           vm.brushObj.brushes = [];
    //           eventBus.$emit('reset-stitch');

    //           // Then fetch data to include the saved stitch file
    //           eventBus.$emit('fetch-files');
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });

    //       return;
    //     } else {
    //       $('#cancel-save-btn').off();
    //       $('#save-btn').off();
    //       $('#file-name-input').val('');

    //       // console.log('Not saving the file.');
    //       return;
    //     }
    //   });
    // },
    // saveConfirm(callback) {
    //   let vm = this;

    //   $('#saveModal').modal('show')

    //   $('#save-btn').on('click', function () {

    //     let filename = $('#file-name-input').val();

    //     if (!vm.isValidFilename(filename)) {
    //       $('#save-error-msg').show();
    //     } else {
    //       callback(true);
    //       $('#saveModal').modal('hide');
    //       $('#save-error-msg').hide();
    //     }

    //   });

    //   $('#cancel-save-btn').on('click', function () {
    //     callback(false);
    //     $('#saveModal').modal('hide');
    //     $('#save-error-msg').hide();
    //   });
    // },
    // isValidFilename(fname) {
    //   var rg1 = /^[^\\/:\*\?'<>\|  .]+$/; // forbidden characters \ / : * ? ' < > |
    //   var rg2 = /^[0-9]/; // cannot start with a number ([0-9])
    //   var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

    //   return rg1.test(fname) && !rg2.test(fname) && !rg3.test(fname);
    // },
    stitchData() {
      // console.log('Stitching data...');
      const selectedData = this.selectData();

      // Run tests to check if appropriate brush selections are made
      if (!selectedData.length || !this.validateSelections(selectedData)) return false;

      // console.log('Selected Data: ', selectedData);
      // Now interpolate data
      const line = interpolate.linear(selectedData);

      // First repackage data to an array of objects per points for d3 to work with
      const tempData = [];

      for (let i = 0, len = line.x.length; i < len; i += 1) {
        tempData.push({
          x: line.x[i],
          y: line.y[i],
          error: line.error[i],
        });
      }

      this.setStitchedData(tempData);

      // Put the line onto the plot
      this.$nextTick(() => this.updateStitchLine());

      return true;
    },
    updateStitchLine() {
      if (!this.stitchedData.length) return;

      const trans = d3.transition().duration(750);
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      const newLine = d3.line()
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      if (this.g.select('.stitch-group').empty()) {
        const group = this.g.select('.stitched-line').append('g').attr('class', 'stitch-group');

        // Add error lines
        group.append('g').attr('class', 'error-line')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorLine, newXScale, newYScale, trans);

        // Add error cap top
        group.append('g').attr('class', 'error-cap-top')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

        // Add error cap bottom
        group.append('g').attr('class', 'error-cap-bottom')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

        // Add line path
        group.append('g')
          .attr('class', 'scatter-line')
          .selectAll('path')
          .data([this.stitchedData])
          .call(this.updateLine, newLine, trans);

        // Add scatter points
        group.append('g').attr('class', 'scatter')
          .selectAll('circle')
          .data(this.stitchedData)
          .call(this.updateScatter, newXScale, newYScale, trans);
      } else {
        const group = this.g.select('.stitch-group');

        // Update error bars
        group.select('.error-line')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorLine, newXScale, newYScale, trans);

        // Update error cap top
        group.select('.error-cap-top')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

        // Update error cap top
        group.select('.error-cap-bottom')
          .selectAll('line')
          .data(this.stitchedData)
          .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

        // Update line paths
        group.select('.scatter-line')
          .selectAll('path')
          .data([this.stitchedData])
          .call(this.updateLine, newLine, trans);

        // Update scatter
        group.select('.scatter')
          .selectAll('circle')
          .data(this.stitchedData)
          .call(this.updateScatter, newXScale, newYScale, trans);
      }
    },
    removeStitchLine() {
      d3.select('.stitched-line').selectAll('*').remove();

      return false;
    },
    selectData() {
      // If there are no brush selections, don't bother matching the data
      if (!this.validateBrushes()) return [];

      const matches = [];
      // An array of all data sorted left to right by x axis values
      const allData = this.formatData(this.preparedData);
      // console.log('All data:', allData);

      // First sort brushes so that selections are made left to right
      const sortedBrushes = this.sortBrushes(); // an array of sorted brush selections
      // console.log('Sorted Brushes:', sortedBrushes);

      for (let i = 0, sortedLength = sortedBrushes.length; i < sortedLength; i += 1) {
        const start = sortedBrushes[i][1].converted[0];
        const end = sortedBrushes[i][1].converted[1];
        const tempSelection = [];

        for (let j = 0, allLength = allData.length; j < allLength; j += 1) {
          // Temp data is cloned so original array is not referenced
          // If not cloned, the stitching function will not work properly because
          // each brush selection reference the same curve...hence the same data will
          // get altered when shifting during the interpolation process.
          const tempData = _.cloneDeep(allData[j][1]);
          const tempName = allData[j][0];
          const firstValue = tempData.x[0];
          const lastValue = tempData.x[tempData.x.length - 1];

          // console.log('Check: ' + tempName, firstValue <= end && lastValue >= start);
          if (firstValue <= end && lastValue >= start) {
            const tempSelCurve = [tempName];
            const tempSel = { x: [], y: [], error: [] };

            for (let z = 0, xLength = tempData.x.length; z < xLength; z += 1) {
              const convertedX = tempData.x[z];

              if (start <= convertedX && convertedX <= end) {
                // Add the x,y,e values to selection object
                tempSel.x.push(tempData.x[z]);
                tempSel.y.push(tempData.y[z]);
                tempSel.error.push(tempData.error[z]);
              }
            }

            tempSelCurve.push(tempData); // Add all data
            tempSelCurve.push(tempSel); // Add selected data
            tempSelection.push(tempSelCurve);
          }
        }

        tempSelection.push([start, end]); // Add Brush selections

        // Push Temp brush selection to match array
        matches.push(tempSelection);
      }

      return matches;
    },
    formatData(data) {
      const formatted = [];

      for (let i = 0, len = data.length; i < len; i += 1) {
        const tempData = data[i].values;
        const tempName = data[i].key;
        const x = [];
        const y = [];
        const error = [];

        // eslint-disable-next-line
        tempData.forEach((el) => { 
          x.push(el.x);
          y.push(el.y);
          error.push(el.error);
        });

        formatted.push([tempName, { x, y, error }]);
      }

      // Sort curves form least to greatest
      formatted.sort((a, b) => {
        const minA = _.min(a[1].x);
        const minB = _.min(b[1].x);

        return minA - minB;
      });

      return formatted;
    },
    validateBrushes() {
      // console.log(brushObj.brushSelections);
      // console.log(Object.keys(brushObj.brushSelections));
      const totalBrushes = Object.keys(this.brushSelections).length;
      let errorMsg;
      if (!totalBrushes) {
        // console.log('No brushes to select data.');
        // Emit error message pop-up
        errorMsg = 'No brushes to select data. Draw brushes.';
        eventBus.$emit('add-notification', errorMsg, 'error');

        return false;
      } else if (totalBrushes !== this.brushCount) {
        // console.log(`There are ${this.brushCount + 1} lines.
        // You must have (n-1) = ${this.brushCount} number of brushes.`);

        // Emit error message pop-up
        errorMsg = `There are ${this.brushCount + 1} lines. You must have (n-1) = ${this.brushCount} number of brushes. Redraw brushes.`;
        eventBus.$emit('add-notification', errorMsg, 'error');

        return false;
      }

      return true;
    },
    validateSelections(selected) {
      // First make sure only 2 lines and only 2 lines are selected per brush
      let errorMsg;

      for (let i = 0, len = selected.length; i < len; i += 1) {
        const tempBrush = selected[i];

        // console.log('Temp brush', tempBrush);
        if (tempBrush.length - 1 !== 2) {
          // console.log('Make sure a brush selects 2 and only 2 lines.');

          // Emit error message pop-up
          errorMsg = 'Make sure a brush selects 2 and only 2 lines. Redraw brushes.';
          eventBus.$emit('add-notification', errorMsg, 'error');

          return false;
        }
      }

      // Reduce keys to a non-nested array
      const keys = [];

      for (let i = 0, len = selected.length; i < len; i += 1) {
        for (let j = 0, L = selected[i].length - 1; j < L; j += 1) {
          // Check that each brush selects more than one point per curve
          // Leverberg Marquardt cannot fit arrays of length = 1
          if (selected[i][j][2].x.length < 2) {
            // console.log('Select more than 1 data point per curve.');

            // Emit error message pop-up
            errorMsg = 'Select more than 1 data point per curve. Redraw brushes.';
            eventBus.$emit('add-notification', errorMsg, 'error');

            return false;
          }

          keys.push(selected[i][j][0]);
        }
      }

      // If none of the items in keys matches to lineNames,
      // set to true because not all lines have been selected in brushes
      for (let i = 0, len = this.filesSelected.length; i < len; i += 1) {
        if (keys.indexOf(this.filesSelected[i]) === -1) {
          // console.log(`${this.filesSelected[i]} was not selected.
          // Make sure each line is selected.`);

          // Emit error message pop-up
          errorMsg = `${this.filesSelected[i]} was not selected. Make sure each line is selected. Redraw brushes.`;
          eventBus.$emit('add-notification', errorMsg, 'error');

          return false;
        }
      }

      return true;
    },
  },
};
