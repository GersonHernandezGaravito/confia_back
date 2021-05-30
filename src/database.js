const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@confiodb.kkz0s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    
    useUnifiedTopology : true
})

.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));