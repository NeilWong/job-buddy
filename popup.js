$(document).on("click", "#viewSheets", function() {
  window.open(chrome.extension.getURL('savedJobs.html'), '_blank');
});

$(document).ready(function() {
  if (document.location.pathname.match(/[^\/]+$/)[0] == 'popup.html') {

    // load settings

  } else if (document.location.pathname.match(/[^\/]+$/)[0] == 'savedJobs.html') {

    chrome.storage.local.get({jobs: []}, function(data) {
      for (var i = 0; i < data.jobs.length; i++) {
        var job = data.jobs[i];
        // var notes = ""
        // if (!isNaN(job.notes)) {
        //   notes = job.notes
        // }

        $("#jobs-table").append($(
          `
          <tr id=` + job.lastId + `>
            <td>` + job.companyName + `</td>
            <td>` + job.jobTitle + `</td>
            <td>` + job.companyLocation + `</td>
            <td>` + job.status + `</td>
            <td>` + job.dateApplied + `</td>
            <td><button class=` + "remove-job" +`> remove </button></td>
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
  console.log($this);
  var id = ($this.parent().parent().attr('id'));
  chrome.storage.local.get({jobs: []}, function(data) {
      removeJob(data.jobs, id);
  });
})


$(document).on("click", "#clear-all-jobs", function() {
  chrome.storage.local.clear()
  window.location.reload()
})

function removeJob(array, jobId) {

    for (var i = 0; i < array.length; i++) {
      console.log(array[i].lastId);
      console.log(jobId);
      console.log("");
      if (array[i].lastId == jobId) {

        console.log("before splice", array);
        array.splice(i,1);
        console.log("after splice", array);
      }
    }

    chrome.storage.local.set({
        jobs: array
    }, function() {
        chrome.storage.local.get(['jobs'], function(data) {
            //console.log(data.jobs);
        })
    });
}
