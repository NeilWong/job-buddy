$(document).on("click", "#viewSheets", function() {
  window.open(chrome.extension.getURL('savedJobs.html'), '_blank');
});

$(document).ready(function() {
  if (document.location.pathname.match(/[^\/]+$/)[0] == 'popup.html') {

    // load settings
    
  } else if (document.location.pathname.match(/[^\/]+$/)[0] == 'savedJobs.html') {

    chrome.storage.sync.get({jobs: []}, function(data) {
      for (var i = 0; i < data.jobs.length; i++) {
        var job = data.jobs[i];
        var notes = ""
        if (!isNaN(job.notes)) {
          notes = job.notes
        }

        $("#jobs-table").append($(
          `
          <tr>
            <td>` + job.companyName + `</td>
            <td>` + job.jobTitle + `</td>
            <td>` + job.companyLocation + `</td>
            <td>` + job.status + `</td>
            <td>` + job.dateApplied + `</td>
            <td>` + notes + `</td>
          </tr>  
          `
        ))

      }  
    })

  }
})