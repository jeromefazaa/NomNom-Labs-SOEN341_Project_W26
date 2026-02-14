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

module.exports = {
    read,
    write
};