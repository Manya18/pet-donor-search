const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const userRouter = require('./routes/user.routes');
const adviceRouter = require('./routes/advice.routes')
const localityRouter = require('./routes/locality.routes');
const announceRouter = require('./routes/announce.routes');
const postRouter = require('./routes/post.routes');
const eventRouter = require('./routes/event.routes');
const organisationRouter = require('./routes/organisation.routes');
const petTypeRouter = require('./routes/petType.routes');
const bloodTypeRouter = require('./routes/bloodType.routes');
const breedRouter = require('./routes/breed.routes');
const petRouter = require('./routes//pet.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', localityRouter);
app.use('/api', announceRouter);
app.use('/api', adviceRouter);
app.use('/api', postRouter);
app.use('/api', eventRouter);
app.use('/api', organisationRouter);
app.use('/api', petTypeRouter);
app.use('/api', bloodTypeRouter);
app.use('/api', breedRouter);
app.use('/api', petRouter);

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));