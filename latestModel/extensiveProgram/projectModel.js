import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema({
    Category: { type: String },
    course: { type: String },
    projectName: { type: String },
    desc: { type: String },
    point1: { type: String },
    point2: { type: String },
    point3: { type: String },
});

const projectsModel = mongoose.model('projectsData', projectsSchema);

export default projectsModel;