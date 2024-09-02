const fs=require('fs');
const path=require('path');

function init() {
    if (fs.existsSync('.pix')) {
        console.log('pixitory already initialized!');
        return;
    }
    fs.mkdirSync('.pix');
    const pixPath=process.cwd()+'/.pix';
    const structure = [
        { dir: '', files: [{ name: 'HEAD', content: 'ref: refs/heads/main\n' }] },
        { dir: 'branches', files: [] },
        { dir: 'objects', files: [] },
        { dir: 'refs/heads', files: [] },
        { dir: 'refs/tags', files: [] }
    ];
    structure.forEach(({dir, files}) => {
        const fullPath = path.join(pixPath, dir);
        fs.mkdirSync(fullPath, {recursive: true});
        files.forEach(({name, content}) => {
            fs.writeFileSync(path.join(fullPath, name), content);
        });
    });
    fs.writeFileSync(path.join(pixPath, 'config'), '[core]\n\trepositoryformatversion = 0\n\tbare = false\n');
    fs.writeFileSync(path.join(pixPath, 'index'), '');
    console.log('Initialized empty pixitory at', pixPath);
}
init();

function add() {
    const srcDir="./";
    const destDir="./objects/";
}

function commit() {

}

function branch() {

}

//export {init, add, branch, commit}