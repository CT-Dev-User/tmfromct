import mongoose from 'mongoose';

const jobRoleSchema = new mongoose.Schema({
    Category: { type: String },
    course: { type: String },
    jobName: { type: String },
    sallary: { type: String }
});

const jobRoleModel = mongoose.model('jobRoleData', jobRoleSchema);

export default jobRoleModel;