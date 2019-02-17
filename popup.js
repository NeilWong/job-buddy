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
          <tr id=` + job.id + `>
            <td>` + job.companyName + `</td>
            <td>` + job.jobTitle + `</td>
            <td>` + job.companyLocation + `</td>
            <td>` + job.status + `</td>
            <td>` + job.dateApplied + `</td>
            <td>` + notes + `</td>
            <td><button id=` + job.id+ ` class=` + "remove-job" +`> remove </button></td>
          </tr>
          `
        ))

      }
    })

    // deletion listener function

  }
})

$(document).on("click", ".remove-job", function(){
  var $this = $(this);
  var id = ($this.parent().attr('id'));
  alert($this.parent().attr('id'));
  chrome.storage.local.remove(id, function() {
    alert("Removed the job!");
  });
})
