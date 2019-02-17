jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

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
}, "button.jobs-save-button");

$(document).on("click", "button.jobs-save-button", function() {
    // get job info
    const $jobTitle = $("h1:regex(class, jobs(-details)?-top-card__job-title)")
    const $companyName = $("a:regex(class, jobs(-details)?-top-card__company-url)")
    let $companyLocation = $("a:regex(class, jobs(-details)?-top-card__exact-location)")
    if ($companyLocation.text() === ""){
        $companyLocation = $("span:regex(class, jobs(-details)?-top-card__bullet)").first()
    }
    const $jobDescription = $("div.jobs-description-content__text")

    jobTitle = $jobTitle.text().trim()
    companyName = $companyName.text().trim()
    companyLocation = $companyLocation.text().trim()
    jobDescription = $jobDescription.text().trim()

    const job = {
        "jobTitle": jobTitle,
        "companyName": companyName,
        "companyLocation": companyLocation,
        "jobDescription": jobDescription
    }

    chrome.storage.sync.get({jobs: []}, function(data) {
       update(data.jobs, job);
    });  
    
    alert("The relevant information about this job listing was saved in your spreadsheet!")
});

function update(array, job) {
    array.push(job);
    chrome.storage.sync.set({
        jobs: array
    }, function() {
        chrome.storage.sync.get(['jobs'], function(data) {
            console.log(data.jobs);
        })
    });
}