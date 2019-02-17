$(document).on({
    mouseenter: function () {
        var $this = $(this);
        // $this.data('bgcolor', $this.css('background-color')).css('background-color', '#ff0000');
        $this.html("<img style='height:20px;width:auto;' src='" + chrome.extension.getURL('icon-full.png') + "'>" + "&nbsp;&nbsp;" + "Apply");
    },
    mouseleave: function () {
        var $this = $(this);
        // $this.css('background-color', $this.data('bgcolor'));
        $this.html("Apply");
    }
}, "button.jobs-apply-button");

$(document).on("click", "button.jobs-apply-button", function() {
    
    // get job info
    
    alert("The relevant information about this job listing was saved in your spreadsheet!")
});