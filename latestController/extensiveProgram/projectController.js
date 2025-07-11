import projectsModel from '../../latestModel/extensiveProgram/projectModel.js'; // Adjust the import based on your file structure
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Create a new project
export const createProject = async (req, res) => {
    const {
        Category,
        course,
        projectName,
        desc,
        point1,
        point2,
        point3
    } = req.body;

    const newProject = new projectsModel({
        Category,
        course,
        projectName,
        desc,
        point1,
        point2,
        point3
    });

    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectsModel.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectsModel.findById(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
};

// Get projects by course
export const getProjectByCourse = async (req, res) => {
    const { category, course } = req.params;
    try {
        const projects = await projectsModel.find({ Category: category, course: course });
        if (projects.length === 0) return res.status(404).json({ message: 'No projects found for this course' });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects by course', error });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    const { id } = req.params;

    try {
        const existingProject = await projectsModel.findById(id);
        if (!existingProject) return res.status(404).json({ message: 'Project not found' });

        const {
            Category,
            course,
            projectName,
            desc,
            point1,
            point2,
            point3
        } = req.body;

        const updatedData = {
            Category: Category || existingProject.Category,
            course: course || existingProject.course,
            projectName: projectName || existingProject.projectName,
            desc: desc || existingProject.desc,
            point1: point1 || existingProject.point1,
            point2: point2 || existingProject.point2,
            point3: point3 || existingProject.point3
        };

        const updatedProject = await projectsModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectsModel.findByIdAndDelete(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};
