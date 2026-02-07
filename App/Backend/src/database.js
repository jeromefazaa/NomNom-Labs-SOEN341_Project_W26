// This file has the responsobility of communicating (reading/writing) with the database (in this case, a JSON file)
// This file will create and export the necessary functions to read and write to the JSON file, which will be used by other files.
const fs = require('fs');
const path = require('path');

const USERS_PATH = path.join(__dirname, '../../Data/users.json');

// read data from JSON db
function read(file) {
    try {
        const data = null;
        switch (file) {
            case 'users':
                data = fs.readFileSync(USERS_PATH, 'utf8');
                break;
            default:
                console.error('Unknown file type:', file);
                break;

        }
        return JSON.parse(data);

    } catch (error) {
        console.error('Error reading database:', error);
        return null;
    }
}

/// write data to JSON db
// this will rewrtie the entire file

function write(file, data) {
    try {
        switch (file) {
            case 'users':
                fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2), 'utf8');
                return true;
            
        }

    } catch (error) {
        console.error('Error writing to database:', error);
        return false;
    }
}

// create entry in JSON db

function createEntry(file, entry) {
    try {
        const data = read(file);
        data.push(entry);
        return write(file, data);

    } catch (error) {
        console.error('Error creating entry:', error);
        return null;
    }
}

// delete entry from JSON db

function deleteEntry(file, identifier) {
    try {
        const data = read(file);
        let newData;
        if (typeof identifier === 'function') {
            newData = data.filter(item => !identifier(item));
        } else if (typeof identifier === 'number') {
            newData = data.filter((_, index) => index !== identifier);
        } else {
            console.error('Identifier must be a number (index) or function (filter)');
            return null;
        }
        return write(file, newData);
    } catch (error) {
        console.error('Error deleting entry:', error);
        return null;
    }
}

// update entry in JSON db

function updateEntry(file, id, updates) {
    try {
        const data = read(file);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) {
            console.error('Entry with id', id, 'not found');
            return null;
        }
        data[index] = { ...data[index], ...updates };
        return write(file, data);
    } catch (error) {
        console.error('Error updating entry:', error);
        return null;
    }
}

// read single entry from JSON db

function readEntry(file, id) {
    try {
        const data = read(file);
        const entry = data.find(item => item.id === id);
        if (!entry) {
            console.error('Entry with id', id, 'not found');
            return null;
        }
        return entry;
    } catch (error) {
        console.error('Error reading entry:', error);
        return null;
    }
}

module.exports = {
    read,
    write,
    createEntry,
    deleteEntry,
    updateEntry,
    readEntry
};