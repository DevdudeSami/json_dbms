const CMDApp = require('node_cmd_app')
const DB = require('./dbms')


const db = new DB()
const app = new CMDApp()

app.commands = {
	createTable,
	list,
	deleteTable,
	commit: () => db.commit()
}

app.start()


function createTable(args) {
	db.createTable(args[0], args.slice(1))
}

function list() {
	db.listTables()
}

function deleteTable(args) {
	db.deleteTable(args[0])
}