
import jobRoleModel from "../../latestModel/extensiveProgram/jobRoleModel.js";

// Create Job Role Data
export const createJobRoleData = async (req, res) => {
    try {
        const { Category, course, jobName, sallary } = req.body;

        const jobRoleData = new jobRoleModel({
            Category,
            course,
            jobName,
            sallary,
        });

        await jobRoleData.save();
        res.status(201).json({ message: "Job role data added successfully", jobRoleData });
    } catch (error) {
        res.status(500).json({ message: "Error creating job role data", error: error.message });
    }
};

// Get All Job Role Data
export const getJobRoleData = async (req, res) => {
    try {
        const jobRoles = await jobRoleModel.find();
        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Job Role Data by Category
export const getJobRoleDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const jobRoles = await jobRoleModel.find({ Category: category });
        if (jobRoles.length === 0) {
            return res.status(404).json({ message: "No job roles found for the specified category" });
        }
        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Job Role Data by Course
export const getJobRoleDataByCourse = async (req, res) => {
    try {
        const { course, category } = req.params;
        const jobRoles = await jobRoleModel.find({ course: course, Category: category });
        if (jobRoles.length === 0) {
            return res.status(404).json({ message: "No job roles found for the specified course" });
        }
        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Job Role Data
export const updateJobRoleDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJobRole = await jobRoleModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJobRole) {
            return res.status(404).json({ message: "Job role not found" });
        }
        res.status(200).json({ message: "Job role data updated successfully", updatedJobRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Job Role Data
export const deleteJobRoleDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJobRole = await jobRoleModel.findByIdAndDelete(id);
        if (!deletedJobRole) {
            return res.status(404).json({ message: "Job role not found" });
        }
        res.status(200).json({ message: "Job role deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
