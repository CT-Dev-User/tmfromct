import mongoose from 'mongoose';

const MasterClassRegiDataSchema = new mongoose.Schema({
    masterClassName:{type:String},
    studentName: { type: String },
    category:{type:String},
    email: { type: String },
    phoneNo: { type: String },
    currentlyPursing: { type: String }
    
});

const MasterClassRegiDataModel = mongoose.model('MasterClassRegistrationData', MasterClassRegiDataSchema);

export default MasterClassRegiDataModel;