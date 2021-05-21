const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@confiadb.6pt87.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-bhiv4z-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
    useNewUrlParser : true,
    
    useUnifiedTopology : true
})

.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));