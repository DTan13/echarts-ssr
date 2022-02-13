import mongoose from 'mongoose';

let MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, (err) => {
    if (!err) {
        return console.log("Database Connected");
    }
    console.log(err);
});

function retFunction(doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.updatedAt;
}

const ChartSchema = new mongoose.Schema({
    id: String,
    imageoptions: {
        width: Number,
        length: Number
    },
    chartoptions: Map,
    svg: Buffer,
    key: String
}, {
    toObject: {
        transform: retFunction
    },
    toJSON: {
        transform: retFunction
    },
    timestamps: true
});

const Chart = mongoose.model('Chart', ChartSchema);

const RequestSchema = new mongoose.Schema({
    ip: String,
    reqId: String,
    url: String,
    key: String
}, {
    toObject: {
        transform: retFunction
    },
    toJSON: {
        transform: retFunction
    },
    timestamps: true
});

const Request = mongoose.model('Request', RequestSchema);

const SaveChart = async (cid, imageOptions, chartOptions, svg, key) => {
    const chart = new Chart({
        id: cid,
        imageoptions: imageOptions,
        chartoptions: chartOptions,
        svg: svg,
        key: key
    });
    return await chart.save();
};

const SaveRequest = async (ip, reqId, url, key) => {
    const request = new Request({
        ip: ip,
        reqId: reqId,
        url: url,
        key: key
    });
    return await request.save();
};

const GetCharts = async () => {
    const charts = await Chart.find({});
    return charts;
};

const GetChart = async (uuid) => {
    const chart = await Chart.findOne({ id: uuid });
    return chart;
};

const GetRequests = async () => {
    const charts = await Request.find({});
    return charts;
};

export { SaveChart, SaveRequest, GetCharts, GetChart, GetRequests };
