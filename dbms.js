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
	db = {}

	constructor() {
		// read the schema
		this.db = JSON.parse(fs.readFileSync("store/db.json"))
	}
	
	init() {
		console.log("This will wipe the current store entirely. // TODO: add confirmation step")
		this.db = {
			"tables": {}
		}
		this.commit()
	}

	listTables() {
		console.log(this.db.tables)
	}

	createTable(name, fields) {
		if(name in this.db.tables) {
			console.error(`Table with name ${name} already exists.`)
			return
		}

		this.db.tables[name] = {
			fields,
			records: []
		}
		console.log(`Table ${name} created.`)
	}

	deleteTable(name) {
		if(name in this.db.tables) {
			delete this.db.tables[name]
			console.log(`Deleted table ${name}.`)
			return
		}

		console.error(`Table with name ${name} not found.`)
	}

	addRecord(tableName, record) {
		if(!this.verifyTableExists(tableName)) return
		const table = this.db.tables[tableName]
		
		// TODO: verify record structure
		if(record.length != table.fields.length) {
			console.error(`Record structure does not match fields for table ${tableName}.`)
			return
		}

		this.db.tables[tableName].records.push(record)
		console.log(`Added record ${record} to table ${tableName}.`)
	}

	deleteRecord(tableName, index) {
		if(!this.verifyTableExists(tableName)) return
		
		if(index >= this.db.tables[tableName].records.length) {
			console.error(`Index ${index} out of range of table ${tableName}.`)
			return
		}
		
		const deleted = this.db.tables[tableName].records.splice(index, 1)
		console.log(`Deleted record ${deleted} from table ${tableName}.`)
	}

	findRecord(tableName, conditions) {
		if(!this.verifyTableExists(tableName)) return
		const fields = this.db.tables[tableName].fields

		for(const record of this.db.tables[tableName].records) {
			let validRecord = true

			for(const cond of conditions) {
				const fieldID = fields.indexOf(cond[0])

				if(record[fieldID] != cond[1]) {
					validRecord = false
					break
				}
			}

			if(validRecord) {
				return record
			}
		}

		return null
	}

	listTableRecords(tableName) {
		if(!this.verifyTableExists(tableName)) return

		console.log(this.db.tables[tableName].records.join("\n"))
	}

	verifyTableExists(name) {
		if(!(name in this.db.tables)) {
			console.error(`Table with name ${name} not found.`)
			return false
		}

		return true
	}

	commit() {
		fs.writeFileSync("store/db.json", JSON.stringify(this.db))
		console.log("Commited changes.")
	}
}



module.exports = DB