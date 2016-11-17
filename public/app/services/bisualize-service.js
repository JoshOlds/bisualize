angular.module('bisualize')
    .service('BisualizeService', function ($http) {

        /* The grand and all-encompasing service for interacting with the bisualize api
        Every function should have a comment that explains how they work, and what parameters they takes
        Every function returns a Promise, so use .then() and .catch() when implementing them
        *** USAGE ***
        var myService = new BisualizeService()
        myService.getAllPositions()
        .then(data =>{
            console.log(data)
            //This code runs when the function comes back with good data.
            //Remember, this is asynchronous
        })
        .catch(error =>{
            console.log(error)
            //This code runs when the promise fails, aka, crash in the API
        })
        */

        var baseUrl = '/api/'
        var employeeUrl = 'employees/'
        var positionUrl = 'positions/'
        var badgeUrl = 'badges/'
        var jobUrl = 'jobs/'



        this.getAllPositions = function getAllPositions() {//This functions spews back all of the positions in the database
            return new Promise((resolve, reject) => {
                $.get(baseUrl + positionUrl)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getPosition = function getPosition(id) { //This function gets a position by id, and returns all extended data available
            return new Promise((resolve, reject) => {
                $.get(baseUrl + positionUrl + id)
                    .then(data => {
                        var extraUrl = '?include=reports,';
                        if (data.jobId != '-1') { extraUrl += 'job,' }
                        if (data.employeeId != '-1') { extraUrl += 'employee,' }
                        if (data.managerPositionId != '-1') { extraUrl += 'manager' }
                        $.get(baseUrl + positionUrl + id + extraUrl)
                            .then(finalData => {
                                return resolve(finalData)
                            })
                            .catch(err => {
                                return reject(err)
                            })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getAllEmployees = function getAllEmployees() {//LET ME GIVE YOU ALL THE 'employees'
            return new Promise((resolve, reject) => {
                $.get(baseUrl + employeeUrl)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getEmployee = function getEmployee(id) { //This function gets an employee by id, and returns all extended data available
            return new Promise((resolve, reject) => {
                $.get(baseUrl + employeeUrl + id)
                    .then(data => {
                        var extraUrl = '?include=badges,';
                        if (data.jobId != '-1') { extraUrl += 'job,' }
                        if (data.positionId != '-1') { extraUrl += 'position,' }
                        $.get(baseUrl + employeeUrl + id + extraUrl)
                            .then(finalData => {
                                return resolve(finalData)
                            })
                            .catch(err => {
                                return reject(err)
                            })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getAllJobs = function getAllJobs() {// Jerbs everybody! JERBS!!!
            return new Promise((resolve, reject) => {
                $.get(baseUrl + jobUrl)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getJob = function getJob(id) { //This function gets a job by id, and returns all extended data available (right now there is no extended data)
            return new Promise((resolve, reject) => {
                $.get(baseUrl + jobUrl + id)
                    .then(data => {
                        return resolve(data)
                        //var extraUrl = '?include='; //Use later if relationships
                        // $.get(baseUrl + positionUrl + id + extraUrl)
                        //     .then(finalData => {
                        //         return resolve(finalData)
                        //     })
                        //     .catch(err => {
                        //         return reject(err)
                        //     })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getAllBadges = function getAllBadges() {// All the badges
            return new Promise((resolve, reject) => {
                $.get(baseUrl + badgeUrl)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.getBadge = function getBadge() {//Not all the badges... just one
            return new Promise((resolve, reject) => {
                $.get(baseUrl + badge + id)
                    .then(data => {
                        return resolve(data)
                        //var extraUrl = '?include='; //Use later if relationships
                        // $.get(baseUrl + positionUrl + id + extraUrl)
                        //     .then(finalData => {
                        //         return resolve(finalData)
                        //     })
                        //     .catch(err => {
                        //         return reject(err)
                        //     })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.addRootPosition = function addRootPosition() { //THIS IS ONLY USED TO INITIALIZE THE FIRST MEMBER IN THE DATABASE!!!
            //We are going to ensure you don't do this multiple times
            return new Promise((resolve, reject) => {
                $.get(baseUrl + positionUrl)
                    .then(data => {
                        if (data.length > 0) { return reject({ error: 'You can only initialize the position database once!' }) }
                        $.post(baseUrl + positionUrl, { managerPositionId: '-1' })
                            .then(data => {
                                return resolve(data)
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                    .catch(err => {
                        reject(err)
                    })
            })

        }

        this.addPosition = function addPosition(managerPositionId) { //Adds a new position. Requires existing managerPositionId
            return new Promise((resolve, reject) => {
                var postData = { managerPositionId: managerPositionId }
                $.post(baseUrl + positionUrl, postData)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.updatePosition = function updatePosition(id, updateData) { //The updateData must be an object. It is only looking for a 'jobId' and 'employeeId' key. Nothing else matters. You can't change managers or reports here, that is automatic upon creation'
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + positionUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.deletePosition = function deletePosition(id) { //Can only delete positions that do not have reports
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + positionUrl + id,
                    type: 'DELETE',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.addEmployee = function addEmployee(name) { //Creates a new employee. Requires a name
            return new Promise((resolve, reject) => {
                if (!name) { return reject({ error: 'Cannot add Employee, Must supply a name!' }) }
                var postData = { name: name }
                $.post(baseUrl + employeeUrl, postData)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.updateEmployee = function updateEmployee(id, updateData) {// updateData must be an object. Looking for any keys 'jobId', 'positionId', 'image'. 'badgeId' can be used to add a single badge. Cannot change name, must remake employee
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + employeeUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.addEmployeeBadge = function addEmployeeBadge(id, badgeId) {// Adds a single badge to an employee. takes in employeeId, and badgeId
            return new Promise((resolve, reject) => {
                var postData = { badgeId: badgeId }
                $.ajax({
                    url: baseUrl + employeeUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(postData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.deleteEmployeeBadge = function deleteEmployeeBadge(id, badgeId) {//Removes a single badge from employee
            return new Promise((resolve, reject) => {
                var postData = { deleteBadgeId: badgeId }
                $.ajax({
                    url: baseUrl + employeeUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(postData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.deleteEmployee = function deleteEmployee(id) { //Sets an employee to inactive.... They remain in database, and in all positions they occupied
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + employeeUrl + id,
                    type: 'DELETE',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.addJob = function addJob(title, description) {//Adds new job. Takes in 'title' and 'description' for job listing
            return new Promise((resolve, reject) => {
                if (!title || !description) { return reject({ error: 'Cannot add Job, Must supply a title and description!' }) }
                var postData = { title: title, description: description }
                $.post(baseUrl + jobUrl, postData)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.updateJob = function updateJob(id, updateData) {//Requires a job object. Update only looks for 'title' and 'description' keys
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + jobUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.deleteJob = function deleteJob(id) {//Deletes a job by its ID. 
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + jobUrl + id,
                    type: 'DELETE',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.addBadge = function addBadge(title, description, image) {//Adds new badge. Takes in 'title' and 'description' for badge listing. 'image' is optional
            return new Promise((resolve, reject) => {
                if (!title || !description) { return reject({ error: 'Cannot add Badge, Must supply a title and description!' }) }
                var postData = { title: title, description: description }
                if (image) { postData.image = image }
                $.post(baseUrl + badgeUrl, postData)
                    .then(data => {
                        return resolve(data)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
        }

        this.updateBadge = function updateBadge(id, updageData) {//Requires a badge object. Update only looks for 'title','description', and 'image' keys
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + badgeUrl + id,
                    type: 'PUT',
                    data: JSON.stringify(updateData),
                    contentType: 'application/json',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

        this.deleteBadge = function deleteBadge(id) {//Deletes a badge by its ID. 
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: baseUrl + badgeUrl + id,
                    type: 'DELETE',
                    success: function (data) { return resolve(data) },
                    error: function (err) { return reject(err) }
                })
            })
        }

    });