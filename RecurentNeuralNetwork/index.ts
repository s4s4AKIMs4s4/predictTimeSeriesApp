import * as tf from '@tensorflow/tfjs';

export const computeSMA = (data, window_size) => {
    let r_avgs = [];
    let avg_prev = 0;
    for (let i = 0; i < data.length - window_size; i++) {
        let curr_avg = 0.00;
        let t = i + window_size;
        for (let j = i; j < t && j <= data.length; j++) {
            curr_avg += data[j]['close'] / window_size;
        }
        let sma = {
            set: data.slice(i, i + window_size).map((value) => value.close ),
            avg: curr_avg   
        }
        r_avgs.push(sma);
        avg_prev = curr_avg;
    }
    return r_avgs;
}

export const getMaxThreshold = (data:Array<any>) => {
    const coficentThreshold = 0.1
    const maxStockObject = data.reduce((acc,currentValue, index) => {
        const currentPrice = currentValue.close
        const isMaxInTheEnd = data.length - index < 5 && currentPrice > acc
        if(currentPrice > acc.maxPrice) return {maxPrice: currentPrice, isMaxInTheEnd}
        else return {...acc}
    },{maxPrice:0, isMaxInTheEnd:false})
    if(maxStockObject.isMaxInTheEnd)
        return maxStockObject.maxPrice + maxStockObject.maxPrice * coficentThreshold
    else return maxStockObject.maxPrice
}

export const maxValue = 4822 + 4822 * 0.1

export const trainModel = async (model_params, maxThreshold, callback) => {
    let inputs = model_params['inputs'];
    let outputs = model_params['outputs'];
    let trainingsize = model_params['input_trainingsize'];
    let window_size = model_params['input_windowsize'];
    let n_epochs = model_params['input_epoch'];
    let learning_rate = model_params['input_learningrate'];
    let n_layers = model_params['input_hiddenlayers'];
    
    const input_layer_shape = window_size;
    const input_layer_neurons = 50;
    const rnn_input_layer_features = 10;
    const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;
    const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps];
    const rnn_output_neurons = 20;
    const rnn_batch_size = window_size;
    const output_layer_shape = rnn_output_neurons;
    const output_layer_neurons = 1;

    let X = inputs
    let Y = outputs
    console.log('X[0]')
    console.log(X[0])
    console.log(X);
    console.log(X.length + " " + X.length)

    const xs = tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(maxThreshold));
    const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1]).div(tf.scalar(maxThreshold));
    
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: input_layer_neurons, inputShape: [input_layer_shape] }));
    model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));
    let lstm_cells = [];

    for (let index = 0; index < n_layers; index++) {
        lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
    }

    model.add(tf.layers.rnn({
        cell: lstm_cells,
        inputShape: rnn_input_shape,
        returnSequences: false
    }));

    model.add(tf.layers.dense({ units: output_layer_neurons, inputShape: [output_layer_shape] }));
    
    model.compile({
        optimizer: tf.train.adam(learning_rate),
        loss: 'meanSquaredError'
    });
    console.log('x')
    console.log(X)

    const hist = await model.fit(xs, ys,
        {
            batchSize: rnn_batch_size, epochs: n_epochs, callbacks: {
                onEpochEnd: async (epoch, log) => {
                    callback(epoch, log, model_params);
                }
            }
        });
    // await model.save('localstorage://tfjs-stocks');
    // const model = await tf.loadLayersModel('localstorage://tfjs-stocks');
    // const hist = {};
    return { model: model, stats: hist };
}


export const makePredictions = (X, model, maxThreshold) => {
    //let X=this.inputs.slice(Math.floor(size/100 * inputs.length),inputs.length);
    console.table(X.length);
    console.log(String(X[0]).length)
    const predictedResults = model.predict(tf.tensor2d(X,[X.length,X[0].length]).div(tf.scalar(maxThreshold)));
    console.log(predictedResults.dataSync() * maxValue);
    // Array.from(predictedResults.dataSync());
    return predictedResults.dataSync() * maxValue
}











