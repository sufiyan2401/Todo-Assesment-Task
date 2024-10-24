export const validateFields = (description, assignedUser, country, showModal) => {
    if (!description.trim() || !assignedUser || !country.trim()) {
        showModal('All fields (User Assigned, Country, and Description) are mandatory.');
        return false;
    }
    if (description.length > 120) {
        showModal('Description must be under 120 characters.');
        return false;
    }
    return true;
};
