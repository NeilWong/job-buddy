var config = {
    apiKey: "AIzaSyDqHpPH0UkhCtQwY3uOk4dfJEmLS0ehDOc",
    authDomain: "job-buddy-1.firebaseapp.com",
    databaseURL: "https://job-buddy-1.firebaseio.com",
    projectId: "job-buddy-1",
    storageBucket: "job-buddy-1.appspot.com",
    messagingSenderId: "1065356240334"
};
firebase.initializeApp(config);
var database = firebase.firestore();

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

    //need to add in check to see if company already exists

    var newJob = {
        companyId,
        website: 'LinkedIn',
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
    database.collection("companies").doc(companyId).set(newCompany)
    database.collection("jobs").add(newJob)
}

// addNewJob({companyName: 'Google Chrome', jobTitle: 'Software Developer', companyLocation: 'California', dateCreated: new Date().toDateString(), dateApplied: new Date().toDateString(), status: 'applied'})
