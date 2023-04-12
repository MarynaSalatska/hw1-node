const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");;

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
   const data = await fs.readFile(contactsPath, "utf8");
   const contacts = JSON.parse(data);
   const result = contacts.find((item) => item.id === contactId);
   if (!result) {
     console.log("error");
     return null;
   }
   return result;
}

async function removeContact(contactId) {
   const data = await fs.readFile(contactsPath, "utf8");
   const contacts = JSON.parse(data);
   const idx = contacts.findIndex((item) => item.id === contactId);
   if (idx === -1) {
     return null;
   }
   const [removeContact] = contacts.splice(idx, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts));
   return removeContact;
}

async function addContact(name, email, phone) {
     const data = await fs.readFile(contactsPath, "utf8");
     const contacts = JSON.parse(data);
     const newContact = { id: v4(), name, email, phone };
     contacts.push(newContact);
     await fs.writeFile(contactsPath, JSON.stringify(contacts));
     return newContact;
}


const actions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = actions;