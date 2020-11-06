# Frank-flow
Graphical flow editor for Frank configurations

This project will help you visualize your adapters in flow format.

The project has been tested in firefox and chrome, other browsers will give an inacurate representation of the editor.

# NPM

After downloading the frank-flow you will need to install the node modules.
To install the node modules, first download nodejs from: https://nodejs.org/en/.

After installing node, open a terminal in the frank-flow folder.
Type node -v to check if node is installed (if this is not the case, please reinstall node).
Type npm i
Now all of the node modules will be installed.


# To integrate the frank-flow: 

  Clone this project and place it inside your own Frank project.

  Put the files inside of the folder webapp/ROOT (or just webapps in case you have no ROOT folder).
  If you have multiple webapp folders then place the frank-flow in the src/main/webapp folder.

  <img src="media/images/frankflowDownloadTut.png" />

  Start your Frank.


  Navigate to the url http://localhost/ibis/frank-flow/.
  If the url isn't working check your file structure.
  The url depends on your map structure.

  <img src="media/images/frank-flow-huidig.png" />

# How to use the frank-flow
  
  <li>
  All of your configurations will be in the dropdown menu, select a name and that configuration will load.
  </li>
  <br>
  <li>
  The right click menu has some functionalities:
  </li>
  <li>
  change lines: change the connection type between your pipes.
  </li>
  <li>
  toggle horizontal: clicking this button wil toggle between horizontal flow generation and vertical flow generation.
  </li>
  <li>
  run xsd: clicking this button will run the official ibis xsd against your code. Invalid XML will be shown with red marking in your editor.
  </li>
  <li>
  beautify: beautify your code.
  </li>
  <li>
  export svg: download your flowchart as an svg.
  </li>

  # FileTree
  <ol>
  <li>
  To use the file tree your Frank configurations folder needs to be a zip file.
  </li>
  <li>
  Upload your zip configuration to the file picker in the top-left corner of the screen.
  Now a file tree wil appear on the left side of your screen.
  </li>
  <li>
  Select the file you wish to change.
  </li>
  <li>
  When you have finished working on your project, download your configuration folder by clicking the 'download file' option in the hamburger menu.
  </li>
  </ol>


  
  # Autocomplete
  In the future this feature will be implemented.
  
  # IMPORTANT
  Your configuration must be in beautiful syntax, otherwise it may not load. 