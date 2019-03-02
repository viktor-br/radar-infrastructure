const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const RABBITMQ_HOST_PORT = process.env.RADAR_RABBITMQ_HOST + ':' + process.env.RADAR_RABBITMQ_PORT;
const RABBITMQ_EXCHANGE_NAME_UPDATED = 'updated.DLQ.Exchange';

const args = process.argv.slice(2);

if (args.length < 4) {
    console.log("Expected command: node publish-markers.js <key> <latitude> <longitude> <content>");
    process.exit(1);
}

const msg = JSON.stringify(
    {
        updated: {
            key: args[0],
            position: [args[1], args[2]],
            content: args[3],
        }
    }
);

amqp.connect('amqp://' + RABBITMQ_HOST_PORT).then(
    (conn) => {
        return conn.createChannel().then(
            (ch) => {
                let ok = ch.assertExchange(RABBITMQ_EXCHANGE_NAME_UPDATED, 'fanout', {durable: false});

                return ok.then(function(_qok) {
                    // NB: `sentToQueue` and `publish` both return a boolean
                    // indicating whether it's OK to send again straight away, or
                    // (when `false`) that you should wait for the event `'drain'`
                    // to fire before writing again. We're just doing the one write,
                    // so we'll ignore it.
                    ch.publish(RABBITMQ_EXCHANGE_NAME_UPDATED, '', Buffer.from(msg));

                    console.log(" [x] Sent '%s'", msg);

                    return ch.close();
                });
            }
        ).finally(() => { conn.close(); });
    }
).catch(console.warn);