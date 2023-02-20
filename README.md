# EdTech-Management

### Database
* I have used a remote postgresql database, provided by Railway.
* Only 200 hours of usage available.

### Relationships
* User belongs to Role
&emsp;&emsp; Primary Key of Role is the Foreign Key of User.
* School has many Student
&emsp;&emsp; Primary Key of School is the Foreign Key of Student.
* User has many Student
&emsp;&emsp; Primary Key of User is another Foreign Key of Student.

### Crux
* There is no restriction on the name of the Role during its creation, but the scopes associated with a Role, should only consist as the following:
&emsp;&emsp; user-get  
&emsp;&emsp; user-create  
&emsp;&emsp; student-get  
&emsp;&emsp; student-create  
&emsp;&emsp; role-get  
&emsp;&emsp; school-get  
&emsp;&emsp; school-create  
&emsp;&emsp; school-students  

* I assumed two Roles: Admin and Principal. Admin gets user-get and role-get scopes. Principal gets all the other scopes.

* Some endpoints require a particular scope. It is implemented as said in the problem statement.

### Middleware
* CheckUserScope

&emsp;&emsp;Checks if the signed in user has the required scope to access &emsp;&emsp;&emsp;endpoints. 

* Validation
&emsp;&emsp; Validatorjs is used.

### APIs
* The school/student endpoint returns only the students of the particular school only.

* The GET /student endpoint returns only the students of the user that is logged in.
