 
var selectedBlock = -1;
var miniMenu = document.getElementById('miniMenu');

var hover = $('<div class="hover-content"> <div class="info">  <p> Selectați </p>  </div> </div>');

$( document ).ready(function() {

    /*color Picker*/
    $('#cpButton').colorpicker({showOn:'button'});
    $('a[href="#"]').attr('href', 'javascript:void(0)');

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

    var selectBlock = function(event) {
        Items.reset();
        $("#miniMenu").css("display", "block");
        $('.block .item').removeClass('active');
        selectedBlock = $(event.target).parents('div[class^="part"]');
        selectedBlock.addClass('active');
        selectedBlock.children(".block").children(".hover-content").addClass("selected");

        var offset = selectedBlock.find('.block').offset();
        $("#infographic").append($("#itemMenu"))
        $("#itemMenu").css("top", offset.top - 180);
        $("#infographic").append($("#miniMenu"));
        $("#miniMenu").css("top", offset.top - 180);
        $("#miniMenu").css("left", offset.left - 150);

        $('#widthBlock').val(selectedBlock.find('.block').width());
        $('#heightBlock').val(selectedBlock.find('.block').height());
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
        newBlock.find('div:first').remove();
        newBlock.children(".block").children(".hover-content").removeClass("selected");
        newBlock.appendTo( "#infographic" );
        newBlock.insertAfter( selectedBlock );
        Items.reset();
        Items.initialization();
    },
    Delete: function() {
        $("#mini").prepend($("#miniMenu"));
        $("#miniMenu").css("display", "none");
        selectedBlock.remove();
        selectedBlock = -1;
    },
    Add: function() {
        $('<div class="part"> <div class="block"> <div class="hover-content"> <div class="info"> <p> Selectează </p> </div></div> </div> </div>').insertAfter(selectedBlock);
    },
    Settings: function(){
        var toggleWidth = $("#settingsContainer").height() == 100 ? "0px" : "100px";
        $('#settingsContainer').animate({ height: toggleWidth });
    },
    Change: function() {
        selectedBlock.find('.block').height($('#heightBlock').val());
        $('.block').width($('#widthBlock').val());
        var offset = selectedBlock.find('.block').offset();
        $("#miniMenu").css("left", offset.left - 150);
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



