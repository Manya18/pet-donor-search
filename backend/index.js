const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/user.routes');
const adviseRouter = require('./routes/advise.routes')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);

app.use('/api', adviseRouter);

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));