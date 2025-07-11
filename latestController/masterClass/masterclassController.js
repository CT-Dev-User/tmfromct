import masterClassModel from '../../latestModel/masterClass/masterClassModel.js';
import cloudinary from '../../middlware/cloudinary.js'; 
import fs from 'fs';

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
            }
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

export const createMasterClass = async (req, res) => {
    try {
        console.log(req.body)
        const { category, aboutMasterClass, masterClassRegisterLink, cardData } = req.body;
        let parseCardData = JSON.parse(cardData);

        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        await handleFileUploads('companyLogo', parseCardData.mentorData, 'companyLog');
        await handleFileUploads('mentorProfile', parseCardData.mentorData, 'mentorProfile');
        await handleFileUploads('masterClassIcon', parseCardData.masterClassFor, 'Icon');

        const newMasterClass = new masterClassModel({
            category,
            aboutMasterClass,
            masterClassRegisterLink,
            cardData: parseCardData
        });

        await newMasterClass.save();
        res.status(201).json({ message: 'Master Class created', newMasterClass });

    } catch (error) {
        res.status(500).json({ message: 'Error creating Master Class', error: error.message });
    }
};

export const getMasterClasses = async (req, res) => {
    try {
        const masterClasses = await masterClassModel.find();
        res.status(200).json(masterClasses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Classes', error: error.message });
    }
};

export const getMasterClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ message: 'Master Class not found' });
        res.status(200).json(masterClass);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Class', error: error.message });
    }
};

export const getMasterClassByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const masterClasses = await masterClassModel.find({ category });
        if (!masterClasses.length) return res.status(404).json({ message: 'Master Class not found' });
        res.status(200).json(masterClasses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Classes by category', error: error.message });
    }
};

export const deleteMasterClass = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ message: 'Master Class not found' });
        await masterClassModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Master Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Master Class', error: error.message });
    }
};

export const editMasterClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, aboutMasterClass, masterClassRegisterLink, cardData } = req.body;

        // Parse cardData if it's a string (coming from JSON.stringify)
        let parsedCardData;
        if (typeof cardData === 'string') {
            parsedCardData = JSON.parse(cardData);
        } else {
            parsedCardData = cardData; // Assume it's already an object
        }

        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ message: 'Master Class not found' });

        // Update basic fields
        masterClass.category = category || masterClass.category;
        masterClass.aboutMasterClass = aboutMasterClass || masterClass.aboutMasterClass;
        masterClass.masterClassRegisterLink = masterClassRegisterLink || masterClass.masterClassRegisterLink;

        // Update nested cardData fields
        masterClass.cardData.masterClassTitle = parsedCardData.masterClassTitle || masterClass.cardData.masterClassTitle;
        masterClass.cardData.masterClassSubTitle = parsedCardData.masterClassSubTitle || masterClass.cardData.masterClassSubTitle;
        masterClass.cardData.startDate = parsedCardData.startDate || masterClass.cardData.startDate;
        masterClass.cardData.endDate = parsedCardData.endDate || masterClass.cardData.endDate;
        masterClass.cardData.venue = parsedCardData.venue || masterClass.cardData.venue;
        masterClass.cardData.whatYouWillGain = parsedCardData.whatYouWillGain || masterClass.cardData.whatYouWillGain;

        // Mentor data
        masterClass.cardData.mentorData.mentorName = parsedCardData.mentorData.mentorName || masterClass.cardData.mentorData.mentorName;
        masterClass.cardData.mentorData.jobRole = parsedCardData.mentorData.jobRole || masterClass.cardData.mentorData.jobRole;
        masterClass.cardData.mentorData.company = parsedCardData.mentorData.company || masterClass.cardData.mentorData.company;
        masterClass.cardData.mentorData.yearOfExperience = parsedCardData.mentorData.yearOfExperience || masterClass.cardData.mentorData.yearOfExperience;
        masterClass.cardData.mentorData.experiencePoint = parsedCardData.mentorData.experiencePoint || masterClass.cardData.mentorData.experiencePoint;

        // MasterClass For
        masterClass.cardData.masterClassFor.title = parsedCardData.masterClassFor.title || masterClass.cardData.masterClassFor.title;

        // Handle File Uploads
        if (req.files && req.files.companyLogo) {
            const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
            masterClass.cardData.mentorData.companyLog = companyLogoUrl;
        }

        if (req.files && req.files.mentorProfile) {
            const mentorProfileUrl = await uploadToCloudinary(req.files.mentorProfile[0].path);
            masterClass.cardData.mentorData.mentorProfile = mentorProfileUrl;
        }

        if (req.files && req.files.masterClassIcon) {
            const masterClassIconUrl = await uploadToCloudinary(req.files.masterClassIcon[0].path);
            masterClass.cardData.masterClassFor.Icon = masterClassIconUrl;
        }

        await masterClass.save();
        res.status(200).json({ message: 'Master Class updated successfully', masterClass });
    } catch (error) {
        console.error('Error updating Master Class:', error);
        res.status(500).json({ error: 'Error updating Master Class', message: error.message });
    }
};
