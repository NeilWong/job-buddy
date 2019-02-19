<p align="center">
<img src="https://raw.githubusercontent.com/NeilWong/hackuci-2019/master/jobbuddy.png" alt="Job Buddy" title="Job Buddy" width="440"/>
</p>

Hack UCI 2019 chrome exntesion that automatically saves details about jobs you apply to for future reference.


## Inspiration
As college students, one of the most important and stressful points of our lives can be applying for jobs and internships. We wanted to bring in a companion to assist in job applications and make the process easier to keep track of and care for. Job Buddy is a Google Chrome extension made to compile all necessary information on a job posting to enable the user to return to the post at any time to refresh on job details and follow up on their applications. Users can refer to this information for interviews, emails, or simply to keep a record for follow-ups. Our goal when making Job Buddy was to make the integration seamless with the already existing UI on job websites. In this way, we are able to bookkeep for our users without being a distraction.

## What it does
Our project for HackUCI 2019 is a quick and easy to use chrome extension. Focused on making it easier and more efficient for students applying to jobs on LinkedIn, Job Buddy gives our users a streamlined and simple way to keep track of and update their job application statuses. By clicking either “apply” or “save” on any LinkedIn job posting, Job Buddy stores the company name, job title, location of the job, status of application, and date that you applied for that position locally into the chrome. 

Next, users can click on the extension icon in the top-right corner and click “View Applications” to view all the relevant information for their job viewings and applications. Users can view all the previously named job information in a well organized format.


## How we built it
We divided the project into three components

**1. Webpage parsing component**
This component is responsible for detecting LinkedIn job postings on a user’s browser and modifying the “Apply” button to also complete a custom task defined by the next component.
We did this by using jQuery to access elements in the DOM and manipulate them. We used multiple regex patterns in order to discover elements relevant to the job posting and process that data.

**2. Data retention component**
After gathering the data from the LinkedIn job posting page, we use chrome local storage to store data about the job posting even between browser sessions.
The data retention component is also responsible for transferring data from the chrome local storage to a new HTML page that displays the information in a beautiful interface.

**3. User Interface**
We had to design two user interfaces: the extension pop-up and the page that shows the saved job postings.
We Initially sketched our ideas using Adobe XD and then implemented it using HTML, CSS and Javascript with the help of jQuery.


## What's next for Job Buddy

Our goal for Job Buddy is to make it a single simple tool that can be useful for every step of the application process. Due to time constraints, we were unable to implement all of the features we wanted to see. Below is a list of changes ordered by priority. We believe that every feature would be useful for the job application process and are still brainstorming more ways for our application to help.

- [ ] Develop compatibility for Glassdoor, AngelList, Indeed, Ziprecruiter and more.
- [ ] Add the ability to upload key files for applications such as resumes, cover letters and email templates into job buddy 
    * Drag and drop files of your choice from the popup menu.
    * Make the code more scalable to accommodate larger files 
- [ ] Export and back up job data to a csv file or Google spreadsheet
- [ ] Add a fields for contact information: url, email, recruiter names, etc.
- [ ] Add a field for personal notes for job listings. Prompted on every ‘Apply’ or ‘Save’ if enabled in settings.
- [ ] Add the ability to edit job details
- [ ] Keep users on track with their saved job applications.
    * Add email reminders for application deadlines for ‘Saved’ jobs
    * Add email reminders for follow-ups if a certain amount of time has passed from application date with no response from       the recruiter. We want to implement a way to automatically detect this in the future through an email API like SendGrid.
- [ ] An easier way to exit the job description page (currently done by pressing a small X button in the top right corner)
Share your saved jobs through email or social media with friends who might be interested in similar postings.
