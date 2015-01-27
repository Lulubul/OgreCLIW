 
var selectedBlock = -1;
var miniMenu = document.getElementById('miniMenu');

var hover = $('<div class="hover-content"> <div class="info">  <p> Selectați </p>  </div> </div>');

$( document ).ready(function() {


    var $scrollingDiv = $("#block-left");
 
    $(window).scroll(function(){            
        $scrollingDiv
            .stop()
            .animate({"marginTop": ($(window).scrollTop() + 30) + "px"}, "slow" );          
    });


    $( "#up" ).click(function() {
        MiniMenu.MoveUp();
    });

    $( "#down" ).click(function() {
        MiniMenu.MoveDown();
    });

    $( "#clone" ).click(function() {
        MiniMenu.Clone();
    });

    $( "#delete" ).click(function() {
        MiniMenu.Delete();
    });

    $( "#add" ).click(function() {
        MiniMenu.Add();
    });

    $("#settings").click(function() {
        MiniMenu.Settings();
    });

    $("#change").click(function() {
        MiniMenu.Change();
    });


    $( "#addText" ).click(function() {
        selectedBlock.find('.items').append('<div class="ui-widget draggble textItem"> <p> ' + $( "#textInput" ).val() + '</p>');
        $( "#textInput" ).val('');
        Items.initialization();
    }); 

    $( "#add_image" ).click(function() {
        image_src = $('#loaded_images .loaded_images.selected').attr('src');
        selectedBlock.find('.items').append('<div class="ui-widget draggble"> <img src="'+ image_src +'" >');
        Items.initialization();
    }); 

    var selectBlock = function(event) {
        Items.reset();
        $("#miniMenu").css("display", "inline-block");
        $('.block .item').removeClass('active');
        selectedBlock = $(event.target).parents('div[class^="part"]');
        selectedBlock.addClass('active');
        selectedBlock.prepend($("#miniMenu"));
        selectedBlock.children(".block").children(".hover-content").addClass("selected");
        selectedBlock.prepend($("#itemMenu"));
        var offset = selectedBlock.find('.block').offset();

        $('#imageEditor').css('visibility','hidden');
        $('#textEditor').css('visibility','hidden');

        $("#miniMenu").css("left", offset.left - 310);
    };

    $(document).delegate('.block', 'click', function (event) {
        if (selectedBlock != -1) {
            if  (!selectedBlock.is( $(event.target).parents('div[class^="part"]') ) )  {
                selectedBlock.children(".block").children(".hover-content").removeClass("selected");
                selectedBlock.removeClass('active');
                selectBlock(event);
            }
        }
        else {
            selectBlock(event);
        }

    });

    $("#incarca").click(function() {
        var file;
        MainMenu.Load(file);
    });

     $("#salveaza").click(function() {
        MainMenu.Save();
    });
    

});

MiniMenu = {

    MoveDown: function() {
        selectedBlock.insertAfter(selectedBlock.next());
    },
    MoveUp: function() {
        selectedBlock.insertBefore(selectedBlock.prev());
    },
    Clone: function() {
        var newBlock = selectedBlock.clone();
        newBlock.find('#miniMenu').remove();
        newBlock.find('#itemMenu').remove();
        newBlock.children(".block").children(".hover-content").removeClass("selected");
        newBlock.appendTo( "#infographic" );
        newBlock.insertAfter( selectedBlock );
        Items.reset();
        Items.initialization();
    },
    Delete: function() {
        $("#mini").prepend($("#miniMenu"));
        $("#mini").prepend($("#itemMenu"));
        $("#miniMenu").css("display", "inline-block");
        selectedBlock.remove();
        selectedBlock = -1;
    },
    Add: function() {
        $('<div class="part"> <div class="block"> <div class="hover-content"> <div class="info"> <p> Selectează </p> </div></div> </div> </div>').insertAfter(selectedBlock);
    },
    Settings: function(){
        var toggleWidth = $("#settingsContainer").height() == 100 ? "0px" : "100px";
        $('#settingsContainer').animate({ height: toggleWidth });

        $('#widthBlock').val(selectedBlock.find('.block').width());
        $('#heightBlock').val(selectedBlock.find('.block').height() );
    },
    Change: function() {
        selectedBlock.find('.block').height($('#heightBlock').val());
        $('.block').width($('#widthBlock').val());

        var offset = selectedBlock.find('.block').offset();
        $("#miniMenu").css("left", offset.left - 310);
    }
}

MainMenu = {
    Save: function() {
        html2canvas($("#infographic"), {
            onrendered: function(canvas) {
                var myImage = canvas.toDataURL("image/png");
                window.open(myImage);
            }
        });
    },
    Load: function(file) {
        alert('fisier');
    }
}



