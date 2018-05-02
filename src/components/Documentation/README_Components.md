# Components
**Fetch & Upload Data**
   * [FetchData](#fetchdata)
   * [UploadData](#uploaddata)

**Fitting Plot**
   * [FitData](#fitdata)
   * [FitEquations](#fitequations)
   * [FitResultsTable](#fitresultstable)
   * [FitSettings](#fitsettings)
   * [FittedDataTable](#fitteddatatable)

**Browsing Plot**
   * [BrowseData](#browsedata)

**2D Plot**
   * [Chart2D](#chart2d)

**Combining Plot**
   * [CombineData](#combinedata)

**Stitching Plot**
   * [RemoveBrushesButton](#removebrushesbutton)
   * [RemoveStitchButton](#removestitchbuton)
   * [StitchButton](#stitchbuton)
   * [StitchedDataTable](#stitcheddatatable)
   * [ToggleZoomBrush](#togglezoombrush)
   * [StitchData](#stitchdata)
   * [DrawBrushesButton](#drawbrushesbutton)

**Editing Chart**
   * [EditChart](#editchart)
   * [TogglePlotElements](#toggleplotelements)
   * [DeletePoint](#deletepoint)
   * [ResetChartButton](#resetchartbutton)

**Navigation**
   * [HomePage](#homepage)
   * [Navbar](#navbar)

**Plot Axes**
   * [Fields](#fields)

**Plot Scales**
   * [Scales](#scales)

**Selecting Files**
   * [FileExplorer](#fileexplorer)

**Data Tables**
   * [MetadataTable](#metadatatable)
   * [PlottedDataTable](#plotteddatatable)

**Other**
   * [Sidebar](#sidebar)
   * [Transformations](#transformations)
   * [Error](#error)
   * [Footer](#footer)
---
### BrowseData
   Main component for quickly plotting a single curve. This is used for **SANS**, **TAS**, and **POWDER**. The parent component is **DefaultChart**. For each group (SANS, TAS, POWDER) a separate component file is present. These components *extend* the **DefaultChart** component. Within the sub-components the Vuex state, mutations, actions, etc.

   All chart functions in the the mixin file `assets/js/chartFunctions/chartMethods.js`.

   Components used within **BrowseData**:  
      1) [**ResetChartButton**](#resetchartbutton)
      2) [**MetadataTable**](#metadatatable)
      3) [**PlottedDataTable**](#plotteddatatable)
      4) [**DeletePoint**](#deletepoint)
      5) [**TogglePlotElements**](#toggleplotelements)
      6) [**EditChartButton**](#editchartbuton)
---
### Chart2D
   Main component for plotting 2D data. Right now it is only used for **SANS2D**
   
   All chart functions in the the mixin file *chartMethods.js*.

   Components used within **BrowseData**:  
      1) [**ResetChartButton**](#resetchartbutton)
      2) [**PlottedDataTable**](#plotteddatatable)
---
### CombineData
   Main component for normalizing/combining curve data for **TAS** and **POWDER**.

   Sub-Components are:  
   1) <a id='add'></a> **Add**
      Component to place selected files to an added list. Right now, this is only used for **TAS** to add signals to plot.
   2) <a id='subtract'></a> **Subtract**
      Component to place selected files to a subtract list. Right now, this is only used for **TAS** to subtract background data from plot.
   3) **CombineChart**
      Contains the components for plotting data. All plot functions are in the mixin file `assets/js/chartFunctions/chartMethods.js`.
   4) **SaveCombinedData**
      Used to store combined data. **TAS** and **POWDER** differ, so dedicated component for each. This component is used inside the **Tolerance** component.
   5) <a id='tolerance'></a> **Tolerance**
      Used to adjust the *Bin Tolerance* settings. This is used when combining data.
   6) <a id='normalize'></a> **Normalize**
      Used to adjust select normalize settings. Triggers Vuex actions to normalize data. This step comes prior to combining data.

   The `Add`, `Subtract`, `SaveCombinedData`, and `Tolerance` components are seen on the left sidebar.  
   The `CombineChart` component is central to page holding main plot content.
---
### DeletePoint
   Component for handling scatter point deletion in a plot. The *DeletPointModal* is the pop-up window displayed when a user clicks a scatter point. If confirms whether to delete point or not. *DeletePointMixin* contains the functions for triggering pop-up message and actions to delete point.
---
### EditChart
   Used to navigate users to a Plotly Chart for more customized editing.

   Two main components:
      1) **EditChartButton**
         * Used to gather and format data and then navigate user to plot component.
      2) **EditChart**
         * Used for generating Plotly Chart with data sent from *EditChartButton* component.
---
### FetchData
   Used to fetch experiment data from server, and then trigger Vuex actions to store fetched files in a list.  
   Subsequent JavaScript files are mixins for fetching data depending on whether it is **SANS**, **TAS**, or **POWDER**.
---
### Fields
   Component used to display and select from a list available X and Y axis a user can plot. It triggers Vuex actions to update current axes and re-draws plot accordingly.
---
### FileExplorer
   Parent component for three sub-components:
      1) <a id='fileslist'></a> **FilesList**
         Displays a list of files for users to select. Each selection will trigger Vuex actions to fetch or read a file data (store data if not stored yet) and re-draw plot to reflect new data chosen. *FileList*'s contents change depending on the filters chosen in the *FilterList* component.
      2) <a id='filterlist'></a> **FilterList**
         Displays a list of **tags** associated with a file for users to select. Each selection will trigger a Vuex action to update filter list and update the *FileList* component's list.
      3) <a id='fitlist'></a> **FitList**
         Displays the files available for users to perform non-linear fits. The list is dependent on the files selected in the *FilesList* component. When a user selects a file to be fit, it triggers a vuex action and re-draws the plot.
---
### FitData
   Main component for plotting multiple files and performing non-linear fits.
   
   *DefaultChart* holds the main elements for displaying the plot. *ChartPOWDER*, *ChartSANS1D*, and *ChartTAS* extend *DefaultChart*.

   Chart functions are split among 6 files:
      1) **chartMethods.js**
         Mixin for housing all chart functions for the *FitData* component. The 5 files below are imported into *chartMethods*
      2) <a id='fitline'></a> **fitLine.js**
         Mixin for creating fit line displayed on plot. Also handles updating fit line when user changes values for a fit equation in the [`FitEquation`](#fitequation) component.
      3) <a id='fitworker'></a> **fitWorker.js**
         WebWorker for handling the actual fitting of the data. It returns the fitted data that will visually displayed on the plot and reported in the [`FitResultsTable`](#fitresultstable) and [`FittedDataTable`](#fitteddatatable) components. *FitWorker* is called within the *slider.js* file.
      4) **linearspace.js**
         Function for generating a linear space used for fit line.
      5) <a id='fitscores'></a> **scores.js**
         Function to generate fit statistics which are then displayed in the [`FitResultsTable`](#fitresultstable) component.
      6) **slider.js**
         Mixin that handles the D3 Brush feature for selecting a range of data to be fit. This is also where **fit data** function is actually called - upon initialization of slider and when a user changes the slider range.
---
### FitEquations
   Component to handle selecting type of fit for **SANS** and **TAS** data. Allows users to add multiple fit equations for **TAS**, as well as manually changing equation and coefficient values. *FitEquations* also triggers the ability to pick coefficient values from a plot. The functions for picking the values are contained in the [`FitData`](#fitdata) component.

   When a user updates fit type or coefficients it visually updates plot but does not perform a fit until the user clicks the fit button. The function for handling visually updating the plot is found in [`fitLine.js`](#fitline) file under the [`FitData`](#fitdata) component.

   Anytime a user changes a fit type or coefficient it triggers a Vuex action to update the state and then revises the chart with the function mentioned in the paragraph above.
---
### FitResultsTable
   Component to display the results from fitting data. This includes the [`fitScores`](#fitscores) and *Levenberg-Marquardt* values returned from the [`FitWorker`](#fitworker) found in the [`FitData`](#fitdata) component. Users are able to export a .CSV of the results.
---
### FitSettings
   Component to change the *Levenberg-Marquardt* settings:
      * Damping
      * Gradient
      * Iterations
      * Error Tolerance

   The fit settings are pre-populated by default settings found in the `/Store/Fits` folder.

   Useful information on Levenberg-Marquardt:
      * [JavaScript Package](https://github.com/mljs/levenberg-marquardt)
      * [Wikipedia](https://en.wikipedia.org/wiki/Levenberg%E2%80%93Marquardt_algorithm) 
---
### FittedDataTable
   A simple data table component to display the fitted data returned from the [`fitWorker`](#fitworker) found in [`FitData`](#fitdata) component.
---
### HomePage
   Landing page for the entire application.

### Navbar
   Navigation bar seen at top of page. `Navbar.vue` is the main component in which `POWDERNavMenu`, `SANSNavMenu`, and `TASNavMenu` extend. Dynamically changes depending on the current route. e.g.) If the user navigates to POWDER from the HomePage the Navbar will display the relevant links to POWDER (Browse, Graph, and Normalize).

   The `activeClassMixins.js` file is just to style the active link in the navbar.

   Components used within **Navbar**:  
      1) [**FetchData**](#fetchdata)
      2) [**UploadData**](#uploaddata)
      3) **TASNavMenu**
      4) **SANSNavMenu**
      5) **POWDERNavMenu**
---
### SaveStitch
   Button component to trigger pop-up form to post stitched data to server. Currently only being used for **SANS**.
---
### Scales
   Component to select plot scale type (log, linear, power) for a given plot. When a user selects a scale type a Vuex action is triggered to upstate the state and then an event is emitted to re-draw the current plot.
---
### Sidebar
   Main component seen on the left-side of the page that holds all components used for editing the chart and performing fits or normalizing data. The sidebar component dynamically changes depending on the active route. e.g.) A user navigates to SANS-Fit and the sidebar will update to display the interface used for the [`FitData`](#fitdata) component.

   Sub-folders within **Sidebar**:  
      1) **SANS**
         Holds all sidebar components (Browse, Fit, Stitch, 2D) for SANS related features.
      2) **TAS**
         Holds all sidebar components for TAS (Browse, Fit, Combine) related features.
      3) **POWDER**
         Holds all sidebar components for POWDER (Browse, Fit, Combine) related features.

   Components imported for **SidebarFit**:
      * [**FileExplorer**](#fileexplorer)
      * [**Scales**](#scales)
      * [**Fields**](#fields)
      * [**FitSettings**](#fitsettings)
      * [**FitEquation**](#fitequation)

   Components imported for **SidebarCombine**:
      * [**Add**](#add)
      * [**Subtract**](#subtract)
      * [**Fields**](#fields)
      * [**Scales**](#scales)
      * [**FilterList**](#filterlist)
      * [**Normalize**](#normalize)
      * [**Tolerance**](#tolerance)
---
### StitchData
   Main component for stitching data. Currently only used for **SANS**. Component is used to take two or more curves and 'stitch' into one file.

   The mixin file `chartMethods.js` contains all the chart functions for StitchData.

   Components used within **StitchData**:  
      1) [**ResetChartButton**](#resetchartbutton)
      2) [**PlottedDataTable**](#plotteddatatable)
      3) [**DeletePoint**](#deletepoint)
      4) [**TogglePlotElements**](#toggleplotelements)
      5) [**EditChartButton**](#editchartbutton)
      6) [**ToggleZoomBrush**](#togglezoombrush)
      7) [**StitchButton**](#stitchbutton)
      8) [**RemoveStitchButton**](#removestitchbutton)
      9) [**SaveStitchButton**](#savestitchbutton)
      10) [**DrawBrushesButton**](#drawbrushesbutton)
      11) [**StitchedDataTable**](#stitcheddatatable)
---
### Transformations
   Component for transforming plot data. User manually enters transformations for the X and Y axis and the component triggers Vuex actions to update the state data and then an event is emitted to re-draw the chart. Current only used with SANS Fit Data.
---
### UploadData
   Component for uploading data files to be plotted. `DropZone.vue` turns the entire browser window into, well, a drop zone for files. Users can either click the Upload Data button or drag files into the browser window. The *UploadData* component triggers Vuex actions to load the uploaded files to a list.
---
### DrawBrushesButton
   Button component used for the [`StitchData`](#stitchdata) component. Whenever a user saves a stitched data curve, it stores the current brush boundaries used to stitch the data. Those stored boundaries can be re-created when the user clicks the *DrawBrushesButton*.
---
### Error
   Component to handle all messages displayed in the lower right corner of the browser window. The component takes in any number of messages emited and ques them to be displayed in 3 second intervals. Users have the option to close a message prematurely.
---
### Footer
   Component at bottom of page to display copyright info and alter the current theme of the app. Users can choose between a green, blue, and light theme. Green is the default.
---
### MetadataTable
   Data table component to display metadata information for current files being plotted. This is used for **TAS** and **POWDER** data. This component is seen at the bottom of the plot as a tab. If multiple files are plotted a list of tabs associated with plotted files is generated. Each tab directs to the metadata of specified file.
---
### PlottedDataTable
   Data table to display all data of current files being plotted. Summary statistics are generated at the bottom of the table per column. Users can export a .CSV file of the data, excluding the summary statistics.
---
### RemoveBrushesButton
   Button component to trigger a function that removes active brushes on the plot. Currently only being used for the [`StitchData`](#stitchdata) component.
---
### RemoveStitchButton
   Button component to trigger a function that removes the stitched data curve on the plot. Currently only being used for the [`StitchData`](#stitchdata) component.
---
### ResetChartButton
   Button component to trigger a function to unzoom the plot to its default state.
---
### StitchButton
   Button component used for the [`StitchData`](#stitchdata) component to trigger a function to stitch the curve data currently being plotted.
---
### StitchedDataTable
   Data table component that displays the stitched data of current plot. The data table is positioned below the plot. Users can export a .CSV file of the stitched data.
---
### TogglePlotElements
   Button component that toggles the chart elements being displayed. When the button is clicked it togles the boolean variables *isScatterPoints*, *isScatterLines*, *isErrorBars*, *isLegend* found in the `assets/js/chartFunctions/defaultChartMixin.js` file and then emits an event to re-draw the current plot.
---
### ToggleZoomBrush
   Button component that is used for the [`StitchData`](#stitchdata) component. It toggles between zooming or drawing brushes on the plot. When there is fewer than 2 files plotted, only zoom is enabled. 2+ files plotted a user can switch between a zoom or brush state.
---
[top](#components)