import express from 'express'

const app: express.Application = express();
const port = process.env.PORT || 3000;
import db from './models'
import {users} from './seeders/users'
import {projects} from './seeders/projects'
import {projectassignments} from './seeders/projectassignments'


const createUsers = () => {
    users.map(user => {
        db.User.create(user)
    })
}
const createProjects = () => {
    projects.map(project => {
        db.Project.create(project)
    })
}
const createProjectAssignments = () => {
    projectassignments.map(projectassignment => {
        db.ProjectAssignment.create(projectassignment)
    })
}

// another way
// db.ProjectAssignment.create({
//     ProjectId: 3,
//     UserId: '10298ba2-8429-4002-a9d9-c90007a4674c'
// })

app.get('/', (req: express.Request, res: express.Response) => {
    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((result: object) => res.json(result))
        .catch((err: object) => console.error(err))
})
//another way to find
// db.User.findAll({
//     include: {
//         model: db.Project
//     }
// }).then((result: object) => console.log(JSON.stringify(result)))
//     .catch((err: object) => console.error(err))

// createUsers();
// createProjects();
// createProjectAssignments();

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})