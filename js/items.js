 
/*
function Item(loc, sizeX, sizeY, rotation, zIn, position, alpha) {  
  this.loc = loc;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.rotation = rotation;
  this.position = position;
  this.alpha = alpha;
  this.zIn = zIn;
}

// noi metode adaugate la prototip
Item.prototype.getLoc = function() {
  return this.loc;
};
Item.prototype.getSizeX = function() {
  return this.sizeX;
};
Item.prototype.getSizeY = function () {   
  return this.sizeY;
};
Item.prototype.toString = function () { // suprascriere
  return '<Item>' + this.loc () + '</Item>';
};*/


var selectedItem = -1;
var drag = false;
var copyElement = -1;
var relativeX;
var relativeY;

Items = {
    initialization: function() {
      Items.drag($("#infographic .ui-widget "));
    },
    reset: function() {
      $(".ui-widget").removeAttr( "id" );
      selectedItem = -1;
    },
    drag: function(selector) {
      selector.draggable({
          start: function() {
              //Items.select($(this));
          },
          drag: function() {
              $( "#contextmenu" ).appendTo($("#mini"));
          },
          stop: function() {
              //$(this).removeAttr( "id" );
          }
      });
    },
    select: function(newItem) {
        if (selectedItem != -1) {
           if (!selectedItem.is(newItem)) {
              selectedItem.removeAttr('id');
           }
        }
        selectedItem = newItem;
        newItem.attr('id', 'drag');

        if (!newItem.hasClass("textItem"))
        {
          $('#textEditor').css('visibility','hidden');
          $('#textEditor').css('height','0px');
          $('#imageEditor').css('visibility','visible');
          $('#imageEditor').css('height','auto');
          $('#width').val(newItem.children('img').width());
          $('#height').val(newItem.children('img').height());
        }
        else 
        {
          $('#imageEditor').css('visibility','hidden');
          $('#imageEditor').css('height','0px');
          $('#textEditor').css('visibility','visible');
          $('#textEditor').css('height','auto');

          $('#fontFamily').val(selectedItem.find('p').css('font-family'));
          $('#fontSize').val(selectedItem.find('p').css('font-size').replace(/[^0-9]/g, ''));

          var colorRGB = rgb2hex(selectedItem.find('p').css('color'));
          $('#cpButton').val(colorRGB);
          $('#cpButton').colorpicker("val", colorRGB);
          $('#widthText').val(selectedItem.find('p').css('width').replace(/[^0-9]/g, '')); 
        }

        $( "#amount" ).val( newItem.children('img').css('opacity') );
        $('#slider-1').slider("value", newItem.children('img').css('opacity') * 100);
    }
};

function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}

$( document ).ready(function() {
    /* Slider */
    $( "#slider-1" ).slider({
        min: 0,
        max: 100,
        value: 100,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value/100 );
            selectedItem.children('img').css("opacity", ui.value/100);
        }
    });

    /* Color Picker */
    $('#cpButton').colorpicker( {showOn:'button'}) ;
    $('a[href="#"]').attr('href', 'javascript:void(0)');

    Items.initialization();

    $(document).on("mousedown", ".draggble" , function() {
      Items.select($(this));
    });

    // starting position of the divs
    $( document ).mouseup(function() {
       $( "#contextmenu" ).appendTo($("#mini"));
       $( "#contextmenu2" ).appendTo($("#mini"));
    });

    /* MenuContext */
    $(document).on("contextmenu", ".items" , function(e) {
        e.preventDefault();
        var offset = $(this).offset();
        relativeX = (e.pageX - offset.left);
        relativeY = (e.pageY - offset.top);

        $( "#contextmenu2" ).prependTo( $(this) );
        $( "#contextmenu2" ).css("left", relativeX);
        $( "#contextmenu2" ).css("top", relativeY);
    });

    $(document).on("contextmenu", ".items div", function(e) {
        e.preventDefault();
        e.stopPropagation();
        // create and show menu
        relativeX = e.pageX;
        relativeY = e.pageY;

        $( "#contextmenu" ).prependTo( 'body' );
        $( "#contextmenu" ).css("left", relativeX);
        $( "#contextmenu" ).css("top", relativeY);
    });

    $('#flipH').click(function() {
        selectedItem.children().toggleClass('flip-horizontal');
    });

    $('#flipV').click(function() {
        selectedItem.children().toggleClass('flip-vertical');
    });

    $( "#mCut" ).click(function() {
        ContextMenu.Cut();
    });

    $( "#mCopy" ).click(function() {
        ContextMenu.Copy();
    });

    $( "#mDelete" ).click(function() {
        ContextMenu.Delete();
    });

    $( "#mPaste" ).click(function() {
        ContextMenu.Paste();
    });

    $( "#mLock" ).click(function() {
        ContextMenu.Lock();
    });

    $( "#mUnlock" ).click(function() {
        ContextMenu.Unlock();
    });


    /* Text Menu */
    for (var i = 15; i <= 50; i++)
        $('#fontSize').append($('<option>', {value:i, text:i}));

    $( "#fontFamily" ).change(function () {
        $( "#fontFamily option:selected" ).each(function() {
          selectedItem.find('p').css("font-family", $( this ).text());
        });
    });

    $( "#fontSize" ).change(function () {
        $( "#fontSize option:selected" ).each(function() {
            selectedItem.find('p').css("font-size", $( this ).text() + "px");
        });
    });

    $('#cpButton').colorpicker()
      .on('change.color', function(evt, color){
        selectedItem.find('p').css("color", color);
    });

    $( "#widthText" ).change(function() {
       selectedItem.find('p').css('width',  $( this ).val() + "px");
    });

    $( "#width" ).change(function() {
       selectedItem.find('img').css('width',  $( this ).val() + "px");
    });

    $( "#height" ).change(function() {
       selectedItem.find('img').css('height',  $( this ).val() + "px");
    });

    $( "#alignRight" ).click(function() {
       selectedItem.find('p').css("text-align", "right");
    });

    $( "#alignJustify" ).click(function() {
        selectedItem.find('p').css("text-align", "center");
    });

    $( "#alignLeft" ).click(function() {
        selectedItem.find('p').css("text-align", "left");
    });

        

});

ContextMenu = {
    Cut: function() {
      copyElement = selectedItem.clone();
      selectedItem.remove();
    },
    Copy: function() {
      $( "#contextmenu" ).appendTo($("#mini"));
      copyElement = selectedItem.clone();
    },
    Delete: function() {
      $( "#contextmenu" ).appendTo($("#mini"));
      selectedItem.remove();
      selectedItem = -1;
      $('#imageEditor').css('visibility', 'hidden');
      $('#textEditor').css('visibility', 'hidden');
    },
    Paste: function() {
        copyElement.appendTo( selectedBlock.find( ".items" ) );
        copyElement.css("left", relativeX);
        copyElement.css("top", relativeY);
        Items.drag(copyElement);
        Items.reset();
        selectedItem = -1;
    },
    Lock: function() {
      selectedItem.addClass( 'locked' );
      selectedItem.draggable( 'disable' );
      $( "#contextmenu" ).appendTo($("#mini"));
      $( "#mLock" ).css("display", "none");
      $( "#mUnlock" ).css("display", "block");
    },
    Unlock: function() {
      selectedItem.removeClass( 'locked' );
      selectedItem.draggable( 'enable' );
      $( "#contextmenu" ).appendTo($("#mini"));
      $( "#mLock" ).css("display", "block");
      $( "#mUnlock" ).css("display", "none");     
    },
}


