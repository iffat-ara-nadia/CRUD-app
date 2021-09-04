const fs = require('fs');
const parse = require('csv-parse');
const cors = require("cors")
const csvtojson = require('csvtojson')
//const jsontocsv = require('json2csv').parse;
const { Parser } = require('json2csv');
const csvfilepath = 'tree_data.csv'
const express = require("express")
const app = express()

//const router = express.Router()

let nodes
const perser = async () => {
    nodes = await csvtojson({ delimiter: '\t' }).fromFile(csvfilepath);
    console.log("nodes:", nodes);

    //fs.writeFileSync('output.json', JSON.stringify(nodes))

    return nodes;
}

perser()


/* 
await csvtojson({ delimiter: '\t' })
    .fromFile(csvfilepath)
    .then(json => {
        console.log(json)
    }) */

//const nodes = await csvtojson({ delimiter: '\t' }).fromFile(csvfilepath);

/* const parser = parse({ delimiter: '\t', columns: true }, (err, records) => {
    console.log(records);
}); */

//fs.createReadStream(__dirname + '/tree_data.csv').pipe(parser);


app.use(express.json())
app.use(cors());

app.get('/api/get_tree', (req, res) => {
    //const nodes = await csvtojson({ delimiter: '\t' }).fromFile(csvfilepath);

    //console.log("nodes:", nodes);
    res.send(nodes)
})

app.put('/api/update_node/:id', (req, res) => {
    const node = nodes.find(node => node.id === req.params.id) // parseInt(req.params.id) is not needed because req.params.id is by default a string and here node.id is also a string. If node.id were int, then we had to use parseInt()
    
    if(!node) return res.status(404).send("The Node with the given ID was not found")

    if(node.read_only !== "1") {
        node.name = req.body.name;
    } else {
        res.send("The Node with the given ID is read only. You can not update the name of this node.")
    }
   
   res.send(node)
})

app.delete('/api/delete_node/:id', (req, res) => {
    const node = nodes.find(node => node.id === req.params.id) // parseInt(req.params.id) is not needed because req.params.id is by default a string and here node.id is also a string. If node.id were int, then we had to use parseInt()
    
    if(!node) return res.status(404).send("The Node with the given ID was not found")

    if(node.read_only !== "1") {
       const index = nodes.indexOf(node)
       nodes.splice(index, 1)
    } else {
        res.send("The Node with the given ID is read only. You can not delete this node.")
    }
   
   res.send(node)
})

app.get('/api/export_csv', (req, res) => {

/* const nodesOfCsv = JSON.parse(fs.readFileSync('nodes.json'));

const csv = jsontocsv(nodes.json, {fields: ['id', 'name', 'description', 'parent', 'read_only']})
FileSystem.writeFileSync('./destination.csv', csv) 

const csv = await jsontocsv.json2csvAsync(nodesOfCsv);
        //console.log(csv);

fs.writeFileSync('nodes.csv', csv)

res.send(csv)

const fields = ['id', 'name', 'description', 'parent', 'read_only']; */

const json2csvParser = new Parser({ delimiter: '\t' });
const csv = json2csvParser.parse(nodes);

res.send(csv)

})

app.post('/api/create_node', (req, res) => {
    const node = {
        id: nodes.length + 1,
        name: req.body.name,
        description: req.body.description,
        parent: req.body.parent,
        read_only: req.body.read_only

    }

   nodes.push(node)

   res.send(node)
})


const port = process.env.PORT || 5000
//console.log("testing: ", port);
const server = app.listen(port, () => {
    console.log(`server is running on PORT ${port}...`)
})

module.exports = server