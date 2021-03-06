<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>ogrE</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Editor Web de infografice" />
    <meta name="keywords" content="infographic, interaction, inspiration, web design" />
    <meta name="author" content="OGRE" />
    <link rel="stylesheet" href="css/style.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="css/jquery.scrollbar.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="css/jquery-ui.css" type="text/css" media="screen"/>
    <link href='http://fonts.googleapis.com/css?family=Lato:400,100,300,400italic,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link href="css/evol.colorpicker.min.css" rel="stylesheet" /> 
    <script type="text/javascript" src="js/jquery-1.11.2.min.js" ></script>
    <script type="text/javascript" src="js/jquery-ui.js" ></script>
    <script type="text/javascript" src="js/items.js" ></script>
    <script type="text/javascript" src="js/blocks.js" ></script>
    <script type="text/javascript" src="js/html2canvas.js" ></script>
    <script type="text/javascript" src="js/charts/d3.v3.4.8.js"></script>
    <script type="text/javascript" src="js/charts/dimple.v2.1.3.js"></script>
    <script type="text/javascript" src="js/upload/jquery.uploadfile.min.js"></script>
    <script type="text/javascript" src="js/csvParser/jquery.csv-0.71.min.js"></script>
    <script type="text/javascript" src="js/csvParser/jquery.csvIn.min.js"></script>
    <script type="text/javascript" src="js/tsvParser/jquery.tsv-0.96.min.js"></script>
    <script type="text/javascript" src="js/jquery.svgmagic.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/jquery.scrollbar.min.js"></script>
    <script type="text/javascript" src="js/evol.colorpicker.min.js" ></script>
    <script type="text/javascript" src="js/canvg.js"></script>
    <script type="text/javascript" src="js/rgbcolor.js"></script>
    <script type="text/javascript" src="js/StackBlur.js"></script>
</script>

</head>

<body>
    <div class="save_progress">
        <div class="save_progress_inner">
            <button id="SaveProgress">Save your progress</button>
            <div class="hide">
                <img src="images/arrowU.png">
            </div>
            <div class="show">
                <img src="images/arrowD.png">
            </div>
        </div>
    </div>
    <header id="container">
        <div id="container-body" class="clearfix">
            <div id="logo">
                <a href="index.php"><h1 id="title">ogrE</h1>
                <p id="subtitle">Infographics Web Editor</p></a>
            </div>
        </div>

        <svg id="targetSVG" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">

        </svg>

        <div class="inner-block">
            <div id="block-left">
                <div id="left-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <article id="menu">
                    <h3>Infographic menu</h3>
                    <section id="infoMenu"> 
                        <ul>
                            <li>
                                <input id="incarca">Load</button>
                            </li>
                            <li>
                                <button id="salveaza">Save infographic</button>
                            </li>
                        </ul>
                    </section>
                    <h3>Add Chart</h3>
                    <section>
                        <div class="chart_editor_block" id="chart_data">
                            <div class="upload_data">
                                <button id="upload_local">Upload File</button>
                                <button id="upload_web">Give URL</button>
                                <div class="upload_block" id="upload_local_block">
                                    <input type="file" id="files" name="file" />
                                    <div class="upload_local_data">
                                        <button><span>Load data</span></button>
                                    </div>
                                </div>
                                <div class="upload_block" id="upload_web_block">
                                    <input type="text" id="data_url" placeholder="Write URL here">
                                    <button class="upload_web_data">
                                        <span>Load data</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="chart_editor_block" id="types_charts">
                            <ul>
                                <li><h4>Bar Charts</h4></li>
                                <li>
                                    <img class="chart_type" data-type="dimple.plot.bar" id="bar_vertical" src="images/charts/bars_horizontal.jpg">
                                    <img class="chart_type" data-type="dimple.plot.bar" id="bar_horizontal" src="images/charts/bars_vertical.jpg">
                                </li>
                            </ul>
                            <ul>
                                <li><h4>Pie Charts</h4></li>
                                <li><img class="chart_type" data-type="dimple.plot.pie" id="pie_standard" src="images/charts/pie_standard.jpg"></li>
                            </ul>
                            <ul>
                                <li><h4>Area Charts</h4></li>
                                <li><img class="chart_type" data-type="dimple.plot.area" id="bar_horizontal" src="images/charts/areas_horizontal.jpg"></li>
                            </ul>
                            <ul>
                                <li><h4>Line Charts</h4></li>
                                <li><img class="chart_type" data-type="dimple.plot.line" id="bar_horizontal" src="images/charts/lines_horizontal.jpg"></li>
                            </ul>
                        </div>
                        <div class="chart_editor_block" id="chart_sets">
                            <div class="bar_charts">    
                                <div>
                                    <label for="chartWidth">Set the width of chart in px</label>
                                    <input type="text" id="chartWidth" name="chartWidth" placeholder="For example: 400">
                                </div>
                                <div>
                                    <label for="chartHeight">Set the height of chart in px</label>
                                    <input type="text" id="chartHeight" name="chartHeight" placeholder="For example: 400">
                                </div>
                                <div>
                                    <label for="x_axis">Set chart x axis</label>
                                    <select name="x_axis" id="x_axis" class="x_axis">
                                        <option>Please Select ... </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="y_axis">Set chart y axis</span>
                                    <select name="y_axis" id="y_axis" class="y_axis">
                                        <option>Please Select ... </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="order_rule">add order rule</span>
                                    <select name="order_rule" id="order_rule" class="order_rule">
                                        <option>Please Select ... </option>
                                    </select>
                                </div>
                            </div>
                            <div class="pie_charts">
                                <div>
                                    <label for="chartWidth">Set the width of chart in px</label>
                                    <input type="text" id="chartWidth" name="chartWidth" placeholder="For example: 400">
                                </div>
                                <div>
                                    <label for="chartHeight">Set the height of chart in px</label>
                                    <input type="text" id="chartHeight" name="chartHeight" placeholder="For example: 400">
                                </div>
                                <div>
                                    <label for="measure_axis">Set measure axis</label>
                                    <select name="measure_axis" id="measure_axis" class="measure_axis">
                                        <option>Please Select ... </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="series">add series</label>
                                    <select name="series" id="series" class="series">
                                        <option>Please Select ... </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button class="create_chart">Create Chart</button>
                    </section>
                    <h3>Add photo</h3>
                    <section>

                        <div class="upload_image">
                            <input type="file" id="uploaded_image" name="image" />
                            <div class="upload_local_image">
                                <button>
                                    <span>Load Image</span>
                                </button>
                            </div>
                        </div>
                        <div id="loaded_images" class="">
                            <?php include 'functions.php'; ?>
                        </div>
                        <div class="add_button"><button id="add_image">Add Image</button></div>
                    </section>
                    <h3>Add Text</h3>
                    <section>
                        <input type="text" id="textInput" name="chartWidth" placeholder="Text"/> 
                        <button id="addText"> Add Text </button>
                    </section>
                </article>
            </div></div>
    </header>

    <div id="container" class="container">
        
        <article id="container-body">

            <section id="mini">
                    <section id="itemMenu">
                            <div id="imageEditor">
                                <label for="amount">Alpha:</label>
                                <input type="text" id="amount">
                                <div id="slider-1"></div>

                                <div class="panel">
                                    <p> Flip Image </p>
                                    <div id="flipH"> 
                                        <img src="images/flipH.png" alt="flipHorizontal" />
                                    </div>

                                    <div id="flipV"> 
                                        <img src="images/flipV.png" alt="flipVertical" />
                                    </div>
                                </div>

                                <div id="widthItem"> 
                                    <label for="width">Width: </label>
                                    <input type="text" id="width"> 
                                </div>

                                <div id="heightItem"> 
                                    <label for="height">Height: </label>
                                    <input type="text" id="height">
                                </div>
                            </div>

                            <div id="textEditor">
                                <label for="widthText">Width: </label>
                                <input type="text" id="widthText"> 

                                <div class="fontPanel">
                                    <p> Font family: </p>
                                    <select id="fontFamily">
                                        <option style="font-family: 'Times New Roman'"> Times New Roman </option>
                                        <option style="font-family: 'Comic Sans MS'"> Comic Sans MS </option>
                                        <option style="font-family: 'Arial'"> Arial </option>
                                        <option style="font-family: 'Verdana'"> Verdana </option>
                                        <option style="font-family: 'Impact'"> Impact </option>
                                        <option style="font-family: 'Courier'"> Courier </option>
                                    </select>
                                     <p> Font size:  </p> 
                                     <select id="fontSize"> </select>
                                </div>

                                <div class="demoPanel">
                                    <p> Color picker <input id="cpButton" value="#92cddc" /> </p>
                                </div>

                                <div class="alignPanel">
                                    <p> Text Align </p>

                                    <div id="alignRight"> 
                                        <img src="images/align_right.png" alt="alignRight"/> 
                                    </div>
                                    
                                    <div id="alignJustify"> 
                                        <img src="images/align_justify.png" alt="alignCenter"/> 
                                    </div>

                                    <div id="alignLeft">
                                        <img src="images/align_left.png" alt="alignLeft"/>
                                    </div>

                                <div>
                            </div>
                    </section>

                    <div id="miniMenu"> 
                        <div id="up" > 
                            <img src="images/arrowU.png" alt="up" />
                        </div>
                        <div id="down"> 
                            <img src="images/arrowD.png" alt="down" />
                        </div>
                        <div id="clone"> 
                            <img src="images/clone.png" alt="clone" />
                        </div>
                        <div id="delete"> 
                            <img src="images/delete.png" alt="delete" />
                        </div>
                        <div id="add"> 
                            <img src="images/add.png" alt="add" />
                        </div>
                        <div id="settings">
                            <img src="images/settings.png" alt="settings" />
                        </div>
                        <span id="settingsContainer" di>
                             <ul>
                                <li class="label"> 
                                    <label for="widthBlock">Width: </label>
                                    <input type="text" id="widthBlock" style=" width: 50px; border:0; color:#f6931f; font-weight:bold;"> 
                                </li>

                                <li class="label" > 
                                    <label for="heightBlock">Height: </label>
                                    <input type="text" id="heightBlock" style=" width: 50px; border:0; color:#f6931f; font-weight:bold;">
                                </li>

                                <li class="label"> 
                                    <button id="change"> Change </button>
                                </li>
                            </ul>
                        </span>
                    </div>


                    <div id="contextmenu" class="jqcontextmenu">
                        <div id="mCut"> 
                            <img src="images/cutItem.png">
                            <p> Cut </p>
                        </div>
                        <div id="mCopy"> 
                            <img src="images/copyItem.png">
                            <p> Copy </p>
                        </div>
                        <div id="mDelete"> 
                            <img src="images/deleteItem.png">
                            <p> Delete </p>
                        </div>
                        <div id="mLock"> 
                            <img src="images/lock.png">
                            <p> Lock </p>
                        </div>
                        <div id="mUnlock">
                            <img src="images/un_lock.png"> 
                            <p> Unlock </p>
                        </div>
                    </div>

                    <div id="contextmenu2" class="jqcontextmenu">
                        <div id="mPaste"> 
                            <img src="images/pasteItem.png"> 
                            <p> Paste </p> 
                        </div>
                    </div>
            </section>

            <section id="infographic">
                <div id="infoContent">
                    <div class="part">
                        <div class="block">
                            <div class="items">
                                <div class="ui-widget draggble">
                                    <img src="images/vectors/globe.png" />
                                </div>
                                <div class="ui-widget draggble">
                                    <img src="images/vectors/cursor.png" />
                                </div>
                                <div class="ui-widget draggble textItem">
                                    <p> Hello </p>
                                </div>
                            </div>

                            <div class="hover-content">
                                <div class="info"> 
                                    <p> Click to select  </p> 
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="part">
                        <div class="block">
                            <div class="items">
                                <div class="ui-widget draggble">
                                    <img src="images/vectors/2.png" />
                                </div>
                            </div>

                            <div class="hover-content">
                                <div class="info"> 
                                    <p> Click to select  </p> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="part">
                        <div class="block">
                            <div class="items">
                                <div class="ui-widget draggble">
                                    <img src="images/vectors/3.png" />
                                </div>
                            </div>

                            <div class="hover-content">
                                <div class="info"> 
                                    <p> Click to select  </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>

    </div>

    <footer>
    </footer>
</body>
</html>
