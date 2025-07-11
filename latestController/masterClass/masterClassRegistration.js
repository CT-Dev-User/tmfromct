import MasterClassRegiDataModel from "../../latestModel/masterClass/masterClassRegistrationModel.js";// Adjust the path as needed

export const RegisterForMasterClassData = async (req, res) => {
    try {
        const { masterClassName, studentName, category, email, phoneNo, currentlyPursing } = req.body;

        const masterClass = new MasterClassRegiDataModel({
            masterClassName,
            studentName,
            category,
            email,
            phoneNo,
            currentlyPursing
        });

        await masterClass.save();
        res.status(201).json({ message: 'Master class data created successfully', masterClass });
    } catch (error) {
        res.status(500).json({ message: 'Error creating master class data', error: error.message });
    }
};
export const getAllMasterClassQueryData = async (req, res) => {
    try {
        const masterClassData = await MasterClassRegiDataModel.find();
        res.status(200).json(masterClassData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching master class data', error: error.message });
    }
};

export const getMasterClassQueryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await MasterClassRegiDataModel.findById(id);

        if (!masterClass) {
            return res.status(404).json({ message: 'Master class data not found' });
        }

        res.status(200).json(masterClass);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching master class data', error: error.message });
    }
};

export const getMasterClassQueryDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const masterClass = await MasterClassRegiDataModel.find({category:category});

        if (!masterClass) {
            return res.status(404).json({ message: 'Master class data not found' });
        }

        res.status(200).json(masterClass);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching master class data', error: error.message });
    }
};

export const updateMasterClassQueryData = async (req, res) => {
    try {
        const { id } = req.params;
        const { masterClassName, studentName, category, email, phoneNo, currentlyPursing } = req.body;

        const updatedMasterClass = await MasterClassRegiDataModel.findByIdAndUpdate(
            id,
            { masterClassName, studentName, category, email, phoneNo, currentlyPursing },
            { new: true } // Return updated document
        );

        if (!updatedMasterClass) {
            return res.status(404).json({ message: 'Master class data not found' });
        }

        res.status(200).json({ message: 'Master class data updated successfully', updatedMasterClass });
    } catch (error) {
        res.status(500).json({ message: 'Error updating master class data', error: error.message });
    }
};

export const getMasterClassNames = async (req, res) => {
    try {
        const masterClassNames = await MasterClassRegiDataModel.distinct('masterClassName');
        res.status(200).json(masterClassNames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching master class names', error: error.message });
    }
};

// Get MasterClass Data by MasterClass Name
export const getMasterClassQueryDataByMasterClassName = async (req, res) => {
    try {
        const { masterClassName } = req.params;
        const masterClassData = await MasterClassRegiDataModel.find({ masterClassName });

        if (masterClassData.length === 0) {
            return res.status(404).json({ message: "No MasterClass found with the specified name" });
        }

        res.status(200).json(masterClassData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteMasterClassQueryData = async (req, res) => {
    try {
        const { id } = req.params;

        const masterClass = await MasterClassRegiDataModel.findByIdAndDelete(id);

        if (!masterClass) {
            return res.status(404).json({ message: 'Master class data not found' });
        }

        res.status(200).json({ message: 'Master class data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting master class data', error: error.message });
    }
};
