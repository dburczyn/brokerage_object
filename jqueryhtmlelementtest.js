 $('body').append(
     $('<div/>')
     .addClass("modal fade")
     .attr("id", "expandedTile")
     .attr("role", "dialog")
     .append(
        $('<div/>')
        .addClass("modal-dialog")
        .append(
            $('<div/>')
            .addClass("modal-content")
            .append(
                $('<div/>')
                .addClass("modal-header")
                .append(
                    $('<button/>')
                    .addClass("close")
                    .attr("type", "button")
                    .attr("data-dismiss", "modal")
                    .text("&times;")
                )
                .append(
                    $('<img>')
                    .attr("id", "currentPhoto")
                    .attr("src", "#")
                                    )




 ))))