const chalk = require('chalk');
const fs = require('fs');

/**
 * Add a note.
 * @param {string} title - Title of note.
 * @param {string} body - Body of note.
 */ 
const addNote = (title, body) => {
    // Notes stored in .json file.
    const notes = loadNotes();

    // assign match on title input
    const duplicateNote = notes.find((note) => note.title === title);
    
    // Save note if not a duplicate based on title match.
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Successfully added: ' + title + ', note.'));
    
    } else {
        console.log(chalk.red.inverse('Warning: Note title already exists!'));  
    }    
}

/**
 * Save new note to file.
 * @param {Object[]} notes - Object of all notes including new note.
 */ 
const saveNotes = (notes) => {
    // convert to JSON prior to saving to .json file.
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

/**
 * Remove note from file.
 * @param {string} title - Title of note.
 */ 
const removeNote = (title) => {
    // Notes stored in .json file.
    const notes = loadNotes();

    // Assign notes to keep.
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));

        // Overwrite .json file with notes to keep.
        saveNotes(notesToKeep);
        
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

/**
 * Load notes from file.
 */ 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        // Return empty array if .json file does not exist.
        return[];
    }    
}

/**
 * List notes from file.
 */ 
const listNotes = () => {
    // Notes stored in .json file.
    const notes = loadNotes();

    console.log(chalk.blue.inverse('My Notes'));

    // List title of all notes in .json file.
    notes.forEach((note) => {
        console.log(note.title);
    });
}

/**
 * Read note from file.
 * @param {string} title - Title of note.
 */ 
const readNote = (title) => {
    // Notes stored in .json file.
    const notes = loadNotes();

    // Assign note object on title match.
    const note = notes.find((note) => note.title === title);

    // Conditional Output.
    if (!note) {
        console.log(chalk.red.inverse('Note not found for: ' + title));
    } else {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
}

// Export functions used directly in app.js.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}