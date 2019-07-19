const CMDApp = require('node_cmd_app')
const DB = require('./dbms')


const db = new DB()
const app = new CMDApp()

app.commands = {
	init,
	createTable,
	list,
	deleteTable,
	addRecord,
	deleteRecord,
	findRecord,
	listTableRecords,
	commit: () => db.commit()
}

app.start()

function init() {
	db.init()
}

function createTable(args) {
	db.createTable(args[0], args.slice(1))
}

function list() {
	db.listTables()
}

function deleteTable(args) {
	db.deleteTable(args[0])
}


function addRecord(args) {
	db.addRecord(args[0], args.slice(1))
}

function deleteRecord(args) {
	db.deleteRecord(args[0], args[1])
}

function findRecord(args) {
	console.log(db.findRecord(args[0], [[args[1], args[2]]]))
}

function listTableRecords(args) {
	db.listTableRecords(args[0])
}
