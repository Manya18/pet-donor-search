const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/user.routes');
const adviceRouter = require('./routes/advice.routes')
const localityRouter = require('./routes/locality.routes');
const announceRouter = require('./routes/announce.routes');
const postRouter = require('./routes/post.routes');
const eventRouter = require('./routes/event.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', localityRouter);
app.use('/api', announceRouter);
app.use('/api', adviceRouter);
app.use('/api', postRouter);
app.use('/api', eventRouter);


app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));