const { execSync } = require('child_process');
const { init, add, commit, branch, checkout } = require('./pix');

// Get command and arguments
const [,, command, ...args] = process.argv;

switch (command) {
    case 'init':
        init();
        break;
    case 'add':
        add(args[0]);
        break;
    case 'commit':
        commit(args.join(' '));
        break;
    case 'branch':
        branch(args[0]);
        break;
    case 'checkout':
        checkout(args[0]);
        break;
    default:
        console.log('Usage: node cli.js {init|add|commit|branch|checkout} [arguments]');
        process.exit(1);
}
