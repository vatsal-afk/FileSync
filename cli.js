const { init, add, commit, branch, checkout } = require('./pix');

const args = process.argv.slice(2);
const command = args[0];
const filename = args[1];
const message = args[2];
const branchName = args[3];

switch (command) {
    case 'init':
        init();
        break;
    case 'add':
        if (filename) add(filename);
        break;
    case 'commit':
        if (message) commit(message);
        break;
    case 'branch':
        if (branchName) branch(branchName);
        break;
    case 'checkout':
        if (branchName) checkout(branchName);
        break;
    default:
        console.log('Unknown command. Use init, add, commit, branch, or checkout :)');
}
