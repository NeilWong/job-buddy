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

        const modalId = "modal" + job.lastId
        const closeId = "close" + job.lastId

        $("#jobs-table").append($(
          `
          <tr id=` + job.lastId + `>
            <td>` + job.companyName + `</td>
            <td>` + job.jobTitle + `</td>
            <td>` + job.companyLocation + `</td>
            <td>` + job.status + `</td>
            <td>` + job.dateApplied + `</td>
            <td><button class=` + "remove-job" +`> <img class='delete-btn' src='delete.png'> </button></td>
          </tr>
          `
        ))
        $(".modals").append($(
        `
        <div id='` + modalId  +`' class="modal">
          <!-- Modal content -->
          <div style="overflow:auto; height:100%; width:100%"class="modal-content p-5">
            <div class="container">
              <span style="position:absolute" id='` + closeId  +`' class="close">&times;</span>
              <h1> Job Description </h1>
              <div>`+ job.jobDescription +`</div>
            </div>
          </div>
        </div>
        `
        ))
      }
    })

    // deletion listener function

  }

})

$(document).on("click", ".remove-job", function(){
  var $this = $(this);
  var id = ($this.parent().parent().attr('id'));
  chrome.storage.local.get({jobs: []}, function(data) {
      removeJob(data.jobs, id);
      window.location.reload()
  });
})


$(document).on("click", "#clear-all-jobs", function() {
  chrome.storage.local.clear()
  window.location.reload()
})

function removeJob(array, jobId) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].lastId == jobId) {
      array.splice(i,1);
    }
  }

  chrome.storage.local.set({
    jobs: array
  }, function() {
      chrome.storage.local.get(['jobs'], function(data) {
    })
  });
}

$(document).on("click", "tr", function(){
  var $this = $(this);
  var id = ($this.attr('id'));
  displayDescriptionModal(id)
})

function displayDescriptionModal(jobId) {
  var $modal = $("#modal"+jobId)
  var $span = $("#close"+jobId)
  $modal.css('display', 'block');
  $(document).on("click", "#close"+jobId, function() {
    $modal.css('display', 'none')
  })
}
