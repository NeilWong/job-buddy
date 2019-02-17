$(document).on("click", "#viewSheets", function() {
  chrome.storage.sync.get(['jobs'], function(data) {
    html = `
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Saved Jobs</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" media="screen" href="main.css">
      <script src="main.js"></script>
      <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body>
      <h1>Saved Jobs</h1>
      <table id="job-list">
        <tr>
          <th>Company</th>
          <th>Job Title</th>
          <th>Location</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Notes</th>
        </tr>
    `

    for (var i = 0; i < data.jobs.length; i++) {
      var job = data.jobs[i];
      var notes = ""
      if (!isNaN(job.notes)) {
        notes = job.notes
      }
      html += 
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
    }

    html += `
    </table>
    </body>
    </html> 
    `

    var wnd = window.open("about:blank", "_blank");
    wnd.document.write(html);
    // window.open(chrome.extension.getURL('savedJobs.html'), '_blank');
  });
});

$(document).ready(function() {
  chrome.storage.sync.get(['enabled'], function(data) {
    if (data.enabled === true) {
    } else {
    }
  });
})