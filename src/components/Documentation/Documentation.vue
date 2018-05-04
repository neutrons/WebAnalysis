<template>
<v-container pa-3 pl-5>
  <v-layout row wrap mb-5 v-for='(chapter, chapterTitle) in guide' :key='chapterTitle'>
    <v-flex xs12 mb-2>
      <h1 class='mb-2 secondary--text'>{{ chapterTitle }}</h1>
    </v-flex>

    <v-flex xs12 v-for='(section, sectionTitle) in chapter.sections' :key='section.id'>
      <h3>{{ sectionTitle }}</h3>
      
      <p>{{ section.info }}</p>
      
      <figure v-if='section.image !== false'>
        <img :alt='sectionTitle' :src='section.image'>
        <figcaption>
          {{ section.imageCaption }}
        </figcaption>
      </figure>

      <div v-html='section.content' class='mb-3'></div>
      <span :id='section.id'></span>
    </v-flex>

    <v-flex xs12>
      <v-divider :id='chapterTitle'></v-divider>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      title: 'Welcome to documentation!',
      guide: {
        Basics: {
          // disabling eslint because it doesn't like using the require() statement
          /* eslint-disable */
          sections: {
            'App Layout': {
              id: 'basics-app-layout',
              info: '',
              image: require('../../assets/images/AppLayout.png'),
              imageCaption: `(1) Left side of the page is the control panel. You can select files to plot, fit, or combine. You can change plot scales, tag files, along with other controls specific to feature.
(2) Middle of page is the plot view. For the top half, users can view the plot or a table of the data being plotted. Immediately below the chart is a toolbar of tools to alter and edit the plot. The bottom half contains additional information related to plot features, such as fit results, file metadata, etc.
(3) Top page of the page users can Fetch and Upload data, as well as navigate between plot features Browse, Graph, and etc..
(4) Bottom of page holds the footer which you can change colors themes of the application.`,
            },
            'Fetch Data': {
              id: 'basics-fetch-data',
              info: '',
              image: require('../../assets/images/FetchData.gif'),
              imageCaption: 'Click to fetch data from server',
            },
            'Click Upload Data': {
              id: 'basics-upload-data',
              info: '',
              image: require('../../assets/images/UploadFile.gif'),
              imageCaption: 'Click to upload a file',
            },
            'Drag Upload Data': {
              id: 'basics-drag-upload-data',
              info: '',
              image: require('../../assets/images/DragDrop.gif'),
              imageCaption: 'Click to upload a file',
            },
            'Change Scale': {
              id: 'basics-change-scales',
              info: `Use the Scales panel in the left sidebar to change the current plot's scales...gif goes here.`,
              image: require('../../assets/images/ChangeScales.gif'),
              imageCaption: '',
            },
            'Delete Points': {
              id: 'basics-delete-points',
              info: 'If you identify an outlier in the plot, simply click the point to delete it. A prompt will be displayed to confirm.',
              image: require('../../assets/images/DeletePoint.gif'),
              imageCaption: '',
            },
            'Toggle Plot Elements': {
              id: 'basics-toggle-plot-elements',
              info: `If you don't need scatter lines, error bars, points, or legends for a given plot, simply toggle the elements off with the button labeled 'Toggle Plot Elements' below the plot view. If you notice the plot is sluggish while zooming and panning, one culprit is too many svg elements on the plot; toggling off plot elements can help improve slow zooming.`,
              image: require('../../assets/images/TogglingElements.gif'),
              imageCaption: '',
            },
            'Edit Chart': {
              id: 'basics-edit-chart',
              info: `If you want to edit the current plot, click the 'Edit Chart Button' below the plot. This will take you to a new page where you can customize the appearance of the plot using the Plotly package.`,
              image: require('../../assets/images/EditChart.gif'),
              imageCaption: '',
            },
            'Change Theme': {
              id: 'basics-change-theme',
              info: `If you want to change the color of the app's appearance, click one of the three options at the bottom right of the page.`,
              image: require('../../assets/images/ChangeTheme.gif'),
              imageCaption: '',
            },
            'Unzoom Chart': {
              id: 'basics-unzoom-chart',
              info: `If you have zoomed or panned a plot and would like to go to its default state, simply click the 'Unzoom Plot' button below the plot view.`,
              image: require('../../assets/images/UnzoomPlot.gif'),
              imageCaption: '',
            },
          },
        },
        'Browse Data': {
          sections: {
            Intro: {
              id: 'browse-intro',
              info: 'The Browse tab is used to quickly navigate through the files by plotting one curve at a time. Users can either click the arrows surrounding the file name at the left side panel or user the left and right arrow keys to plot data. The other feature in browse is the ability to tag files with unique names so that users can filter for specific files when fitting or combining data.',
              image: false,
              imageCaption: '',
            },
            'Tagging Files': {
              id: 'browse-tagging-files',
              info: 'To tag a file use the tag panel to in the left sidebar.',
              image: require('../../assets/images/TaggingFile.gif'),
              imageCaption: '',
            },
          },
        },
        'Graph Data (Curve Fitting)': {
          sections: {
            Intro: {
              id: 'fit-intro',
              info: 'The Graph Tab allows users to plot multiple files, as well as perform various types of curve fittings.',
              image: false,
              imageCaption: '',
            },
            'Fit Data': {
              id: 'fit-data',
              info: 'The controls for fitting data are found in the left sidebar panel.',
              image: require('../../assets/images/FitData.gif'),
              imageCaption: '',
            },
            'Fit Results': {
              id: 'fit-results',
              info: 'The results for fitting a curve will be displayed below the plot view.',
              image: require('../../assets/images/FitResults.gif'),
              imageCaption: '',
            },
            'Edit Fit Equation': {
              id: 'fit-edit-equation',
              info: 'Users can edit the original fit equation by changing the equation itself or altering the intial coefficient values. Coefficient values can be toggled constant if desired.',
              image: require('../../assets/images/FitEquation.gif'),
              imageCaption: '',
            },
            'Point Pick': {
              id: 'fit-point-pick',
              info: `Users can pick values on the plot view as the initial values of an equation's coefficient values.`,
              image: require('../../assets/images/PickPoints.gif'),
              imageCaption: '',
            },
            'Levenberg Settings': {
              id: 'fit-levenberg-settings',
              info: `Users can adjust the settings of the levenberg-marquardt algorithm for fine-tune fittings.`,
              image: require('../../assets/images/LevenbergSettings.gif'),
              imageCaption: '',
            },
          },
        },
        'Combine / Normalize Data': {
          sections: {
            Intro: {
              id: 'combine-intro',
              info: 'Users can combine one or more curves into a single curve. The combined data can then be downloaded as a .CSV or immediately viewed in the Graph tab.',
              image: require('../../assets/images/CombineData.gif'),
              imageCaption: '',
            },
            'Store Combined': {
              id: 'combine-stroe',
              info: 'Users can store combined data and plot then plot it in the graph tab.',
              image: require('../../assets/images/StoreCombined.gif'),
              imageCaption: '',
            },
          },
        },
        'Stitch Data': {
          sections: {
            Intro: {
              id: 'stitch-intro',
              info: 'Users can stitch two or more curves.',
              image: require('../../assets/images/StitchData.gif'),
              imageCaption: '',
            },
          },
        },
        'Runs Table': {
          sections: {
            Intro: {
              id: 'runs-intro',
              info: 'Users (TAS and POWDER) can navigate to the Runs tab and view an all files metata. They can also search the table for specific information or exclude columns they do not need to view.',
              image: require('../../assets/images/RunsTable.gif'),
              imageCaption: '',
            },
          },
        },
        SANS: {
          sections: {
            '2D Plots': {
              id: 'sans-2d',
              info: 'SANS users can plot 2D files.',
              image: require('../../assets/images/SANS2D.gif'),
              imageCaption: '',
            },
          },
        },
        TAS: {
          sections: {
            'Metadata Table': {
              id: 'tas-metadata',
              info: `Users can view a file's metadata below the plot view.`,
              image: require('../../assets/images/MetadataTable.gif'),
              imageCaption: '',
            },
          },
        },
        POWDER: {
          sections: {
            'Metadata Table': {
              id: 'powder-metadata',
              info: `Same as TAS' metadata`,
              image: false,
              imageCaption: '',
            },
          },
        },
      },
      /* eslint-enable */
    };
  },
};
</script>

<style>
img {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

figcaption {
  text-align: center;
}
</style>