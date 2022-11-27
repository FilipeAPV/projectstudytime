// Event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)
$('#previewModal').on('shown.bs.modal', function (e) {

    // Test
    $("#markdownPreview").find("h2").css({ "color": "green" });

    if($("#markdownPreview:has(img)").length > 0){

        $("img").each(function (index){

            const image = $("#markdownPreview").find("img:eq(" + index + ")");

            image.css({ "width": "100%" });
            const imageSource = image.attr('src');

            image.wrap($('<a>',{
                href: imageSource,
                target: "_blank"
            }));
        });

        console.log("sessionList.html - has image");
    }else{
        console.log("sessionList.html - no image");
    }
})