const fs = require('fs')

/**
 * A table-schema is a set of fields
 * 
 * 
 */

class Table {
	fields = []

	constructor(fields) {
		this.fields = fields
	}

	toString() {
		return this.fields.join("\t")
	}
}


class DB {
	schema = {}

	constructor() {
		// read the schema
		this.schema = JSON.parse(fs.readFileSync("store/schema.json"))
	}
	
	listTables() {
		console.log(this.schema.tables)
	}

	createTable(name, fields) {
		if(name in this.schema.tables) {
			console.error(`Table with name ${name} already exists.`)
			return
		}

		this.schema.tables[name] = fields
		console.log(`Table ${name} created.`)
	}

	deleteTable(name) {
		if(name in this.schema.tables) {
			delete this.schema.tables[name]
			console.log(`Deleted table ${name}.`)
			return
		}

		console.error(`Table with name ${name} not found.`)
	}

	commit() {
		fs.writeFileSync("store/schema.json", JSON.stringify(this.schema))
		console.log("Commited changes.")
	}
}



module.exports = DB