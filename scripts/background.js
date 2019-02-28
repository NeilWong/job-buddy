var config = {
    apiKey: "AIzaSyDqHpPH0UkhCtQwY3uOk4dfJEmLS0ehDOc",
    authDomain: "job-buddy-1.firebaseapp.com",
    databaseURL: "https://job-buddy-1.firebaseio.com",
    projectId: "job-buddy-1",
    storageBucket: "job-buddy-1.appspot.com",
    messagingSenderId: "1065356240334"
  };
firebase.initializeApp(config);
var database = firebase.database();

const COMPANIES_URL = 'https://job-buddy-1.firebaseio.com/companies'
const JOBS_URL = 'https://job-buddy-1.firebaseio.com/jobs'

function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

function addNewJob(job) {
    var companyId = job.companyName.replace(/\s+/g, '').toLowerCase(); // get the companyId
    var newJobId = database.ref().child('jobs').push().key; // generate a new jobId

    //need to add in check to see if company already exists

    var newJob = {
        companyId,
        website: 'linkedIn',
        title: job.jobTitle,
        location: job.companyLocation,
        // url
        dateCreated: job.dateApplied, // change to dateCreated
        lastUpdated: job.dateApplied, // change to lastUpdated
        status: job.status,
        // description
    }

    var newCompany = {
        name: job.companyName,
    }

    var updates = {};
    updates['/jobs/' + newJobId] = newJob
    updates['/companies/' + companyId] = newCompany

    return database.ref().update(updates)
}

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
        $this.html("<img style='height:20px;width:auto;' src='" + chrome.extension.getURL('images/icon-full.png') + "'>" + "&nbsp;&nbsp;" + "Save");
    },
    mouseleave: function () {
        var $this = $(this);
        $this.html("Save");
    }
}, "button.jobs-save-button > button.artdeco-button");

$(document).on("click", "button.jobs-save-button", function() {
    // get job info
    const $jobTitle = $("h1:regex(class, jobs(-details)?-top-card__job-title)")
    const $companyName = $("a:regex(class, jobs(-details)?-top-card__company-url)")
    let $companyLocation = $("a:regex(class, jobs(-details)?-top-card__exact-location)")
    if ($companyLocation.text() === ""){
        $companyLocation = $("span:regex(class, jobs(-details)?-top-card__bullet)").first()
    }
    const $jobDescription = $("div.jobs-description-content__text > span")

    jobTitle = $jobTitle.text().trim()
    companyName = $companyName.text().trim()
    companyLocation = $companyLocation.text().trim()
    jobDescription = $jobDescription.html().trim()

    let job = {};
    job = {
        jobTitle,
        companyName,
        companyLocation,
        status: "Saved",
        dateApplied: new Date(Date.now()).toDateString(),
        jobDescription,
    }

    addNewJob(job)

    chrome.storage.local.get({lastId: 0}, function(data){
        job['lastId'] = data.lastId
        chrome.storage.local.set({
            lastId: data.lastId + 1
        })
    })

    chrome.storage.local.get({jobs: []}, function(data) {
        update(data.jobs, job);
    });  
});

$(document).on({
    mouseenter: function () {
        var $this = $(this);
        $this.data('bgcolor', $this.css('background-color')).css('background-color', '#3c9963');
        $this.html("<img style='height:20px;width:auto;' src='" + chrome.extension.getURL('images/icon-full.png') + "'>" + "&nbsp;&nbsp;" + "Apply");
    },
    mouseleave: function () {
        var $this = $(this);
        $this.css('background-color', $this.data('bgcolor'));
        $this.html("Apply");
    }
}, "button.jobs-apply-button");

$(document).on("click", "button.jobs-apply-button", function() {
    // get job info
    const $jobTitle = $("h1:regex(class, jobs(-details)?-top-card__job-title)")
    const $companyName = $("a:regex(class, jobs(-details)?-top-card__company-url)")
    let $companyLocation = $("a:regex(class, jobs(-details)?-top-card__exact-location)")
    if ($companyLocation.text() === ""){
        $companyLocation = $("span:regex(class, jobs(-details)?-top-card__bullet)").first()
    }
    const $jobDescription = $("div.jobs-description-content__text > span")

    jobTitle = $jobTitle.text().trim()
    companyName = $companyName.text().trim()
    companyLocation = $companyLocation.text().trim()
    jobDescription = $jobDescription.html().trim()

    let job = {};
    job = {
        jobTitle,
        companyName,
        companyLocation,
        status: "Applied",
        dateApplied: new Date(Date.now()).toDateString(),
        jobDescription,
    }

    chrome.storage.local.get({lastId: 0}, function(data){
        job['lastId'] = data.lastId

        chrome.storage.local.set({
            lastId: data.lastId + 1
        })
    })

    chrome.storage.local.get({jobs: []}, function(data) {
        update(data.jobs, job);
    });  
});

function update(array, job) {
    array.push(job);
    chrome.storage.local.set({
        jobs: array
    }, function() {
        chrome.storage.local.get(['jobs'], function(data) {
            console.log(data.jobs);
        })
    });
}