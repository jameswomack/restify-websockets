exports.api = {
    name: 'Noble Gesture',
    version: '1.0.0-alpha'
};

exports.environment = {
    name: 'development',
    port: 3013,
    salt: '', //generate one @ random.org
    bugSenderEmail: {
        email:    'james@nblgstr.com',
        password: 'Nblgstr1984$',
        smtpHost: 'smtp.gmail.com',
        ssl:       true
    },
    bugRecieverEmail: 'james@nblgstr.com'
};

exports.limiter = {
    defaultBurstRate:  50,
    defaultRatePerSec: 0.5,
};
